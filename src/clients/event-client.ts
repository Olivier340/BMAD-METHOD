// Event Client for BMAD Visual Studio
// Generic SSE client for consuming real-time events with automatic reconnection

import { EventEmitter } from 'node:events';

// Types d'événements supportés côté client
export enum ClientEventType {
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

// Interface pour les données d'événement côté client
export interface ClientEventData {
  id: string;
  type: ClientEventType;
  timestamp: Date;
  source: string;
  data: Record<string, unknown>;
  metadata?: {
    userId?: string;
    sessionId?: string;
    correlationId?: string;
  };
}

// Interface pour les filtres côté client
export interface ClientEventFilter {
  eventTypes?: ClientEventType[];
  sources?: string[];
  userIds?: string[];
  sessionIds?: string[];
  metadata?: Record<string, unknown>;
}

// Interface pour les options de connexion
export interface SSEConnectionOptions {
  url?: string;
  clientId?: string;
  retryInterval?: number;
  maxRetries?: number;
  heartbeatInterval?: number;
  timeout?: number;
}

// Interface pour les gestionnaires d'événements
export interface EventHandler {
  (eventData: ClientEventData): void;
}

// Événements internes du client
export enum ClientInternalEvent {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  RETRYING = 'retrying',
  HEARTBEAT = 'heartbeat',
}

// Client SSE générique
export class EventClient {
  private eventSource: EventSource | null = null;
  private eventEmitter: EventEmitter;
  private options: Required<SSEConnectionOptions>;
  private isConnected: boolean = false;
  private retryCount: number = 0;
  private heartbeatInterval?: NodeJS.Timeout;
  private reconnectTimeout?: NodeJS.Timeout;

  // Gestionnaires d'événements externes
  private eventHandlers: Map<ClientEventType, Set<EventHandler>> = new Map();

  constructor(options: SSEConnectionOptions = {}) {
    // Options par défaut
    const defaultOptions: Required<SSEConnectionOptions> = {
      url: this.getDefaultURL(),
      clientId: this.generateClientId(),
      retryInterval: 3000, // 3 secondes
      maxRetries: 10,
      heartbeatInterval: 30_000, // 30 secondes
      timeout: 60_000, // 60 secondes
    };

    this.options = { ...defaultOptions, ...options };
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(50);

    this.setupInternalEventHandlers();
  }

  // Connexion au serveur SSE
  public connect(): Promise<void> {
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

        this.eventSource.addEventListener('open', () => {
          this.handleConnected();
          resolve();
        });

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
  public disconnect(): void {
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
  public subscribe(eventType: ClientEventType, handler: EventHandler): void {
    if (!this.eventHandlers.has(eventType)) {
      this.eventHandlers.set(eventType, new Set());
    }

    this.eventHandlers.get(eventType)!.add(handler);

    console.log(`[EventClient] Subscribed to ${eventType}`);
  }

  // Se désabonner d'un type d'événement
  public unsubscribe(eventType: ClientEventType, handler?: EventHandler): void {
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
  public onInternalEvent(event: ClientInternalEvent, handler: () => void): void {
    this.eventEmitter.on(event, handler);
  }

  // Se désabonner des événements internes du client
  public offInternalEvent(event: ClientInternalEvent, handler: () => void): void {
    this.eventEmitter.off(event, handler);
  }

  // Vérifier si le client est connecté
  public isClientConnected(): boolean {
    return this.isConnected;
  }

  // Obtenir l'ID client
  public getClientId(): string {
    return this.options.clientId;
  }

  // Obtenir les statistiques de connexion
  public getStats(): {
    isConnected: boolean;
    retryCount: number;
    subscribedEvents: number;
    clientId: string;
  } {
    return {
      isConnected: this.isConnected,
      retryCount: this.retryCount,
      subscribedEvents: this.eventHandlers.size,
      clientId: this.options.clientId,
    };
  }

  // Configuration des gestionnaires d'événements SSE
  private setupSSEEventHandlers(): void {
    if (!this.eventSource) return;

    // Gestionnaire générique pour tous les événements
    this.eventSource.onmessage = (event) => {
      this.handleSSEMessage(event);
    };

    // Gestionnaires spécifiques pour les types d'événements nommés
    for (const eventType of Object.values(ClientEventType)) {
      this.eventSource!.addEventListener(eventType, (event) => {
        this.handleSSEMessage(event as MessageEvent);
      });
    }
  }

  // Gestion des événements SSE reçus
  private handleSSEMessage(event: MessageEvent): void {
    try {
      const eventData: ClientEventData = JSON.parse(event.data);

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
  private emitEvent(eventData: ClientEventData): void {
    const handlers = this.eventHandlers.get(eventData.type);

    if (handlers && handlers.size > 0) {
      for (const handler of handlers) {
        try {
          handler(eventData);
        } catch (error) {
          console.error(`[EventClient] Error in event handler for ${eventData.type}:`, error);
        }
      }
    }
  }

  // Gestion de la connexion établie
  private handleConnected(): void {
    this.isConnected = true;
    this.retryCount = 0;

    this.startHeartbeat();
    this.eventEmitter.emit(ClientInternalEvent.CONNECTED);

    console.log(`[EventClient] Connected to SSE server as ${this.options.clientId}`);
  }

  // Gestion des erreurs de connexion
  private handleError(error: Event): void {
    console.error('[EventClient] SSE connection error:', error);

    this.isConnected = false;
    this.eventEmitter.emit(ClientInternalEvent.ERROR, error);

    // Tentative de reconnexion
    this.scheduleReconnect();
  }

  // Programmer une reconnexion
  private scheduleReconnect(): void {
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
  private attemptReconnect(): void {
    console.log(`[EventClient] Attempting to reconnect (${this.retryCount}/${this.options.maxRetries})`);

    this.connect().catch((error) => {
      console.error('[EventClient] Reconnection failed:', error);
      this.scheduleReconnect();
    });
  }

  // Démarrer le heartbeat
  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      if (this.isConnected) {
        this.eventEmitter.emit(ClientInternalEvent.HEARTBEAT);
      }
    }, this.options.heartbeatInterval);
  }

  // Arrêter le heartbeat
  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = undefined;
    }
  }

  // Nettoyer le timeout de reconnexion
  private clearReconnectTimeout(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = undefined;
    }
  }

  // Configuration des gestionnaires d'événements internes
  private setupInternalEventHandlers(): void {
    // Nettoyer à la déconnexion
    this.eventEmitter.on(ClientInternalEvent.DISCONNECTED, () => {
      this.stopHeartbeat();
      this.clearReconnectTimeout();
    });
  }

  // Obtenir l'URL par défaut du serveur SSE
  private getDefaultURL(): string {
    const protocol = globalThis.location.protocol === 'https:' ? 'https:' : 'http:';
    const host = globalThis.location.host;
    return `${protocol}//${host}/events`;
  }

  // Générer un ID client unique
  private generateClientId(): string {
    return `client_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }
}

// Instance singleton du client d'événements
export const eventClient = new EventClient();

// Export par défaut
export default eventClient;
