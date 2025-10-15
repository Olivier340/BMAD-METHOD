import React, { useEffect } from 'react';
import { Box, Grid, Paper, Typography, Card, CardContent, LinearProgress, Alert, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { fetchProjects } from '../stores/projectsSlice';
import { updateMetrics } from '../stores/dashboardSlice';
import MetricsCard from '../components/MetricsCard';
import ActivityFeed from '../components/ActivityFeed';
import QuickActions from '../components/QuickActions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { currentProject, metrics } = useSelector((state: RootState) => state.dashboard);
  const { projects, loading: projectsLoading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    // Connexion SSE pour updates temps réel
    const eventSource = new EventSource('/api/events');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'metrics-updated') {
          dispatch(updateMetrics(data.metrics));
        }
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    return () => eventSource.close();
  }, [dispatch]);

  if (projectsLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  if (!currentProject && projects.length > 0) {
    return (
      <Box p={3}>
        <Alert severity="info" sx={{ mb: 3 }}>
          Sélectionnez un projet pour commencer à utiliser BMad Visual Studio.
        </Alert>
        <Typography variant="h6" gutterBottom>
          Projets disponibles
        </Typography>
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{project.name}</Typography>
                  <Typography color="textSecondary" variant="body2">
                    {project.path}
                  </Typography>
                  <Box mt={2}>
                    {project.modules.map((module) => (
                      <Typography key={module} variant="caption" display="block">
                        Module: {module}
                      </Typography>
                    ))}
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => dispatch({ type: 'dashboard/setCurrentProject', payload: project })}
                  >
                    Sélectionner ce projet
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard BMad Visual Studio
      </Typography>

      {currentProject && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Projet actif: <strong>{currentProject.name}</strong>
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Métriques principales */}
        <Grid item xs={12} md={3}>
          <MetricsCard title="Workflows actifs" value={metrics.activeWorkflows} color="primary" />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricsCard title="Stories en cours" value={metrics.activeStories} color="secondary" />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricsCard title="Tâches complétées" value={metrics.completedTasks} color="success" />
        </Grid>

        <Grid item xs={12} md={3}>
          <MetricsCard title="Santé du projet" value={`${metrics.healthScore}%`} color="warning" />
        </Grid>

        {/* Actions rapides */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Actions rapides
            </Typography>
            <QuickActions />
          </Paper>
        </Grid>

        {/* Activité récente */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Activité récente
            </Typography>
            <ActivityFeed />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
