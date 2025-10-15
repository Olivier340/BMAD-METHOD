import React, { useEffect } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Chip, CircularProgress, Alert, Switch, FormControlLabel } from '@mui/material';
import { SmartToy, PlayArrow, Settings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { fetchAgents, activateAgent } from '../stores/agentsSlice';

export default function Agents() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.dashboard);
  const { agents, activeAgents, loading, error } = useSelector((state: RootState) => state.agents);

  useEffect(() => {
    if (currentProject) {
      dispatch(
        fetchAgents({
          projectId: currentProject.id,
          projectPath: currentProject.path,
        }),
      );
    }
  }, [dispatch, currentProject]);

  const handleActivateAgent = (agentId: string) => {
    if (currentProject) {
      dispatch(
        activateAgent({
          projectId: currentProject.id,
          agentId,
        }),
      );
    }
  };

  const isAgentActive = (agentId: string) => {
    return activeAgents.includes(agentId);
  };

  if (!currentProject) {
    return (
      <Box p={3}>
        <Alert severity="info">Sélectionnez d'abord un projet pour voir les agents disponibles.</Alert>
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

  const agentsByModule = agents.reduce(
    (acc, agent) => {
      if (!acc[agent.module]) {
        acc[agent.module] = [];
      }
      acc[agent.module].push(agent);
      return acc;
    },
    {} as { [key: string]: typeof agents },
  );

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Agents BMad
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Projet: <strong>{currentProject.name}</strong>
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {Object.keys(agentsByModule).length === 0 ? (
        <Alert severity="info">Aucun agent trouvé pour ce projet.</Alert>
      ) : (
        Object.entries(agentsByModule).map(([module, moduleAgents]) => (
          <Box key={module} mb={4}>
            <Typography variant="h5" gutterBottom>
              Module: {module.toUpperCase()}
            </Typography>

            <Grid container spacing={3}>
              {moduleAgents.map((agent) => (
                <Grid item xs={12} md={6} lg={4} key={agent.id}>
                  <Card>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                          {agent.name}
                        </Typography>
                        <Chip icon={<SmartToy />} label={agent.title} size="small" color="primary" variant="outlined" />
                      </Box>

                      <Typography variant="body2" color="textSecondary" paragraph>
                        {agent.config.persona?.role || 'Agent spécialisé'}
                      </Typography>

                      <Box mb={2}>
                        <FormControlLabel
                          control={
                            <Switch checked={isAgentActive(agent.id)} onChange={() => handleActivateAgent(agent.id)} color="primary" />
                          }
                          label="Actif"
                        />
                      </Box>

                      <Box display="flex" gap={1}>
                        <Button
                          variant={isAgentActive(agent.id) ? 'contained' : 'outlined'}
                          startIcon={<PlayArrow />}
                          size="small"
                          disabled={!isAgentActive(agent.id)}
                        >
                          Utiliser
                        </Button>
                        <Button variant="outlined" startIcon={<Settings />} size="small">
                          Configurer
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))
      )}
    </Box>
  );
}
