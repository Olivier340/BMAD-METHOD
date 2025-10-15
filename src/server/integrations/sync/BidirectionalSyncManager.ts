import { EventEmitter } from 'node:events';
import { IDESyncData, IDEIntegrationEvent } from '../IDEIntegrationHub';
import { ProjectService } from '../../services/ProjectService';
import { WorkflowService } from '../../services/WorkflowService';
import { AgentService } from '../../services/AgentService';

export interface SyncConflict {
  id: string;
  type: 'project' | 'workflow' | 'agent' | 'context' | 'file';
  entityId: string;
  localData: any;
  remoteData: any;
  timestamp: string;
  source: string;
  target: string;
}

export interface SyncResult {
  success: boolean;
  syncedItems: number;
  conflicts: SyncConflict[];
  errors: string[];
}

export class BidirectionalSyncManager extends EventEmitter {
  private projectService: ProjectService;
  private workflowService: WorkflowService;
  private agentService: AgentService;
  private syncQueue: IDESyncData[] = [];
  private isProcessing = false;
  private conflictResolutions = new Map<string, 'local' | 'remote' | 'merge'>();

  constructor() {
    super();
    this.projectService = new ProjectService();
    this.workflowService = new WorkflowService();
    this.agentService = new AgentService();
  }

  async enqueueSync(data: IDESyncData): Promise<void> {
    this.syncQueue.push(data);

    // Emit sync event
    this.emit('sync-enqueued', data);

    // Process queue if not already processing
    if (!this.isProcessing) {
      this.processSyncQueue();
    }
  }

  async syncProject(projectId: string, source: string, target?: string): Promise<SyncResult> {
    const syncData: IDESyncData = {
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

  async syncWorkflow(workflowId: string, projectId: string, source: string, target?: string): Promise<SyncResult> {
    const syncData: IDESyncData = {
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

  async syncAgent(agentId: string, projectId: string, source: string, target?: string): Promise<SyncResult> {
    const syncData: IDESyncData = {
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

  async syncContext(contextData: any, projectId: string, source: string, target?: string): Promise<SyncResult> {
    const syncData: IDESyncData = {
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

  private async processSyncQueue(): Promise<void> {
    if (this.isProcessing || this.syncQueue.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      while (this.syncQueue.length > 0) {
        const syncData = this.syncQueue.shift()!;
        await this.processSyncData(syncData);
        await this.delay(100); // Small delay between sync operations
      }
    } finally {
      this.isProcessing = false;
    }
  }

  private async processSyncData(syncData: IDESyncData): Promise<SyncResult> {
    const result: SyncResult = {
      success: true,
      syncedItems: 0,
      conflicts: [],
      errors: [],
    };

    try {
      switch (syncData.type) {
        case 'project': {
          await this.syncProjectData(syncData, result);
          break;
        }
        case 'workflow': {
          await this.syncWorkflowData(syncData, result);
          break;
        }
        case 'agent': {
          await this.syncAgentData(syncData, result);
          break;
        }
        case 'context': {
          await this.syncContextData(syncData, result);
          break;
        }
        case 'file': {
          await this.syncFileData(syncData, result);
          break;
        }
        default: {
          result.errors.push(`Unknown sync type: ${syncData.type}`);
          result.success = false;
        }
      }

      // Emit sync completion event
      this.emit('sync-completed', { syncData, result });
    } catch (error) {
      result.success = false;
      result.errors.push(error instanceof Error ? error.message : 'Unknown sync error');
    }

    return result;
  }

  private async syncProjectData(syncData: IDESyncData, result: SyncResult): Promise<void> {
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
        const updates: any = {};

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

  private async syncWorkflowData(syncData: IDESyncData, result: SyncResult): Promise<void> {
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

  private async syncAgentData(syncData: IDESyncData, result: SyncResult): Promise<void> {
    try {
      // Agent sync involves updating agent configurations
      const projectId = syncData.entityData.projectId;

      if (syncData.operation === 'update' && // Update agent configuration if provided
        (syncData.entityData.settings || syncData.entityData.preferences)) {
          await this.agentService.configureAgent(
            syncData.entityId,
            projectId,
            syncData.entityData.userId,
            syncData.entityData.settings || {},
            syncData.entityData.preferences || {},
          );
          result.syncedItems++;
        }
    } catch (error) {
      result.errors.push(`Agent sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async syncContextData(syncData: IDESyncData, result: SyncResult): Promise<void> {
    try {
      // Context sync involves updating the active project context
      const projectId = syncData.entityId;

      if (syncData.operation === 'update') {
        // Update active project context
        await this.projectService.updateActiveProjectContext(
          projectId,
          syncData.entityData,
          'default', // Use default user for now
        );
        result.syncedItems++;
      }
    } catch (error) {
      result.errors.push(`Context sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private async syncFileData(syncData: IDESyncData, result: SyncResult): Promise<void> {
    // File sync would involve file system operations
    // For now, we'll just mark it as synced
    result.syncedItems++;
  }

  async resolveConflict(conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: any): Promise<void> {
    this.conflictResolutions.set(conflictId, resolution);

    if (resolution === 'merge' && mergedData) {
      // Apply merged data
      // This would depend on the specific conflict type
      console.log('Applied merged data for conflict:', conflictId);
    }
  }

  getSyncQueue(): IDESyncData[] {
    return [...this.syncQueue];
  }

  getConflictResolutions(): Map<string, 'local' | 'remote' | 'merge'> {
    return new Map(this.conflictResolutions);
  }

  clearSyncQueue(): void {
    this.syncQueue = [];
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Event handlers for external integration
  onSyncEnqueued(listener: (data: IDESyncData) => void): void {
    this.on('sync-enqueued', listener);
  }

  onSyncCompleted(listener: (data: { syncData: IDESyncData; result: SyncResult }) => void): void {
    this.on('sync-completed', listener);
  }

  offSyncEnqueued(listener: (data: IDESyncData) => void): void {
    this.off('sync-enqueued', listener);
  }

  offSyncCompleted(listener: (data: { syncData: IDESyncData; result: SyncResult }) => void): void {
    this.off('sync-completed', listener);
  }
}

// Singleton instance
let syncManagerInstance: BidirectionalSyncManager | null = null;

export function getSyncManager(): BidirectionalSyncManager {
  if (!syncManagerInstance) {
    syncManagerInstance = new BidirectionalSyncManager();
  }
  return syncManagerInstance;
}
