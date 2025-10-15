import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';
import { store } from './stores';
import bmadTheme from './theme/bmadTheme';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Workflows from './pages/Workflows';
import WorkflowBuilder from './pages/WorkflowBuilder';
import KanbanBoard from './pages/KanbanBoard';
import UserManagement from './pages/UserManagement';
import Settings from './pages/Settings';
import Agents from './pages/Agents';
import IDEHub from './pages/IDEHub';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={bmadTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route
                path="/workflows/builder"
                element={
                  <ProtectedRoute requiredRoles={['admin', 'user']}>
                    <WorkflowBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/kanban"
                element={
                  <ProtectedRoute requiredRoles={['admin', 'user']}>
                    <KanbanBoard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <UserManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute requiredRoles={['admin', 'user']}>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/agents"
                element={
                  <ProtectedRoute requiredRoles={['admin']}>
                    <Agents />
                  </ProtectedRoute>
                }
              />
              <Route path="/ide-hub" element={<IDEHub />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
