import { BaseIDEConnector } from './BaseIDEConnector';
import WebSocket from 'ws';
import { IDEConnectionConfig } from '../IDEIntegrationHub';

interface CursorMessage {
  type: 'context' | 'command' | 'response' | 'error' | 'heartbeat';
  data: any;
  id?: string;
}

export class CursorConnector extends BaseIDEConnector {
  readonly type = 'cursor';
  readonly name = 'Cursor AI';
  readonly description = 'Integrated development environment with AI assistance';

  readonly capabilities = {
    agents: true,
    workflows: true,
    contextSync: true,
    fileSync: true,
    realTime: true,
    commandExecution: true,
  };

  private ws: WebSocket | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  private get defaultConfig(): IDEConnectionConfig {
    return {
      host: 'localhost',
      port: 8080,
      workspace: process.cwd(),
      syncInterval: 5000,
      autoConnect: true,
    };
  }

  protected async doConnect(): Promise<void> {
    const config = { ...this.defaultConfig, ...this.config };
    const wsUrl = `ws://${config.host}:${config.port}/bmad`;

    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(wsUrl);

        this.ws.on('open', () => {
          console.log(`🔗 Connected to Cursor IDE at ${wsUrl}`);
          this.reconnectAttempts = 0;
          this.startHeartbeat();
          resolve();
        });

        this.ws.on('message', (data) => {
          try {
            const message: CursorMessage = JSON.parse(data.toString());
            this.handleIncomingMessage(message);
          } catch (error) {
            console.warn('Failed to parse Cursor message:', error);
          }
        });

        this.ws.on('error', (error) => {
          console.error('Cursor WebSocket error:', error);
          reject(error);
        });

        this.ws.on('close', () => {
          console.log('🔌 Cursor WebSocket connection closed');
          this.stopHeartbeat();
          this.handleDisconnection();
        });

        // Timeout for connection
        setTimeout(() => {
          if (this.ws?.readyState !== WebSocket.OPEN) {
            reject(new Error('Connection timeout'));
          }
        }, 10_000);
      } catch (error) {
        reject(error);
      }
    });
  }

  protected async doDisconnect(): Promise<void> {
    this.stopHeartbeat();

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  protected async checkAvailability(): Promise<boolean> {
    try {
      // Try to connect to Cursor's WebSocket endpoint
      const config = { ...this.defaultConfig, ...this.config };
      const wsUrl = `ws://${config.host}:${config.port}/bmad`;

      return new Promise((resolve) => {
        const testWs = new WebSocket(wsUrl);

        const timeout = setTimeout(() => {
          testWs.close();
          resolve(false);
        }, 3000);

        testWs.on('open', () => {
          clearTimeout(timeout);
          testWs.close();
          resolve(true);
        });

        testWs.on('error', () => {
          clearTimeout(timeout);
          resolve(false);
        });
      });
    } catch {
      return false;
    }
  }

  protected async doExecuteCommand(command: string, args?: any): Promise<any> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }

    const messageId = this.generateMessageId();

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Command timeout'));
      }, 30_000);

      // Store the resolver for when we get the response
      (this as any)[`response_${messageId}`] = (result: any) => {
        clearTimeout(timeout);
        delete (this as any)[`response_${messageId}`];
        resolve(result);
      };

      // Send command
      const message: CursorMessage = {
        type: 'command',
        data: { command, args },
        id: messageId,
      };

      this.ws.send(JSON.stringify(message));
    });
  }

  protected async doSendContext(context: any): Promise<void> {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }

    const message: CursorMessage = {
      type: 'context',
      data: context,
    };

    this.ws.send(JSON.stringify(message));
  }

  protected async doReceiveContext(): Promise<any> {
    // For Cursor, context is received via WebSocket events
    // This method would be used to request current context
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }

    return this.doExecuteCommand('get-context');
  }

  private handleIncomingMessage(message: CursorMessage): void {
    switch (message.type) {
      case 'response': {
        this.handleResponse(message);
        break;
      }
      case 'context': {
        this.handleContextUpdate(message);
        break;
      }
      case 'heartbeat': {
        // Respond to heartbeat
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: 'heartbeat', data: { status: 'ok' } }));
        }
        break;
      }
      default: {
        console.log('Received unknown message type from Cursor:', message.type);
      }
    }
  }

  private handleResponse(message: CursorMessage): void {
    const resolver = (this as any)[`response_${message.id}`];
    if (resolver) {
      if (message.data.error) {
        resolver(Promise.reject(new Error(message.data.error)));
      } else {
        resolver(message.data.result);
      }
    }
  }

  private handleContextUpdate(message: CursorMessage): void {
    this.emitEvent({
      type: 'context-update',
      source: this.type,
      data: message.data,
      timestamp: new Date().toISOString(),
    });
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'heartbeat', data: { timestamp: new Date().toISOString() } }));
      }
    }, 30_000); // Heartbeat every 30 seconds
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private handleDisconnection(): void {
    this.isConnected = false;

    // Attempt to reconnect if auto-reconnect is enabled
    if (this.config?.autoConnect && this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`🔄 Attempting to reconnect to Cursor (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

      setTimeout(async () => {
        try {
          await this.connect(this.config);
        } catch (error) {
          console.warn('Reconnection failed:', error);
        }
      }, 5000 * this.reconnectAttempts); // Exponential backoff
    }
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
}
