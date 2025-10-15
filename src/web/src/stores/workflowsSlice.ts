import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WorkflowMetadata, WorkflowExecution, WorkflowsState } from '../types';

const initialState: WorkflowsState = {
  workflows: [],
  executions: [],
  loading: false,
  error: null,
};

export const fetchWorkflows = createAsyncThunk(
  'workflows/fetchWorkflows',
  async ({ projectId, projectPath }: { projectId: string; projectPath: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get<WorkflowMetadata[]>(`/api/workflows/${projectId}`, {
        params: { path: projectPath },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to fetch workflows');
    }
  },
);

export const executeWorkflow = createAsyncThunk(
  'workflows/executeWorkflow',
  async (
    {
      projectId,
      workflowId,
      params,
    }: {
      projectId: string;
      workflowId: string;
      params: any;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post<WorkflowExecution>(`/api/workflows/${projectId}/execute`, {
        workflowId,
        params,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Failed to execute workflow');
    }
  },
);

export const fetchExecutions = createAsyncThunk('workflows/fetchExecutions', async (projectId: string, { rejectWithValue }) => {
  try {
    const response = await axios.get<WorkflowExecution[]>(`/api/workflows/${projectId}/executions`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch executions');
  }
});

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateExecution: (state, action) => {
      const index = state.executions.findIndex((e) => e.id === action.payload.id);
      if (index === -1) {
        state.executions.unshift(action.payload);
      } else {
        state.executions[index] = { ...state.executions[index], ...action.payload };
      }
    },
    updateExecutionProgress: (state, action) => {
      const { executionId, progress, currentStep, output } = action.payload;
      const index = state.executions.findIndex((e) => e.id === executionId);
      if (index !== -1) {
        state.executions[index] = {
          ...state.executions[index],
          progress,
          currentStep,
          lastOutput: output,
          lastUpdate: new Date().toISOString(),
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch workflows
      .addCase(fetchWorkflows.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkflows.fulfilled, (state, action) => {
        state.loading = false;
        state.workflows = action.payload;
      })
      .addCase(fetchWorkflows.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Execute workflow
      .addCase(executeWorkflow.fulfilled, (state, action) => {
        state.executions.unshift(action.payload);
      })

      // Fetch executions
      .addCase(fetchExecutions.fulfilled, (state, action) => {
        state.executions = action.payload;
      });
  },
});

export const { clearError, updateExecution, updateExecutionProgress } = workflowsSlice.actions;
export default workflowsSlice.reducer;
