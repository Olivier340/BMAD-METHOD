import React from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Chip, Switch, FormControlLabel, Alert } from '@mui/material';
import { Hub, Sync } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { toggleIDE } from '../stores/ideHubSlice';

export default function IDEHub() {
  const dispatch = useDispatch();
  const { availableIDEs } = useSelector((state: RootState) => state.ideHub);

  const handleToggleIDE = (ideType: string) => {
    dispatch(toggleIDE(ideType));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Hub d'intégration IDE
      </Typography>

      <Typography variant="body1" color="textSecondary" paragraph>
        Connectez et gérez vos environnements de développement intégrés avec BMad Visual Studio.
      </Typography>

      <Grid container spacing={3}>
        {availableIDEs.map((ide) => (
          <Grid item xs={12} md={6} key={ide.type}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6">{ide.name}</Typography>
                  <Chip label={ide.connected ? 'Connecté' : 'Déconnecté'} color={ide.connected ? 'success' : 'default'} />
                </Box>

                <Typography variant="body2" color="textSecondary" mb={2}>
                  {ide.description}
                </Typography>

                <Box mb={2}>
                  <Typography variant="body2" gutterBottom>
                    Capacités:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {Object.entries(ide.capabilities).map(([capability, enabled]) => (
                      <Chip
                        key={capability}
                        label={capability}
                        size="small"
                        color={enabled ? 'primary' : 'default'}
                        variant={enabled ? 'filled' : 'outlined'}
                      />
                    ))}
                  </Box>
                </Box>

                <FormControlLabel
                  control={<Switch checked={ide.connected} onChange={() => handleToggleIDE(ide.type)} color="primary" />}
                  label="Activer l'intégration"
                />

                {ide.connected && (
                  <Box mt={2}>
                    <Button variant="outlined" startIcon={<Sync />} size="small" fullWidth>
                      Synchroniser le contexte
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Note:</strong> L'intégration avec les IDEs nécessite une configuration spécifique dans chaque environnement. Consultez la
          documentation pour chaque IDE supporté.
        </Typography>
      </Alert>
    </Box>
  );
}
