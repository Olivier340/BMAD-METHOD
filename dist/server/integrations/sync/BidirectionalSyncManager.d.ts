import { EventEmitter } from 'events';
import { IDESyncData } from '../IDEIntegrationHub';
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
export declare class BidirectionalSyncManager extends EventEmitter {
    private projectService;
    private workflowService;
    private agentService;
    private syncQueue;
    private isProcessing;
    private conflictResolutions;
    constructor();
    enqueueSync(data: IDESyncData): Promise<void>;
    syncProject(projectId: string, source: string, target?: string): Promise<SyncResult>;
    syncWorkflow(workflowId: string, projectId: string, source: string, target?: string): Promise<SyncResult>;
    syncAgent(agentId: string, projectId: string, source: string, target?: string): Promise<SyncResult>;
    syncContext(contextData: any, projectId: string, source: string, target?: string): Promise<SyncResult>;
    private processSyncQueue;
    private processSyncData;
    private syncProjectData;
    private syncWorkflowData;
    private syncAgentData;
    private syncContextData;
    private syncFileData;
    resolveConflict(conflictId: string, resolution: 'local' | 'remote' | 'merge', mergedData?: any): Promise<void>;
    getSyncQueue(): IDESyncData[];
    getConflictResolutions(): Map<string, 'local' | 'remote' | 'merge'>;
    clearSyncQueue(): void;
    private delay;
    onSyncEnqueued(listener: (data: IDESyncData) => void): void;
    onSyncCompleted(listener: (data: {
        syncData: IDESyncData;
        result: SyncResult;
    }) => void): void;
    offSyncEnqueued(listener: (data: IDESyncData) => void): void;
    offSyncCompleted(listener: (data: {
        syncData: IDESyncData;
        result: SyncResult;
    }) => void): void;
}
export declare function getSyncManager(): BidirectionalSyncManager;
//# sourceMappingURL=BidirectionalSyncManager.d.ts.map