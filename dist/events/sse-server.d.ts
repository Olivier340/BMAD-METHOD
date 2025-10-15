import express from 'express';
export declare enum EventType {
    PROJECT_CREATED = "project:created",
    PROJECT_UPDATED = "project:updated",
    PROJECT_DELETED = "project:deleted",
    WORKFLOW_STARTED = "workflow:started",
    WORKFLOW_COMPLETED = "workflow:completed",
    WORKFLOW_FAILED = "workflow:failed",
    AGENT_EXECUTED = "agent:executed",
    AGENT_COMPLETED = "agent:completed",
    AGENT_ERROR = "agent:error",
    SYSTEM_STATUS = "system:status",
    SYSTEM_NOTIFICATION = "system:notification",
    IDE_CONNECTION = "ide:connection",
    IDE_DISCONNECTION = "ide:disconnection",
    IDE_FILE_CHANGED = "ide:file:changed"
}
export interface EventData {
    id: string;
    type: EventType;
    timestamp: Date;
    source: string;
    data: any;
    metadata?: {
        userId?: string;
        sessionId?: string;
        correlationId?: string;
    };
}
export declare class SSEServer {
    private connectionManager;
    private server;
    constructor(server: express.Application);
    private setupRoutes;
    private handleSSEConnection;
    private handleEventPublishing;
    publishEvent(eventData: EventData): void;
    publishEventTo(eventData: EventData, clientIds: string[]): void;
    getConnectionCount(): number;
    closeAllConnections(): void;
    private generateClientId;
    private generateEventId;
}
export default SSEServer;
//# sourceMappingURL=sse-server.d.ts.map