import { IDEAdapter, IDEIntegrationEvent, IDEConnectionConfig } from '../IDEIntegrationHub';
export declare abstract class BaseIDEConnector implements IDEAdapter {
    protected config?: IDEConnectionConfig;
    protected eventListeners: Map<string, Function[]>;
    protected isConnected: boolean;
    abstract readonly type: string;
    abstract readonly name: string;
    abstract readonly description: string;
    abstract readonly capabilities: any;
    connect(config?: IDEConnectionConfig): Promise<void>;
    disconnect(): Promise<void>;
    isAvailable(): Promise<boolean>;
    executeCommand(command: string, args?: any): Promise<any>;
    sendContext(context: any): Promise<void>;
    receiveContext(): Promise<any>;
    getStatus(): Promise<any>;
    onEvent(callback: (event: IDEIntegrationEvent) => void): void;
    offEvent(callback: (event: IDEIntegrationEvent) => void): void;
    protected emitEvent(event: IDEIntegrationEvent): void;
    protected abstract doConnect(): Promise<void>;
    protected abstract doDisconnect(): Promise<void>;
    protected abstract checkAvailability(): Promise<boolean>;
    protected abstract doExecuteCommand(command: string, args?: any): Promise<any>;
    protected abstract doSendContext(context: any): Promise<void>;
    protected abstract doReceiveContext(): Promise<any>;
}
//# sourceMappingURL=BaseIDEConnector.d.ts.map