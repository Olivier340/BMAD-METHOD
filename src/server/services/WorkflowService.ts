import fs from 'fs-extra';
import path from 'node:path';
import yaml from 'js-yaml';
import { glob } from 'glob';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, WorkflowExecutionRecord } from '../database/index';
import { ProjectService } from './ProjectService';
import { eventPublisher } from '../../events/event-publisher';

export interface WorkflowMetadata {
  id: string;
  name: string;
  description: string;
  module: string;
  phase: string;
  path: string;
  config: any;
  variables?: WorkflowVariable[];
}

export interface WorkflowVariable {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description?: string;
}

export interface WorkflowExecution {
  id: string;
  projectId: string;
  workflowId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  params: any;
  results?: any;
}

export class WorkflowService {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async discoverWorkflows(projectPath: string): Promise<WorkflowMetadata[]> {
    const workflows: WorkflowMetadata[] = [];

    try {
      const pattern = path.join(projectPath, 'bmad/*/workflows/**/workflow.yaml');
      const files = await glob(pattern);

      for (const file of files) {
        try {
          const content = yaml.load(await fs.readFile(file, 'utf8')) as any;
          const relativePath = path.relative(path.join(projectPath, 'bmad'), file);

          workflows.push({
            id: this.generateWorkflowId(relativePath),
            name: content.name || 'Unnamed Workflow',
            description: content.description || '',
            module: this.extractModule(relativePath),
            phase: this.extractPhase(relativePath),
            path: file,
            config: content,
            variables: this.extractVariables(content),
          });
        } catch (error) {
          console.warn(`Failed to parse workflow ${file}:`, error);
        }
      }
    } catch (error) {
      console.warn('Failed to discover workflows:', error);
    }

    return workflows;
  }

  private generateWorkflowId(relativePath: string): string {
    return relativePath
      .replace(/\/workflow\.yaml$/, '')
      .replaceAll('/', '-')
      .toLowerCase();
  }

  private extractModule(relativePath: string): string {
    const parts = relativePath.split('/');
    return parts[0] || 'unknown';
  }

  private extractPhase(relativePath: string): string {
    const parts = relativePath.split('/');
    const phaseDir = parts.find((part) => part.startsWith('1-') || part.startsWith('2-') || part.startsWith('3-') || part.startsWith('4-'));

    if (phaseDir) {
      const phaseMap: { [key: string]: string } = {
        '1-analysis': 'analysis',
        '2-plan': 'planning',
        '3-solutioning': 'solutioning',
        '4-implementation': 'implementation',
      };
      return phaseMap[phaseDir] || 'unknown';
    }

    return 'unknown';
  }

  async getWorkflowsByPhase(projectPath: string, phase?: string): Promise<WorkflowMetadata[]> {
    const workflows = await this.discoverWorkflows(projectPath);

    if (!phase) {
      return workflows;
    }

    return workflows.filter((workflow) => workflow.phase === phase);
  }

  async getAvailablePhases(projectPath: string): Promise<string[]> {
    const workflows = await this.discoverWorkflows(projectPath);
    const phases = [...new Set(workflows.map((w) => w.phase))];
    return phases.filter((phase) => phase !== 'unknown').sort();
  }

  async getWorkflowById(projectPath: string, workflowId: string): Promise<WorkflowMetadata | null> {
    const workflows = await this.discoverWorkflows(projectPath);
    return workflows.find((w) => w.id === workflowId) || null;
  }

  async validateWorkflowPrerequisites(workflow: WorkflowMetadata, projectPath: string): Promise<{ valid: boolean; missing: string[] }> {
    const missing: string[] = [];

    // Check if project exists
    const projectService = new ProjectService();
    const project = await projectService.getProject(projectPath);
    if (!project) {
      missing.push('Project not found');
    }

    // Check workflow dependencies (if defined in config)
    if (workflow.config.dependencies) {
      for (const dep of workflow.config.dependencies) {
        // This would need more sophisticated dependency checking
        // For now, just check if dependency files exist
        if (dep.type === 'file') {
          const fs = await import('fs-extra');
          if (!(await fs.pathExists(dep.path))) {
            missing.push(`Required file: ${dep.path}`);
          }
        }
      }
    }

    return {
      valid: missing.length === 0,
      missing,
    };
  }

  private extractVariables(config: any): WorkflowVariable[] {
    const variables: WorkflowVariable[] = [];

    if (config.variables) {
      for (const [name, value] of Object.entries(config.variables)) {
        if (typeof value === 'string') {
          variables.push({
            name,
            type: 'string',
            required: !value.includes('?'),
            defaultValue: value.includes('?') ? undefined : value,
            description: `Variable ${name}`,
          });
        }
      }
    }

    return variables;
  }

  async executeWorkflow(projectId: string, workflowId: string, params: any): Promise<WorkflowExecution> {
    const project = await this.projectService.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const workflows = await this.discoverWorkflows(project.path);
    const workflow = workflows.find((w) => w.id === workflowId);
    if (!workflow) {
      throw new Error('Workflow not found');
    }

    const execution: WorkflowExecution = {
      id: uuidv4(),
      projectId,
      workflowId,
      status: 'pending',
      startedAt: new Date().toISOString(),
      params,
    };

    // Sauvegarder l'exécution en base
    await this.saveExecution(execution);

    // Publish workflow started event
    eventPublisher.publishWorkflowEvent('started', {
      executionId: execution.id,
      projectId,
      workflowId,
      workflowName: workflow.name,
      params,
    });

    // Exécuter via le CLI BMad en arrière-plan
    this.executeWorkflowAsync(execution, workflow, project);

    return execution;
  }

  private async saveExecution(execution: WorkflowExecution): Promise<void> {
    const db = getDatabase();

    db.prepare(
      `
      INSERT INTO workflow_executions (id, project_id, workflow_id, status, started_at, results)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(
      execution.id,
      execution.projectId,
      execution.workflowId,
      execution.status,
      execution.startedAt,
      JSON.stringify(execution.results || {}),
    );
  }

  private async executeWorkflowAsync(execution: WorkflowExecution, workflow: WorkflowMetadata, project: any): Promise<void> {
    const { spawn } = await import('node:child_process');
    const path = await import('node:path');

    try {
      // Update status to running
      execution.status = 'running';
      await this.updateExecutionStatus(execution.id, 'running');

      // Emit event
      const { eventEmitter } = await import('../api/events');
      eventEmitter.emit('workflow-started', execution);

      // Execute workflow using BMad CLI
      const workflowPath = path.dirname(workflow.path);
      const projectRoot = project.path;

      // Build CLI command
      const cliCommand = this.buildCLICommand(workflow, execution.params, projectRoot);

      console.log(`🚀 Executing workflow: ${workflow.name}`);
      console.log(`📁 Working directory: ${workflowPath}`);
      console.log(`⚡ CLI command: ${cliCommand}`);

      // Execute the workflow
      const result = await this.executeCLICommand(cliCommand, workflowPath, execution);

      // Complete execution
      execution.status = result.success ? 'completed' : 'failed';
      execution.completedAt = new Date().toISOString();
      execution.results = result;

      await this.updateExecutionStatus(execution.id, execution.status, execution.results);

      // Publish workflow completion event
      eventPublisher.publishWorkflowEvent(execution.status === 'completed' ? 'completed' : 'failed', {
        executionId: execution.id,
        projectId,
        workflowId,
        workflowName: workflow.name,
        results: result,
      });

      // Emit completion event (legacy)
      eventEmitter.emit('workflow-completed', execution);

      console.log(`✅ Workflow ${workflow.name} ${execution.status}`);
    } catch (error) {
      // Handle error
      execution.status = 'failed';
      execution.completedAt = new Date().toISOString();
      execution.results = {
        error: error instanceof Error ? error.message : 'Unknown error',
        success: false,
      };

      await this.updateExecutionStatus(execution.id, 'failed', execution.results);

      // Publish workflow failure event
      eventPublisher.publishWorkflowEvent('failed', {
        executionId: execution.id,
        projectId,
        workflowId,
        workflowName: workflow.name,
        error: error instanceof Error ? error.message : 'Unknown error',
        results: execution.results,
      });

      // Emit error event (legacy)
      const { eventEmitter } = await import('../api/events');
      eventEmitter.emit('workflow-completed', execution);

      console.error(`❌ Workflow ${workflow.name} failed:`, error);
    }
  }

  private buildCLICommand(workflow: WorkflowMetadata, params: any, projectRoot: string): string {
    // Extract workflow configuration
    const workflowConfig = workflow.config;

    // Build base command
    let command = `bmad`;

    // Add workflow path relative to project root
    const relativePath = workflow.path.replace(projectRoot, '');
    command += relativePath.startsWith('/') ? ` workflow execute "${relativePath.slice(1)}"` : ` workflow execute "${relativePath}"`;

    // Add parameters if any
    if (params && Object.keys(params).length > 0) {
      const paramString = Object.entries(params)
        .map(([key, value]) => `--${key}="${value}"`)
        .join(' ');
      command += ` ${paramString}`;
    }

    // Add common flags
    command += ` --project-root="${projectRoot}" --verbose`;

    return command;
  }

  private async executeCLICommand(command: string, cwd: string, execution: WorkflowExecution): Promise<any> {
    return new Promise((resolve, reject) => {
      const { spawn } = require('node:child_process');
      const path = require('node:path');

      console.log(`🔧 Executing: ${command}`);
      console.log(`📂 In directory: ${cwd}`);

      const [cmd, ...args] = command.split(' ');
      const child = spawn(cmd, args, {
        cwd,
        shell: true,
        env: { ...process.env, FORCE_COLOR: '0' },
      });

      let stdout = '';
      let stderr = '';

      // Collect stdout
      child.stdout.on('data', (data: Buffer) => {
        const output = data.toString();
        stdout += output;
        console.log(`📤 ${output.trim()}`);

        // Update execution with real-time progress
        if (output.includes('[') && output.includes(']')) {
          this.updateExecutionProgress(execution.id, output);
        }
      });

      // Collect stderr
      child.stderr.on('data', (data: Buffer) => {
        const error = data.toString();
        stderr += error;
        console.error(`❌ ${error.trim()}`);
      });

      // Handle process completion
      child.on('close', (code: number) => {
        console.log(`🏁 Process exited with code ${code}`);

        if (code === 0) {
          resolve({
            success: true,
            output: stdout,
            error: stderr,
            exitCode: code,
          });
        } else {
          reject(new Error(`Command failed with exit code ${code}. Error: ${stderr}`));
        }
      });

      // Handle process errors
      child.on('error', (error: Error) => {
        console.error('💥 Process error:', error);
        reject(error);
      });
    });
  }

  private async updateExecutionProgress(executionId: string, output: string): Promise<void> {
    try {
      const { eventEmitter } = await import('../api/events');

      // Extract progress information from output
      const progressMatch = output.match(/\[(\d+)%\]/);
      const stepMatch = output.match(/Step: (.+)/);

      const progressData = {
        executionId,
        progress: progressMatch ? Number.parseInt(progressMatch[1]) : undefined,
        currentStep: stepMatch ? stepMatch[1] : undefined,
        output: output.trim(),
        timestamp: new Date().toISOString(),
      };

      eventEmitter.emit('workflow-progress', progressData);
    } catch (error) {
      console.error('Failed to update execution progress:', error);
    }
  }

  private async updateExecutionStatus(executionId: string, status: string, results?: any): Promise<void> {
    const db = getDatabase();

    db.prepare(
      `
      UPDATE workflow_executions 
      SET status = ?, completed_at = ?, results = ?
      WHERE id = ?
    `,
    ).run(status, status === 'running' ? null : new Date().toISOString(), JSON.stringify(results || {}), executionId);
  }

  async getExecutions(projectId: string): Promise<WorkflowExecution[]> {
    const db = getDatabase();
    const rows = db
      .prepare(
        `
      SELECT * FROM workflow_executions 
      WHERE project_id = ? 
      ORDER BY started_at DESC
    `,
      )
      .all(projectId) as WorkflowExecutionRecord[];

    return rows.map((row) => ({
      id: row.id,
      projectId: row.project_id,
      workflowId: row.workflow_id,
      status: row.status as any,
      startedAt: row.started_at || '',
      completedAt: row.completed_at || undefined,
      params: {},
      results: row.results ? JSON.parse(row.results) : undefined,
    }));
  }
}
