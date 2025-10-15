import React from 'react';
import { Box, Typography, Chip, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';

const activityIcons: { [key: string]: string } = {
  workflow: '🔄',
  agent: '🤖',
  project: '📁',
  system: '⚙️',
};

export default function ActivityFeed() {
  const { activityFeed } = useSelector((state: RootState) => state.dashboard);

  if (activityFeed.length === 0) {
    return <Typography color="textSecondary">Aucune activité récente</Typography>;
  }

  return (
    <Box>
      {activityFeed.slice(0, 10).map((activity) => (
        <Box
          key={activity.id}
          display="flex"
          alignItems="center"
          mb={2}
          p={1}
          sx={{
            borderRadius: 1,
            bgcolor: activity.severity === 'error' ? 'error.light' : activity.severity === 'warning' ? 'warning.light' : 'transparent',
          }}
        >
          <Avatar sx={{ width: 24, height: 24, mr: 2, fontSize: '0.8rem' }}>{activityIcons[activity.type]}</Avatar>
          <Box flexGrow={1}>
            <Typography variant="body2">{activity.message}</Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(activity.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
          <Chip
            label={activity.severity}
            size="small"
            color={activity.severity === 'error' ? 'error' : activity.severity === 'warning' ? 'warning' : 'default'}
          />
        </Box>
      ))}
    </Box>
  );
}
