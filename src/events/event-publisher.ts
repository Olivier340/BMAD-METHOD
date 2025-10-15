// Event Publisher Service for BMAD Visual Studio
// Provides a centralized service for publishing real-time events to SSE clients

import { EventEmitter } from 'node:events';
import { EventType, EventData, SSEServer } from './sse-server';

// Interface pour les filtres d'événements
export interface EventFilter {
  eventTypes?: EventType[];
  sources?: string[];
  userIds?: string[];
  sessionIds?: string[];
  metadata?: Record<string, unknown>;
}

// Interface pour les abonnements
export interface EventSubscription {
  id: string;
  clientId: string;
  filter: EventFilter;
  callback?: (eventData: EventData) => void;
}

// Service de publication d'événements
export class EventPublisherService {
  private eventEmitter: EventEmitter;
  private sseServer?: SSEServer;
  private subscriptions: Map<string, EventSubscription> = new Map();
  private eventHistory: EventData[] = [];
  private maxHistorySize: number = 1000;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(100);
    this.setupEventListeners();
  }

  // Configuration du serveur SSE (à appeler après création du serveur SSE)
  public setSSEServer(sseServer: SSEServer): void {
    this.sseServer = sseServer;
  }

  private setupEventListeners(): void {
    // Écouter les événements internes pour la journalisation et l'historique
    this.eventEmitter.on('event:published', (eventData: EventData) => {
      this.addToHistory(eventData);

      // Log pour debug
      console.log(`[EventPublisher] Event published: ${eventData.type} from ${eventData.source}`);
    });
  }

  // Publier un événement à tous les clients abonnés
  public publish(eventData: EventData): void {
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
  public publishTo(eventData: EventData, clientIds: string[]): void {
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
  public subscribe(subscription: EventSubscription): void {
    this.subscriptions.set(subscription.id, subscription);

    // Configurer le callback si fourni
    if (subscription.callback) {
      this.eventEmitter.on('event:published', (eventData: EventData) => {
        if (this.matchesFilter(eventData, subscription.filter)) {
          subscription.callback!(eventData);
        }
      });
    }

    console.log(`[EventPublisher] Subscription added: ${subscription.id} for client ${subscription.clientId}`);
  }

  // Se désabonner d'événements
  public unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
    console.log(`[EventPublisher] Subscription removed: ${subscriptionId}`);
  }

  // Vérifier si un événement correspond à un filtre
  private matchesFilter(eventData: EventData, filter: EventFilter): boolean {
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
  private addToHistory(eventData: EventData): void {
    this.eventHistory.push(eventData);

    // Maintenir la taille maximale de l'historique
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory = this.eventHistory.slice(-this.maxHistorySize);
    }
  }

  // Obtenir l'historique des événements (avec filtres optionnels)
  public getEventHistory(filter?: EventFilter, limit?: number): EventData[] {
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
  public getStats(): {
    subscriptions: number;
    historySize: number;
    sseConnections?: number;
  } {
    return {
      subscriptions: this.subscriptions.size,
      historySize: this.eventHistory.length,
      sseConnections: this.sseServer?.getConnectionCount(),
    };
  }

  // Méthodes de commodité pour publier des événements courants

  // Événements de projets
  public publishProjectEvent(action: 'created' | 'updated' | 'deleted', projectData: Record<string, unknown>, metadata?: Record<string, unknown>): void {
    const eventType = `project:${action}` as EventType;

    this.publish({
      type: eventType,
      source: 'project-service',
      data: projectData,
      metadata,
    });
  }

  // Événements de workflows
  public publishWorkflowEvent(action: 'started' | 'completed' | 'failed', workflowData: Record<string, unknown>, metadata?: Record<string, unknown>): void {
    const eventType = `workflow:${action}` as EventType;

    this.publish({
      type: eventType,
      source: 'workflow-service',
      data: workflowData,
      metadata,
    });
  }

  // Événements d'agents
  public publishAgentEvent(action: 'executed' | 'completed' | 'error', agentData: Record<string, unknown>, metadata?: Record<string, unknown>): void {
    const eventType = `agent:${action}` as EventType;

    this.publish({
      type: eventType,
      source: 'agent-service',
      data: agentData,
      metadata,
    });
  }

  // Événements système
  public publishSystemEvent(status: string, message: string, metadata?: Record<string, unknown>): void {
    this.publish({
      type: EventType.SYSTEM_STATUS,
      source: 'system',
      data: { status, message },
      metadata,
    });
  }

  public publishNotification(type: 'info' | 'success' | 'warning' | 'error', message: string, metadata?: Record<string, unknown>): void {
    this.publish({
      type: EventType.SYSTEM_NOTIFICATION,
      source: 'system',
      data: { type, message },
      metadata,
    });
  }

  // Événements d'intégration IDE
  public publishIDEEvent(action: 'connection' | 'disconnection' | 'file:changed', ideData: Record<string, unknown>, metadata?: Record<string, unknown>): void {
    const eventType = `ide:${action}` as EventType;

    this.publish({
      type: eventType,
      source: 'ide-integration',
      data: ideData,
      metadata,
    });
  }

  // Utilitaires privés

  private generateEventId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  private generateSubscriptionId(): string {
    return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  // Méthode publique pour générer un ID d'abonnement
  public generateSubscriptionId(): string {
    return this.generateSubscriptionId();
  }
}

// Instance singleton du service de publication d'événements
export const eventPublisher = new EventPublisherService();

// Export par défaut
export default eventPublisher;
