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
export declare class ProjectService {
    scanForProjects(basePath?: string): Promise<Project[]>;
    loadProjectConfig(projectPath: string): Promise<ProjectConfig>;
    getProjectStatus(projectId: string): Promise<ProjectStatus>;
    private parseStatusFile;
    listProjects(): Promise<Project[]>;
    getProject(id: string): Promise<Project | null>;
    createProject(projectData: Partial<Project>): Promise<Project>;
    updateProject(id: string, updates: Partial<Project>): Promise<Project | null>;
    deleteProject(id: string): Promise<boolean>;
    syncProjectToDatabase(project: Project): Promise<void>;
    refreshProjectStatus(projectId: string): Promise<ProjectStatus>;
    setActiveProject(projectId: string, userId?: string): Promise<void>;
    getActiveProject(userId?: string): Promise<Project | null>;
    clearActiveProject(userId?: string): Promise<void>;
    getActiveProjectContext(userId?: string): Promise<ActiveProjectContext | null>;
    updateActiveProjectContext(projectId: string, contextData: any, userId?: string): Promise<void>;
    switchToProject(projectId: string, userId?: string): Promise<Project>;
    getProjectNavigationHistory(userId?: string, limit?: number): Promise<Project[]>;
    getProjectsWithStatus(): Promise<Project[]>;
}
//# sourceMappingURL=ProjectService.d.ts.map