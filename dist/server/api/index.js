import { Router } from 'express';
import { projectsRouter } from './projects';
import { workflowsRouter } from './workflows';
import { agentsRouter } from './agents';
import { authRouter } from './auth';
import { handleSSE } from './events';
export function createAPIRouter() {
  const router = Router();
  // SSE endpoint for real-time updates
  router.get('/events', handleSSE);
  // Auth routes (public)
  router.use('/auth', authRouter);
  // Protected API routes
  router.use('/projects', projectsRouter);
  router.use('/workflows', workflowsRouter);
  router.use('/agents', agentsRouter);
  return router;
}
//# sourceMappingURL=index.js.map
