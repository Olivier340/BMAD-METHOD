export class BaseIDEConnector {
  config;
  eventListeners = new Map();
  isConnected = false;
  async connect(config) {
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
  async disconnect() {
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
  async isAvailable() {
    try {
      return await this.checkAvailability();
    } catch (error) {
      return false;
    }
  }
  async executeCommand(command, args) {
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
  async sendContext(context) {
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
  async receiveContext() {
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
  async getStatus() {
    return {
      type: this.type,
      status: this.isConnected ? 'connected' : 'disconnected',
      capabilities: this.capabilities,
      lastSync: new Date().toISOString(),
      config: this.config,
    };
  }
  onEvent(callback) {
    if (!this.eventListeners.has('all')) {
      this.eventListeners.set('all', []);
    }
    this.eventListeners.get('all').push(callback);
  }
  offEvent(callback) {
    const listeners = this.eventListeners.get('all');
    if (listeners) {
      const index = listeners.indexOf(callback);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
  emitEvent(event) {
    const listeners = this.eventListeners.get('all') || [];
    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    });
  }
}
//# sourceMappingURL=BaseIDEConnector.js.map
