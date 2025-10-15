import { IDEAdapter, IDEIntegrationEvent, IDEConnectionConfig } from '../IDEIntegrationHub';

export abstract class BaseIDEConnector implements IDEAdapter {
  protected config?: IDEConnectionConfig;
  protected eventListeners: Map<string, Function[]> = new Map();
  protected isConnected = false;

  abstract readonly type: string;
  abstract readonly name: string;
  abstract readonly description: string;
  abstract readonly capabilities: Record<string, unknown>;

  async connect(config?: IDEConnectionConfig): Promise<void> {
    this.config = config;
    try {
      await this.doConnect();
      this.isConnected = true;
      this.emitEvent({
        type: 'status-change',
        source: this.type,
        data: { status: 'connected' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.isConnected = false;
      this.emitEvent({
        type: 'error',
        source: this.type,
        data: { error: error instanceof Error ? error.message : 'Connection failed' },
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.doDisconnect();
      this.isConnected = false;
      this.emitEvent({
        type: 'status-change',
        source: this.type,
        data: { status: 'disconnected' },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.warn(`Error disconnecting from ${this.type}:`, error);
    }
  }

  async isAvailable(): Promise<boolean> {
    try {
      return await this.checkAvailability();
    } catch {
      return false;
    }
  }

  async executeCommand(command: string, args?: Record<string, unknown>): Promise<Record<string, unknown>> {
    if (!this.isConnected) {
      throw new Error(`Not connected to ${this.type}`);
    }

    try {
      const result = await this.doExecuteCommand(command, args);
      this.emitEvent({
        type: 'command-execution',
        source: this.type,
        data: { command, args, result },
        timestamp: new Date().toISOString(),
      });
      return result;
    } catch (error) {
      this.emitEvent({
        type: 'error',
        source: this.type,
        data: { command, error: error instanceof Error ? error.message : 'Command execution failed' },
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  async sendContext(context: Record<string, unknown>): Promise<void> {
    if (!this.isConnected) {
      throw new Error(`Not connected to ${this.type}`);
    }

    try {
      await this.doSendContext(context);
      this.emitEvent({
        type: 'context-update',
        source: this.type,
        data: { context },
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      this.emitEvent({
        type: 'error',
        source: this.type,
        data: { context, error: error instanceof Error ? error.message : 'Context send failed' },
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  async receiveContext(): Promise<Record<string, unknown>> {
    if (!this.isConnected) {
      throw new Error(`Not connected to ${this.type}`);
    }

    try {
      return await this.doReceiveContext();
    } catch (error) {
      this.emitEvent({
        type: 'error',
        source: this.type,
        data: { error: error instanceof Error ? error.message : 'Context receive failed' },
        timestamp: new Date().toISOString(),
      });
      throw error;
    }
  }

  async getStatus(): Promise<Record<string, unknown>> {
    return {
      type: this.type,
      status: this.isConnected ? 'connected' : 'disconnected',
      capabilities: this.capabilities,
      lastSync: new Date().toISOString(),
      config: this.config,
    };
  }

  onEvent(callback: (event: IDEIntegrationEvent) => void): void {
    if (!this.eventListeners.has('all')) {
      this.eventListeners.set('all', []);
    }
    this.eventListeners.get('all')!.push(callback);
  }

  offEvent(callback: (event: IDEIntegrationEvent) => void): void {
    const listeners = this.eventListeners.get('all');
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  protected emitEvent(event: IDEIntegrationEvent): void {
    const listeners = this.eventListeners.get('all') || [];
    for (const listener of listeners) {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    }
  }

  protected abstract doConnect(): Promise<void>;
  protected abstract doDisconnect(): Promise<void>;
  protected abstract checkAvailability(): Promise<boolean>;
  protected abstract doExecuteCommand(command: string, args?: Record<string, unknown>): Promise<Record<string, unknown>>;
  protected abstract doSendContext(context: Record<string, unknown>): Promise<void>;
  protected abstract doReceiveContext(): Promise<Record<string, unknown>>;
}
