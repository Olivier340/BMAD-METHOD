import { createSlice } from '@reduxjs/toolkit';
import { DashboardState, ActivityItem, DashboardMetrics } from '../types';

const initialState: DashboardState = {
  currentProject: null,
  metrics: {
    activeWorkflows: 0,
    activeStories: 0,
    completedTasks: 0,
    healthScore: 100,
    lastUpdated: new Date().toISOString(),
  },
  activityFeed: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    updateMetrics: (state, action: { payload: DashboardMetrics }) => {
      state.metrics = { ...state.metrics, ...action.payload };
    },
    addActivityItem: (state, action: { payload: ActivityItem }) => {
      state.activityFeed.unshift(action.payload);
      // Keep only last 50 items
      if (state.activityFeed.length > 50) {
        state.activityFeed = state.activityFeed.slice(0, 50);
      }
    },
    clearActivityFeed: (state) => {
      state.activityFeed = [];
    },
  },
});

export const { setCurrentProject, updateMetrics, addActivityItem, clearActivityFeed } = dashboardSlice.actions;
export default dashboardSlice.reducer;
