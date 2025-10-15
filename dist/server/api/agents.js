import { Router } from 'express';
import { AgentService } from '../services/AgentService';
const agentService = new AgentService();
export const agentsRouter = Router();
// GET /api/agents/:projectId - Liste tous les agents d'un projet
agentsRouter.get('/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    const projectPath = req.query.path || process.cwd();
    const agents = await agentService.discoverAgents(projectPath);
    res.json(agents);
  } catch (error) {
    console.error('Error discovering agents:', error);
    res.status(500).json({ error: 'Failed to discover agents' });
  }
});
// GET /api/agents/:projectId/active - Agents actifs d'un projet
agentsRouter.get('/:projectId/active', async (req, res) => {
  try {
    const { projectId } = req.params;
    const activeAgents = await agentService.getActiveAgents(projectId);
    res.json(activeAgents);
  } catch (error) {
    console.error('Error getting active agents:', error);
    res.status(500).json({ error: 'Failed to get active agents' });
  }
});
// POST /api/agents/:projectId/activate - Activer un agent
agentsRouter.post('/:projectId/activate', async (req, res) => {
  try {
    const { projectId } = req.params;
    const { agentId, context } = req.body;
    if (!agentId) {
      return res.status(400).json({ error: 'agentId is required' });
    }
    const session = await agentService.activateAgent(agentId, projectId, context);
    // Emit event for real-time updates
    const { eventEmitter } = await import('./events');
    eventEmitter.emit('agent-activated', { projectId, agentId, session });
    res.status(201).json(session);
  } catch (error) {
    console.error('Error activating agent:', error);
    res.status(500).json({ error: error instanceof Error ? error.message : 'Failed to activate agent' });
  }
});
// POST /api/agents/deactivate/:sessionId - Désactiver un agent
agentsRouter.post('/deactivate/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    await agentService.deactivateAgent(sessionId);
    // Emit event for real-time updates
    const { eventEmitter } = await import('./events');
    eventEmitter.emit('agent-deactivated', { sessionId });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deactivating agent:', error);
    res.status(500).json({ error: 'Failed to deactivate agent' });
  }
});
// GET /api/agents/:projectId/sessions - Historique des sessions d'agents
agentsRouter.get('/:projectId/sessions', async (req, res) => {
  try {
    const { projectId } = req.params;
    const sessions = await agentService.getAgentSessions(projectId);
    res.json(sessions);
  } catch (error) {
    console.error('Error getting agent sessions:', error);
    res.status(500).json({ error: 'Failed to get agent sessions' });
  }
});
// GET /api/agents/:projectId/agent/:agentId - Détails d'un agent spécifique
agentsRouter.get('/:projectId/agent/:agentId', async (req, res) => {
  try {
    const { projectId, agentId } = req.params;
    const projectPath = req.query.path || process.cwd();
    const agent = await agentService.getAgentById(projectPath, agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    // Get agent configuration if available
    const config = await agentService.getAgentConfiguration(agentId, projectId);
    res.json({
      ...agent,
      configuration: config,
    });
  } catch (error) {
    console.error('Error getting agent details:', error);
    res.status(500).json({ error: 'Failed to get agent details' });
  }
});
// POST /api/agents/:projectId/agent/:agentId/configure - Configurer un agent
agentsRouter.post('/:projectId/agent/:agentId/configure', async (req, res) => {
  try {
    const { projectId, agentId } = req.params;
    const { settings, preferences, userId } = req.body;
    const config = await agentService.configureAgent(agentId, projectId, userId, settings || {}, preferences || {});
    res.status(201).json(config);
  } catch (error) {
    console.error('Error configuring agent:', error);
    res.status(500).json({ error: 'Failed to configure agent' });
  }
});
// POST /api/agents/:projectId/agent/:agentId/reload - Recharger un agent
agentsRouter.post('/:projectId/agent/:agentId/reload', async (req, res) => {
  try {
    const { agentId } = req.params;
    await agentService.reloadAgent(agentId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error reloading agent:', error);
    res.status(500).json({ error: 'Failed to reload agent' });
  }
});
// GET /api/agents/:projectId/statistics - Statistiques des agents
agentsRouter.get('/:projectId/statistics', async (req, res) => {
  try {
    const { projectId } = req.params;
    const statistics = await agentService.getAgentStatistics(projectId);
    res.json(statistics);
  } catch (error) {
    console.error('Error getting agent statistics:', error);
    res.status(500).json({ error: 'Failed to get agent statistics' });
  }
});
// POST /api/agents/:projectId/agent/:agentId/validate - Valider un agent
agentsRouter.post('/:projectId/agent/:agentId/validate', async (req, res) => {
  try {
    const { projectId, agentId } = req.params;
    const projectPath = req.query.path || process.cwd();
    const agent = await agentService.getAgentById(projectPath, agentId);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    const validation = await agentService.validateAgent(agent);
    res.json(validation);
  } catch (error) {
    console.error('Error validating agent:', error);
    res.status(500).json({ error: 'Failed to validate agent' });
  }
});
//# sourceMappingURL=agents.js.map
