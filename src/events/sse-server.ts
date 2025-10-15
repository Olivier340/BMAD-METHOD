// Server-Sent Events Server Implementation for BMAD Visual Studio
// Provides real-time event streaming for system synchronization

import express, { Request, Response } from 'express';
import { EventEmitter } from 'node:events';

// Types d'événements supportés
export enum EventType {
  // Événements de projets
  PROJECT_CREATED = 'project:created',
  PROJECT_UPDATED = 'project:updated',
  PROJECT_DELETED = 'project:deleted',

  // Événements de workflows
  WORKFLOW_STARTED = 'workflow:started',
  WORKFLOW_COMPLETED = 'workflow:completed',
  WORKFLOW_FAILED = 'workflow:failed',

  // Événements d'agents
  AGENT_EXECUTED = 'agent:executed',
  AGENT_COMPLETED = 'agent:completed',
  AGENT_ERROR = 'agent:error',

  // Événements système
  SYSTEM_STATUS = 'system:status',
  SYSTEM_NOTIFICATION = 'system:notification',

  // Événements d'intégration IDE
  IDE_CONNECTION = 'ide:connection',
  IDE_DISCONNECTION = 'ide:disconnection',
  IDE_FILE_CHANGED = 'ide:file:changed',
}

// Interface pour les données d'événement
export interface EventData {
  id: string;
  type: EventType;
  timestamp: Date;
  source: string;
  data: Record<string, unknown>;
  metadata?: {
    userId?: string;
    sessionId?: string;
    correlationId?: string;
  };
}

// Gestionnaire de connexions SSE
class SSEConnectionManager {
  private connections: Map<string, SSEConnection> = new Map();
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(100); // Support pour nombreux clients
  }

  // Créer une nouvelle connexion SSE
  createConnection(clientId: string, response: Response): SSEConnection {
    const connection = new SSEConnection(clientId, response, this);
    this.connections.set(clientId, connection);
    return connection;
  }

  // Supprimer une connexion
  removeConnection(clientId: string): void {
    const connection = this.connections.get(clientId);
    if (connection) {
      connection.close();
      this.connections.delete(clientId);
    }
  }

  // Diffuser un événement à tous les clients abonnés
  broadcast(eventData: EventData): void {
    this.eventEmitter.emit('broadcast', eventData);
  }

  // Diffuser un événement à des clients spécifiques
  broadcastTo(eventData: EventData, clientIds: string[]): void {
    this.eventEmitter.emit('broadcast:targeted', { eventData, clientIds });
  }

  // Obtenir le nombre de connexions actives
  getConnectionCount(): number {
    return this.connections.size;
  }

  // Fermer toutes les connexions
  closeAll(): void {
    for (const connection of this.connections.values()) {
      connection.close();
    }
    this.connections.clear();
  }

  // Gestionnaire d'événement interne
  getEventEmitter(): EventEmitter {
    return this.eventEmitter;
  }
}

// Connexion SSE individuelle
class SSEConnection {
  private clientId: string;
  private response: Response;
  private manager: SSEConnectionManager;
  private heartbeatInterval?: NodeJS.Timeout;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private maxRetries: number = 5;

  constructor(clientId: string, response: Response, manager: SSEConnectionManager) {
    this.clientId = clientId;
    this.response = response;
    this.manager = manager;

    this.initialize();
  }

  private initialize(): void {
    this.setupResponse();
    this.setupHeartbeat();
    this.setupEventListeners();
    this.isConnected = true;
  }

  private setupResponse(): void {
    // Headers SSE requis
    this.response.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control, X-Requested-With, Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, DELETE',
    });

    // Message de bienvenue
    this.send({
      id: 'connection-established',
      type: EventType.SYSTEM_STATUS,
      timestamp: new Date(),
      source: 'sse-server',
      data: { message: 'Connexion SSE établie', clientId: this.clientId },
    });
  }

  private setupHeartbeat(): void {
    // Heartbeat toutes les 30 secondes pour maintenir la connexion
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.send({
          id: 'heartbeat',
          type: EventType.SYSTEM_STATUS,
          timestamp: new Date(),
          source: 'sse-server',
          data: { type: 'heartbeat', clientId: this.clientId },
        });
      }
    }, 30_000);
  }

  private setupEventListeners(): void {
    const eventEmitter = this.manager.getEventEmitter();

    // Écouter les événements broadcast
    eventEmitter.on('broadcast', (eventData: EventData) => {
      if (this.isConnected) {
        this.send(eventData);
      }
    });

    // Écouter les événements ciblés
    eventEmitter.on('broadcast:targeted', ({ eventData, clientIds }: { eventData: EventData; clientIds: string[] }) => {
      if (this.isConnected && clientIds.includes(this.clientId)) {
        this.send(eventData);
      }
    });
  }

  // Envoyer un événement SSE
  public send(eventData: EventData): void {
    if (!this.isConnected) return;

    try {
      const sseMessage = this.formatSSEMessage(eventData);
      this.response.write(sseMessage);

      // Log pour debug (optionnel)
      console.log(`[SSE] Event sent to ${this.clientId}: ${eventData.type}`);
    } catch (error) {
      console.error(`[SSE] Error sending event to ${this.clientId}:`, error);
      this.handleError(error as Error);
    }
  }

  // Formater le message SSE
  private formatSSEMessage(eventData: EventData): string {
    const lines = [`id: ${eventData.id}`, `event: ${eventData.type}`, `data: ${JSON.stringify(eventData)}`, '\n'];
    return lines.join('\n');
  }

  // Gérer les erreurs de connexion
  private handleError(error: Error): void {
    console.error(`[SSE] Connection error for ${this.clientId}:`, error.message);

    if (this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`[SSE] Retry attempt ${this.retryCount}/${this.maxRetries} for ${this.clientId}`);

      // Réessayer après un délai exponentiel
      setTimeout(
        () => {
          if (this.isConnected) {
            this.send({
              id: `retry-${this.retryCount}`,
              type: EventType.SYSTEM_STATUS,
              timestamp: new Date(),
              source: 'sse-server',
              data: {
                type: 'retry',
                attempt: this.retryCount,
                maxRetries: this.maxRetries,
                error: error.message,
              },
            });
          }
        },
        Math.pow(2, this.retryCount) * 1000,
      );
    } else {
      console.error(`[SSE] Max retries reached for ${this.clientId}, closing connection`);
      this.close();
    }
  }

  // Fermer la connexion
  public close(): void {
    if (!this.isConnected) return;

    this.isConnected = false;

    // Arrêter le heartbeat
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    // Fermer la réponse HTTP
    try {
      this.response.end();
    } catch (error) {
      console.error(`[SSE] Error closing response for ${this.clientId}:`, error);
    }

    // Retirer de la liste des connexions
    this.manager.removeConnection(this.clientId);

    console.log(`[SSE] Connection closed for ${this.clientId}`);
  }

  // Getter pour l'ID client
  public getClientId(): string {
    return this.clientId;
  }

  // Vérifier si la connexion est active
  public isActive(): boolean {
    return this.isConnected;
  }
}

// Classe principale du serveur SSE
export class SSEServer {
  private connectionManager: SSEConnectionManager;
  private server: express.Application;

  constructor(server: express.Application) {
    this.server = server;
    this.connectionManager = new SSEConnectionManager();
    this.setupRoutes();
  }

  private setupRoutes(): void {
    // Route principale pour les connexions SSE
    this.server.get('/events', (req: Request, res: Response) => {
      this.handleSSEConnection(req, res);
    });

    // Route pour publier des événements (API interne)
    this.server.post('/events/publish', (req: Request, res: Response) => {
      this.handleEventPublishing(req, res);
    });

    // Route de health check
    this.server.get('/events/health', (req: Request, res: Response) => {
      res.json({
        status: 'ok',
        connections: this.connectionManager.getConnectionCount(),
        timestamp: new Date().toISOString(),
      });
    });
  }

  private handleSSEConnection(req: Request, res: Response): void {
    const clientId = (req.query.clientId as string) || this.generateClientId();

    console.log(`[SSE] New connection request from ${req.ip} with clientId: ${clientId}`);

    try {
      const connection = this.connectionManager.createConnection(clientId, res);

      // Gérer la fermeture de connexion côté client
      req.on('close', () => {
        console.log(`[SSE] Connection closed by client: ${clientId}`);
        connection.close();
      });

      req.on('error', (error) => {
        console.error(`[SSE] Connection error for ${clientId}:`, error);
        connection.close();
      });
    } catch (error) {
      console.error(`[SSE] Failed to create connection for ${clientId}:`, error);
      res.status(500).json({ error: 'Failed to establish SSE connection' });
    }
  }

  private handleEventPublishing(req: Request, res: Response): void {
    try {
      const eventData: EventData = {
        id: req.body.id || this.generateEventId(),
        type: req.body.type,
        timestamp: new Date(),
        source: req.body.source || 'api',
        data: req.body.data,
        metadata: req.body.metadata,
      };

      // Validation basique
      if (!eventData.type || !eventData.data) {
        return res.status(400).json({ error: 'Event type and data are required' });
      }

      // Diffuser l'événement
      this.connectionManager.broadcast(eventData);

      res.json({
        success: true,
        eventId: eventData.id,
        timestamp: eventData.timestamp,
      });
    } catch (error) {
      console.error('[SSE] Error publishing event:', error);
      res.status(500).json({ error: 'Failed to publish event' });
    }
  }

  // Méthodes publiques pour publier des événements

  public publishEvent(eventData: EventData): void {
    this.connectionManager.broadcast(eventData);
  }

  public publishEventTo(eventData: EventData, clientIds: string[]): void {
    this.connectionManager.broadcastTo(eventData, clientIds);
  }

  public getConnectionCount(): number {
    return this.connectionManager.getConnectionCount();
  }

  public closeAllConnections(): void {
    this.connectionManager.closeAll();
  }

  // Utilitaires privés

  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
}

// Export par défaut
export default SSEServer;
