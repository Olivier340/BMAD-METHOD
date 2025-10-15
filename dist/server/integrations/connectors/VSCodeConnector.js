import { BaseIDEConnector } from './BaseIDEConnector';
import axios from 'axios';
export class VSCodeConnector extends BaseIDEConnector {
  type = 'vscode';
  name = 'Visual Studio Code';
  description = 'Microsoft Visual Studio Code IDE';
  capabilities = {
    agents: true,
    workflows: true,
    contextSync: true,
    fileSync: false, // VS Code doesn't support file sync directly
    realTime: false, // VS Code uses polling-based sync
    commandExecution: true,
  };
  httpClient = null;
  syncInterval = null;
  get defaultConfig() {
    return {
      host: 'localhost',
      port: 3001,
      apiKey: '',
      workspace: process.cwd(),
      syncInterval: 10000, // Poll every 10 seconds
      autoConnect: false,
    };
  }
  async doConnect() {
    const config = { ...this.defaultConfig, ...this.config };
    // Create HTTP client for REST API communication
    this.httpClient = axios.create({
      baseURL: `http://${config.host}:${config.port}`,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
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
  async doDisconnect() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    if (this.httpClient) {
      this.httpClient = null;
    }
  }
  async checkAvailability() {
    try {
      const config = { ...this.defaultConfig, ...this.config };
      const response = await axios.get(`http://${config.host}:${config.port}/health`, {
        timeout: 3000,
        validateStatus: () => true, // Accept any status code for availability check
      });
      return response.status < 500; // Consider available if not server error
    } catch (error) {
      return false;
    }
  }
  async doExecuteCommand(command, args) {
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
  async doSendContext(context) {
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
  async doReceiveContext() {
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
  startPeriodicSync() {
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
  async getWorkspaceInfo() {
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
  async getActiveFile() {
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
  async openFile(filePath) {
    return this.doExecuteCommand('open-file', { filePath });
  }
  async createFile(filePath, content) {
    return this.doExecuteCommand('create-file', { filePath, content });
  }
  async updateFile(filePath, content) {
    return this.doExecuteCommand('update-file', { filePath, content });
  }
  async deleteFile(filePath) {
    return this.doExecuteCommand('delete-file', { filePath });
  }
}
//# sourceMappingURL=VSCodeConnector.js.map
