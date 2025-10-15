// Reactive Store for BMAD Visual Studio
// Provides reactive state management with real-time updates via SSE
import { EventEmitter } from 'events';
import { eventClient, ClientEventType } from '../clients/event-client';
// Store réactif
export class ReactiveStore {
  state;
  eventEmitter;
  subscriptions = new Map();
  isConnected = false;
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
  async connectToEvents() {
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
  setupEventListeners() {
    // Gestionnaire générique pour les événements système
    eventClient.subscribe(ClientEventType.SYSTEM_STATUS, (eventData) => {
      this.handleSystemEvent(eventData);
    });
    eventClient.subscribe(ClientEventType.SYSTEM_NOTIFICATION, (eventData) => {
      this.handleSystemNotification(eventData);
    });
    // Gestionnaire pour les événements de projets
    eventClient.subscribe(ClientEventType.PROJECT_CREATED, (eventData) => {
      this.handleProjectEvent('created', eventData);
    });
    eventClient.subscribe(ClientEventType.PROJECT_UPDATED, (eventData) => {
      this.handleProjectEvent('updated', eventData);
    });
    eventClient.subscribe(ClientEventType.PROJECT_DELETED, (eventData) => {
      this.handleProjectEvent('deleted', eventData);
    });
    // Gestionnaire pour les événements de workflows
    eventClient.subscribe(ClientEventType.WORKFLOW_STARTED, (eventData) => {
      this.handleWorkflowEvent('started', eventData);
    });
    eventClient.subscribe(ClientEventType.WORKFLOW_COMPLETED, (eventData) => {
      this.handleWorkflowEvent('completed', eventData);
    });
    eventClient.subscribe(ClientEventType.WORKFLOW_FAILED, (eventData) => {
      this.handleWorkflowEvent('failed', eventData);
    });
    // Gestionnaire pour les événements d'agents
    eventClient.subscribe(ClientEventType.AGENT_EXECUTED, (eventData) => {
      this.handleAgentEvent('executed', eventData);
    });
    eventClient.subscribe(ClientEventType.AGENT_COMPLETED, (eventData) => {
      this.handleAgentEvent('completed', eventData);
    });
    eventClient.subscribe(ClientEventType.AGENT_ERROR, (eventData) => {
      this.handleAgentEvent('error', eventData);
    });
    // Gestionnaire pour les événements d'intégration IDE
    eventClient.subscribe(ClientEventType.IDE_CONNECTION, (eventData) => {
      this.handleIDEEvent('connection', eventData);
    });
    eventClient.subscribe(ClientEventType.IDE_DISCONNECTION, (eventData) => {
      this.handleIDEEvent('disconnection', eventData);
    });
    eventClient.subscribe(ClientEventType.IDE_FILE_CHANGED, (eventData) => {
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
  handleSystemEvent(eventData) {
    const { data } = eventData;
    this.updateState('system', {
      status: data.status || this.state.system.status,
      lastUpdate: new Date(),
    });
    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit('system:status', data);
  }
  // Gestionnaire de notifications système
  handleSystemNotification(eventData) {
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
    }, 10000);
  }
  // Gestionnaire d'événements de projets
  handleProjectEvent(action, eventData) {
    const { data } = eventData;
    switch (action) {
      case 'created':
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
      case 'updated':
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
      case 'deleted':
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
    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`projects:${action}`, data);
  }
  // Gestionnaire d'événements de workflows
  handleWorkflowEvent(action, eventData) {
    const { data } = eventData;
    switch (action) {
      case 'started':
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
      case 'completed':
      case 'failed':
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
    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`workflows:${action}`, data);
  }
  // Gestionnaire d'événements d'agents
  handleAgentEvent(action, eventData) {
    const { data } = eventData;
    switch (action) {
      case 'executed':
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
      case 'completed':
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
    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`agents:${action}`, data);
  }
  // Gestionnaire d'événements IDE
  handleIDEEvent(action, eventData) {
    const { data } = eventData;
    // Émettre l'événement aux abonnés locaux
    this.eventEmitter.emit(`ide:${action}`, data);
  }
  // Mise à jour de l'état système
  updateSystemStatus(status) {
    this.updateState('system', {
      status,
      lastUpdate: new Date(),
    });
  }
  // Supprimer une notification
  removeNotification(notificationId) {
    const filteredNotifications = this.state.system.notifications.filter((notification) => notification.id !== notificationId);
    this.updateState('system', {
      notifications: filteredNotifications,
    });
  }
  // Mise à jour générique de l'état
  updateState(section, updates) {
    this.state[section] = { ...this.state[section], ...updates };
    // Notifier les abonnés locaux
    this.eventEmitter.emit('state:updated', { section, updates });
    this.eventEmitter.emit(`${section}:updated`, updates);
  }
  // API publique
  // Obtenir l'état actuel
  getState() {
    return { ...this.state };
  }
  // Obtenir une section spécifique de l'état
  getStateSection(section) {
    return { ...this.state[section] };
  }
  // S'abonner aux changements d'état
  subscribe(subscriptionId, selector, callback) {
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
  unsubscribe(subscriptionId) {
    this.subscriptions.delete(subscriptionId);
    console.log(`[ReactiveStore] Subscription removed: ${subscriptionId}`);
  }
  // S'abonner aux événements locaux
  on(event, callback) {
    this.eventEmitter.on(event, callback);
  }
  // Se désabonner des événements locaux
  off(event, callback) {
    this.eventEmitter.off(event, callback);
  }
  // Mettre à jour manuellement une section d'état
  updateStateSection(section, updates) {
    this.updateState(section, updates);
  }
  // Ajouter une notification manuellement
  addNotification(type, message) {
    const notification = {
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
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
  getStats() {
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
//# sourceMappingURL=reactive-store.js.map
