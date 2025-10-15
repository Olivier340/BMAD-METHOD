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
export declare class AgentService {
    private projectService;
    constructor();
    discoverAgents(projectPath: string): Promise<AgentMetadata[]>;
    activateAgent(agentId: string, projectId: string, context?: any): Promise<AgentSession>;
    deactivateAgent(sessionId: string): Promise<void>;
    getActiveAgents(projectId: string): Promise<AgentMetadata[]>;
    getAgentSessions(projectId: string): Promise<AgentSession[]>;
    updateAgentStatus(agentId: string, status: Partial<AgentStatus>): Promise<void>;
    configureAgent(agentId: string, projectId: string | null, userId: string | null, settings: any, preferences: any): Promise<AgentConfiguration>;
    getAgentConfiguration(agentId: string, projectId?: string, userId?: string): Promise<AgentConfiguration | null>;
    reloadAgent(agentId: string): Promise<void>;
    getAgentById(projectPath: string, agentId: string): Promise<AgentMetadata | null>;
    private generateAgentId;
    private extractModule;
    validateAgent(agent: AgentMetadata): Promise<{
        valid: boolean;
        errors: string[];
    }>;
    getAgentStatistics(projectId: string): Promise<any>;
    private getProjectPath;
}
//# sourceMappingURL=AgentService.d.ts.map