import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow, SmartToy, Assessment } from '@mui/icons-material';

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Démarrer un workflow',
      icon: <PlayArrow />,
      path: '/workflows',
      variant: 'contained' as const,
    },
    {
      label: 'Activer un agent',
      icon: <SmartToy />,
      path: '/agents',
      variant: 'outlined' as const,
    },
    {
      label: 'Voir les métriques',
      icon: <Assessment />,
      path: '/',
      variant: 'outlined' as const,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {actions.map((action) => (
        <Button key={action.label} variant={action.variant} startIcon={action.icon} fullWidth onClick={() => navigate(action.path)}>
          {action.label}
        </Button>
      ))}
    </Box>
  );
}
