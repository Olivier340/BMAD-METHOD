export interface IDEAdapter {
    name: string;
    type: 'cursor' | 'claude-code' | 'gemini-cli' | 'vscode';
    isAvailable(): Promise<boolean>;
    sendContext(context: any): Promise<void>;
    receiveEvents(): Promise<void>;
    executeCommand(command: string, params?: any): Promise<any>;
}
export interface IDEIntegrationEvent {
    type: 'context-update' | 'command-execution' | 'status-change' | 'error';
    source: string;
    data: any;
    timestamp: string;
}
export declare class IDEIntegrationHub {
    private adapters;
    private eventListeners;
    registerAdapter(adapter: IDEAdapter): void;
    unregisterAdapter(name: string): void;
    getAvailableIDEs(): Promise<string[]>;
    broadcastContext(context: any): Promise<void>;
    executeOnIDE(ideName: string, command: string, params?: any): Promise<any>;
    emitEvent(event: IDEIntegrationEvent): void;
    onEvent(eventType: string, listener: Function): void;
    offEvent(eventType: string, listener: Function): void;
    initializeAllAdapters(): Promise<void>;
    getAdapter(name: string): IDEAdapter | undefined;
    getAllAdapters(): IDEAdapter[];
    shutdown(): Promise<void>;
}
export declare function getIDEHub(): IDEIntegrationHub;
//# sourceMappingURL=IDEIntegrationHub.d.ts.map