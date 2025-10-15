import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import workflowsReducer from './workflowsSlice';
import agentsReducer from './agentsSlice';
import ideHubReducer from './ideHubSlice';
import dashboardReducer from './dashboardSlice';
import uiReducer from './uiSlice';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    workflows: workflowsReducer,
    agents: agentsReducer,
    ideHub: ideHubReducer,
    dashboard: dashboardReducer,
    ui: uiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
