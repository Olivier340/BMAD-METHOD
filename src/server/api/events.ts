import { Request, Response } from 'express';
import { EventEmitter } from 'node:events';

const eventEmitter = new EventEmitter();

export function handleSSE(req: Request, res: Response) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Cache-Control',
  });

  const sendEvent = (data: Record<string, unknown>) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  // Envoie un événement initial
  sendEvent({ type: 'connected', timestamp: Date.now() });

  // Écoute les événements du système
  const handlers = {
    'workflow-started': (data: Record<string, unknown>) => sendEvent({ type: 'workflow-started', data }),
    'workflow-completed': (data: Record<string, unknown>) => sendEvent({ type: 'workflow-completed', data }),
    'workflow-progress': (data: Record<string, unknown>) => sendEvent({ type: 'workflow-progress', data }),
    'agent-activated': (data: Record<string, unknown>) => sendEvent({ type: 'agent-activated', data }),
    'metrics-updated': (data: Record<string, unknown>) => sendEvent({ type: 'metrics-updated', data }),
    'project-updated': (data: Record<string, unknown>) => sendEvent({ type: 'project-updated', data }),
  };

  for (const [event, handler] of Object.entries(handlers)) {
    eventEmitter.on(event, handler);
  }

  // Cleanup à la déconnexion
  req.on('close', () => {
    for (const [event, handler] of Object.entries(handlers)) {
      eventEmitter.off(event, handler);
    }
  });

  // Keep connection alive
  const keepAlive = setInterval(() => {
    res.write(': keepalive\n\n');
  }, 30_000);

  req.on('close', () => {
    clearInterval(keepAlive);
  });
}

// Export pour permettre l'émission d'événements
export { eventEmitter };
