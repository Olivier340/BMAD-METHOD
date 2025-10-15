// Event Publisher Service for BMAD Visual Studio
// Provides a centralized service for publishing real-time events to SSE clients
import { EventEmitter } from 'events';
import { EventType } from './sse-server';
// Service de publication d'événements
export class EventPublisherService {
  eventEmitter;
  sseServer;
  subscriptions = new Map();
  eventHistory = [];
  maxHistorySize = 1000;
  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(100);
    this.setupEventListeners();
  }
  // Configuration du serveur SSE (à appeler après création du serveur SSE)
  setSSEServer(sseServer) {
    this.sseServer = sseServer;
  }
  setupEventListeners() {
    // Écouter les événements internes pour la journalisation et l'historique
    this.eventEmitter.on('event:published', (eventData) => {
      this.addToHistory(eventData);
      // Log pour debug
      console.log(`[EventPublisher] Event published: ${eventData.type} from ${eventData.source}`);
    });
  }
  // Publier un événement à tous les clients abonnés
  publish(eventData) {
    // Validation de base
    if (!eventData.type || !eventData.data) {
      console.error('[EventPublisher] Invalid event data:', eventData);
      return;
    }
    // Compléter les métadonnées si manquantes
    if (!eventData.id) {
      eventData.id = this.generateEventId();
    }
    if (!eventData.timestamp) {
      eventData.timestamp = new Date();
    }
    // Diffuser via SSE si disponible
    if (this.sseServer) {
      this.sseServer.publishEvent(eventData);
    }
    // Émettre l'événement en interne
    this.eventEmitter.emit('event:published', eventData);
    this.eventEmitter.emit(eventData.type, eventData);
  }
  // Publier un événement ciblé à des clients spécifiques
  publishTo(eventData, clientIds) {
    if (!this.sseServer) {
      console.warn('[EventPublisher] SSE server not configured, cannot publish targeted events');
      return;
    }
    if (!eventData.type || !eventData.data) {
      console.error('[EventPublisher] Invalid event data:', eventData);
      return;
    }
    // Compléter les métadonnées si manquantes
    if (!eventData.id) {
      eventData.id = this.generateEventId();
    }
    if (!eventData.timestamp) {
      eventData.timestamp = new Date();
    }
    // Diffuser via SSE
    this.sseServer.publishEventTo(eventData, clientIds);
    // Émettre l'événement en interne
    this.eventEmitter.emit('event:published', eventData);
    this.eventEmitter.emit(eventData.type, eventData);
  }
  // S'abonner à des événements avec un filtre
  subscribe(subscription) {
    this.subscriptions.set(subscription.id, subscription);
    // Configurer le callback si fourni
    if (subscription.callback) {
      this.eventEmitter.on('event:published', (eventData) => {
        if (this.matchesFilter(eventData, subscription.filter)) {
          subscription.callback(eventData);
        }
      });
    }
    console.log(`[EventPublisher] Subscription added: ${subscription.id} for client ${subscription.clientId}`);
  }
  // Se désabonner d'événements
  unsubscribe(subscriptionId) {
    this.subscriptions.delete(subscriptionId);
    console.log(`[EventPublisher] Subscription removed: ${subscriptionId}`);
  }
  // Vérifier si un événement correspond à un filtre
  matchesFilter(eventData, filter) {
    // Filtrer par types d'événements
    if (filter.eventTypes && !filter.eventTypes.includes(eventData.type)) {
      return false;
    }
    // Filtrer par sources
    if (filter.sources && !filter.sources.includes(eventData.source)) {
      return false;
    }
    // Filtrer par utilisateurs
    if (filter.userIds && eventData.metadata?.userId && !filter.userIds.includes(eventData.metadata.userId)) {
      return false;
    }
    // Filtrer par sessions
    if (filter.sessionIds && eventData.metadata?.sessionId && !filter.sessionIds.includes(eventData.metadata.sessionId)) {
      return false;
    }
    // Filtrer par métadonnées personnalisées
    if (filter.metadata) {
      for (const [key, value] of Object.entries(filter.metadata)) {
        if (eventData.metadata?.[key] !== value) {
          return false;
        }
      }
    }
    return true;
  }
  // Ajouter un événement à l'historique
  addToHistory(eventData) {
    this.eventHistory.push(eventData);
    // Maintenir la taille maximale de l'historique
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory = this.eventHistory.slice(-this.maxHistorySize);
    }
  }
  // Obtenir l'historique des événements (avec filtres optionnels)
  getEventHistory(filter, limit) {
    let filteredHistory = this.eventHistory;
    if (filter) {
      filteredHistory = this.eventHistory.filter((eventData) => this.matchesFilter(eventData, filter));
    }
    if (limit) {
      filteredHistory = filteredHistory.slice(-limit);
    }
    return filteredHistory;
  }
  // Obtenir les statistiques du service
  getStats() {
    return {
      subscriptions: this.subscriptions.size,
      historySize: this.eventHistory.length,
      sseConnections: this.sseServer?.getConnectionCount(),
    };
  }
  // Méthodes de commodité pour publier des événements courants
  // Événements de projets
  publishProjectEvent(action, projectData, metadata) {
    const eventType = `project:${action}`;
    this.publish({
      type: eventType,
      source: 'project-service',
      data: projectData,
      metadata,
    });
  }
  // Événements de workflows
  publishWorkflowEvent(action, workflowData, metadata) {
    const eventType = `workflow:${action}`;
    this.publish({
      type: eventType,
      source: 'workflow-service',
      data: workflowData,
      metadata,
    });
  }
  // Événements d'agents
  publishAgentEvent(action, agentData, metadata) {
    const eventType = `agent:${action}`;
    this.publish({
      type: eventType,
      source: 'agent-service',
      data: agentData,
      metadata,
    });
  }
  // Événements système
  publishSystemEvent(status, message, metadata) {
    this.publish({
      type: EventType.SYSTEM_STATUS,
      source: 'system',
      data: { status, message },
      metadata,
    });
  }
  publishNotification(type, message, metadata) {
    this.publish({
      type: EventType.SYSTEM_NOTIFICATION,
      source: 'system',
      data: { type, message },
      metadata,
    });
  }
  // Événements d'intégration IDE
  publishIDEEvent(action, ideData, metadata) {
    const eventType = `ide:${action}`;
    this.publish({
      type: eventType,
      source: 'ide-integration',
      data: ideData,
      metadata,
    });
  }
  // Utilitaires privés
  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  generateSubscriptionId() {
    return `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  // Méthode publique pour générer un ID d'abonnement
  generateSubscriptionId() {
    return this.generateSubscriptionId();
  }
}
// Instance singleton du service de publication d'événements
export const eventPublisher = new EventPublisherService();
// Export par défaut
export default eventPublisher;
//# sourceMappingURL=event-publisher.js.map
