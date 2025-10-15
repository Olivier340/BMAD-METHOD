import { prisma } from '../database/prisma';
import { Project, WorkflowExecution, AgentConfiguration, IDEConnection, EventLog } from '@prisma/client';

export class DatabaseService {
  async getProjects(): Promise<Project[]> {
    return await prisma.project.findMany({
      include: {
        workflows: true,
        agents: true,
        ideConnections: true,
        events: true,
      },
    });
  }

  async getProject(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        workflows: true,
        agents: true,
        ideConnections: true,
        events: true,
      },
    });
  }

  async getProjectByPath(path: string): Promise<Project | null> {
    return await prisma.project.findUnique({
      where: { path },
      include: {
        workflows: true,
        agents: true,
        ideConnections: true,
        events: true,
      },
    });
  }

  async createProject(data: {
    name: string;
    path: string;
    config?: string;
    manifest?: string;
    modules?: string;
    status?: string;
  }): Promise<Project> {
    return await prisma.project.create({
      data: {
        name: data.name,
        path: data.path,
        config: data.config || '{}',
        manifest: data.manifest || '{}',
        modules: data.modules || '[]',
        status: data.status || 'active',
      },
    });
  }

  async updateProject(id: string, data: Partial<Project>): Promise<Project> {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }

  async deleteProject(id: string): Promise<Project> {
    return await prisma.project.delete({
      where: { id },
    });
  }

  // Workflow Executions
  async getWorkflowExecutions(projectId: string): Promise<WorkflowExecution[]> {
    return await prisma.workflowExecution.findMany({
      where: { projectId },
      orderBy: { startedAt: 'desc' },
    });
  }

  async createWorkflowExecution(data: {
    projectId: string;
    workflowId: string;
    workflowName: string;
    status: string;
    parameters?: string;
    results?: string;
    startedAt?: Date;
    completedAt?: Date;
    durationMs?: number;
  }): Promise<WorkflowExecution> {
    return await prisma.workflowExecution.create({
      data,
    });
  }

  async updateWorkflowExecution(id: string, data: Partial<WorkflowExecution>): Promise<WorkflowExecution> {
    return await prisma.workflowExecution.update({
      where: { id },
      data,
    });
  }

  // Agent Configurations
  async getAgentConfigurations(projectId: string): Promise<AgentConfiguration[]> {
    return await prisma.agentConfiguration.findMany({
      where: { projectId },
      orderBy: { usageCount: 'desc' },
    });
  }

  async createAgentConfiguration(data: {
    projectId: string;
    agentId: string;
    agentName: string;
    config?: string;
    isEnabled?: boolean;
  }): Promise<AgentConfiguration> {
    return await prisma.agentConfiguration.create({
      data,
    });
  }

  // IDE Connections
  async getIDEConnections(projectId: string): Promise<IDEConnection[]> {
    return await prisma.iDEConnection.findMany({
      where: { projectId },
      orderBy: { lastHeartbeat: 'desc' },
    });
  }

  async createIDEConnection(data: {
    projectId: string;
    ideType: string;
    connectionConfig?: string;
    isConnected?: boolean;
    connectionStatus?: string;
  }): Promise<IDEConnection> {
    return await prisma.iDEConnection.create({
      data,
    });
  }

  async updateIDEConnection(id: string, data: Partial<IDEConnection>): Promise<IDEConnection> {
    return await prisma.iDEConnection.update({
      where: { id },
      data,
    });
  }

  // Event Logs
  async getEventLogs(projectId: string, limit?: number): Promise<EventLog[]> {
    return await prisma.eventLog.findMany({
      where: { projectId },
      orderBy: { timestamp: 'desc' },
      take: limit || 100,
    });
  }

  async createEventLog(data: { projectId: string; eventType: string; eventData?: string; source: string }): Promise<EventLog> {
    return await prisma.eventLog.create({
      data,
    });
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Database maintenance
  async cleanupOldData(daysToKeep: number = 30): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    // Clean old event logs
    await prisma.eventLog.deleteMany({
      where: {
        timestamp: {
          lt: cutoffDate,
        },
      },
    });

    // Clean old workflow executions
    await prisma.workflowExecution.deleteMany({
      where: {
        startedAt: {
          lt: cutoffDate,
        },
      },
    });
  }
}
