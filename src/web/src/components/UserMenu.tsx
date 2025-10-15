import React, { useState } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, Divider, ListItemIcon, Chip } from '@mui/material';
import { AccountCircle, Logout, Settings, AdminPanelSettings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { logoutUser } from '../stores/authSlice';
import LoginDialog from './LoginDialog';

interface UserMenuProps {
  onLoginSuccess?: (user: any, token: string) => void;
}

export default function UserMenu({ onLoginSuccess }: UserMenuProps) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser() as any);
    handleMenuClose();
  };

  const handleLoginSuccess = (user: any, token: string) => {
    if (onLoginSuccess) {
      onLoginSuccess(user, token);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': {
        return 'error';
      }
      case 'user': {
        return 'primary';
      }
      case 'viewer': {
        return 'secondary';
      }
      default: {
        return 'default';
      }
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': {
        return <AdminPanelSettings fontSize="small" />;
      }
      default: {
        return <AccountCircle fontSize="small" />;
      }
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <>
        <IconButton
          color="inherit"
          onClick={() => setShowLoginDialog(true)}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <AccountCircle />
        </IconButton>

        <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} onLoginSuccess={handleLoginSuccess} />
      </>
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip label={user.role} size="small" color={getRoleColor(user.role)} icon={getRoleIcon(user.role)} variant="outlined" />

        <IconButton
          onClick={handleMenuOpen}
          sx={{
            p: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              fontSize: '0.875rem',
            }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Avatar>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1, minWidth: 200 }}>
          <Typography variant="subtitle1" gutterBottom>
            {user.username}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Paramètres
        </MenuItem>

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Se déconnecter
        </MenuItem>
      </Menu>

      <LoginDialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
}
