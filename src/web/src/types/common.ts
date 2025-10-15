export interface BaseState {
  loading: boolean;
  error: string | null;
}

export interface DashboardState extends BaseState {
  stats: {
    totalProjects: number;
    activeProjects: number;
    totalAgents: number;
    totalWorkflows: number;
  };
}
