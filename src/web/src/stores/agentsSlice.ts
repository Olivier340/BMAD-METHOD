import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  AgentMetadata,
  AgentSession,
  AgentConfiguration,
  AgentsState,
} from '../types';

const initialState: AgentsState = {
  agents: [],
  activeAgents: [],
  sessions: [],
  configurations: [],
  loading: false,
  error: null,
};

export const fetchAgents = createAsyncThunk(
  'agents/fetchAgents',
  async (
    { projectId, projectPath }: { projectId: string; projectPath: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get<AgentMetadata[]>(
        `/api/agents/${projectId}`,
        {
          params: { path: projectPath },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch agents'
      );
    }
  }
);

export const fetchActiveAgents = createAsyncThunk(
  'agents/fetchActiveAgents',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<AgentMetadata[]>(
        `/api/agents/${projectId}/active`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch active agents'
      );
    }
  }
);

export const activateAgent = createAsyncThunk(
  'agents/activateAgent',
  async (
    {
      projectId,
      agentId,
      context,
    }: { projectId: string; agentId: string; context?: any },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<AgentSession>(
        `/api/agents/${projectId}/activate`,
        {
          agentId,
          context,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to activate agent'
      );
    }
  }
);

export const deactivateAgent = createAsyncThunk(
  'agents/deactivateAgent',
  async (sessionId: string, { rejectWithValue }) => {
    try {
      await axios.post(`/api/agents/deactivate/${sessionId}`);
      return sessionId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to deactivate agent'
      );
    }
  }
);

export const fetchAgentSessions = createAsyncThunk(
  'agents/fetchAgentSessions',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<AgentSession[]>(
        `/api/agents/${projectId}/sessions`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch agent sessions'
      );
    }
  }
);

export const configureAgent = createAsyncThunk(
  'agents/configureAgent',
  async (
    {
      projectId,
      agentId,
      settings,
      preferences,
      userId,
    }: {
      projectId: string;
      agentId: string;
      settings: any;
      preferences: any;
      userId?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post<AgentConfiguration>(
        `/api/agents/${projectId}/agent/${agentId}/configure`,
        { settings, preferences, userId }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to configure agent'
      );
    }
  }
);

export const reloadAgent = createAsyncThunk(
  'agents/reloadAgent',
  async (
    { projectId, agentId }: { projectId: string; agentId: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.post(`/api/agents/${projectId}/agent/${agentId}/reload`);
      return agentId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to reload agent'
      );
    }
  }
);

export const validateAgent = createAsyncThunk(
  'agents/validateAgent',
  async (
    {
      projectId,
      agentId,
      projectPath,
    }: { projectId: string; agentId: string; projectPath: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `/api/agents/${projectId}/agent/${agentId}/validate`,
        {},
        {
          params: { path: projectPath },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to validate agent'
      );
    }
  }
);

export const fetchAgentStatistics = createAsyncThunk(
  'agents/fetchAgentStatistics',
  async (projectId: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/agents/${projectId}/statistics`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to fetch agent statistics'
      );
    }
  }
);

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    updateAgentStatus: (state, action) => {
      const { agentId, status } = action.payload;
      const agentIndex = state.agents.findIndex(a => a.id === agentId);
      if (agentIndex !== -1) {
        state.agents[agentIndex].status = {
          ...state.agents[agentIndex].status,
          ...status,
        };
      }
    },
    addSession: (state, action) => {
      state.sessions.unshift(action.payload);
    },
    updateSession: (state, action) => {
      const index = state.sessions.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = { ...state.sessions[index], ...action.payload };
      }
    },
    removeSession: (state, action) => {
      state.sessions = state.sessions.filter(s => s.id !== action.payload);
    },
    addConfiguration: (state, action) => {
      state.configurations.push(action.payload);
    },
    updateConfiguration: (state, action) => {
      const index = state.configurations.findIndex(
        c => c.id === action.payload.id
      );
      if (index !== -1) {
        state.configurations[index] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAgents.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch active agents
      .addCase(fetchActiveAgents.fulfilled, (state, action) => {
        state.activeAgents = action.payload.map(a => a.id);
      })

      // Activate agent
      .addCase(activateAgent.fulfilled, (state, action) => {
        const session = action.payload;
        state.sessions.unshift(session);
        if (!state.activeAgents.includes(session.agentId)) {
          state.activeAgents.push(session.agentId);
        }
      })

      // Deactivate agent
      .addCase(deactivateAgent.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(s => s.id !== action.payload);
      })

      // Fetch agent sessions
      .addCase(fetchAgentSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.activeAgents = action.payload
          .filter(s => s.status === 'active')
          .map(s => s.agentId);
      })

      // Configure agent
      .addCase(configureAgent.fulfilled, (state, action) => {
        const config = action.payload;
        const index = state.configurations.findIndex(c => c.id === config.id);
        if (index === -1) {
          state.configurations.push(config);
        } else {
          state.configurations[index] = config;
        }
      })

      // Reload agent
      .addCase(reloadAgent.fulfilled, (state, action) => {
        // Update agent status to loading
        const agentIndex = state.agents.findIndex(a => a.id === action.payload);
        if (agentIndex !== -1) {
          state.agents[agentIndex].status = {
            ...state.agents[agentIndex].status,
            state: 'loading',
          };
        }
      });
  },
});

export const {
  clearError,
  updateAgentStatus,
  addSession,
  updateSession,
  removeSession,
  addConfiguration,
  updateConfiguration,
} = agentsSlice.actions;
export default agentsSlice.reducer;
