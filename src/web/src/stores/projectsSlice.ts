import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Project, ProjectsState } from '../types';

const initialState: ProjectsState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

// Async thunks pour les API calls
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project[]>('/api/projects');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch projects'
      );
    }
  }
);

export const scanProjects = createAsyncThunk(
  'projects/scanProjects',
  async (basePath: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project[]>('/api/projects/scan', {
        params: { path: basePath },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to scan projects'
      );
    }
  }
);

export const selectProject = createAsyncThunk(
  'projects/selectProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project>(`/api/projects/${projectId}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to select project'
      );
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData: Partial<Project>, { rejectWithValue }) => {
    try {
      const response = await axios.post<Project>('/api/projects', projectData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to create project'
      );
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (
    { id, data }: { id: string; data: Partial<Project> },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put<Project>(`/api/projects/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to update project'
      );
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      return projectId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to delete project'
      );
    }
  }
);

// === ACTIVE PROJECT CONTEXT MANAGEMENT ===

export const setActiveProject = createAsyncThunk(
  'projects/setActiveProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/projects/${projectId}/set-active`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to set active project'
      );
    }
  }
);

export const getActiveProject = createAsyncThunk(
  'projects/getActiveProject',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project>('/api/projects/active');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to get active project'
      );
    }
  }
);

export const clearActiveProject = createAsyncThunk(
  'projects/clearActiveProject',
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete('/api/projects/active');
      return true;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to clear active project'
      );
    }
  }
);

export const switchToProject = createAsyncThunk(
  'projects/switchToProject',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.post<Project>(
        `/api/projects/${projectId}/switch`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to switch project'
      );
    }
  }
);

export const getProjectNavigationHistory = createAsyncThunk(
  'projects/getNavigationHistory',
  async (limit: number = 10, { rejectWithValue }) => {
    try {
      const response = await axios.get<Project[]>('/api/projects/history', {
        params: { limit },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to get navigation history'
      );
    }
  }
);

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setCurrentProject: (state, action: PayloadAction<Project | null>) => {
      state.currentProject = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch projects
      .addCase(fetchProjects.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Scan projects
      .addCase(scanProjects.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(scanProjects.fulfilled, (state, action) => {
        state.loading = false;
        // Merge scanned projects with existing ones
        const newProjects = action.payload.filter(
          newProject =>
            !state.projects.some(existing => existing.id === newProject.id)
        );
        state.projects = [...state.projects, ...newProjects];
      })
      .addCase(scanProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Select project
      .addCase(selectProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;
      })

      // Create project
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      })

      // Update project
      .addCase(updateProject.fulfilled, (state, action) => {
        const index = state.projects.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
        if (state.currentProject?.id === action.payload.id) {
          state.currentProject = action.payload;
        }
      })

      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload);
        if (state.currentProject?.id === action.payload) {
          state.currentProject = null;
        }
      })

      // Set active project
      .addCase(setActiveProject.fulfilled, (state, action) => {
        // Update current project to match active project
        const activeProject = action.payload;
        state.currentProject = activeProject;

        // Mark this project as active in the projects list
        if (Array.isArray(state.projects)) {
          state.projects = state.projects.map(project =>
            project.id === activeProject.id
              ? { ...project, isActive: true }
              : { ...project, isActive: false }
          );
        }
      })

      // Get active project
      .addCase(getActiveProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;

        // Mark this project as active in the projects list
        if (Array.isArray(state.projects)) {
          state.projects = state.projects.map(project =>
            project.id === action.payload?.id
              ? { ...project, isActive: true }
              : { ...project, isActive: false }
          );
        }
      })

      // Clear active project
      .addCase(clearActiveProject.fulfilled, state => {
        state.currentProject = null;

        // Clear active status from all projects
        if (Array.isArray(state.projects)) {
          state.projects = state.projects.map(project => ({
            ...project,
            isActive: false,
          }));
        }
      })

      // Switch to project
      .addCase(switchToProject.fulfilled, (state, action) => {
        state.currentProject = action.payload;

        // Mark this project as active in the projects list
        if (Array.isArray(state.projects)) {
          state.projects = state.projects.map(project =>
            project.id === action.payload.id
              ? { ...project, isActive: true }
              : { ...project, isActive: false }
          );
        }
      });
  },
});

export const { clearError, setCurrentProject } = projectsSlice.actions;
export default projectsSlice.reducer;
