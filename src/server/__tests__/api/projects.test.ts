const request = require('supertest');
const express = require('express');
const projectsRouter = require('../../api/projects');
const ProjectService = require('../../services/ProjectService');
const initDatabase = require('../../database').initDatabase;

// Mock the ProjectService
jest.mock('../../services/ProjectService');

describe('Projects API Routes', () => {
  let app;
  let projectService;

  beforeAll(async () => {
    // Initialize database for tests
    await initDatabase();
  });

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/api/projects', projectsRouter);

    // Create a new mock instance for each test
    projectService = {
      listProjects: jest.fn(),
      scanForProjects: jest.fn(),
      getProject: jest.fn(),
      createProject: jest.fn(),
      updateProject: jest.fn(),
      deleteProject: jest.fn(),
      getProjectStatus: jest.fn(),
    };

    // Replace the instance in the router
    projectsRouter.projectService = projectService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/projects', () => {
    it('should return list of projects', async () => {
      const mockProjects = [
        {
          id: '1',
          name: 'Test Project 1',
          path: '/path/to/project1',
          config: {},
          manifest: {},
          modules: [],
          created_at: '2025-10-15T06:52:38.317Z',
          updated_at: '2025-10-15T06:52:38.317Z',
          status: { phase: 'development', status: 'active' },
        },
      ];

      projectService.listProjects = jest.fn().mockResolvedValue(mockProjects);

      const response = await request(app).get('/api/projects').expect(200);

      expect(response.body).toEqual(mockProjects);
      expect(projectService.listProjects).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      projectService.listProjects = jest.fn().mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/projects').expect(500);

      expect(response.body).toEqual({ error: 'Failed to list projects' });
    });
  });

  describe('GET /api/projects/scan', () => {
    it('should scan for projects and return results', async () => {
      const mockProjects = [
        {
          id: '1',
          name: 'Scanned Project',
          path: '/path/to/scanned',
          config: {},
          manifest: {},
          modules: [],
        },
      ];

      projectService.scanForProjects = jest.fn().mockResolvedValue(mockProjects);

      const response = await request(app).get('/api/projects/scan?path=/test/path').expect(200);

      expect(response.body).toEqual(mockProjects);
      expect(projectService.scanForProjects).toHaveBeenCalledWith('/test/path');
    });

    it('should handle scan errors', async () => {
      projectService.scanForProjects = jest.fn().mockRejectedValue(new Error('Scan failed'));

      const response = await request(app).get('/api/projects/scan').expect(500);

      expect(response.body).toEqual({ error: 'Failed to scan projects' });
    });
  });

  describe('GET /api/projects/:id', () => {
    it('should return project by id', async () => {
      const mockProject = {
        id: '1',
        name: 'Test Project',
        path: '/path/to/project',
        config: {},
        manifest: {},
        modules: [],
        created_at: '2025-10-15T06:52:38.317Z',
        updated_at: '2025-10-15T06:52:38.317Z',
        status: { phase: 'development', status: 'active' },
      };

      projectService.getProject = jest.fn().mockResolvedValue(mockProject);

      const response = await request(app).get('/api/projects/1').expect(200);

      expect(response.body).toEqual(mockProject);
      expect(projectService.getProject).toHaveBeenCalledWith('1');
    });

    it('should return 404 for non-existent project', async () => {
      projectService.getProject = jest.fn().mockResolvedValue(null);

      const response = await request(app).get('/api/projects/999').expect(404);

      expect(response.body).toEqual({ error: 'Project not found' });
    });

    it('should handle service errors', async () => {
      projectService.getProject = jest.fn().mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/projects/1').expect(500);

      expect(response.body).toEqual({ error: 'Failed to get project' });
    });
  });

  describe('POST /api/projects', () => {
    it('should create a new project', async () => {
      const newProjectData = {
        name: 'New Project',
        path: '/path/to/new',
        modules: ['core', 'bmm'],
      };

      const createdProject = {
        id: '2',
        name: 'New Project',
        path: '/path/to/new',
        config: {},
        manifest: {},
        modules: ['core', 'bmm'],
        created_at: '2025-10-15T06:52:38.317Z',
        updated_at: '2025-10-15T06:52:38.317Z',
      };

      projectService.createProject = jest.fn().mockResolvedValue(createdProject);

      const response = await request(app).post('/api/projects').send(newProjectData).expect(201);

      expect(response.body).toEqual(createdProject);
      expect(projectService.createProject).toHaveBeenCalledWith(newProjectData);
    });

    it('should handle creation errors', async () => {
      projectService.createProject = jest.fn().mockRejectedValue(new Error('Creation failed'));

      const response = await request(app).post('/api/projects').send({ name: 'Test' }).expect(500);

      expect(response.body).toEqual({ error: 'Failed to create project' });
    });
  });

  describe('PUT /api/projects/:id', () => {
    it('should update existing project', async () => {
      const updateData = { name: 'Updated Project' };
      const updatedProject = {
        id: '1',
        name: 'Updated Project',
        path: '/path/to/project',
        config: {},
        manifest: {},
        modules: [],
        created_at: '2025-10-15T06:52:38.317Z',
        updated_at: '2025-10-15T06:52:38.317Z',
      };

      projectService.updateProject = jest.fn().mockResolvedValue(updatedProject);

      const response = await request(app).put('/api/projects/1').send(updateData).expect(200);

      expect(response.body).toEqual(updatedProject);
      expect(projectService.updateProject).toHaveBeenCalledWith('1', updateData);
    });

    it('should return 404 for non-existent project', async () => {
      projectService.updateProject = jest.fn().mockResolvedValue(null);

      const response = await request(app).put('/api/projects/999').send({ name: 'Updated' }).expect(404);

      expect(response.body).toEqual({ error: 'Project not found' });
    });

    it('should handle update errors', async () => {
      projectService.updateProject = jest.fn().mockRejectedValue(new Error('Update failed'));

      const response = await request(app).put('/api/projects/1').send({ name: 'Updated' }).expect(500);

      expect(response.body).toEqual({ error: 'Failed to update project' });
    });
  });

  describe('DELETE /api/projects/:id', () => {
    it('should delete existing project', async () => {
      projectService.deleteProject = jest.fn().mockResolvedValue(true);

      const response = await request(app).delete('/api/projects/1').expect(200);

      expect(response.body).toEqual({ success: true });
      expect(projectService.deleteProject).toHaveBeenCalledWith('1');
    });

    it('should return 404 for non-existent project', async () => {
      projectService.deleteProject = jest.fn().mockResolvedValue(false);

      const response = await request(app).delete('/api/projects/999').expect(404);

      expect(response.body).toEqual({ error: 'Project not found' });
    });

    it('should handle delete errors', async () => {
      projectService.deleteProject = jest.fn().mockRejectedValue(new Error('Delete failed'));

      const response = await request(app).delete('/api/projects/1').expect(500);

      expect(response.body).toEqual({ error: 'Failed to delete project' });
    });
  });

  describe('GET /api/projects/:id/status', () => {
    it('should return project status', async () => {
      const mockStatus = { phase: 'development', status: 'active' };
      projectService.getProjectStatus = jest.fn().mockResolvedValue(mockStatus);

      const response = await request(app).get('/api/projects/1/status').expect(200);

      expect(response.body).toEqual(mockStatus);
      expect(projectService.getProjectStatus).toHaveBeenCalledWith('1');
    });

    it('should handle status errors', async () => {
      projectService.getProjectStatus = jest.fn().mockRejectedValue(new Error('Status error'));

      const response = await request(app).get('/api/projects/1/status').expect(500);

      expect(response.body).toEqual({ error: 'Failed to get project status' });
    });
  });
});
