export declare enum ClientEventType {
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
export interface ClientEventData {
    id: string;
    type: ClientEventType;
    timestamp: Date;
    source: string;
    data: any;
    metadata?: {
        userId?: string;
        sessionId?: string;
        correlationId?: string;
    };
}
export interface ClientEventFilter {
    eventTypes?: ClientEventType[];
    sources?: string[];
    userIds?: string[];
    sessionIds?: string[];
    metadata?: Record<string, any>;
}
export interface SSEConnectionOptions {
    url?: string;
    clientId?: string;
    retryInterval?: number;
    maxRetries?: number;
    heartbeatInterval?: number;
    timeout?: number;
}
export interface EventHandler {
    (eventData: ClientEventData): void;
}
export declare enum ClientInternalEvent {
    CONNECTED = "connected",
    DISCONNECTED = "disconnected",
    ERROR = "error",
    RETRYING = "retrying",
    HEARTBEAT = "heartbeat"
}
export declare class EventClient {
    private eventSource;
    private eventEmitter;
    private options;
    private isConnected;
    private retryCount;
    private heartbeatInterval?;
    private reconnectTimeout?;
    private eventHandlers;
    constructor(options?: SSEConnectionOptions);
    connect(): Promise<void>;
    disconnect(): void;
    subscribe(eventType: ClientEventType, handler: EventHandler): void;
    unsubscribe(eventType: ClientEventType, handler?: EventHandler): void;
    onInternalEvent(event: ClientInternalEvent, handler: () => void): void;
    offInternalEvent(event: ClientInternalEvent, handler: () => void): void;
    isClientConnected(): boolean;
    getClientId(): string;
    getStats(): {
        isConnected: boolean;
        retryCount: number;
        subscribedEvents: number;
        clientId: string;
    };
    private setupSSEEventHandlers;
    private handleSSEMessage;
    private emitEvent;
    private handleConnected;
    private handleError;
    private scheduleReconnect;
    private attemptReconnect;
    private startHeartbeat;
    private stopHeartbeat;
    private clearReconnectTimeout;
    private setupInternalEventHandlers;
    private getDefaultURL;
    private generateClientId;
}
export declare const eventClient: EventClient;
export default eventClient;
//# sourceMappingURL=event-client.d.ts.map