import { prisma } from '../database/prisma';
export class DatabaseService {
  async getProjects() {
    return await prisma.project.findMany({
      include: {
        workflows: true,
        agents: true,
        ideConnections: true,
        events: true,
      },
    });
  }
  async getProject(id) {
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
  async getProjectByPath(path) {
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
  async createProject(data) {
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
  async updateProject(id, data) {
    return await prisma.project.update({
      where: { id },
      data,
    });
  }
  async deleteProject(id) {
    return await prisma.project.delete({
      where: { id },
    });
  }
  // Workflow Executions
  async getWorkflowExecutions(projectId) {
    return await prisma.workflowExecution.findMany({
      where: { projectId },
      orderBy: { startedAt: 'desc' },
    });
  }
  async createWorkflowExecution(data) {
    return await prisma.workflowExecution.create({
      data,
    });
  }
  async updateWorkflowExecution(id, data) {
    return await prisma.workflowExecution.update({
      where: { id },
      data,
    });
  }
  // Agent Configurations
  async getAgentConfigurations(projectId) {
    return await prisma.agentConfiguration.findMany({
      where: { projectId },
      orderBy: { usageCount: 'desc' },
    });
  }
  async createAgentConfiguration(data) {
    return await prisma.agentConfiguration.create({
      data,
    });
  }
  // IDE Connections
  async getIDEConnections(projectId) {
    return await prisma.iDEConnection.findMany({
      where: { projectId },
      orderBy: { lastHeartbeat: 'desc' },
    });
  }
  async createIDEConnection(data) {
    return await prisma.iDEConnection.create({
      data,
    });
  }
  async updateIDEConnection(id, data) {
    return await prisma.iDEConnection.update({
      where: { id },
      data,
    });
  }
  // Event Logs
  async getEventLogs(projectId, limit) {
    return await prisma.eventLog.findMany({
      where: { projectId },
      orderBy: { timestamp: 'desc' },
      take: limit || 100,
    });
  }
  async createEventLog(data) {
    return await prisma.eventLog.create({
      data,
    });
  }
  // Health check
  async healthCheck() {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }
  // Database maintenance
  async cleanupOldData(daysToKeep = 30) {
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
//# sourceMappingURL=DatabaseService.js.map
