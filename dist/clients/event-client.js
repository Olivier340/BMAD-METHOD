// Event Client for BMAD Visual Studio
// Generic SSE client for consuming real-time events with automatic reconnection
import { EventEmitter } from 'events';
// Types d'événements supportés côté client
export var ClientEventType;
(function (ClientEventType) {
  // Événements de projets
  ClientEventType['PROJECT_CREATED'] = 'project:created';
  ClientEventType['PROJECT_UPDATED'] = 'project:updated';
  ClientEventType['PROJECT_DELETED'] = 'project:deleted';
  // Événements de workflows
  ClientEventType['WORKFLOW_STARTED'] = 'workflow:started';
  ClientEventType['WORKFLOW_COMPLETED'] = 'workflow:completed';
  ClientEventType['WORKFLOW_FAILED'] = 'workflow:failed';
  // Événements d'agents
  ClientEventType['AGENT_EXECUTED'] = 'agent:executed';
  ClientEventType['AGENT_COMPLETED'] = 'agent:completed';
  ClientEventType['AGENT_ERROR'] = 'agent:error';
  // Événements système
  ClientEventType['SYSTEM_STATUS'] = 'system:status';
  ClientEventType['SYSTEM_NOTIFICATION'] = 'system:notification';
  // Événements d'intégration IDE
  ClientEventType['IDE_CONNECTION'] = 'ide:connection';
  ClientEventType['IDE_DISCONNECTION'] = 'ide:disconnection';
  ClientEventType['IDE_FILE_CHANGED'] = 'ide:file:changed';
})(ClientEventType || (ClientEventType = {}));
// Événements internes du client
export var ClientInternalEvent;
(function (ClientInternalEvent) {
  ClientInternalEvent['CONNECTED'] = 'connected';
  ClientInternalEvent['DISCONNECTED'] = 'disconnected';
  ClientInternalEvent['ERROR'] = 'error';
  ClientInternalEvent['RETRYING'] = 'retrying';
  ClientInternalEvent['HEARTBEAT'] = 'heartbeat';
})(ClientInternalEvent || (ClientInternalEvent = {}));
// Client SSE générique
export class EventClient {
  eventSource = null;
  eventEmitter;
  options;
  isConnected = false;
  retryCount = 0;
  heartbeatInterval;
  reconnectTimeout;
  // Gestionnaires d'événements externes
  eventHandlers = new Map();
  constructor(options = {}) {
    // Options par défaut
    const defaultOptions = {
      url: this.getDefaultURL(),
      clientId: this.generateClientId(),
      retryInterval: 3000, // 3 secondes
      maxRetries: 10,
      heartbeatInterval: 30000, // 30 secondes
      timeout: 60000, // 60 secondes
    };
    this.options = { ...defaultOptions, ...options };
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(50);
    this.setupInternalEventHandlers();
  }
  // Connexion au serveur SSE
  connect() {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        console.warn('[EventClient] Already connected');
        resolve();
        return;
      }
      try {
        const url = new URL(this.options.url);
        url.searchParams.set('clientId', this.options.clientId);
        this.eventSource = new EventSource(url.toString());
        this.eventSource.onopen = () => {
          this.handleConnected();
          resolve();
        };
        this.eventSource.onerror = (error) => {
          this.handleError(error);
          if (!this.isConnected) {
            reject(new Error('Failed to connect to SSE server'));
          }
        };
        // Configuration des gestionnaires d'événements SSE
        this.setupSSEEventHandlers();
        // Timeout de connexion
        setTimeout(() => {
          if (!this.isConnected) {
            reject(new Error('Connection timeout'));
          }
        }, this.options.timeout);
      } catch (error) {
        console.error('[EventClient] Connection error:', error);
        reject(error);
      }
    });
  }
  // Déconnexion du serveur SSE
  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.isConnected = false;
    this.retryCount = 0;
    this.stopHeartbeat();
    this.clearReconnectTimeout();
    this.eventEmitter.emit(ClientInternalEvent.DISCONNECTED);
    console.log('[EventClient] Disconnected from SSE server');
  }
  // S'abonner à un type d'événement
  subscribe(eventType, handler) {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }
    this.eventHandlers.get(eventType).add(handler);
    console.log(`[EventClient] Subscribed to ${eventType}`);
  }
  // Se désabonner d'un type d'événement
  unsubscribe(eventType, handler) {
    const handlers = this.eventHandlers.get(eventType);
    if (handlers) {
      if (handler) {
        handlers.delete(handler);
        if (handlers.size === 0) {
          this.eventHandlers.delete(eventType);
        }
      } else {
        this.eventHandlers.delete(eventType);
      }
    }
    console.log(`[EventClient] Unsubscribed from ${eventType}`);
  }
  // S'abonner aux événements internes du client
  onInternalEvent(event, handler) {
    this.eventEmitter.on(event, handler);
  }
  // Se désabonner des événements internes du client
  offInternalEvent(event, handler) {
    this.eventEmitter.off(event, handler);
  }
  // Vérifier si le client est connecté
  isClientConnected() {
    return this.isConnected;
  }
  // Obtenir l'ID client
  getClientId() {
    return this.options.clientId;
  }
  // Obtenir les statistiques de connexion
  getStats() {
    return {
      isConnected: this.isConnected,
      retryCount: this.retryCount,
      subscribedEvents: this.eventHandlers.size,
      clientId: this.options.clientId,
    };
  }
  // Configuration des gestionnaires d'événements SSE
  setupSSEEventHandlers() {
    if (!this.eventSource) return;
    // Gestionnaire générique pour tous les événements
    this.eventSource.onmessage = (event) => {
      this.handleSSEMessage(event);
    };
    // Gestionnaires spécifiques pour les types d'événements nommés
    Object.values(ClientEventType).forEach((eventType) => {
      this.eventSource.addEventListener(eventType, (event) => {
        this.handleSSEMessage(event);
      });
    });
  }
  // Gestion des événements SSE reçus
  handleSSEMessage(event) {
    try {
      const eventData = JSON.parse(event.data);
      // Vérifier que c'est un événement valide
      if (!eventData.type || !eventData.data) {
        console.warn('[EventClient] Received invalid event data:', eventData);
        return;
      }
      // Émettre l'événement aux gestionnaires abonnés
      this.emitEvent(eventData);
    } catch (error) {
      console.error('[EventClient] Error parsing SSE message:', error);
    }
  }
  // Émettre un événement aux gestionnaires abonnés
  emitEvent(eventData) {
    const handlers = this.eventHandlers.get(eventData.type);
    if (handlers && handlers.size > 0) {
      handlers.forEach((handler) => {
        try {
          handler(eventData);
        } catch (error) {
          console.error(`[EventClient] Error in event handler for ${eventData.type}:`, error);
        }
      });
    }
  }
  // Gestion de la connexion établie
  handleConnected() {
    this.isConnected = true;
    this.retryCount = 0;
    this.startHeartbeat();
    this.eventEmitter.emit(ClientInternalEvent.CONNECTED);
    console.log(`[EventClient] Connected to SSE server as ${this.options.clientId}`);
  }
  // Gestion des erreurs de connexion
  handleError(error) {
    console.error('[EventClient] SSE connection error:', error);
    this.isConnected = false;
    this.eventEmitter.emit(ClientInternalEvent.ERROR, error);
    // Tentative de reconnexion
    this.scheduleReconnect();
  }
  // Programmer une reconnexion
  scheduleReconnect() {
    if (this.retryCount >= this.options.maxRetries) {
      console.error(`[EventClient] Max retries (${this.options.maxRetries}) reached`);
      this.eventEmitter.emit(ClientInternalEvent.ERROR, new Error('Max reconnection attempts reached'));
      return;
    }
    this.retryCount++;
    const delay = this.options.retryInterval * Math.pow(2, this.retryCount - 1); // Backoff exponentiel
    console.log(`[EventClient] Scheduling reconnect attempt ${this.retryCount}/${this.options.maxRetries} in ${delay}ms`);
    this.eventEmitter.emit(ClientInternalEvent.RETRYING, this.retryCount);
    this.reconnectTimeout = setTimeout(() => {
      this.attemptReconnect();
    }, delay);
  }
  // Tentative de reconnexion
  attemptReconnect() {
    console.log(`[EventClient] Attempting to reconnect (${this.retryCount}/${this.options.maxRetries})`);
    this.connect().catch((error) => {
      console.error('[EventClient] Reconnection failed:', error);
      this.scheduleReconnect();
    });
  }
  // Démarrer le heartbeat
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.eventEmitter.emit(ClientInternalEvent.HEARTBEAT);
      }
    }, this.options.heartbeatInterval);
  }
  // Arrêter le heartbeat
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }
  // Nettoyer le timeout de reconnexion
  clearReconnectTimeout() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = undefined;
    }
  }
  // Configuration des gestionnaires d'événements internes
  setupInternalEventHandlers() {
    // Nettoyer à la déconnexion
    this.eventEmitter.on(ClientInternalEvent.DISCONNECTED, () => {
      this.stopHeartbeat();
      this.clearReconnectTimeout();
    });
  }
  // Obtenir l'URL par défaut du serveur SSE
  getDefaultURL() {
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
    const host = window.location.host;
    return `${protocol}//${host}/events`;
  }
  // Générer un ID client unique
  generateClientId() {
    return `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
// Instance singleton du client d'événements
export const eventClient = new EventClient();
// Export par défaut
export default eventClient;
//# sourceMappingURL=event-client.js.map
