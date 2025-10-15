import fs from 'fs-extra';
import path from 'node:path';
import yaml from 'js-yaml';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ProjectRecord } from '../database';
import { eventPublisher } from '../../events/event-publisher';

export interface ActiveProjectContext {
  id: string;
  project_id: string;
  user_id: string;
  context_data?: any;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  path: string;
  config: ProjectConfig;
  manifest: any;
  modules: string[];
  status?: ProjectStatus;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectConfig {
  [module: string]: any;
}

export interface ProjectStatus {
  phase: string;
  status: string;
  progress?: number;
  lastUpdated?: string;
}

export class ProjectService {
  async scanForProjects(basePath: string = process.cwd()): Promise<Project[]> {
    const projects: Project[] = [];

    try {
      const dirs = await fs.readdir(basePath);

      for (const dir of dirs) {
        const projectPath = path.join(basePath, dir);
        const stat = await fs.stat(projectPath);

        if (stat.isDirectory()) {
          const bmadPath = path.join(projectPath, 'bmad');

          if (await fs.pathExists(bmadPath)) {
            const manifestPath = path.join(bmadPath, '_cfg/manifest.yaml');
            if (await fs.pathExists(manifestPath)) {
              try {
                const manifest = yaml.load(await fs.readFile(manifestPath, 'utf8')) as any;
                const config = await this.loadProjectConfig(projectPath);
                const modules = manifest?.modules || [];

                const project: Project = {
                  id: uuidv4(),
                  name: dir,
                  path: projectPath,
                  config,
                  manifest,
                  modules,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                };

                // Load current status
                try {
                  project.status = await this.getProjectStatus(project.id);
                } catch {
                  project.status = { phase: 'unknown', status: 'not-started' };
                }

                projects.push(project);
              } catch (error) {
                console.warn(`Failed to load project ${dir}:`, error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.warn('Failed to scan for projects:', error);
    }

    return projects;
  }

  async loadProjectConfig(projectPath: string): Promise<ProjectConfig> {
    const modules = ['core', 'bmm', 'bmb', 'cis'];
    const configs: ProjectConfig = {};

    for (const module of modules) {
      const configPath = path.join(projectPath, `bmad/${module}/config.yaml`);
      if (await fs.pathExists(configPath)) {
        try {
          configs[module] = yaml.load(await fs.readFile(configPath, 'utf8')) as any;
        } catch (error) {
          console.warn(`Failed to load config for module ${module}:`, error);
        }
      }
    }

    return configs;
  }

  async getProjectStatus(projectId: string): Promise<ProjectStatus> {
    const project = await this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const statusFilePath = path.join(project.path, 'docs/project-workflow-status.md');

    if (await fs.pathExists(statusFilePath)) {
      const content = await fs.readFile(statusFilePath, 'utf8');
      return this.parseStatusFile(content);
    }

    return { phase: 'unknown', status: 'not-started' };
  }

  private parseStatusFile(content: string): ProjectStatus {
    // Parse the workflow status markdown file
    const lines = content.split('\n');
    let phase = 'unknown';
    let status = 'not-started';

    for (const line of lines) {
      if (line.includes('Current Phase:')) {
        phase = line.split(':')[1]?.trim() || 'unknown';
      }
      if (line.includes('Status:')) {
        status = line.split(':')[1]?.trim() || 'not-started';
      }
    }

    return { phase, status };
  }

  async listProjects(): Promise<Project[]> {
    const db = getDatabase();
    const rows = db.prepare('SELECT * FROM projects ORDER BY updated_at DESC').all() as ProjectRecord[];

    const projects: Project[] = [];
    for (const row of rows) {
      try {
        const config = JSON.parse(row.config || '{}');
        const project: Project = {
          id: row.id,
          name: row.name,
          path: row.path,
          config,
          manifest: {},
          modules: Object.keys(config),
          created_at: row.created_at,
          updated_at: row.updated_at,
        };

        // Load current status
        try {
          project.status = await this.getProjectStatus(row.id);
        } catch {
          project.status = { phase: 'unknown', status: 'not-started' };
        }

        projects.push(project);
      } catch (error) {
        console.warn(`Failed to parse project ${row.id}:`, error);
      }
    }

    return projects;
  }

  async getProject(id: string): Promise<Project | null> {
    const db = getDatabase();
    const row = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as ProjectRecord | undefined;

    if (!row) {
      return null;
    }

    try {
      const config = JSON.parse(row.config || '{}');
      const project: Project = {
        id: row.id,
        name: row.name,
        path: row.path,
        config,
        manifest: {},
        modules: Object.keys(config),
        created_at: row.created_at,
        updated_at: row.updated_at,
      };

      // Load current status
      try {
        project.status = await this.getProjectStatus(row.id);
      } catch {
        project.status = { phase: 'unknown', status: 'not-started' };
      }

      return project;
    } catch (error) {
      console.warn(`Failed to parse project ${id}:`, error);
      return null;
    }
  }

  async createProject(projectData: Partial<Project>): Promise<Project> {
    const db = getDatabase();
    const id = uuidv4();

    const project: Project = {
      id,
      name: projectData.name || 'New Project',
      path: projectData.path || '',
      config: projectData.config || {},
      manifest: projectData.manifest || {},
      modules: projectData.modules || [],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    db.prepare(
      `
      INSERT INTO projects (id, name, path, config, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(id, project.name, project.path, JSON.stringify(project.config), project.created_at, project.updated_at);

    // Publish project creation event
    eventPublisher.publishProjectEvent('created', {
      projectId: project.id,
      name: project.name,
      path: project.path,
      modules: project.modules,
    });

    return project;
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const db = getDatabase();

    const existing = await this.getProject(id);
    if (!existing) {
      return null;
    }

    const updated: Project = {
      ...existing,
      ...updates,
      id, // Ensure ID doesn't change
      updated_at: new Date().toISOString(),
    };

    db.prepare(
      `
      UPDATE projects
      SET name = ?, path = ?, config = ?, updated_at = ?
      WHERE id = ?
    `,
    ).run(updated.name, updated.path, JSON.stringify(updated.config), updated.updated_at, id);

    // Publish project update event
    eventPublisher.publishProjectEvent('updated', {
      projectId: updated.id,
      name: updated.name,
      path: updated.path,
      changes: updates,
    });

    return updated;
  }

  async deleteProject(id: string): Promise<boolean> {
    const db = getDatabase();

    // Get project details before deletion for the event
    const project = await this.getProject(id);

    const result = db.prepare('DELETE FROM projects WHERE id = ?').run(id);

    if (result.changes > 0 && project) {
      // Publish project deletion event
      eventPublisher.publishProjectEvent('deleted', {
        projectId: project.id,
        name: project.name,
        path: project.path,
      });
    }

    return result.changes > 0;
  }

  async syncProjectToDatabase(project: Project): Promise<void> {
    const db = getDatabase();

    // Check if project already exists
    const existing = db.prepare('SELECT * FROM projects WHERE path = ?').get(project.path);

    if (existing) {
      // Update existing project
      db.prepare(
        `
        UPDATE projects
        SET name = ?, config = ?, updated_at = ?
        WHERE path = ?
      `,
      ).run(project.name, JSON.stringify(project.config), new Date().toISOString(), project.path);
    } else {
      // Insert new project
      db.prepare(
        `
        INSERT INTO projects (id, name, path, config, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      ).run(
        project.id,
        project.name,
        project.path,
        JSON.stringify(project.config),
        project.created_at || new Date().toISOString(),
        project.updated_at || new Date().toISOString(),
      );
    }
  }

  async refreshProjectStatus(projectId: string): Promise<ProjectStatus> {
    const project = await this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    const status = await this.getProjectStatus(projectId);
    const db = getDatabase();

    // Update project status in database
    db.prepare(
      `
      UPDATE projects
      SET updated_at = ?
      WHERE id = ?
    `,
    ).run(new Date().toISOString(), projectId);

    return status;
  }

  // === ACTIVE PROJECT CONTEXT MANAGEMENT ===

  async setActiveProject(projectId: string, userId: string = 'default'): Promise<void> {
    const db = getDatabase();

    // Verify project exists
    const project = await this.getProject(projectId);
    if (!project) {
      throw new Error('Project not found');
    }

    // Remove any existing active context for this user
    db.prepare('DELETE FROM active_project_context WHERE user_id = ?').run(userId);

    // Insert new active context
    const id = uuidv4();
    db.prepare(
      `
      INSERT INTO active_project_context (id, project_id, user_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `,
    ).run(id, projectId, userId, new Date().toISOString(), new Date().toISOString());

    // Publish active project change event
    eventPublisher.publish({
      type: 'project:active:changed',
      source: 'project-service',
      data: {
        projectId,
        projectName: project.name,
        userId,
        action: 'activated',
      },
    });
  }

  async getActiveProject(userId: string = 'default'): Promise<Project | null> {
    const db = getDatabase();

    const context = db.prepare('SELECT * FROM active_project_context WHERE user_id = ?').get(userId) as any;

    if (!context) {
      return null;
    }

    return await this.getProject(context.project_id);
  }

  async clearActiveProject(userId: string = 'default'): Promise<void> {
    const db = getDatabase();

    // Get current active project for the event
    const currentProject = await this.getActiveProject(userId);

    db.prepare('DELETE FROM active_project_context WHERE user_id = ?').run(userId);

    // Publish active project cleared event
    if (currentProject) {
      eventPublisher.publish({
        type: 'project:active:changed',
        source: 'project-service',
        data: {
          projectId: currentProject.id,
          projectName: currentProject.name,
          userId,
          action: 'deactivated',
        },
      });
    }
  }

  async getActiveProjectContext(userId: string = 'default'): Promise<ActiveProjectContext | null> {
    const db = getDatabase();
    return (db.prepare('SELECT * FROM active_project_context WHERE user_id = ?').get(userId) as ActiveProjectContext) || null;
  }

  async updateActiveProjectContext(projectId: string, contextData: any, userId: string = 'default'): Promise<void> {
    const db = getDatabase();

    // Check if context exists
    const existing = db.prepare('SELECT * FROM active_project_context WHERE user_id = ?').get(userId);

    if (existing) {
      // Update existing context
      db.prepare(
        `
        UPDATE active_project_context
        SET context_data = ?, updated_at = ?
        WHERE user_id = ?
      `,
      ).run(JSON.stringify(contextData), new Date().toISOString(), userId);
    } else {
      // Create new context if it doesn't exist
      const id = uuidv4();
      db.prepare(
        `
        INSERT INTO active_project_context (id, project_id, user_id, context_data, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      ).run(id, projectId, userId, JSON.stringify(contextData), new Date().toISOString(), new Date().toISOString());
    }
  }

  // === PROJECT NAVIGATION HELPERS ===

  async switchToProject(projectId: string, userId: string = 'default'): Promise<Project> {
    await this.setActiveProject(projectId, userId);
    const project = await this.getProject(projectId);

    if (!project) {
      throw new Error('Project not found after switching');
    }

    return project;
  }

  async getProjectNavigationHistory(userId: string = 'default', limit: number = 10): Promise<Project[]> {
    const db = getDatabase();

    // Get recent context changes for this user
    const contexts = db
      .prepare(
        `
      SELECT project_id, updated_at
      FROM active_project_context
      WHERE user_id = ?
      ORDER BY updated_at DESC
      LIMIT ?
    `,
      )
      .all(userId, limit) as { project_id: string; updated_at: string }[];

    const projects: Project[] = [];
    for (const context of contexts) {
      const project = await this.getProject(context.project_id);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  }

  async getProjectsWithStatus(): Promise<Project[]> {
    const projects = await this.listProjects();

    // Add additional status information for navigation
    return projects.map((project) => ({
      ...project,
      isActive: false, // Will be set by the UI based on current context
      lastAccessed: project.updated_at,
    }));
  }
}
