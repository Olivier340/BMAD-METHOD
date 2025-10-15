import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Tabs, Tab, CircularProgress, Alert, Chip, LinearProgress } from '@mui/material';
import { PlayArrow, Info, CheckCircle, Error, Schedule } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { fetchWorkflows, executeWorkflow } from '../stores/workflowsSlice';
import { useRealtimeUpdates } from '../hooks/useRealtimeUpdates';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`workflow-tabpanel-${index}`} aria-labelledby={`workflow-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Workflows() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.dashboard);
  const { workflows, executions, loading, error } = useSelector((state: RootState) => state.workflows);
  const [tabValue, setTabValue] = useState(0);

  // Enable real-time updates
  useRealtimeUpdates();

  useEffect(() => {
    if (currentProject) {
      dispatch(
        fetchWorkflows({
          projectId: currentProject.id,
          projectPath: currentProject.path,
        }),
      );
    }
  }, [dispatch, currentProject]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const phases = [
    { id: 'analysis', name: 'Analysis', icon: '📊' },
    { id: 'planning', name: 'Planning', icon: '📋' },
    { id: 'solutioning', name: 'Solutioning', icon: '🏗️' },
    { id: 'implementation', name: 'Implementation', icon: '⚡' },
  ];

  const getWorkflowsByPhase = (phase: string) => {
    return workflows.filter((workflow) => workflow.phase === phase);
  };

  const getRunningExecution = (workflowId: string) => {
    return executions.find((execution) => execution.workflowId === workflowId && execution.status === 'running');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': {
        return <CheckCircle sx={{ color: 'success.main' }} />;
      }
      case 'failed': {
        return <Error sx={{ color: 'error.main' }} />;
      }
      case 'running': {
        return <CircularProgress size={16} />;
      }
      default: {
        return <Schedule sx={{ color: 'text.secondary' }} />;
      }
    }
  };

  const formatDuration = (startTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const diff = Math.floor((now.getTime() - start.getTime()) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    return `${Math.floor(diff / 3600)}h`;
  };

  if (!currentProject) {
    return (
      <Box p={3}>
        <Alert severity="info">Sélectionnez d'abord un projet pour voir les workflows disponibles.</Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Workflows BMad Method
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Projet: <strong>{currentProject.name}</strong>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="workflow phases">
          {phases.map((phase, index) => (
            <Tab
              key={phase.id}
              label={`${phase.icon} ${phase.name}`}
              id={`workflow-tab-${index}`}
              aria-controls={`workflow-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>

      {phases.map((phase, index) => (
        <TabPanel key={phase.id} value={tabValue} index={index}>
          {getWorkflowsByPhase(phase.id).length === 0 ? (
            <Alert severity="info">Aucun workflow trouvé pour la phase {phase.name}.</Alert>
          ) : (
            <Grid container spacing={3}>
              {getWorkflowsByPhase(phase.id).map((workflow) => {
                const runningExecution = getRunningExecution(workflow.id);

                return (
                  <Grid item xs={12} md={6} lg={4} key={workflow.id}>
                    <Card>
                      <CardContent>
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="h6">{workflow.name}</Typography>
                          {runningExecution && getStatusIcon(runningExecution.status)}
                        </Box>

                        <Typography variant="body2" color="textSecondary" paragraph>
                          {workflow.description}
                        </Typography>

                        {/* Progress bar for running workflows */}
                        {runningExecution && runningExecution.progress !== undefined && (
                          <Box mb={2}>
                            <Box display="flex" justifyContent="space-between" mb={1}>
                              <Typography variant="body2">Progression: {runningExecution.progress}%</Typography>
                              <Typography variant="body2" color="textSecondary">
                                {formatDuration(runningExecution.startedAt)}
                              </Typography>
                            </Box>
                            <LinearProgress variant="determinate" value={runningExecution.progress} sx={{ height: 6, borderRadius: 3 }} />
                            {runningExecution.currentStep && (
                              <Typography variant="caption" color="textSecondary" display="block" mt={1}>
                                Étape actuelle: {runningExecution.currentStep}
                              </Typography>
                            )}
                          </Box>
                        )}

                        <Box mb={2}>
                          <Chip label={phase.name} size="small" sx={{ mr: 1 }} />
                          <Chip label={workflow.module} size="small" />
                        </Box>

                        <Box display="flex" gap={1}>
                          <Button
                            variant="contained"
                            startIcon={<PlayArrow />}
                            size="small"
                            disabled={!!runningExecution}
                            onClick={() =>
                              dispatch(
                                executeWorkflow({
                                  projectId: currentProject.id,
                                  workflowId: workflow.id,
                                  params: {},
                                }),
                              )
                            }
                          >
                            {runningExecution ? 'En cours...' : 'Exécuter'}
                          </Button>
                          <Button variant="outlined" startIcon={<Info />} size="small">
                            Détails
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </TabPanel>
      ))}
    </Box>
  );
}
