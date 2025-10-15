import { Router } from 'express';
import { WorkflowService } from '../services/WorkflowService';
import { eventEmitter } from './events';

export const workflowsRouter: Router = Router();
const workflowService = new WorkflowService();

// GET /api/workflows/:projectId - Liste tous les workflows d'un projet
workflowsRouter.get('/:projectId', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const workflows = await workflowService.discoverWorkflows((req.query.path as string) || process.cwd());
    res.json(workflows);
  } catch (error) {
    console.error('Error discovering workflows:', error);
    res.status(500).json({ error: 'Failed to discover workflows' });
  }
});

// POST /api/workflows/:projectId/execute - Exécuter un workflow
workflowsRouter.post('/:projectId/execute', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const { workflowId, params } = req.body;

    if (!workflowId) {
      return res.status(400).json({ error: 'workflowId is required' });
    }

    const execution = await workflowService.executeWorkflow(projectId, workflowId, params || {});

    // Emit event for real-time updates
    eventEmitter.emit('workflow-started', execution);

    res.status(201).json(execution);
  } catch (error) {
    console.error('Error executing workflow:', error);
    res.status(500).json({ error: 'Failed to execute workflow' });
  }
});

// GET /api/workflows/:projectId/executions - Historique des exécutions
workflowsRouter.get('/:projectId/executions', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const executions = await workflowService.getExecutions(projectId);
    res.json(executions);
  } catch (error) {
    console.error('Error getting executions:', error);
    res.status(500).json({ error: 'Failed to get executions' });
  }
});

// GET /api/workflows/:projectId/phases - Obtenir les phases disponibles
workflowsRouter.get('/:projectId/phases', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const projectPath = (req.query.path as string) || process.cwd();
    const phases = await workflowService.getAvailablePhases(projectPath);
    res.json(phases);
  } catch (error) {
    console.error('Error getting phases:', error);
    res.status(500).json({ error: 'Failed to get phases' });
  }
});

// GET /api/workflows/:projectId/phase/:phase - Workflows d'une phase spécifique
workflowsRouter.get('/:projectId/phase/:phase', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const { phase } = req.params;
    const projectPath = (req.query.path as string) || process.cwd();
    const workflows = await workflowService.getWorkflowsByPhase(projectPath, phase);
    res.json(workflows);
  } catch (error) {
    console.error('Error getting workflows by phase:', error);
    res.status(500).json({ error: 'Failed to get workflows by phase' });
  }
});

// GET /api/workflows/:projectId/workflow/:workflowId - Détails d'un workflow spécifique
workflowsRouter.get('/:projectId/workflow/:workflowId', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const { workflowId } = req.params;
    const projectPath = (req.query.path as string) || process.cwd();
    const workflow = await workflowService.getWorkflowById(projectPath, workflowId);

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    // Validate prerequisites
    const validation = await workflowService.validateWorkflowPrerequisites(workflow, projectPath);

    res.json({
      ...workflow,
      prerequisites: validation,
    });
  } catch (error) {
    console.error('Error getting workflow details:', error);
    res.status(500).json({ error: 'Failed to get workflow details' });
  }
});

// GET /api/workflows/:projectId/search - Rechercher des workflows
workflowsRouter.get('/:projectId/search', async (req, res) => {
  try {
    const { projectId: _projectId } = req.params;
    const query = req.query.q as string;
    const phase = req.query.phase as string;
    const projectPath = (req.query.path as string) || process.cwd();

    if (!query) {
      return res.status(400).json({ error: 'Query parameter q is required' });
    }

    const workflows = await workflowService.discoverWorkflows(projectPath);
    const filteredWorkflows = workflows.filter((workflow) => {
      const matchesQuery =
        workflow.name.toLowerCase().includes(query.toLowerCase()) || workflow.description.toLowerCase().includes(query.toLowerCase());
      const matchesPhase = !phase || workflow.phase === phase;
      return matchesQuery && matchesPhase;
    });

    res.json(filteredWorkflows);
  } catch (error) {
    console.error('Error searching workflows:', error);
    res.status(500).json({ error: 'Failed to search workflows' });
  }
});
