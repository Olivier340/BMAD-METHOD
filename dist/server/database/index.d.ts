import Database from 'better-sqlite3';
export interface ProjectRecord {
    id: string;
    name: string;
    path: string;
    config: string;
    created_at: string;
    updated_at: string;
}
export interface WorkflowExecutionRecord {
    id: string;
    project_id: string;
    workflow_id: string;
    status: string;
    started_at: string | null;
    completed_at: string | null;
    results: string | null;
}
export interface AgentSessionRecord {
    id: string;
    project_id: string;
    agent_id: string;
    status: string;
    started_at: string | null;
    ended_at: string | null;
    logs: string | null;
}
export declare function getDatabase(): Database.Database;
export declare function initDatabase(): Promise<Database.Database>;
export declare function closeDatabase(): void;
//# sourceMappingURL=index.d.ts.map