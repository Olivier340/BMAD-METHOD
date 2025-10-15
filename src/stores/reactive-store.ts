// Reactive Store for BMAD Visual Studio
// Provides reactive state management with real-time updates via SSE

import { EventEmitter } from 'node:events';
import { eventClient, ClientEventType, ClientEventData } from '../clients/event-client';

// Interface pour les données d'état réactif
export interface ReactiveState {
  projects: {
    list: any[];
    activeProject: any | null;
    loading: boolean;
    error: string | null;
  };
  workflows: {
    executions: any[];
    currentExecution: any | null;
    loading: boolean;
    error: string | null;
  };
  agents: {
    activeAgents: any[];
    sessions: any[];
    loading: boolean;
    error: string | null;
  };
  system: {
    notifications: any[];
    status: 'online' | 'offline' | 'error';
    connectionCount: number;
    lastUpdate: Date | null;
  };
}

// Interface pour les abonnements d'état
export interface StateSubscription {
  id: string;
  selector: (state: ReactiveState) => any;
  callback: (value: any) => void;
}

// Store réactif
export class ReactiveStore {
  private state: ReactiveState;
  private eventEmitter: EventEmitter;
  private subscriptions: Map<string, StateSubscription> = new Map();
  private isConnected: boolean = false;

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.eventEmitter.setMaxListeners(100);

    // État initial
    this.state = {
      projects: {
        list: [],
        activeProject: null,
        loading: false,
        error: null,
      },
      workflows: {
        executions: [],
        currentExecution: null,
        loading: false,
        error: null,
      },
      agents: {
        activeAgents: [],
        sessions: [],
        loading: false,
        error: null,
      },
      system: {
        notifications: [],
        status: 'offline',
        connectionCount: 0,
        lastUpdate: null,
      },
    };

    this.setupEventListeners();
    this.connectToEvents();
  }

  // Connexion aux événements SSE
  private async connectToEvents(): Promise<void> {
    try {
      await eventClient.connect();

      this.isConnected = true;
      this.updateSystemStatus('online');

      console.log('[ReactiveStore] Connected to SSE events');
    } catch (error) {
      console.error('[ReactiveStore] Failed to connect to SSE events:', error);
      this.updateSystemStatus('error');
    }
  }

  // Configuration des gestionnaires d'événements SSE
  private setupEventListeners(): void {
    // Gestionnaire générique pour les événements système
    eventClient.subscribe(ClientEventType.SYSTEM_STATUS, (eventData: ClientEventData) => {
      this.handleSystemEvent(eventData);
    });

    eventClient.subscribe(ClientEventType.SYSTEM_NOTIFICATION, (eventData: ClientEventData) => {
      this.handleSystemNotification(eventData);
    });

    // Gestionnaire pour les événements de projets
    eventClient.subscribe(ClientEventType.PROJECT_CREATED, (eventData: ClientEventData) => {
      this.handleProjectEvent('created', eventData);
    });

    eventClient.subscribe(ClientEventType.PROJECT_UPDATED, (eventData: ClientEventData) => {
      this.handleProjectEvent('updated', eventData);
    });

    eventClient.subscribe(ClientEventType.PROJECT_DELETED, (eventData: ClientEventData) => {
      this.handleProjectEvent('deleted', eventData);
    });

    // Gestionnaire pour les événements de workflows
    eventClient.subscribe(ClientEventType.WORKFLOW_STARTED, (eventData: ClientEventData) => {
      this.handleWorkflowEvent('started', eventData);
    });

    eventClient.subscribe(ClientEventType.WORKFLOW_COMPLETED, (eventData: ClientEventData) => {
      this.handleWorkflowEvent('completed', eventData);
    });

    eventClient.subscribe(ClientEventType.WORKFLOW_FAILED, (eventData: ClientEventData) => {
      this.handleWorkflowEvent('failed', eventData);
    });

    // Gestionnaire pour les événements d'agents
    eventClient.subscribe(ClientEventType.AGENT_EXECUTED, (eventData: ClientEventData) => {
      this.handleAgentEvent('executed', eventData);
    });

    eventClient.subscribe(ClientEventType.AGENT_COMPLETED, (eventData: ClientEventData) => {
      this.handleAgentEvent('completed', eventData);
    });

    eventClient.subscribe(ClientEventType.AGENT_ERROR, (eventData: ClientEventData) => {
      this.handleAgentEvent('error', eventData);
    });

    // Gestionnaire pour les événements d'intégration IDE
    eventClient.subscribe(ClientEventType.IDE_CONNECTION, (eventData: ClientEventData) => {
      this.handleIDEEvent('connection', eventData);
    });

    eventClient.subscribe(ClientEventType.IDE_DISCONNECTION, (eventData: ClientEventData) => {
      this.handleIDEEvent('disconnection', eventData);
    });

    eventClient.subscribe(ClientEventType.IDE_FILE_CHANGED, (eventData: ClientEventData) => {
      this.handleIDEEvent('file:changed', eventData);
    });

    // Gestionnaire pour les événements internes du client
    eventClient.onInternalEvent('connected', () => {
      this.updateSystemStatus('online');
    });

    eventClient.onInternalEvent('disconnected', () => {
      this.updateSystemStatus('offline');
    });

    eventClient.onInternalEvent('error', () => {
      this.updateSystemStatus('error');
    });
  }

  // Gestionnaire d'événements système
  private handleSystemEvent(eventData: ClientEventData): void {
    const { data } = eventData;

    this.updateState('system', {
      status: data.status || this.state.system.status,
      lastUpdate: new Date(),
    });

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit('system:status', data);
  }

  // Gestionnaire de notifications système
  private handleSystemNotification(eventData: ClientEventData): void {
    const { data } = eventData;
    const notification = {
      id: eventData.id,
      type: data.type || 'info',
      message: data.message || '',
      timestamp: eventData.timestamp,
      source: eventData.source,
    };

    // Ajouter la notification à la liste (max 50)
    const notifications = [notification, ...this.state.system.notifications].slice(0, 50);

    this.updateState('system', {
      notifications,
      lastUpdate: new Date(),
    });

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit('system:notification', notification);

    // Auto-suppression des notifications après 10 secondes
    setTimeout(() => {
      this.removeNotification(notification.id);
    }, 10_000);
  }

  // Gestionnaire d'événements de projets
  private handleProjectEvent(action: string, eventData: ClientEventData): void {
    const { data } = eventData;

    switch (action) {
      case 'created': {
        // Ajouter le projet à la liste
        if (data.projectId && data.name) {
          const newProject = {
            id: data.projectId,
            name: data.name,
            path: data.path,
            modules: data.modules || [],
            status: { phase: 'unknown', status: 'not-started' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };

          this.updateState('projects', {
            list: [...this.state.projects.list, newProject],
            lastUpdate: new Date(),
          });
        }
        break;
      }

      case 'updated': {
        // Mettre à jour le projet existant
        if (data.projectId) {
          const updatedList = this.state.projects.list.map((project) =>
            project.id === data.projectId ? { ...project, ...data.changes, updated_at: new Date().toISOString() } : project,
          );

          this.updateState('projects', {
            list: updatedList,
            lastUpdate: new Date(),
          });
        }
        break;
      }

      case 'deleted': {
        // Supprimer le projet de la liste
        if (data.projectId) {
          const filteredList = this.state.projects.list.filter((project) => project.id !== data.projectId);

          this.updateState('projects', {
            list: filteredList,
            lastUpdate: new Date(),
          });
        }
        break;
      }
    }

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`projects:${action}`, data);
  }

  // Gestionnaire d'événements de workflows
  private handleWorkflowEvent(action: string, eventData: ClientEventData): void {
    const { data } = eventData;

    switch (action) {
      case 'started': {
        // Ajouter l'exécution en cours
        if (data.executionId && data.workflowName) {
          const newExecution = {
            id: data.executionId,
            projectId: data.projectId,
            workflowId: data.workflowId,
            workflowName: data.workflowName,
            status: 'running',
            startedAt: new Date().toISOString(),
            params: data.params,
          };

          this.updateState('workflows', {
            executions: [newExecution, ...this.state.workflows.executions],
            currentExecution: newExecution,
            lastUpdate: new Date(),
          });
        }
        break;
      }

      case 'completed':
      case 'failed': {
        // Mettre à jour le statut de l'exécution
        if (data.executionId) {
          const updatedExecutions = this.state.workflows.executions.map((execution) =>
            execution.id === data.executionId
              ? {
                  ...execution,
                  status: action === 'completed' ? 'completed' : 'failed',
                  completedAt: new Date().toISOString(),
                  results: data.results,
                }
              : execution,
          );

          this.updateState('workflows', {
            executions: updatedExecutions,
            currentExecution: null,
            lastUpdate: new Date(),
          });
        }
        break;
      }
    }

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`workflows:${action}`, data);
  }

  // Gestionnaire d'événements d'agents
  private handleAgentEvent(action: string, eventData: ClientEventData): void {
    const { data } = eventData;

    switch (action) {
      case 'executed': {
        // Ajouter l'agent à la liste des actifs
        if (data.agentId && data.agentName) {
          const newAgent = {
            id: data.agentId,
            name: data.agentName,
            status: 'active',
            lastSeen: new Date().toISOString(),
          };

          const existingAgents = this.state.agents.activeAgents.filter((agent) => agent.id !== data.agentId);

          this.updateState('agents', {
            activeAgents: [...existingAgents, newAgent],
            lastUpdate: new Date(),
          });
        }
        break;
      }

      case 'completed': {
        // Retirer l'agent de la liste des actifs
        if (data.agentId) {
          const filteredAgents = this.state.agents.activeAgents.filter((agent) => agent.id !== data.agentId);

          this.updateState('agents', {
            activeAgents: filteredAgents,
            lastUpdate: new Date(),
          });
        }
        break;
      }
    }

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`agents:${action}`, data);
  }

  // Gestionnaire d'événements IDE
  private handleIDEEvent(action: string, eventData: ClientEventData): void {
    const { data } = eventData;

    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`ide:${action}`, data);
  }

  // Mise à jour de l'état système
  private updateSystemStatus(status: 'online' | 'offline' | 'error'): void {
    this.updateState('system', {
      status,
      lastUpdate: new Date(),
    });
  }

  // Supprimer une notification
  private removeNotification(notificationId: string): void {
    const filteredNotifications = this.state.system.notifications.filter((notification) => notification.id !== notificationId);

    this.updateState('system', {
      notifications: filteredNotifications,
    });
  }

  // Mise à jour générique de l'état
  private updateState<K extends keyof ReactiveState>(section: K, updates: Partial<ReactiveState[K]>): void {
    this.state[section] = { ...this.state[section], ...updates };

    // Notifier les abonnés locaux
    this.eventEmitter.emit('state:updated', { section, updates });
    this.eventEmitter.emit(`${section}:updated`, updates);
  }

  // API publique

  // Obtenir l'état actuel
  public getState(): ReactiveState {
    return { ...this.state };
  }

  // Obtenir une section spécifique de l'état
  public getStateSection<K extends keyof ReactiveState>(section: K): ReactiveState[K] {
    return { ...this.state[section] };
  }

  // S'abonner aux changements d'état
  public subscribe(subscriptionId: string, selector: (state: ReactiveState) => any, callback: (value: any) => void): void {
    this.subscriptions.set(subscriptionId, {
      id: subscriptionId,
      selector,
      callback,
    });

    // Appeler immédiatement avec la valeur actuelle
    const currentValue = selector(this.state);
    callback(currentValue);

    console.log(`[ReactiveStore] Subscription added: ${subscriptionId}`);
  }

  // Se désabonner des changements d'état
  public unsubscribe(subscriptionId: string): void {
    this.subscriptions.delete(subscriptionId);
    console.log(`[ReactiveStore] Subscription removed: ${subscriptionId}`);
  }

  // S'abonner aux événements locaux
  public on(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.on(event, callback);
  }

  // Se désabonner des événements locaux
  public off(event: string, callback: (...args: any[]) => void): void {
    this.eventEmitter.off(event, callback);
  }

  // Mettre à jour manuellement une section d'état
  public updateStateSection<K extends keyof ReactiveState>(section: K, updates: Partial<ReactiveState[K]>): void {
    this.updateState(section, updates);
  }

  // Ajouter une notification manuellement
  public addNotification(type: 'info' | 'success' | 'warning' | 'error', message: string): void {
    const notification = {
      id: `notification_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
      type,
      message,
      timestamp: new Date(),
      source: 'manual',
    };

    this.handleSystemNotification({
      id: notification.id,
      type: ClientEventType.SYSTEM_NOTIFICATION,
      timestamp: new Date(),
      source: 'manual',
      data: { type, message },
    });
  }

  // Obtenir les statistiques du store
  public getStats(): {
    isConnected: boolean;
    subscriptions: number;
    systemStatus: string;
    connectionCount: number;
  } {
    return {
      isConnected: this.isConnected,
      subscriptions: this.subscriptions.size,
      systemStatus: this.state.system.status,
      connectionCount: this.state.system.connectionCount,
    };
  }
}

// Instance singleton du store réactif
export const reactiveStore = new ReactiveStore();

// Export par défaut
export default reactiveStore;
