import { Project, WorkflowExecution, AgentConfiguration, IDEConnection, EventLog } from '@prisma/client';
export declare class DatabaseService {
    getProjects(): Promise<Project[]>;
    getProject(id: string): Promise<Project | null>;
    getProjectByPath(path: string): Promise<Project | null>;
    createProject(data: {
        name: string;
        path: string;
        config?: string;
        manifest?: string;
        modules?: string;
        status?: string;
    }): Promise<Project>;
    updateProject(id: string, data: Partial<Project>): Promise<Project>;
    deleteProject(id: string): Promise<Project>;
    getWorkflowExecutions(projectId: string): Promise<WorkflowExecution[]>;
    createWorkflowExecution(data: {
        projectId: string;
        workflowId: string;
        workflowName: string;
        status: string;
        parameters?: string;
        results?: string;
        startedAt?: Date;
        completedAt?: Date;
        durationMs?: number;
    }): Promise<WorkflowExecution>;
    updateWorkflowExecution(id: string, data: Partial<WorkflowExecution>): Promise<WorkflowExecution>;
    getAgentConfigurations(projectId: string): Promise<AgentConfiguration[]>;
    createAgentConfiguration(data: {
        projectId: string;
        agentId: string;
        agentName: string;
        config?: string;
        isEnabled?: boolean;
    }): Promise<AgentConfiguration>;
    getIDEConnections(projectId: string): Promise<IDEConnection[]>;
    createIDEConnection(data: {
        projectId: string;
        ideType: string;
        connectionConfig?: string;
        isConnected?: boolean;
        connectionStatus?: string;
    }): Promise<IDEConnection>;
    updateIDEConnection(id: string, data: Partial<IDEConnection>): Promise<IDEConnection>;
    getEventLogs(projectId: string, limit?: number): Promise<EventLog[]>;
    createEventLog(data: {
        projectId: string;
        eventType: string;
        eventData?: string;
        source: string;
    }): Promise<EventLog>;
    healthCheck(): Promise<{
        status: string;
        timestamp: string;
    }>;
    cleanupOldData(daysToKeep?: number): Promise<void>;
}
//# sourceMappingURL=DatabaseService.d.ts.map