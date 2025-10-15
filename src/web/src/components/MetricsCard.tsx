import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface MetricsCardProps {
  title: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export default function MetricsCard({ title, value, color = 'primary' }: MetricsCardProps) {
  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h3" color={`${color}.main`}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
