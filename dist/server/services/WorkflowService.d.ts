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
export declare class WorkflowService {
    private projectService;
    constructor();
    discoverWorkflows(projectPath: string): Promise<WorkflowMetadata[]>;
    private generateWorkflowId;
    private extractModule;
    private extractPhase;
    getWorkflowsByPhase(projectPath: string, phase?: string): Promise<WorkflowMetadata[]>;
    getAvailablePhases(projectPath: string): Promise<string[]>;
    getWorkflowById(projectPath: string, workflowId: string): Promise<WorkflowMetadata | null>;
    validateWorkflowPrerequisites(workflow: WorkflowMetadata, projectPath: string): Promise<{
        valid: boolean;
        missing: string[];
    }>;
    private extractVariables;
    executeWorkflow(projectId: string, workflowId: string, params: any): Promise<WorkflowExecution>;
    private saveExecution;
    private executeWorkflowAsync;
    private buildCLICommand;
    private executeCLICommand;
    private updateExecutionProgress;
    private updateExecutionStatus;
    getExecutions(projectId: string): Promise<WorkflowExecution[]>;
}
//# sourceMappingURL=WorkflowService.d.ts.map