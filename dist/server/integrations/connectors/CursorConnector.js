import { BaseIDEConnector } from './BaseIDEConnector';
import WebSocket from 'ws';
export class CursorConnector extends BaseIDEConnector {
  type = 'cursor';
  name = 'Cursor AI';
  description = 'Integrated development environment with AI assistance';
  capabilities = {
    agents: true,
    workflows: true,
    contextSync: true,
    fileSync: true,
    realTime: true,
    commandExecution: true,
  };
  ws = null;
  heartbeatInterval = null;
  reconnectAttempts = 0;
  maxReconnectAttempts = 5;
  get defaultConfig() {
    return {
      host: 'localhost',
      port: 8080,
      workspace: process.cwd(),
      syncInterval: 5000,
      autoConnect: true,
    };
  }
  async doConnect() {
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
            const message = JSON.parse(data.toString());
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
        }, 10000);
      } catch (error) {
        reject(error);
      }
    });
  }
  async doDisconnect() {
    this.stopHeartbeat();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
  async checkAvailability() {
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
    } catch (error) {
      return false;
    }
  }
  async doExecuteCommand(command, args) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }
    const messageId = this.generateMessageId();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Command timeout'));
      }, 30000);
      // Store the resolver for when we get the response
      this[`response_${messageId}`] = (result) => {
        clearTimeout(timeout);
        delete this[`response_${messageId}`];
        resolve(result);
      };
      // Send command
      const message = {
        type: 'command',
        data: { command, args },
        id: messageId,
      };
      this.ws.send(JSON.stringify(message));
    });
  }
  async doSendContext(context) {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }
    const message = {
      type: 'context',
      data: context,
    };
    this.ws.send(JSON.stringify(message));
  }
  async doReceiveContext() {
    // For Cursor, context is received via WebSocket events
    // This method would be used to request current context
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Not connected to Cursor');
    }
    return this.doExecuteCommand('get-context');
  }
  handleIncomingMessage(message) {
    switch (message.type) {
      case 'response':
        this.handleResponse(message);
        break;
      case 'context':
        this.handleContextUpdate(message);
        break;
      case 'heartbeat':
        // Respond to heartbeat
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify({ type: 'heartbeat', data: { status: 'ok' } }));
        }
        break;
      default:
        console.log('Received unknown message type from Cursor:', message.type);
    }
  }
  handleResponse(message) {
    const resolver = this[`response_${message.id}`];
    if (resolver) {
      if (message.data.error) {
        resolver(Promise.reject(new Error(message.data.error)));
      } else {
        resolver(message.data.result);
      }
    }
  }
  handleContextUpdate(message) {
    this.emitEvent({
      type: 'context-update',
      source: this.type,
      data: message.data,
      timestamp: new Date().toISOString(),
    });
  }
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: 'heartbeat', data: { timestamp: new Date().toISOString() } }));
      }
    }, 30000); // Heartbeat every 30 seconds
  }
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }
  handleDisconnection() {
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
  generateMessageId() {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
//# sourceMappingURL=CursorConnector.js.map
