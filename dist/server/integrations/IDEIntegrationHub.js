export class IDEIntegrationHub {
  adapters = new Map();
  eventListeners = new Map();
  registerAdapter(adapter) {
    this.adapters.set(adapter.name, adapter);
    console.log(`✅ IDE adapter registered: ${adapter.name} (${adapter.type})`);
  }
  unregisterAdapter(name) {
    this.adapters.delete(name);
    console.log(`❌ IDE adapter unregistered: ${name}`);
  }
  async getAvailableIDEs() {
    const available = [];
    for (const [name, adapter] of this.adapters) {
      try {
        if (await adapter.isAvailable()) {
          available.push(name);
        }
      } catch (error) {
        console.warn(`Failed to check availability for ${name}:`, error);
      }
    }
    return available;
  }
  async broadcastContext(context) {
    const promises = Array.from(this.adapters.values()).map((adapter) =>
      adapter.sendContext(context).catch((error) => console.warn(`Failed to send context to ${adapter.name}:`, error)),
    );
    await Promise.allSettled(promises);
  }
  async executeOnIDE(ideName, command, params) {
    const adapter = this.adapters.get(ideName);
    if (!adapter) {
      throw new Error(`IDE adapter not found: ${ideName}`);
    }
    return await adapter.executeCommand(command, params);
  }
  emitEvent(event) {
    const listeners = this.eventListeners.get(event.type) || [];
    listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    });
  }
  onEvent(eventType, listener) {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType).push(listener);
  }
  offEvent(eventType, listener) {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }
  async initializeAllAdapters() {
    for (const [name, adapter] of this.adapters) {
      try {
        await adapter.receiveEvents();
        console.log(`🔗 IDE adapter initialized: ${name}`);
      } catch (error) {
        console.warn(`Failed to initialize adapter ${name}:`, error);
      }
    }
  }
  getAdapter(name) {
    return this.adapters.get(name);
  }
  getAllAdapters() {
    return Array.from(this.adapters.values());
  }
  async shutdown() {
    console.log('🛑 Shutting down IDE Integration Hub...');
    for (const [name, adapter] of this.adapters) {
      try {
        // Add cleanup logic for each adapter if needed
        console.log(`🔌 Disconnecting adapter: ${name}`);
      } catch (error) {
        console.warn(`Error disconnecting adapter ${name}:`, error);
      }
    }
    this.adapters.clear();
    this.eventListeners.clear();
  }
}
// Singleton instance
let ideHubInstance = null;
export function getIDEHub() {
  if (!ideHubInstance) {
    ideHubInstance = new IDEIntegrationHub();
  }
  return ideHubInstance;
}
//# sourceMappingURL=IDEIntegrationHub.js.map
