export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface UIState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface IDEAdapter {
  type: string;
  name: string;
  description: string;
  capabilities: {
    agents: boolean;
    workflows: boolean;
    contextSync: boolean;
    fileSync: boolean;
    realTime: boolean;
  };
}

export interface IDEHubState {
  connectedIDEs: Record<string, boolean>;
  availableIDEs: IDEAdapter[];
  loading: boolean;
  error: string | null;
}
