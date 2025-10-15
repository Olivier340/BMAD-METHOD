import { EventType, EventData, SSEServer } from './sse-server';
export interface EventFilter {
    eventTypes?: EventType[];
    sources?: string[];
    userIds?: string[];
    sessionIds?: string[];
    metadata?: Record<string, any>;
}
export interface EventSubscription {
    id: string;
    clientId: string;
    filter: EventFilter;
    callback?: (eventData: EventData) => void;
}
export declare class EventPublisherService {
    private eventEmitter;
    private sseServer?;
    private subscriptions;
    private eventHistory;
    private maxHistorySize;
    constructor();
    setSSEServer(sseServer: SSEServer): void;
    private setupEventListeners;
    publish(eventData: EventData): void;
    publishTo(eventData: EventData, clientIds: string[]): void;
    subscribe(subscription: EventSubscription): void;
    unsubscribe(subscriptionId: string): void;
    private matchesFilter;
    private addToHistory;
    getEventHistory(filter?: EventFilter, limit?: number): EventData[];
    getStats(): {
        subscriptions: number;
        historySize: number;
        sseConnections?: number;
    };
    publishProjectEvent(action: 'created' | 'updated' | 'deleted', projectData: any, metadata?: any): void;
    publishWorkflowEvent(action: 'started' | 'completed' | 'failed', workflowData: any, metadata?: any): void;
    publishAgentEvent(action: 'executed' | 'completed' | 'error', agentData: any, metadata?: any): void;
    publishSystemEvent(status: string, message: string, metadata?: any): void;
    publishNotification(type: 'info' | 'success' | 'warning' | 'error', message: string, metadata?: any): void;
    publishIDEEvent(action: 'connection' | 'disconnection' | 'file:changed', ideData: any, metadata?: any): void;
    private generateEventId;
    private generateSubscriptionId;
}
export declare const eventPublisher: EventPublisherService;
export default eventPublisher;
//# sourceMappingURL=event-publisher.d.ts.map