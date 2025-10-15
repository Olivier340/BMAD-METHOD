export interface IDEAdapter {
  name: string;
  type: 'cursor' | 'claude-code' | 'gemini-cli' | 'vscode';
  isAvailable(): Promise<boolean>;
  sendContext(context: Record<string, unknown>): Promise<void>;
  receiveEvents(): Promise<void>;
  executeCommand(command: string, params?: Record<string, unknown>): Promise<Record<string, unknown>>;
}

export interface IDEIntegrationEvent {
  type: 'context-update' | 'command-execution' | 'status-change' | 'error';
  source: string;
  data: Record<string, unknown>;
  timestamp: string;
}

export class IDEIntegrationHub {
  private adapters: Map<string, IDEAdapter> = new Map();
  private eventListeners: Map<string, Function[]> = new Map();

  registerAdapter(adapter: IDEAdapter): void {
    this.adapters.set(adapter.name, adapter);
    console.log(`✅ IDE adapter registered: ${adapter.name} (${adapter.type})`);
  }

  unregisterAdapter(name: string): void {
    this.adapters.delete(name);
    console.log(`❌ IDE adapter unregistered: ${name}`);
  }

  async getAvailableIDEs(): Promise<string[]> {
    const available: string[] = [];

    for (const [name, _adapter] of this.adapters) {
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

  async broadcastContext(context: Record<string, unknown>): Promise<void> {
    const promises = [...this.adapters.values()].map((adapter) =>
      adapter.sendContext(context).catch((error) => console.warn(`Failed to send context to ${adapter.name}:`, error)),
    );

    await Promise.allSettled(promises);
  }

  async executeOnIDE(ideName: string, command: string, params?: Record<string, unknown>): Promise<Record<string, unknown>> {
    const adapter = this.adapters.get(ideName);
    if (!adapter) {
      throw new Error(`IDE adapter not found: ${ideName}`);
    }

    return await adapter.executeCommand(command, params);
  }

  emitEvent(event: IDEIntegrationEvent): void {
    const listeners = this.eventListeners.get(event.type) || [];
    for (const listener of listeners) {
      try {
        listener(event);
      } catch (error) {
        console.error('Error in event listener:', error);
      }
    }
  }

  onEvent(eventType: string, listener: Function): void {
    if (!this.eventListeners.has(eventType)) {
      this.eventListeners.set(eventType, []);
    }
    this.eventListeners.get(eventType)!.push(listener);
  }

  offEvent(eventType: string, listener: Function): void {
    const listeners = this.eventListeners.get(eventType);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  async initializeAllAdapters(): Promise<void> {
    for (const [name, _adapter] of this.adapters) {
      try {
        await adapter.receiveEvents();
        console.log(`🔗 IDE adapter initialized: ${name}`);
      } catch (error) {
        console.warn(`Failed to initialize adapter ${name}:`, error);
      }
    }
  }

  getAdapter(name: string): IDEAdapter | undefined {
    return this.adapters.get(name);
  }

  getAllAdapters(): IDEAdapter[] {
    return [...this.adapters.values()];
  }

  async shutdown(): Promise<void> {
    console.log('🛑 Shutting down IDE Integration Hub...');

    for (const [name, _adapter] of this.adapters) {
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
let ideHubInstance: IDEIntegrationHub | null = null;

export function getIDEHub(): IDEIntegrationHub {
  if (!ideHubInstance) {
    ideHubInstance = new IDEIntegrationHub();
  }
  return ideHubInstance;
}
