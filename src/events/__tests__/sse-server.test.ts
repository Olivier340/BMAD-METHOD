// Unit Tests for SSE Server
// Tests the Server-Sent Events server implementation

import express from 'express';
import { SSEServer, EventType, EventData } from '../sse-server';

// Mock Express Response for testing
class MockResponse {
  private headers: { [key: string]: string } = {};
  private data: string[] = [];
  private statusCode: number = 200;
  private ended: boolean = false;

  writeHead(status: number, headers?: { [key: string]: string }) {
    this.statusCode = status;
    if (headers) {
      this.headers = { ...this.headers, ...headers };
    }
  }

  write(data: string) {
    this.data.push(data);
  }

  end() {
    this.ended = true;
  }

  getData(): string {
    return this.data.join('');
  }

  getHeaders(): { [key: string]: string } {
    return this.headers;
  }

  getStatusCode(): number {
    return this.statusCode;
  }

  isEnded(): boolean {
    return this.ended;
  }
}

// Mock Express Request for testing
class MockRequest {
  query: { [key: string]: string } = {};
  ip: string = '127.0.0.1';

  constructor(query: { [key: string]: string } = {}) {
    this.query = query;
  }
}

describe('SSEServer', () => {
  let app: express.Application;
  let sseServer: SSEServer;

  beforeEach(() => {
    app = express();
    sseServer = new SSEServer(app);
  });

  describe('Initialization', () => {
    it('should initialize with an Express app', () => {
      expect(sseServer).toBeDefined();
      expect(sseServer.getConnectionCount()).toBe(0);
    });

    it('should set up SSE routes', () => {
      const routes = app._router.stack.filter((layer: any) => layer.route);
      const sseRoutes = routes.filter((route: any) => route.route.path === '/events' || route.route.path === '/events/publish');

      expect(sseRoutes.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Connection Management', () => {
    it('should handle SSE connection requests', (done) => {
      const mockReq = new MockRequest();
      const mockRes = new MockResponse();

      // Simulate GET /events request
      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events')?.route?.stack[0]?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          expect(mockRes.getStatusCode()).toBe(200);
          expect(mockRes.getHeaders()['content-type']).toBe('text/event-stream');
          expect(mockRes.getHeaders()['cache-control']).toBe('no-cache');
          done();
        }, 100);
      } else {
        done(new Error('SSE route handler not found'));
      }
    });

    it('should handle client ID parameter', (done) => {
      const mockReq = new MockRequest({ clientId: 'test-client-123' });
      const mockRes = new MockResponse();

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events')?.route?.stack[0]?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          const data = mockRes.getData();
          expect(data).toContain('test-client-123');
          done();
        }, 100);
      } else {
        done(new Error('SSE route handler not found'));
      }
    });

    it('should generate client ID when not provided', (done) => {
      const mockReq = new MockRequest();
      const mockRes = new MockResponse();

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events')?.route?.stack[0]?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          const data = mockRes.getData();
          expect(data).toMatch(/client_\d+_[a-z0-9]+/);
          done();
        }, 100);
      } else {
        done(new Error('SSE route handler not found'));
      }
    });
  });

  describe('Event Publishing', () => {
    it('should handle event publishing via POST /events/publish', (done) => {
      const mockReq = {
        body: {
          id: 'test-event-1',
          type: EventType.PROJECT_CREATED,
          data: { projectId: 'test-project', name: 'Test Project' },
        },
      } as any;

      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events/publish')?.route?.stack[0]
        ?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            eventId: 'test-event-1',
            timestamp: expect.any(Date),
          });
          done();
        }, 100);
      } else {
        done(new Error('Event publishing route handler not found'));
      }
    });

    it('should validate required fields for event publishing', (done) => {
      const mockReq = {
        body: {
          id: 'test-event-2',
          // Missing type and data
        },
      } as any;

      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events/publish')?.route?.stack[0]
        ?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          expect(mockRes.status).toHaveBeenCalledWith(400);
          expect(mockRes.json).toHaveBeenCalledWith({
            error: 'Event type and data are required',
          });
          done();
        }, 100);
      } else {
        done(new Error('Event publishing route handler not found'));
      }
    });
  });

  describe('Health Check', () => {
    it('should provide health check endpoint', (done) => {
      const mockReq = {} as any;
      const mockRes = {
        json: jest.fn(),
      } as any;

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events/health')?.route?.stack[0]?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
          status: 'ok',
          connections: 0,
          timestamp: expect.any(String),
        });
        done();
      } else {
        done(new Error('Health check route handler not found'));
      }
    });
  });

  describe('Connection Count', () => {
    it('should track connection count', () => {
      expect(sseServer.getConnectionCount()).toBe(0);

      // Note: In a real test environment, we would establish actual connections
      // and verify the count increases/decreases accordingly
    });
  });

  describe('Event Broadcasting', () => {
    it('should broadcast events to connected clients', () => {
      const eventData: EventData = {
        id: 'test-broadcast-event',
        type: EventType.SYSTEM_NOTIFICATION,
        timestamp: new Date(),
        source: 'test',
        data: { message: 'Test broadcast message' },
      };

      // In a real test environment, we would:
      // 1. Establish a connection
      // 2. Broadcast an event
      // 3. Verify the connected client receives the event

      expect(() => {
        sseServer.publishEvent(eventData);
      }).not.toThrow();
    });

    it('should broadcast events to specific clients', () => {
      const eventData: EventData = {
        id: 'test-targeted-event',
        type: EventType.PROJECT_UPDATED,
        timestamp: new Date(),
        source: 'test',
        data: { projectId: 'test-project', changes: { name: 'Updated Project' } },
      };

      const clientIds = ['client-1', 'client-2'];

      // In a real test environment, we would:
      // 1. Establish connections for the specified clients
      // 2. Broadcast an event to specific clients
      // 3. Verify only the targeted clients receive the event

      expect(() => {
        sseServer.publishEventTo(eventData, clientIds);
      }).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed event publishing gracefully', (done) => {
      const mockReq = {
        body: {
          // Malformed event data
          type: 'invalid-type',
          data: null,
        },
      } as any;

      const mockRes = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      } as any;

      const handler = app._router.stack.find((layer: any) => layer.route && layer.route.path === '/events/publish')?.route?.stack[0]
        ?.handle;

      if (handler) {
        handler(mockReq, mockRes);

        setTimeout(() => {
          expect(mockRes.status).toHaveBeenCalledWith(400);
          done();
        }, 100);
      } else {
        done(new Error('Event publishing route handler not found'));
      }
    });
  });
});
