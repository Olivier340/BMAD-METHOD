import { BaseIDEConnector } from './BaseIDEConnector';
import axios, { AxiosInstance } from 'axios';
import { IDEConnectionConfig } from '../IDEIntegrationHub';

interface VSCodeMessage {
  type: 'context' | 'command' | 'response' | 'error';
  data: any;
  id?: string;
}

export class VSCodeConnector extends BaseIDEConnector {
  readonly type = 'vscode';
  readonly name = 'Visual Studio Code';
  readonly description = 'Microsoft Visual Studio Code IDE';

  readonly capabilities = {
    agents: true,
    workflows: true,
    contextSync: true,
    fileSync: false, // VS Code doesn't support file sync directly
    realTime: false, // VS Code uses polling-based sync
    commandExecution: true,
  };

  private httpClient: AxiosInstance | null = null;
  private syncInterval: NodeJS.Timeout | null = null;

  private get defaultConfig(): IDEConnectionConfig {
    return {
      host: 'localhost',
      port: 3001,
      apiKey: '',
      workspace: process.cwd(),
      syncInterval: 10_000, // Poll every 10 seconds
      autoConnect: false,
    };
  }

  protected async doConnect(): Promise<void> {
    const config = { ...this.defaultConfig, ...this.config };

    // Create HTTP client for REST API communication
    this.httpClient = axios.create({
      baseURL: `http://${config.host}:${config.port}`,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 10_000,
    });

    // Test connection
    try {
      await this.httpClient.get('/health');
      console.log(`🔗 Connected to VS Code extension at ${config.host}:${config.port}`);

      // Start periodic sync if configured
      if (config.syncInterval && config.syncInterval > 0) {
        this.startPeriodicSync();
      }
    } catch (error) {
      throw new Error(`Failed to connect to VS Code extension: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  protected async doDisconnect(): Promise<void> {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }

    if (this.httpClient) {
      this.httpClient = null;
    }
  }

  protected async checkAvailability(): Promise<boolean> {
    try {
      const config = { ...this.defaultConfig, ...this.config };
      const response = await axios.get(`http://${config.host}:${config.port}/health`, {
        timeout: 3000,
        validateStatus: () => true, // Accept any status code for availability check
      });
      return response.status < 500; // Consider available if not server error
    } catch {
      return false;
    }
  }

  protected async doExecuteCommand(command: string, args?: any): Promise<any> {
    if (!this.httpClient) {
      throw new Error('Not connected to VS Code');
    }

    try {
      const response = await this.httpClient.post('/commands', {
        command,
        args,
      });

      return response.data.result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`VS Code command failed: ${error.response.data.error || error.message}`);
      }
      throw new Error(`Command execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  protected async doSendContext(context: any): Promise<void> {
    if (!this.httpClient) {
      throw new Error('Not connected to VS Code');
    }

    try {
      await this.httpClient.post('/context', {
        context,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Context sync failed: ${error.response.data.error || error.message}`);
      }
      throw new Error(`Context send failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  protected async doReceiveContext(): Promise<any> {
    if (!this.httpClient) {
      throw new Error('Not connected to VS Code');
    }

    try {
      const response = await this.httpClient.get('/context');
      return response.data.context;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(`Context receive failed: ${error.response.data.error || error.message}`);
      }
      throw new Error(`Context receive failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private startPeriodicSync(): void {
    const config = { ...this.defaultConfig, ...this.config };

    this.syncInterval = setInterval(async () => {
      try {
        if (this.httpClient) {
          // Get current context from VS Code
          const context = await this.doReceiveContext();

          // Emit context update event
          this.emitEvent({
            type: 'context-update',
            source: this.type,
            data: { context, source: 'vscode' },
            timestamp: new Date().toISOString(),
          });
        }
      } catch (error) {
        console.warn('Periodic sync failed:', error);
      }
    }, config.syncInterval);
  }

  async getWorkspaceInfo(): Promise<any> {
    if (!this.httpClient) {
      throw new Error('Not connected to VS Code');
    }

    try {
      const response = await this.httpClient.get('/workspace');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get workspace info: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getActiveFile(): Promise<any> {
    if (!this.httpClient) {
      throw new Error('Not connected to VS Code');
    }

    try {
      const response = await this.httpClient.get('/active-file');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get active file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async openFile(filePath: string): Promise<void> {
    return this.doExecuteCommand('open-file', { filePath });
  }

  async createFile(filePath: string, content: string): Promise<void> {
    return this.doExecuteCommand('create-file', { filePath, content });
  }

  async updateFile(filePath: string, content: string): Promise<void> {
    return this.doExecuteCommand('update-file', { filePath, content });
  }

  async deleteFile(filePath: string): Promise<void> {
    return this.doExecuteCommand('delete-file', { filePath });
  }
}
