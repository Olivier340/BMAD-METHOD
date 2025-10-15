import { createSlice } from '@reduxjs/toolkit';
import { UIState, Notification } from '../types';

const initialState: UIState = {
  theme: 'dark',
  sidebarOpen: true,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: { payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }) => {
      const notification: Notification = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        read: false,
        ...action.payload,
      };
      state.notifications.unshift(notification);
      // Keep only last 20 notifications
      if (state.notifications.length > 20) {
        state.notifications = state.notifications.slice(0, 20);
      }
    },
    markNotificationAsRead: (state, action: { payload: string }) => {
      const notification = state.notifications.find((n) => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action: { payload: string }) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { toggleTheme, toggleSidebar, addNotification, markNotificationAsRead, removeNotification, clearAllNotifications } =
  uiSlice.actions;
export default uiSlice.reducer;
