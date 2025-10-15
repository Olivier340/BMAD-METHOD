import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();
export function handleSSE(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });
  const sendEvent = (data) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };
  // Envoie un événement initial
  sendEvent({ type: 'connected', timestamp: Date.now() });
  // Écoute les événements du système
  const handlers = {
    'workflow-started': (data) => sendEvent({ type: 'workflow-started', data }),
    'workflow-completed': (data) => sendEvent({ type: 'workflow-completed', data }),
    'workflow-progress': (data) => sendEvent({ type: 'workflow-progress', data }),
    'agent-activated': (data) => sendEvent({ type: 'agent-activated', data }),
    'metrics-updated': (data) => sendEvent({ type: 'metrics-updated', data }),
    'project-updated': (data) => sendEvent({ type: 'project-updated', data }),
  };
  Object.entries(handlers).forEach(([event, handler]) => {
    eventEmitter.on(event, handler);
  });
  // Cleanup à la déconnexion
  req.on('close', () => {
    Object.entries(handlers).forEach(([event, handler]) => {
      eventEmitter.off(event, handler);
    });
  });
  // Keep connection alive
  const keepAlive = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 30000);
  req.on('close', () => {
    clearInterval(keepAlive);
  });
}
// Export pour permettre l'émission d'événements
export { eventEmitter };
//# sourceMappingURL=events.js.map
