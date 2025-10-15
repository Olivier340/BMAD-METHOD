import { Router } from 'express';
import { ProjectService } from '../services/ProjectService';
import { eventEmitter } from './events';

export const projectsRouter: Router = Router();
const projectService = new ProjectService();

// GET /api/projects - Liste tous les projets
projectsRouter.get('/', async (req, res) => {
  try {
    const projects = await projectService.listProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ error: 'Failed to list projects' });
  }
});

// GET /api/projects/scan - Scan pour de nouveaux projets
projectsRouter.get('/scan', async (req, res) => {
  try {
    const basePath = (req.query.path as string) || process.cwd();
    const projects = await projectService.scanForProjects(basePath);

    // Emit event for real-time updates
    eventEmitter.emit('project-updated', { type: 'scan-completed', projects });

    res.json(projects);
  } catch (error) {
    console.error('Error scanning projects:', error);
    res.status(500).json({ error: 'Failed to scan projects' });
  }
});

// GET /api/projects/:id - Détails d'un projet
projectsRouter.get('/:id', async (req, res) => {
  try {
    const project = await projectService.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
});

// POST /api/projects - Créer un nouveau projet
projectsRouter.post('/', async (req, res) => {
  try {
    const project = await projectService.createProject(req.body);

    // Emit event for real-time updates
    eventEmitter.emit('project-updated', { type: 'created', project });

    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id - Mettre à jour un projet
projectsRouter.put('/:id', async (req, res) => {
  try {
    const project = await projectService.updateProject(req.params.id, req.body);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Emit event for real-time updates
    eventEmitter.emit('project-updated', { type: 'updated', project });

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id - Supprimer un projet
projectsRouter.delete('/:id', async (req, res) => {
  try {
    const success = await projectService.deleteProject(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Emit event for real-time updates
    eventEmitter.emit('project-updated', { type: 'deleted', id: req.params.id });

    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// GET /api/projects/:id/status - Statut du projet
projectsRouter.get('/:id/status', async (req, res) => {
  try {
    const status = await projectService.getProjectStatus(req.params.id);
    res.json(status);
  } catch (error) {
    console.error('Error getting project status:', error);
    res.status(500).json({ error: 'Failed to get project status' });
  }
});

// === GESTION DU CONTEXTE ACTIF ===

// GET /api/projects/active - Obtenir le projet actif
projectsRouter.get('/active', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'default';
    const project = await projectService.getActiveProject(userId);

    if (!project) {
      return res.status(404).json({ error: 'No active project found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error getting active project:', error);
    res.status(500).json({ error: 'Failed to get active project' });
  }
});

// POST /api/projects/:id/set-active - Définir le projet actif
projectsRouter.post('/:id/set-active', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 'default';

    await projectService.setActiveProject(id, userId);

    // Emit event for real-time updates
    eventEmitter.emit('project-context-changed', { type: 'active-changed', projectId: id, userId });

    // Retourner le projet mis à jour
    const project = await projectService.getProject(id);
    res.json(project);
  } catch (error) {
    console.error('Error setting active project:', error);
    res.status(500).json({ error: 'Failed to set active project' });
  }
});

// DELETE /api/projects/active - Effacer le projet actif
projectsRouter.delete('/active', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'default';
    await projectService.clearActiveProject(userId);

    // Emit event for real-time updates
    eventEmitter.emit('project-context-changed', { type: 'active-cleared', userId });

    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing active project:', error);
    res.status(500).json({ error: 'Failed to clear active project' });
  }
});

// POST /api/projects/:id/switch - Basculer vers un projet
projectsRouter.post('/:id/switch', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 'default';

    const project = await projectService.switchToProject(id, userId);

    // Emit event for real-time updates
    eventEmitter.emit('project-context-changed', { type: 'switched', projectId: id, userId });

    res.json(project);
  } catch (error) {
    console.error('Error switching to project:', error);
    res.status(500).json({ error: 'Failed to switch to project' });
  }
});

// GET /api/projects/history - Obtenir l'historique de navigation
projectsRouter.get('/history', async (req, res) => {
  try {
    const userId = (req.query.userId as string) || 'default';
    const limit = Number.parseInt(req.query.limit as string) || 10;

    const projects = await projectService.getProjectNavigationHistory(userId, limit);
    res.json(projects);
  } catch (error) {
    console.error('Error getting navigation history:', error);
    res.status(500).json({ error: 'Failed to get navigation history' });
  }
});
