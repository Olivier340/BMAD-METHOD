import { ProjectService } from '../ProjectService';
import { initDatabase } from '../../database';

describe('ProjectService - Active Context Management', () => {
  let projectService: ProjectService;

  beforeAll(async () => {
    // Initialize database for testing
    await initDatabase();
    projectService = new ProjectService();
  });

  beforeEach(async () => {
    // Clear active context before each test
    await projectService.clearActiveProject('test-user');
  });

  describe('Active Project Context', () => {
    it('should set and get active project', async () => {
      // Create a test project first
      const testProject = await projectService.createProject({
        name: 'Test Project',
        path: '/test/path'
      });

      // Set active project
      await projectService.setActiveProject(testProject.id, 'test-user');

      // Get active project
      const activeProject = await projectService.getActiveProject('test-user');

      expect(activeProject).toBeTruthy();
      expect(activeProject?.id).toBe(testProject.id);
      expect(activeProject?.name).toBe('Test Project');
    });

    it('should clear active project', async () => {
      // Create and set active project
      const testProject = await projectService.createProject({
        name: 'Test Project',
        path: '/test/path'
      });
      await projectService.setActiveProject(testProject.id, 'test-user');

      // Verify it's set
      let activeProject = await projectService.getActiveProject('test-user');
      expect(activeProject).toBeTruthy();

      // Clear active project
      await projectService.clearActiveProject('test-user');

      // Verify it's cleared
      activeProject = await projectService.getActiveProject('test-user');
      expect(activeProject).toBeNull();
    });

    it('should switch to project', async () => {
      // Create two test projects
      const project1 = await projectService.createProject({
        name: 'Project 1',
        path: '/test/path1'
      });
      const project2 = await projectService.createProject({
        name: 'Project 2',
        path: '/test/path2'
      });

      // Switch to first project
      let switchedProject = await projectService.switchToProject(project1.id, 'test-user');
      expect(switchedProject.id).toBe(project1.id);

      // Verify it's active
      let activeProject = await projectService.getActiveProject('test-user');
      expect(activeProject?.id).toBe(project1.id);

      // Switch to second project
      switchedProject = await projectService.switchToProject(project2.id, 'test-user');
      expect(switchedProject.id).toBe(project2.id);

      // Verify switch occurred
      activeProject = await projectService.getActiveProject('test-user');
      expect(activeProject?.id).toBe(project2.id);
    });

    it('should maintain navigation history', async () => {
      // Create test projects
      const project1 = await projectService.createProject({
        name: 'Project 1',
        path: '/test/path1'
      });
      const project2 = await projectService.createProject({
        name: 'Project 2',
        path: '/test/path2'
      });

      // Switch between projects to build history
      await projectService.switchToProject(project1.id, 'test-user');
      await projectService.switchToProject(project2.id, 'test-user');

      // Get navigation history
      const history = await projectService.getProjectNavigationHistory('test-user', 10);

      expect(history.length).toBeGreaterThanOrEqual(2);
      expect(history[0].id).toBe(project2.id); // Most recent first
      expect(history[1].id).toBe(project1.id);
    });

    it('should handle non-existent project gracefully', async () => {
      const fakeProjectId = 'non-existent-id';

      await expect(
        projectService.setActiveProject(fakeProjectId, 'test-user')
      ).rejects.toThrow('Project not found');
    });

    it('should support multiple users with independent contexts', async () => {
      // Create test project
      const testProject = await projectService.createProject({
        name: 'Test Project',
        path: '/test/path'
      });

      // Set active project for user 1
      await projectService.setActiveProject(testProject.id, 'user1');

      // Set different active project for user 2
      const project2 = await projectService.createProject({
        name: 'Project 2',
        path: '/test/path2'
      });
      await projectService.setActiveProject(project2.id, 'user2');

      // Verify users have different active projects
      const user1Active = await projectService.getActiveProject('user1');
      const user2Active = await projectService.getActiveProject('user2');

      expect(user1Active?.id).toBe(testProject.id);
      expect(user2Active?.id).toBe(project2.id);
    });
  });
});
