// Server-Sent Events Server Implementation for BMAD Visual Studio
// Provides real-time event streaming for system synchronization
import { EventEmitter } from 'events';
// Types d'événements supportés
export var EventType;
(function (EventType) {
  // Événements de projets
  EventType['PROJECT_CREATED'] = 'project:created';
  EventType['PROJECT_UPDATED'] = 'project:updated';
  EventType['PROJECT_DELETED'] = 'project:deleted';
  // Événements de workflows
  EventType['WORKFLOW_STARTED'] = 'workflow:started';
  EventType['WORKFLOW_COMPLETED'] = 'workflow:completed';
  EventType['WORKFLOW_FAILED'] = 'workflow:failed';
  // Événements d'agents
  EventType['AGENT_EXECUTED'] = 'agent:executed';
  EventType['AGENT_COMPLETED'] = 'agent:completed';
  EventType['AGENT_ERROR'] = 'agent:error';
  // Événements système
  EventType['SYSTEM_STATUS'] = 'system:status';
  EventType['SYSTEM_NOTIFICATION'] = 'system:notification';
  // Événements d'intégration IDE
  EventType['IDE_CONNECTION'] = 'ide:connection';
  EventType['IDE_DISCONNECTION'] = 'ide:disconnection';
  EventType['IDE_FILE_CHANGED'] = 'ide:file:changed';
})(EventType || (EventType = {}));
// Gestionnaire de connexions SSE
class SSEConnectionManager {
  connections = new Map();
  eventEmitter;
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(100); // Support pour nombreux clients
  }
  // Créer une nouvelle connexion SSE
  createConnection(clientId, response) {
    const connection = new SSEConnection(clientId, response, this);
    this.connections.set(clientId, connection);
    return connection;
  }
  // Supprimer une connexion
  removeConnection(clientId) {
    const connection = this.connections.get(clientId);
    if (connection) {
      connection.close();
      this.connections.delete(clientId);
    }
  }
  // Diffuser un événement à tous les clients abonnés
  broadcast(eventData) {
    this.eventEmitter.emit('broadcast', eventData);
  }
  // Diffuser un événement à des clients spécifiques
  broadcastTo(eventData, clientIds) {
    this.eventEmitter.emit('broadcast:targeted', { eventData, clientIds });
  }
  // Obtenir le nombre de connexions actives
  getConnectionCount() {
    return this.connections.size;
  }
  // Fermer toutes les connexions
  closeAll() {
    for (const connection of this.connections.values()) {
      connection.close();
    }
    this.connections.clear();
  }
  // Gestionnaire d'événement interne
  getEventEmitter() {
    return this.eventEmitter;
  }
}
// Connexion SSE individuelle
class SSEConnection {
  clientId;
  response;
  manager;
  heartbeatInterval;
  isConnected = false;
  retryCount = 0;
  maxRetries = 5;
  constructor(clientId, response, manager) {
    this.clientId = clientId;
    this.response = response;
    this.manager = manager;
    this.initialize();
  }
  initialize() {
    this.setupResponse();
    this.setupHeartbeat();
    this.setupEventListeners();
    this.isConnected = true;
  }
  setupResponse() {
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
  setupHeartbeat() {
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
    }, 30000);
  }
  setupEventListeners() {
    const eventEmitter = this.manager.getEventEmitter();
    // Écouter les événements broadcast
    eventEmitter.on('broadcast', (eventData) => {
      if (this.isConnected) {
        this.send(eventData);
      }
    });
    // Écouter les événements ciblés
    eventEmitter.on('broadcast:targeted', ({ eventData, clientIds }) => {
      if (this.isConnected && clientIds.includes(this.clientId)) {
        this.send(eventData);
      }
    });
  }
  // Envoyer un événement SSE
  send(eventData) {
    if (!this.isConnected) return;
    try {
      const sseMessage = this.formatSSEMessage(eventData);
      this.response.write(sseMessage);
      // Log pour debug (optionnel)
      console.log(`[SSE] Event sent to ${this.clientId}: ${eventData.type}`);
    } catch (error) {
      console.error(`[SSE] Error sending event to ${this.clientId}:`, error);
      this.handleError(error);
    }
  }
  // Formater le message SSE
  formatSSEMessage(eventData) {
    const lines = [`id: ${eventData.id}`, `event: ${eventData.type}`, `data: ${JSON.stringify(eventData)}`, '\n'];
    return lines.join('\n');
  }
  // Gérer les erreurs de connexion
  handleError(error) {
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
  close() {
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
  getClientId() {
    return this.clientId;
  }
  // Vérifier si la connexion est active
  isActive() {
    return this.isConnected;
  }
}
// Classe principale du serveur SSE
export class SSEServer {
  connectionManager;
  server;
  constructor(server) {
    this.server = server;
    this.connectionManager = new SSEConnectionManager();
    this.setupRoutes();
  }
  setupRoutes() {
    // Route principale pour les connexions SSE
    this.server.get('/events', (req, res) => {
      this.handleSSEConnection(req, res);
    });
    // Route pour publier des événements (API interne)
    this.server.post('/events/publish', (req, res) => {
      this.handleEventPublishing(req, res);
    });
    // Route de health check
    this.server.get('/events/health', (req, res) => {
      res.json({
        status: 'ok',
        connections: this.connectionManager.getConnectionCount(),
        timestamp: new Date().toISOString(),
      });
    });
  }
  handleSSEConnection(req, res) {
    const clientId = req.query.clientId || this.generateClientId();
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
  handleEventPublishing(req, res) {
    try {
      const eventData = {
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
  publishEvent(eventData) {
    this.connectionManager.broadcast(eventData);
  }
  publishEventTo(eventData, clientIds) {
    this.connectionManager.broadcastTo(eventData, clientIds);
  }
  getConnectionCount() {
    return this.connectionManager.getConnectionCount();
  }
  closeAllConnections() {
    this.connectionManager.closeAll();
  }
  // Utilitaires privés
  generateClientId() {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
// Export par défaut
export default SSEServer;
//# sourceMappingURL=sse-server.js.map
