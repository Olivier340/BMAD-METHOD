import { BaseIDEConnector } from './BaseIDEConnector';
export declare class VSCodeConnector extends BaseIDEConnector {
    readonly type = "vscode";
    readonly name = "Visual Studio Code";
    readonly description = "Microsoft Visual Studio Code IDE";
    readonly capabilities: {
        agents: boolean;
        workflows: boolean;
        contextSync: boolean;
        fileSync: boolean;
        realTime: boolean;
        commandExecution: boolean;
    };
    private httpClient;
    private syncInterval;
    private get defaultConfig();
    protected doConnect(): Promise<void>;
    protected doDisconnect(): Promise<void>;
    protected checkAvailability(): Promise<boolean>;
    protected doExecuteCommand(command: string, args?: any): Promise<any>;
    protected doSendContext(context: any): Promise<void>;
    protected doReceiveContext(): Promise<any>;
    private startPeriodicSync;
    getWorkspaceInfo(): Promise<any>;
    getActiveFile(): Promise<any>;
    openFile(filePath: string): Promise<void>;
    createFile(filePath: string, content: string): Promise<void>;
    updateFile(filePath: string, content: string): Promise<void>;
    deleteFile(filePath: string): Promise<void>;
}
//# sourceMappingURL=VSCodeConnector.d.ts.map