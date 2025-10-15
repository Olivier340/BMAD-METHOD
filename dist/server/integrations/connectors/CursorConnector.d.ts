import { BaseIDEConnector } from './BaseIDEConnector';
export declare class CursorConnector extends BaseIDEConnector {
    readonly type = "cursor";
    readonly name = "Cursor AI";
    readonly description = "Integrated development environment with AI assistance";
    readonly capabilities: {
        agents: boolean;
        workflows: boolean;
        contextSync: boolean;
        fileSync: boolean;
        realTime: boolean;
        commandExecution: boolean;
    };
    private ws;
    private heartbeatInterval;
    private reconnectAttempts;
    private maxReconnectAttempts;
    private get defaultConfig();
    protected doConnect(): Promise<void>;
    protected doDisconnect(): Promise<void>;
    protected checkAvailability(): Promise<boolean>;
    protected doExecuteCommand(command: string, args?: any): Promise<any>;
    protected doSendContext(context: any): Promise<void>;
    protected doReceiveContext(): Promise<any>;
    private handleIncomingMessage;
    private handleResponse;
    private handleContextUpdate;
    private startHeartbeat;
    private stopHeartbeat;
    private handleDisconnection;
    private generateMessageId;
}
//# sourceMappingURL=CursorConnector.d.ts.map