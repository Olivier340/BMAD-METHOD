export interface ReactiveState {
    projects: {
        list: any[];
        activeProject: any | null;
        loading: boolean;
        error: string | null;
    };
    workflows: {
        executions: any[];
        currentExecution: any | null;
        loading: boolean;
        error: string | null;
    };
    agents: {
        activeAgents: any[];
        sessions: any[];
        loading: boolean;
        error: string | null;
    };
    system: {
        notifications: any[];
        status: 'online' | 'offline' | 'error';
        connectionCount: number;
        lastUpdate: Date | null;
    };
}
export interface StateSubscription {
    id: string;
    selector: (state: ReactiveState) => any;
    callback: (value: any) => void;
}
export declare class ReactiveStore {
    private state;
    private eventEmitter;
    private subscriptions;
    private isConnected;
    constructor();
    private connectToEvents;
    private setupEventListeners;
    private handleSystemEvent;
    private handleSystemNotification;
    private handleProjectEvent;
    private handleWorkflowEvent;
    private handleAgentEvent;
    private handleIDEEvent;
    private updateSystemStatus;
    private removeNotification;
    private updateState;
    getState(): ReactiveState;
    getStateSection<K extends keyof ReactiveState>(section: K): ReactiveState[K];
    subscribe(subscriptionId: string, selector: (state: ReactiveState) => any, callback: (value: any) => void): void;
    unsubscribe(subscriptionId: string): void;
    on(event: string, callback: (...args: any[]) => void): void;
    off(event: string, callback: (...args: any[]) => void): void;
    updateStateSection<K extends keyof ReactiveState>(section: K, updates: Partial<ReactiveState[K]>): void;
    addNotification(type: 'info' | 'success' | 'warning' | 'error', message: string): void;
    getStats(): {
        isConnected: boolean;
        subscriptions: number;
        systemStatus: string;
        connectionCount: number;
    };
}
export declare const reactiveStore: ReactiveStore;
export default reactiveStore;
//# sourceMappingURL=reactive-store.d.ts.map