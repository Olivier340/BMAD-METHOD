import fs from 'fs-extra';
import path from 'node:path';
import yaml from 'js-yaml';
import { glob } from 'glob';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database/index';
import { ProjectService } from './ProjectService';
import { eventPublisher } from '../../events/event-publisher';

export interface AgentMetadata {
  id: string;
  name: string;
  title: string;
  icon: string;
  module: string;
  path: string;
  config: any;
  menu: any[];
  status?: AgentStatus;
  capabilities?: AgentCapabilities;
  dependencies?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface AgentStatus {
  state: 'active' | 'inactive' | 'loading' | 'error';
  lastSeen?: string;
  error?: string;
  version?: string;
}

export interface AgentCapabilities {
  workflows: boolean;
  tools: boolean;
  contextSync: boolean;
  fileSync: boolean;
  realTime: boolean;
}

export interface AgentSession {
  id: string;
  agentId: string;
  projectId: string;
  status: 'active' | 'inactive';
  startedAt: string;
  endedAt?: string;
  context?: any;
  logs?: string[];
}

export interface AgentConfiguration {
  id: string;
  agentId: string;
  projectId?: string;
  userId?: string;
  settings: any;
  preferences: any;
  created_at: string;
  updated_at: string;
}

export class AgentService {
  private projectService: ProjectService;

  constructor() {
    this.projectService = new ProjectService();
  }

  async discoverAgents(projectPath: string): Promise<AgentMetadata[]> {
    const agents: AgentMetadata[] = [];

    try {
      const pattern = path.join(projectPath, 'bmad/*/agents/*.agent.yaml');
      const files = await glob(pattern);

      for (const file of files) {
        try {
          const content = yaml.load(await fs.readFile(file, 'utf8')) as any;
          const relativePath = path.relative(path.join(projectPath, 'bmad'), file);

          const agentConfig = content.agent || content;

          // Extract capabilities from config or use defaults
          const capabilities: AgentCapabilities = {
            workflows: agentConfig.capabilities?.workflows ?? true,
            tools: agentConfig.capabilities?.tools ?? false,
            contextSync: agentConfig.capabilities?.contextSync ?? true,
            fileSync: agentConfig.capabilities?.fileSync ?? false,
            realTime: agentConfig.capabilities?.realTime ?? false,
          };

          // Extract dependencies
          const dependencies = agentConfig.dependencies || [];

          const agent: AgentMetadata = {
            id: this.generateAgentId(relativePath),
            name: agentConfig.metadata?.name || 'Unnamed Agent',
            title: agentConfig.metadata?.title || 'Agent',
            icon: agentConfig.metadata?.icon || '🤖',
            module: this.extractModule(relativePath),
            path: file,
            config: agentConfig,
            menu: agentConfig.menu || [],
            status: { state: 'inactive' },
            capabilities,
            dependencies,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          agents.push(agent);
        } catch (error) {
          console.warn(`Failed to parse agent ${file}:`, error);
        }
      }
    } catch (error) {
      console.warn('Failed to discover agents:', error);
    }

    return agents;
  }

  async activateAgent(agentId: string, projectId: string, context?: any): Promise<AgentSession> {
    const db = getDatabase();

    // Check if agent exists
    const project = await this.projectService.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const agents = await this.discoverAgents(project.path);
    const agent = agents.find((a) => a.id === agentId);
    if (!agent) {
      throw new Error('Agent not found');
    }

    // Check dependencies
    if (agent.dependencies && agent.dependencies.length > 0) {
      for (const depId of agent.dependencies) {
        const depAgent = agents.find((a) => a.id === depId);
        if (depAgent && depAgent.status?.state !== 'active') {
          throw new Error(`Dependency agent ${depId} is not active`);
        }
      }
    }

    // Create session
    const session: AgentSession = {
      id: uuidv4(),
      agentId,
      projectId,
      status: 'active',
      startedAt: new Date().toISOString(),
      context,
      logs: [],
    };

    // Save session to database
    db.prepare(
      `
      INSERT INTO agent_sessions (id, agent_id, project_id, status, started_at, context)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(session.id, session.agentId, session.projectId, session.status, session.startedAt, JSON.stringify(session.context || {}));

    // Update agent status
    await this.updateAgentStatus(agentId, { state: 'active' });

    // Publish agent activation event
    eventPublisher.publishAgentEvent('executed', {
      sessionId: session.id,
      agentId,
      agentName: agent.name,
      projectId,
      action: 'activated',
    });

    return session;
  }

  async deactivateAgent(sessionId: string): Promise<void> {
    const db = getDatabase();

    // Get session info before updating for the event
    const sessionInfo = db.prepare('SELECT agent_id, project_id FROM agent_sessions WHERE id = ?').get(sessionId) as any;

    // Update session
    db.prepare(
      `
      UPDATE agent_sessions
      SET status = 'inactive', ended_at = ?
      WHERE id = ?
    `,
    ).run(new Date().toISOString(), sessionId);

    // Find agent ID from session and publish event
    if (sessionInfo) {
      const agents = await this.discoverAgents(await this.getProjectPath(sessionInfo.project_id));
      const agent = agents.find((a) => a.id === sessionInfo.agent_id);

      await this.updateAgentStatus(sessionInfo.agent_id, { state: 'inactive' });

      // Publish agent deactivation event
      if (agent) {
        eventPublisher.publishAgentEvent('completed', {
          sessionId,
          agentId: sessionInfo.agent_id,
          agentName: agent.name,
          projectId: sessionInfo.project_id,
          action: 'deactivated',
        });
      }
    }
  }

  async getActiveAgents(projectId: string): Promise<AgentMetadata[]> {
    const db = getDatabase();

    const sessions = db
      .prepare(
        `
      SELECT agent_id FROM agent_sessions
      WHERE project_id = ? AND status = 'active'
    `,
      )
      .all(projectId) as { agent_id: string }[];

    const project = await this.projectService.getProject(projectId);
    if (!project) {
      return [];
    }

    const allAgents = await this.discoverAgents(project.path);
    const activeAgentIds = new Set(sessions.map((s) => s.agent_id));

    return allAgents.filter((agent) => activeAgentIds.has(agent.id));
  }

  async getAgentSessions(projectId: string): Promise<AgentSession[]> {
    const db = getDatabase();

    const rows = db
      .prepare(
        `
      SELECT * FROM agent_sessions
      WHERE project_id = ?
      ORDER BY started_at DESC
    `,
      )
      .all(projectId) as any[];

    return rows.map((row) => ({
      id: row.id,
      agentId: row.agent_id,
      projectId: row.project_id,
      status: row.status,
      startedAt: row.started_at,
      endedAt: row.ended_at,
      context: JSON.parse(row.context || '{}'),
      logs: JSON.parse(row.logs || '[]'),
    }));
  }

  async updateAgentStatus(agentId: string, status: Partial<AgentStatus>): Promise<void> {
    const db = getDatabase();

    // For now, we'll store status in memory or could add an agent_status table
    // This is a simplified implementation
    console.log(`Agent ${agentId} status updated:`, status);
  }

  async configureAgent(
    agentId: string,
    projectId: string | null,
    userId: string | null,
    settings: any,
    preferences: any,
  ): Promise<AgentConfiguration> {
    const db = getDatabase();

    const config: AgentConfiguration = {
      id: uuidv4(),
      agentId,
      projectId: projectId || undefined,
      userId: userId || undefined,
      settings,
      preferences,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.prepare(
      `
      INSERT INTO agent_configurations (id, agent_id, project_id, user_id, settings, preferences, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      config.id,
      config.agentId,
      config.projectId || null,
      config.userId || null,
      JSON.stringify(config.settings),
      JSON.stringify(config.preferences),
      config.created_at,
      config.updated_at,
    );

    return config;
  }

  async getAgentConfiguration(agentId: string, projectId?: string, userId?: string): Promise<AgentConfiguration | null> {
    const db = getDatabase();

    let query = 'SELECT * FROM agent_configurations WHERE agent_id = ?';
    const params: any[] = [agentId];

    if (projectId) {
      query += ' AND project_id = ?';
      params.push(projectId);
    } else {
      query += ' AND project_id IS NULL';
    }

    if (userId) {
      query += ' AND user_id = ?';
      params.push(userId);
    } else {
      query += ' AND user_id IS NULL';
    }

    const row = db.prepare(query).get(...params) as any;

    if (!row) {
      return null;
    }

    return {
      id: row.id,
      agentId: row.agent_id,
      projectId: row.project_id || undefined,
      userId: row.user_id || undefined,
      settings: JSON.parse(row.settings || '{}'),
      preferences: JSON.parse(row.preferences || '{}'),
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }

  async reloadAgent(agentId: string): Promise<void> {
    // Implementation for hot reloading agents
    // This would involve unloading and reloading the agent module
    await this.updateAgentStatus(agentId, { state: 'loading' });

    // Simulate reload process
    setTimeout(async () => {
      await this.updateAgentStatus(agentId, { state: 'active' });
    }, 1000);
  }

  async getAgentById(projectPath: string, agentId: string): Promise<AgentMetadata | null> {
    const agents = await this.discoverAgents(projectPath);
    return agents.find((a) => a.id === agentId) || null;
  }

  private generateAgentId(relativePath: string): string {
    return relativePath
      .replace(/\.agent\.yaml$/, '')
      .replaceAll('/', '-')
      .toLowerCase();
  }

  private extractModule(relativePath: string): string {
    const parts = relativePath.split('/');
    return parts[0] || 'unknown';
  }

  async validateAgent(agent: AgentMetadata): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    // Validate required fields
    if (!agent.name) errors.push('Agent name is required');
    if (!agent.title) errors.push('Agent title is required');
    if (!agent.path) errors.push('Agent path is required');

    // Validate capabilities structure
    if (agent.capabilities) {
      const requiredCapabilities = ['workflows', 'tools', 'contextSync', 'fileSync', 'realTime'];
      for (const cap of requiredCapabilities) {
        if (typeof agent.capabilities[cap as keyof AgentCapabilities] !== 'boolean') {
          errors.push(`Capability ${cap} must be a boolean`);
        }
      }
    }

    // Validate menu structure
    if (agent.menu && !Array.isArray(agent.menu)) {
      errors.push('Agent menu must be an array');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  async getAgentStatistics(projectId: string): Promise<any> {
    const db = getDatabase();

    const totalAgents = db
      .prepare(
        `
      SELECT COUNT(DISTINCT agent_id) as count
      FROM agent_sessions
      WHERE project_id = ?
    `,
      )
      .get(projectId) as { count: number };

    const activeAgents = db
      .prepare(
        `
      SELECT COUNT(DISTINCT agent_id) as count
      FROM agent_sessions
      WHERE project_id = ? AND status = 'active'
    `,
      )
      .get(projectId) as { count: number };

    return {
      totalAgents: totalAgents.count,
      activeAgents: activeAgents.count,
    };
  }

  private async getProjectPath(projectId: string): Promise<string> {
    const project = await this.projectService.getProject(projectId);
    return project?.path || '';
  }
}
