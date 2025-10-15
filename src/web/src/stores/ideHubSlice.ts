import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IDEHubState, IDEAdapter } from '../types';

const initialState: IDEHubState = {
  connectedIDEs: {},
  availableIDEs: [
    {
      type: 'cursor',
      name: 'Cursor AI',
      description: 'Integrated development environment with AI assistance',
      capabilities: {
        agents: true,
        workflows: true,
        contextSync: true,
        fileSync: true,
        realTime: true,
      },
    },
    {
      type: 'claude-code',
      name: 'Claude Code',
      description: 'AI-powered coding assistant',
      capabilities: {
        agents: true,
        workflows: false,
        contextSync: true,
        fileSync: false,
        realTime: false,
      },
    },
    {
      type: 'gemini',
      name: 'Gemini CLI',
      description: "Google's AI assistant for coding",
      capabilities: {
        agents: false,
        workflows: false,
        contextSync: true,
        fileSync: false,
        realTime: false,
      },
    },
  ],
  loading: false,
  error: null,
};

export const connectIDE = createAsyncThunk('ideHub/connectIDE', async (ideType: string, { rejectWithValue }) => {
  try {
    // This would implement actual IDE connection logic
    return ideType;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to connect IDE');
  }
});

export const disconnectIDE = createAsyncThunk('ideHub/disconnectIDE', async (ideType: string, { rejectWithValue }) => {
  try {
    // This would implement actual IDE disconnection logic
    return ideType;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to disconnect IDE');
  }
});

const ideHubSlice = createSlice({
  name: 'ideHub',
  initialState,
  reducers: {
    toggleIDE: (state, action) => {
      const ideType = action.payload;
      const currentlyConnected = state.connectedIDEs[ideType] || false;
      state.connectedIDEs[ideType] = !currentlyConnected;
    },
    setIDEStatus: (state, action) => {
      const { ideType, status } = action.payload;
      state.connectedIDEs[ideType] = status;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(connectIDE.fulfilled, (state, action) => {
        state.connectedIDEs[action.payload] = true;
      })
      .addCase(disconnectIDE.fulfilled, (state, action) => {
        state.connectedIDEs[action.payload] = false;
      });
  },
});

export const { toggleIDE, setIDEStatus } = ideHubSlice.actions;
export default ideHubSlice.reducer;
