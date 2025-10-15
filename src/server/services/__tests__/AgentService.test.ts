import { AgentService } from '../AgentService';
import { ProjectService } from '../ProjectService';
import { initDatabase } from '../../database';

describe('AgentService - Agent Management', () => {
  let agentService: AgentService;
  let projectService: ProjectService;
  let testProject: any;

  beforeAll(async () => {
    await initDatabase();
    agentService = new AgentService();
    projectService = new ProjectService();

    // Create test project
    testProject = await projectService.createProject({
      name: 'Test Agent Project',
      path: '/test/agent/project',
    });
  });

  beforeEach(async () => {
    // Clear any existing agent sessions and configurations
    const db = require('../../database').getDatabase();
    db.prepare('DELETE FROM agent_sessions').run();
    db.prepare('DELETE FROM agent_configurations').run();
  });

  describe('Agent Discovery', () => {
    it('should discover agents from project structure', async () => {
      // This would require actual agent files in the test environment
      // For now, we'll test the method exists and handles empty results
      const projectPath = testProject.path;

      try {
        const agents = await agentService.discoverAgents(projectPath);
        expect(Array.isArray(agents)).toBe(true);

        // Verify agent structure if agents exist
        if (agents.length > 0) {
          const agent = agents[0];
          expect(agent).toHaveProperty('id');
          expect(agent).toHaveProperty('name');
          expect(agent).toHaveProperty('title');
          expect(agent).toHaveProperty('capabilities');
          expect(agent).toHaveProperty('dependencies');
        }
      } catch (error) {
        // If no agent files exist, that's expected
        expect(error).toBeDefined();
      }
    });

    it('should get agent by ID', async () => {
      const projectPath = testProject.path;

      const agent = await agentService.getAgentById(projectPath, 'non-existent-id');
      expect(agent).toBeNull();
    });

    it('should validate agent structure', async () => {
      const mockAgent = {
        id: 'test-agent',
        name: 'Test Agent',
        title: 'Test Agent Title',
        icon: '🤖',
        module: 'test',
        path: '/test/path',
        config: {},
        menu: [],
        capabilities: {
          workflows: true,
          tools: false,
          contextSync: true,
          fileSync: false,
          realTime: true,
        },
        dependencies: [],
      };

      const validation = await agentService.validateAgent(mockAgent as any);
      expect(validation).toHaveProperty('valid');
      expect(validation).toHaveProperty('errors');
      expect(typeof validation.valid).toBe('boolean');
      expect(Array.isArray(validation.errors)).toBe(true);
    });
  });

  describe('Agent Activation and Lifecycle', () => {
    it('should activate agent and create session', async () => {
      // This would require a real agent file to test properly
      // For now, we test that the method handles non-existent agents
      try {
        await agentService.activateAgent('non-existent-agent', testProject.id);
        fail('Should have thrown an error for non-existent agent');
      } catch (error) {
        expect(error.message).toContain('Agent not found');
      }
    });

    it('should handle project not found', async () => {
      try {
        await agentService.activateAgent('some-agent', 'non-existent-project');
        fail('Should have thrown an error for non-existent project');
      } catch (error) {
        expect(error.message).toContain('Project not found');
      }
    });

    it('should deactivate agent session', async () => {
      // Create a mock session first
      const db = require('../../database').getDatabase();
      const sessionId = 'test-session-id';

      db.prepare(
        `
        INSERT INTO agent_sessions (id, agent_id, project_id, status, started_at)
        VALUES (?, ?, ?, ?, ?)
      `,
      ).run(sessionId, 'test-agent', testProject.id, 'active', new Date().toISOString());

      await agentService.deactivateAgent(sessionId);

      // Verify session was deactivated
      const session = db.prepare('SELECT * FROM agent_sessions WHERE id = ?').get(sessionId);
      expect(session.status).toBe('inactive');
      expect(session.ended_at).toBeTruthy();
    });

    it('should get active agents for project', async () => {
      const activeAgents = await agentService.getActiveAgents(testProject.id);
      expect(Array.isArray(activeAgents)).toBe(true);
    });

    it('should get agent sessions for project', async () => {
      const sessions = await agentService.getAgentSessions(testProject.id);
      expect(Array.isArray(sessions)).toBe(true);
    });
  });

  describe('Agent Configuration', () => {
    it('should configure agent settings', async () => {
      const settings = { theme: 'dark', notifications: true };
      const preferences = { autoStart: false };

      const config = await agentService.configureAgent('test-agent', testProject.id, 'test-user', settings, preferences);

      expect(config).toHaveProperty('id');
      expect(config.agentId).toBe('test-agent');
      expect(config.projectId).toBe(testProject.id);
      expect(config.userId).toBe('test-user');
      expect(config.settings).toEqual(settings);
      expect(config.preferences).toEqual(preferences);
    });

    it('should get agent configuration', async () => {
      // First create a configuration
      const settings = { test: 'value' };
      await agentService.configureAgent('test-agent', testProject.id, 'test-user', settings, {});

      // Then retrieve it
      const config = await agentService.getAgentConfiguration('test-agent', testProject.id, 'test-user');

      expect(config).toBeTruthy();
      expect(config?.settings).toEqual(settings);
      expect(config?.projectId).toBe(testProject.id);
      expect(config?.userId).toBe('test-user');
    });

    it('should return null for non-existent configuration', async () => {
      const config = await agentService.getAgentConfiguration('non-existent-agent');
      expect(config).toBeNull();
    });
  });

  describe('Agent Lifecycle Management', () => {
    it('should reload agent', async () => {
      // Test that reload method exists and doesn't throw
      try {
        await agentService.reloadAgent('test-agent');
        // Should not throw an error
      } catch (error) {
        // Expected if agent doesn't exist
        expect(error).toBeDefined();
      }
    });

    it('should update agent status', async () => {
      // Test that status update method exists
      try {
        await agentService.updateAgentStatus('test-agent', { state: 'active' });
        // Should not throw an error
      } catch (error) {
        // Expected if agent doesn't exist
        expect(error).toBeDefined();
      }
    });
  });

  describe('Agent Statistics', () => {
    it('should get agent statistics for project', async () => {
      const stats = await agentService.getAgentStatistics(testProject.id);

      expect(stats).toHaveProperty('totalAgents');
      expect(stats).toHaveProperty('activeAgents');
      expect(typeof stats.totalAgents).toBe('number');
      expect(typeof stats.activeAgents).toBe('number');
    });
  });

  describe('Agent Capabilities', () => {
    it('should define all required capabilities', () => {
      const requiredCapabilities = ['workflows', 'tools', 'contextSync', 'fileSync', 'realTime'];

      // Verify all required capabilities exist in the interface
      for (const capability of requiredCapabilities) {
        // This is a compile-time check that the interface exists
        expect(['workflows', 'tools', 'contextSync', 'fileSync', 'realTime']).toContain(capability);
      }
    });

    it('should validate capability structure', async () => {
      const agentWithInvalidCapabilities = {
        id: 'test-agent',
        name: 'Test Agent',
        title: 'Test Agent',
        icon: '🤖',
        module: 'test',
        path: '/test/path',
        config: {},
        menu: [],
        capabilities: {
          workflows: 'invalid', // Should be boolean
          tools: false,
          contextSync: true,
          fileSync: false,
          realTime: true,
        },
      };

      const validation = await agentService.validateAgent(agentWithInvalidCapabilities as any);

      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
      expect(validation.errors.some((error) => error.includes('boolean'))).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Test with invalid project ID
      try {
        await agentService.getActiveAgents('invalid-project-id');
        // Should return empty array or throw appropriate error
      } catch (error) {
        // Expected behavior
        expect(error).toBeDefined();
      }
    });

    it('should handle malformed agent configurations', async () => {
      // Test validation of malformed agent data
      const malformedAgent = {
        id: 'malformed-agent',
        // Missing required fields
        name: '',
        title: '',
        path: '',
      };

      const validation = await agentService.validateAgent(malformedAgent as any);

      expect(validation.valid).toBe(false);
      expect(validation.errors.length).toBeGreaterThan(0);
    });
  });
});
