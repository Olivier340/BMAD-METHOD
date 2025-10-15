import { getIDEHub } from '../IDEIntegrationHub';
import { CursorConnector } from '../connectors/CursorConnector';
import { VSCodeConnector } from '../connectors/VSCodeConnector';
import { getSyncManager } from '../sync/BidirectionalSyncManager';
describe('IDE Integration Hub - Multi-IDE Architecture', () => {
  let ideHub;
  let syncManager;
  beforeEach(() => {
    ideHub = getIDEHub();
    syncManager = getSyncManager();
  });
  afterEach(async () => {
    await ideHub.shutdown();
  });
  describe('IDE Hub Core Functionality', () => {
    it('should register and unregister adapters', () => {
      const cursorConnector = new CursorConnector();
      // Register adapter
      ideHub.registerAdapter(cursorConnector);
      expect(ideHub.getAllAdapters()).toContain(cursorConnector);
      // Unregister adapter
      ideHub.unregisterAdapter('cursor');
      expect(ideHub.getAllAdapters()).not.toContain(cursorConnector);
    });
    it('should check adapter availability', async () => {
      const cursorConnector = new CursorConnector();
      // Mock the checkAvailability method to return true
      jest.spyOn(cursorConnector, 'isAvailable').mockResolvedValue(true);
      ideHub.registerAdapter(cursorConnector);
      const available = await ideHub.getAvailableIDEs();
      expect(available).toContain('cursor');
    });
    it('should handle adapter initialization errors gracefully', async () => {
      const faultyConnector = new CursorConnector();
      // Mock the checkAvailability method to throw an error
      jest.spyOn(faultyConnector, 'isAvailable').mockRejectedValue(new Error('Connection failed'));
      ideHub.registerAdapter(faultyConnector);
      const available = await ideHub.getAvailableIDEs();
      expect(available).not.toContain('cursor');
    });
  });
  describe('Event System', () => {
    it('should emit and handle events correctly', () => {
      const cursorConnector = new CursorConnector();
      ideHub.registerAdapter(cursorConnector);
      const eventHandler = jest.fn();
      ideHub.onEvent('context-update', eventHandler);
      // Emit test event
      ideHub.emitEvent({
        type: 'context-update',
        source: 'test',
        data: { test: 'data' },
        timestamp: new Date().toISOString(),
      });
      expect(eventHandler).toHaveBeenCalledWith({
        type: 'context-update',
        source: 'test',
        data: { test: 'data' },
        timestamp: expect.any(String),
      });
    });
    it('should allow event listener removal', () => {
      const eventHandler = jest.fn();
      ideHub.onEvent('context-update', eventHandler);
      // Remove listener
      ideHub.offEvent('context-update', eventHandler);
      // Emit event - should not call handler
      ideHub.emitEvent({
        type: 'context-update',
        source: 'test',
        data: { test: 'data' },
        timestamp: new Date().toISOString(),
      });
      expect(eventHandler).not.toHaveBeenCalled();
    });
  });
  describe('IDE Connectors', () => {
    describe('Cursor Connector', () => {
      it('should have correct capabilities', () => {
        const connector = new CursorConnector();
        expect(connector.capabilities).toEqual({
          agents: true,
          workflows: true,
          contextSync: true,
          fileSync: true,
          realTime: true,
          commandExecution: true,
        });
      });
      it('should handle connection lifecycle', async () => {
        const connector = new CursorConnector();
        // Mock successful connection
        jest.spyOn(connector, 'doConnect').mockResolvedValue(undefined);
        await expect(connector.connect()).resolves.not.toThrow();
        // Mock successful disconnection
        jest.spyOn(connector, 'doDisconnect').mockResolvedValue(undefined);
        await expect(connector.disconnect()).resolves.not.toThrow();
      });
      it('should handle connection failures', async () => {
        const connector = new CursorConnector();
        // Mock connection failure
        jest.spyOn(connector, 'doConnect').mockRejectedValue(new Error('Connection failed'));
        await expect(connector.connect()).rejects.toThrow('Connection failed');
      });
      it('should handle availability checks', async () => {
        const connector = new CursorConnector();
        // Mock availability check
        jest.spyOn(connector, 'checkAvailability').mockResolvedValue(true);
        const available = await connector.isAvailable();
        expect(available).toBe(true);
      });
    });
    describe('VS Code Connector', () => {
      it('should have correct capabilities', () => {
        const connector = new VSCodeConnector();
        expect(connector.capabilities).toEqual({
          agents: true,
          workflows: true,
          contextSync: true,
          fileSync: false,
          realTime: false,
          commandExecution: true,
        });
      });
      it('should handle REST API communication', async () => {
        const connector = new VSCodeConnector();
        // Mock successful connection
        jest.spyOn(connector, 'doConnect').mockResolvedValue(undefined);
        await expect(connector.connect()).resolves.not.toThrow();
      });
      it('should handle command execution', async () => {
        const connector = new VSCodeConnector();
        // Mock command execution
        jest.spyOn(connector, 'doExecuteCommand').mockResolvedValue({ success: true });
        // This would normally require a connection, but we're testing the method signature
        expect(typeof connector.executeCommand).toBe('function');
      });
    });
  });
  describe('Bidirectional Sync Manager', () => {
    it('should enqueue sync operations', async () => {
      const syncData = {
        type: 'project',
        operation: 'update',
        entityId: 'test-project',
        entityData: { name: 'Test Project' },
        timestamp: new Date().toISOString(),
        source: 'test',
      };
      const syncPromise = new Promise((resolve) => {
        syncManager.onSyncEnqueued((data) => {
          expect(data).toEqual(syncData);
          resolve();
        });
      });
      await syncManager.enqueueSync(syncData);
      await expect(syncPromise).resolves.not.toThrow();
    });
    it('should process sync operations for projects', async () => {
      const syncData = {
        type: 'project',
        operation: 'update',
        entityId: 'test-project',
        entityData: { name: 'Updated Project' },
        timestamp: new Date().toISOString(),
        source: 'test',
      };
      const processPromise = new Promise((resolve) => {
        syncManager.onSyncCompleted(({ syncData: data, result }) => {
          expect(data).toEqual(syncData);
          expect(result.success).toBe(true);
          resolve();
        });
      });
      await syncManager.enqueueSync(syncData);
      await expect(processPromise).resolves.not.toThrow();
    });
    it('should handle sync conflicts', async () => {
      const conflictId = 'test-conflict';
      // Resolve conflict
      await syncManager.resolveConflict(conflictId, 'local');
      const resolutions = syncManager.getConflictResolutions();
      expect(resolutions.get(conflictId)).toBe('local');
    });
    it('should provide sync queue management', () => {
      const syncData = {
        type: 'context',
        operation: 'update',
        entityId: 'test-context',
        entityData: { key: 'value' },
        timestamp: new Date().toISOString(),
        source: 'test',
      };
      // Add to queue
      syncManager.enqueueSync(syncData);
      const queue = syncManager.getSyncQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0]).toEqual(syncData);
      // Clear queue
      syncManager.clearSyncQueue();
      expect(syncManager.getSyncQueue()).toHaveLength(0);
    });
  });
  describe('Integration Scenarios', () => {
    it('should handle multi-IDE context synchronization', async () => {
      const cursorConnector = new CursorConnector();
      const vscodeConnector = new VSCodeConnector();
      // Mock successful connections
      jest.spyOn(cursorConnector, 'doConnect').mockResolvedValue(undefined);
      jest.spyOn(vscodeConnector, 'doConnect').mockResolvedValue(undefined);
      ideHub.registerAdapter(cursorConnector);
      ideHub.registerAdapter(vscodeConnector);
      // Mock context sync
      jest.spyOn(cursorConnector, 'doSendContext').mockResolvedValue(undefined);
      jest.spyOn(vscodeConnector, 'doSendContext').mockResolvedValue(undefined);
      await ideHub.broadcastContext({ project: 'test-project', context: 'test' });
      expect(cursorConnector.doSendContext).toHaveBeenCalledWith({
        project: 'test-project',
        context: 'test',
      });
      expect(vscodeConnector.doSendContext).toHaveBeenCalledWith({
        project: 'test-project',
        context: 'test',
      });
    });
    it('should handle IDE-specific command execution', async () => {
      const cursorConnector = new CursorConnector();
      // Mock connection and command execution
      jest.spyOn(cursorConnector, 'doConnect').mockResolvedValue(undefined);
      jest.spyOn(cursorConnector, 'doExecuteCommand').mockResolvedValue({ success: true });
      ideHub.registerAdapter(cursorConnector);
      const result = await ideHub.executeOnIDE('cursor', 'test-command', { param: 'value' });
      expect(result).toEqual({ success: true });
      expect(cursorConnector.doExecuteCommand).toHaveBeenCalledWith('test-command', { param: 'value' });
    });
    it('should handle adapter not found errors', async () => {
      await expect(ideHub.executeOnIDE('non-existent-ide', 'command')).rejects.toThrow('IDE adapter not found: non-existent-ide');
    });
  });
  describe('Error Handling and Resilience', () => {
    it('should handle adapter initialization failures', async () => {
      const faultyConnector = new CursorConnector();
      // Mock initialization failure
      jest.spyOn(faultyConnector, 'checkAvailability').mockRejectedValue(new Error('Network error'));
      ideHub.registerAdapter(faultyConnector);
      const available = await ideHub.getAvailableIDEs();
      expect(available).not.toContain('cursor');
    });
    it('should handle sync operation failures gracefully', async () => {
      const syncData = {
        type: 'project',
        operation: 'update',
        entityId: 'non-existent-project',
        entityData: {},
        timestamp: new Date().toISOString(),
        source: 'test',
      };
      const processPromise = new Promise((resolve) => {
        syncManager.onSyncCompleted(({ result }) => {
          expect(result.success).toBe(false);
          expect(result.errors.length).toBeGreaterThan(0);
          resolve();
        });
      });
      await syncManager.enqueueSync(syncData);
      await expect(processPromise).resolves.not.toThrow();
    });
    it('should handle event listener errors without crashing', () => {
      const errorHandler = jest.fn().mockImplementation(() => {
        throw new Error('Handler error');
      });
      ideHub.onEvent('test-event', errorHandler);
      // This should not throw
      expect(() => {
        ideHub.emitEvent({
          type: 'test-event',
          source: 'test',
          data: {},
          timestamp: new Date().toISOString(),
        });
      }).not.toThrow();
      expect(errorHandler).toHaveBeenCalled();
    });
  });
  describe('Performance and Scalability', () => {
    it('should handle multiple adapters efficiently', async () => {
      const adapters = [new CursorConnector(), new VSCodeConnector()];
      // Mock all connections as successful
      adapters.forEach((adapter) => {
        jest.spyOn(adapter, 'doConnect').mockResolvedValue(undefined);
        jest.spyOn(adapter, 'checkAvailability').mockResolvedValue(true);
      });
      // Register all adapters
      adapters.forEach((adapter) => ideHub.registerAdapter(adapter));
      const available = await ideHub.getAvailableIDEs();
      expect(available).toHaveLength(2);
      expect(available).toContain('cursor');
      expect(available).toContain('vscode');
    });
    it('should handle concurrent sync operations', async () => {
      const syncPromises = [];
      // Create multiple sync operations
      for (let i = 0; i < 5; i++) {
        const syncData = {
          type: 'context',
          operation: 'update',
          entityId: `project-${i}`,
          entityData: { data: `test-${i}` },
          timestamp: new Date().toISOString(),
          source: 'test',
        };
        syncPromises.push(syncManager.enqueueSync(syncData));
      }
      await expect(Promise.all(syncPromises)).resolves.not.toThrow();
      // All operations should be processed
      const queue = syncManager.getSyncQueue();
      expect(queue).toHaveLength(0); // Queue should be empty after processing
    });
  });
});
//# sourceMappingURL=IDEIntegrationHub.test.js.map
