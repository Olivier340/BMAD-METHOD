import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
import { Box, CircularProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  fallbackPath?: string;
}

export default function ProtectedRoute({ children, requiredRoles = [], fallbackPath: _fallbackPath = '/' }: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useSelector((state: RootState) => state.auth);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '400px',
        }}
      >
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Vérification de l'authentification...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check role permissions if required
  if (requiredRoles.length > 0 && user) {
    const hasRequiredRole = requiredRoles.includes(user.role);

    if (!hasRequiredRole) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            p: 3,
          }}
        >
          <Typography variant="h6" color="error" gutterBottom>
            Accès refusé
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Vous n'avez pas les permissions nécessaires pour accéder à cette page.
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Rôles requis : {requiredRoles.join(', ')}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Votre rôle : {user.role}
          </Typography>
        </Box>
      );
    }
  }

  return <>{children}</>;
}
