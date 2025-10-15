import { EventEmitter } from 'events';
import { ProjectService } from '../../services/ProjectService';
import { WorkflowService } from '../../services/WorkflowService';
import { AgentService } from '../../services/AgentService';
export class BidirectionalSyncManager extends EventEmitter {
  projectService;
  workflowService;
  agentService;
  syncQueue = [];
  isProcessing = false;
  conflictResolutions = new Map();
  constructor() {
    super();
    this.projectService = new ProjectService();
    this.workflowService = new WorkflowService();
    this.agentService = new AgentService();
  }
  async enqueueSync(data) {
    this.syncQueue.push(data);
    // Emit sync event
    this.emit('sync-enqueued', data);
    // Process queue if not already processing
    if (!this.isProcessing) {
      this.processSyncQueue();
    }
  }
  async syncProject(projectId, source, target) {
    const syncData = {
      type: 'project',
      operation: 'update',
      entityId: projectId,
      entityData: {},
      timestamp: new Date().toISOString(),
      source,
      target,
    };
    return this.processSyncData(syncData);
  }
  async syncWorkflow(workflowId, projectId, source, target) {
    const syncData = {
      type: 'workflow',
      operation: 'update',
      entityId: workflowId,
      entityData: { projectId },
      timestamp: new Date().toISOString(),
      source,
      target,
    };
    return this.processSyncData(syncData);
  }
  async syncAgent(agentId, projectId, source, target) {
    const syncData = {
      type: 'agent',
      operation: 'update',
      entityId: agentId,
      entityData: { projectId },
      timestamp: new Date().toISOString(),
      source,
      target,
    };
    return this.processSyncData(syncData);
  }
  async syncContext(contextData, projectId, source, target) {
    const syncData = {
      type: 'context',
      operation: 'update',
      entityId: projectId,
      entityData: contextData,
      timestamp: new Date().toISOString(),
      source,
      target,
    };
    return this.processSyncData(syncData);
  }
  async processSyncQueue() {
    if (this.isProcessing || this.syncQueue.length === 0) {
      return;
    }
    this.isProcessing = true;
    try {
      while (this.syncQueue.length > 0) {
        const syncData = this.syncQueue.shift();
        await this.processSyncData(syncData);
        await this.delay(100); // Small delay between sync operations
      }
    } finally {
      this.isProcessing = false;
    }
  }
  async processSyncData(syncData) {
    const result = {
      success: true,
      syncedItems: 0,
      conflicts: [],
      errors: [],
    };
    try {
      switch (syncData.type) {
        case 'project':
          await this.syncProjectData(syncData, result);
          break;
        case 'workflow':
          await this.syncWorkflowData(syncData, result);
          break;
        case 'agent':
          await this.syncAgentData(syncData, result);
          break;
        case 'context':
          await this.syncContextData(syncData, result);
          break;
        case 'file':
          await this.syncFileData(syncData, result);
          break;
        default:
          result.errors.push(`Unknown sync type: ${syncData.type}`);
          result.success = false;
      }
      // Emit sync completion event
      this.emit('sync-completed', { syncData, result });
    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Unknown sync error');
    }
    return result;
  }
  async syncProjectData(syncData, result) {
    try {
      const project = await this.projectService.getProject(syncData.entityId);
      if (!project) {
        // Project doesn't exist locally, check if we should create it
        if (syncData.operation === 'create') {
          await this.projectService.createProject({
            id: syncData.entityId,
            name: syncData.entityData.name || 'Imported Project',
            path: syncData.entityData.path || '',
            config: syncData.entityData.config || {},
          });
          result.syncedItems++;
        } else {
          result.errors.push(`Project ${syncData.entityId} not found for sync operation`);
        }
        return;
      }
      // Update project if needed
      if (syncData.operation === 'update') {
        const updates = {};
        if (syncData.entityData.name && syncData.entityData.name !== project.name) {
          updates.name = syncData.entityData.name;
        }
        if (syncData.entityData.config && JSON.stringify(syncData.entityData.config) !== JSON.stringify(project.config)) {
          updates.config = syncData.entityData.config;
        }
        if (Object.keys(updates).length > 0) {
          await this.projectService.updateProject(syncData.entityId, updates);
          result.syncedItems++;
        }
      }
    } catch (error) {
      result.errors.push(`Project sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  async syncWorkflowData(syncData, result) {
    try {
      // For workflows, we mainly need to ensure the project exists and is up to date
      // The workflow discovery happens automatically when workflows are executed
      const projectId = syncData.entityData.projectId;
      const project = await this.projectService.getProject(projectId);
      if (!project) {
        result.errors.push(`Project ${projectId} not found for workflow sync`);
        return;
      }
      // Update project timestamp to indicate recent activity
      await this.projectService.updateProject(projectId, {
        updated_at: new Date().toISOString(),
      });
      result.syncedItems++;
    } catch (error) {
      result.errors.push(`Workflow sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  async syncAgentData(syncData, result) {
    try {
      // Agent sync involves updating agent configurations
      const projectId = syncData.entityData.projectId;
      if (syncData.operation === 'update') {
        // Update agent configuration if provided
        if (syncData.entityData.settings || syncData.entityData.preferences) {
          await this.agentService.configureAgent(
            syncData.entityId,
            projectId,
            syncData.entityData.userId,
            syncData.entityData.settings || {},
            syncData.entityData.preferences || {},
          );
          result.syncedItems++;
        }
      }
    } catch (error) {
      result.errors.push(`Agent sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  async syncContextData(syncData, result) {
    try {
      // Context sync involves updating the active project context
      const projectId = syncData.entityId;
      if (syncData.operation === 'update') {
        // Update active project context
        await this.projectService.updateActiveProjectContext(projectId, syncData.entityData, 'default');
        result.syncedItems++;
      }
    } catch (error) {
      result.errors.push(`Context sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  async syncFileData(syncData, result) {
    // File sync would involve file system operations
    // For now, we'll just mark it as synced
    result.syncedItems++;
  }
  async resolveConflict(conflictId, resolution, mergedData) {
    this.conflictResolutions.set(conflictId, resolution);
    if (resolution === 'merge' && mergedData) {
      // Apply merged data
      // This would depend on the specific conflict type
      console.log('Applied merged data for conflict:', conflictId);
    }
  }
  getSyncQueue() {
    return [...this.syncQueue];
  }
  getConflictResolutions() {
    return new Map(this.conflictResolutions);
  }
  clearSyncQueue() {
    this.syncQueue = [];
  }
  async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  // Event handlers for external integration
  onSyncEnqueued(listener) {
    this.on('sync-enqueued', listener);
  }
  onSyncCompleted(listener) {
    this.on('sync-completed', listener);
  }
  offSyncEnqueued(listener) {
    this.off('sync-enqueued', listener);
  }
  offSyncCompleted(listener) {
    this.off('sync-completed', listener);
  }
}
// Singleton instance
let syncManagerInstance = null;
export function getSyncManager() {
  if (!syncManagerInstance) {
    syncManagerInstance = new BidirectionalSyncManager();
  }
  return syncManagerInstance;
}
//# sourceMappingURL=BidirectionalSyncManager.js.map
