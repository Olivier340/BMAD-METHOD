// Integration Tests for Event Publisher Service
// Tests the integration between EventPublisher and SSE server
import { EventPublisherService } from '../event-publisher';
import { EventType } from '../sse-server';
// Mock SSE Server for testing
class MockSSEServer {
  broadcastedEvents = [];
  targetedEvents = [];
  publishEvent(eventData) {
    this.broadcastedEvents.push(eventData);
  }
  publishEventTo(eventData, clientIds) {
    this.targetedEvents.push({ eventData, clientIds });
  }
  getConnectionCount() {
    return 0;
  }
  getBroadcastedEvents() {
    return this.broadcastedEvents;
  }
  getTargetedEvents() {
    return this.targetedEvents;
  }
  clearEvents() {
    this.broadcastedEvents = [];
    this.targetedEvents = [];
  }
}
describe('EventPublisher Integration', () => {
  let eventPublisher;
  let mockSSEServer;
  beforeEach(() => {
    mockSSEServer = new MockSSEServer();
    eventPublisher = new EventPublisherService();
    eventPublisher.setSSEServer(mockSSEServer);
  });
  describe('Event Publishing', () => {
    it('should publish events to SSE server', () => {
      const eventData = {
        type: EventType.PROJECT_CREATED,
        source: 'test',
        data: { projectId: 'test-project', name: 'Test Project' },
      };
      eventPublisher.publish(eventData);
      const broadcastedEvents = mockSSEServer.getBroadcastedEvents();
      expect(broadcastedEvents).toHaveLength(1);
      expect(broadcastedEvents[0].type).toBe(EventType.PROJECT_CREATED);
      expect(broadcastedEvents[0].source).toBe('test');
      expect(broadcastedEvents[0].data.projectId).toBe('test-project');
    });
    it('should add timestamp and ID to events', () => {
      const eventData = {
        type: EventType.SYSTEM_NOTIFICATION,
        source: 'test',
        data: { message: 'Test notification' },
      };
      eventPublisher.publish(eventData);
      const broadcastedEvents = mockSSEServer.getBroadcastedEvents();
      expect(broadcastedEvents).toHaveLength(1);
      const event = broadcastedEvents[0];
      expect(event.id).toBeDefined();
      expect(event.timestamp).toBeInstanceOf(Date);
      expect(event.type).toBe(EventType.SYSTEM_NOTIFICATION);
    });
    it('should publish targeted events', () => {
      const eventData = {
        type: EventType.PROJECT_UPDATED,
        source: 'test',
        data: { projectId: 'test-project', changes: { name: 'Updated' } },
      };
      const clientIds = ['client-1', 'client-2'];
      eventPublisher.publishTo(eventData, clientIds);
      const targetedEvents = mockSSEServer.getTargetedEvents();
      expect(targetedEvents).toHaveLength(1);
      expect(targetedEvents[0].clientIds).toEqual(clientIds);
      expect(targetedEvents[0].eventData.type).toBe(EventType.PROJECT_UPDATED);
    });
  });
  describe('Convenience Methods', () => {
    it('should publish project events correctly', () => {
      const projectData = {
        projectId: 'project-123',
        name: 'Test Project',
        path: '/path/to/project',
      };
      eventPublisher.publishProjectEvent('created', projectData);
      const events = mockSSEServer.getBroadcastedEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('project:created');
      expect(events[0].source).toBe('project-service');
      expect(events[0].data.projectId).toBe('project-123');
    });
    it('should publish workflow events correctly', () => {
      const workflowData = {
        executionId: 'workflow-123',
        workflowName: 'Test Workflow',
        projectId: 'project-123',
      };
      eventPublisher.publishWorkflowEvent('started', workflowData);
      const events = mockSSEServer.getBroadcastedEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('workflow:started');
      expect(events[0].source).toBe('workflow-service');
      expect(events[0].data.executionId).toBe('workflow-123');
    });
    it('should publish agent events correctly', () => {
      const agentData = {
        agentId: 'agent-123',
        agentName: 'Test Agent',
        sessionId: 'session-123',
      };
      eventPublisher.publishAgentEvent('executed', agentData);
      const events = mockSSEServer.getBroadcastedEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('agent:executed');
      expect(events[0].source).toBe('agent-service');
      expect(events[0].data.agentId).toBe('agent-123');
    });
    it('should publish system events correctly', () => {
      eventPublisher.publishSystemEvent('online', 'System is online');
      const events = mockSSEServer.getBroadcastedEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe(EventType.SYSTEM_STATUS);
      expect(events[0].source).toBe('system');
      expect(events[0].data.status).toBe('online');
      expect(events[0].data.message).toBe('System is online');
    });
    it('should publish notification events correctly', () => {
      eventPublisher.publishNotification('success', 'Operation completed successfully');
      const events = mockSSEServer.getBroadcastedEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe(EventType.SYSTEM_NOTIFICATION);
      expect(events[0].source).toBe('system');
      expect(events[0].data.type).toBe('success');
      expect(events[0].data.message).toBe('Operation completed successfully');
    });
  });
  describe('Event History', () => {
    it('should maintain event history', () => {
      const event1 = {
        type: EventType.PROJECT_CREATED,
        source: 'test',
        data: { projectId: 'project-1' },
      };
      const event2 = {
        type: EventType.WORKFLOW_STARTED,
        source: 'test',
        data: { workflowId: 'workflow-1' },
      };
      eventPublisher.publish(event1);
      eventPublisher.publish(event2);
      const history = eventPublisher.getEventHistory();
      expect(history).toHaveLength(2);
      expect(history[0].type).toBe(EventType.WORKFLOW_STARTED);
      expect(history[1].type).toBe(EventType.PROJECT_CREATED);
    });
    it('should filter event history', () => {
      const projectEvent = {
        type: EventType.PROJECT_CREATED,
        source: 'project-service',
        data: { projectId: 'project-1' },
      };
      const workflowEvent = {
        type: EventType.WORKFLOW_STARTED,
        source: 'workflow-service',
        data: { workflowId: 'workflow-1' },
      };
      eventPublisher.publish(projectEvent);
      eventPublisher.publish(workflowEvent);
      const projectHistory = eventPublisher.getEventHistory({
        sources: ['project-service'],
      });
      expect(projectHistory).toHaveLength(1);
      expect(projectHistory[0].type).toBe(EventType.PROJECT_CREATED);
    });
    it('should limit event history size', () => {
      // Publish more than the default max history size (1000)
      for (let i = 0; i < 1005; i++) {
        eventPublisher.publish({
          type: EventType.SYSTEM_STATUS,
          source: 'test',
          data: { message: `Message ${i}` },
        });
      }
      const history = eventPublisher.getEventHistory();
      expect(history.length).toBeLessThanOrEqual(1000);
    });
  });
  describe('Subscription System', () => {
    it('should allow subscribing to events', () => {
      const subscriptionId = 'test-subscription';
      const mockCallback = jest.fn();
      const subscription = {
        id: subscriptionId,
        clientId: 'test-client',
        filter: {
          eventTypes: [EventType.PROJECT_CREATED],
        },
        callback: mockCallback,
      };
      eventPublisher.subscribe(subscription);
      // Publish a matching event
      eventPublisher.publish({
        type: EventType.PROJECT_CREATED,
        source: 'test',
        data: { projectId: 'test-project' },
      });
      // Wait for async callback
      setTimeout(() => {
        expect(mockCallback).toHaveBeenCalled();
      }, 10);
    });
    it('should allow unsubscribing from events', () => {
      const subscriptionId = 'test-subscription-2';
      const mockCallback = jest.fn();
      const subscription = {
        id: subscriptionId,
        clientId: 'test-client',
        filter: {},
        callback: mockCallback,
      };
      eventPublisher.subscribe(subscription);
      eventPublisher.unsubscribe(subscriptionId);
      // Publish an event after unsubscribing
      eventPublisher.publish({
        type: EventType.SYSTEM_NOTIFICATION,
        source: 'test',
        data: { message: 'Test message' },
      });
      // Callback should not be called
      setTimeout(() => {
        expect(mockCallback).not.toHaveBeenCalled();
      }, 10);
    });
    it('should filter events based on subscription criteria', () => {
      const subscriptionId = 'filtered-subscription';
      const mockCallback = jest.fn();
      const subscription = {
        id: subscriptionId,
        clientId: 'test-client',
        filter: {
          eventTypes: [EventType.PROJECT_CREATED],
        },
        callback: mockCallback,
      };
      eventPublisher.subscribe(subscription);
      // Publish non-matching event
      eventPublisher.publish({
        type: EventType.WORKFLOW_STARTED,
        source: 'test',
        data: { workflowId: 'test-workflow' },
      });
      // Publish matching event
      eventPublisher.publish({
        type: EventType.PROJECT_CREATED,
        source: 'test',
        data: { projectId: 'test-project' },
      });
      setTimeout(() => {
        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith(
          expect.objectContaining({
            type: EventType.PROJECT_CREATED,
          }),
        );
      }, 10);
    });
  });
  describe('Statistics', () => {
    it('should provide service statistics', () => {
      const stats = eventPublisher.getStats();
      expect(stats).toHaveProperty('subscriptions');
      expect(stats).toHaveProperty('historySize');
      expect(stats).toHaveProperty('sseConnections');
      expect(typeof stats.subscriptions).toBe('number');
      expect(typeof stats.historySize).toBe('number');
    });
    it('should track subscription count', () => {
      const initialStats = eventPublisher.getStats();
      const initialCount = initialStats.subscriptions;
      const subscription = {
        id: 'stats-test-subscription',
        clientId: 'test-client',
        filter: {},
        callback: jest.fn(),
      };
      eventPublisher.subscribe(subscription);
      const updatedStats = eventPublisher.getStats();
      expect(updatedStats.subscriptions).toBe(initialCount + 1);
    });
  });
  describe('Error Handling', () => {
    it('should handle invalid event data gracefully', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      // Publish event with missing required fields
      eventPublisher.publish({
        type: '', // Invalid empty type
        source: 'test',
        // Missing data field
      });
      expect(consoleSpy).toHaveBeenCalledWith('[EventPublisher] Invalid event data:', expect.any(Object));
      consoleSpy.mockRestore();
    });
    it('should handle SSE server not configured', () => {
      const publisherWithoutSSE = new EventPublisherService();
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      // Try to publish targeted event without SSE server
      publisherWithoutSSE.publishTo(
        {
          type: EventType.PROJECT_UPDATED,
          source: 'test',
          data: { projectId: 'test' },
        },
        ['client-1'],
      );
      expect(consoleSpy).toHaveBeenCalledWith('[EventPublisher] SSE server not configured, cannot publish targeted events');
      consoleSpy.mockRestore();
    });
  });
});
//# sourceMappingURL=event-publisher.integration.test.js.map
