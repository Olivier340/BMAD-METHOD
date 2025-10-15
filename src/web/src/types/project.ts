export interface Project {
  id: string;
  name: string;
  description?: string;
  path?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}
