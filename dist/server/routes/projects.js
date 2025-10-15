import { ProjectService } from '../services/ProjectService';
const projectService = new ProjectService();
// GET /api/projects - Liste tous les projets
export const listProjects = async (req, res) => {
  try {
    const projects = await projectService.listProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ error: 'Failed to list projects' });
  }
};
// GET /api/projects/scan - Scanner les projets
export const scanProjects = async (req, res) => {
  try {
    const basePath = req.query.path || process.cwd();
    const projects = await projectService.scanForProjects(basePath);
    // Synchroniser avec la base de données
    for (const project of projects) {
      await projectService.syncProjectToDatabase(project);
    }
    res.json(projects);
  } catch (error) {
    console.error('Error scanning projects:', error);
    res.status(500).json({ error: 'Failed to scan projects' });
  }
};
// GET /api/projects/:id - Obtenir un projet spécifique
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProject(id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: 'Failed to get project' });
  }
};
// GET /api/projects/active - Obtenir le projet actif
export const getActiveProject = async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const project = await projectService.getActiveProject(userId);
    if (!project) {
      return res.status(404).json({ error: 'No active project found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error getting active project:', error);
    res.status(500).json({ error: 'Failed to get active project' });
  }
};
// POST /api/projects/:id/set-active - Définir le projet actif
export const setActiveProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 'default';
    await projectService.setActiveProject(id, userId);
    // Retourner le projet mis à jour
    const project = await projectService.getProject(id);
    res.json(project);
  } catch (error) {
    console.error('Error setting active project:', error);
    res.status(500).json({ error: 'Failed to set active project' });
  }
};
// DELETE /api/projects/active - Effacer le projet actif
export const clearActiveProject = async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    await projectService.clearActiveProject(userId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error clearing active project:', error);
    res.status(500).json({ error: 'Failed to clear active project' });
  }
};
// POST /api/projects/:id/switch - Basculer vers un projet
export const switchToProject = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId || 'default';
    const project = await projectService.switchToProject(id, userId);
    res.json(project);
  } catch (error) {
    console.error('Error switching to project:', error);
    res.status(500).json({ error: 'Failed to switch to project' });
  }
};
// GET /api/projects/history - Obtenir l'historique de navigation
export const getProjectNavigationHistory = async (req, res) => {
  try {
    const userId = req.query.userId || 'default';
    const limit = parseInt(req.query.limit) || 10;
    const projects = await projectService.getProjectNavigationHistory(userId, limit);
    res.json(projects);
  } catch (error) {
    console.error('Error getting navigation history:', error);
    res.status(500).json({ error: 'Failed to get navigation history' });
  }
};
// POST /api/projects - Créer un nouveau projet
export const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const project = await projectService.createProject(projectData);
    // Synchroniser avec la base de données
    await projectService.syncProjectToDatabase(project);
    res.status(201).json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};
// PUT /api/projects/:id - Mettre à jour un projet
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const project = await projectService.updateProject(id, updates);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
};
// DELETE /api/projects/:id - Supprimer un projet
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await projectService.deleteProject(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
//# sourceMappingURL=projects.js.map
