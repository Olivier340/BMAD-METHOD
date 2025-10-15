import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Switch,
  FormControlLabel,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness6 as Brightness6Icon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import UserMenu from '../UserMenu';
import { ProjectSelector } from '../ProjectSelector';

interface AppHeaderProps {
  drawerWidth: number;
  sidebarOpen: boolean;
  currentPhase: string;
  onDrawerToggle: () => void;
  onThemeToggle: () => void;
}

const PHASE_ITEMS = [
  {
    id: 'analysis',
    label: 'Analysis',
    icon: <Brightness6Icon />,
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: <Brightness6Icon />,
  },
  {
    id: 'solutioning',
    label: 'Solutioning',
    icon: <Brightness6Icon />,
  },
  {
    id: 'implementation',
    label: 'Implementation',
    icon: <Brightness6Icon />,
  },
];

export default function AppHeader({
  drawerWidth,
  sidebarOpen,
  currentPhase,
  onDrawerToggle,
  onThemeToggle,
}: AppHeaderProps) {
  const theme = useTheme();
  const dispatch = useDispatch();

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
        ml: { md: sidebarOpen ? `${drawerWidth}px` : 0 },
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar
        sx={{ gap: 2 }}
        role="toolbar"
        aria-label="Contrôles principaux de l'application"
      >
        <IconButton
          color="inherit"
          aria-label="Ouvrir le menu de navigation"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 1, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* Current Phase Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={PHASE_ITEMS.find(p => p.id === currentPhase)?.label}
            color="primary"
            variant="outlined"
            size="small"
            icon={PHASE_ITEMS.find(p => p.id === currentPhase)?.icon}
          />
          <Typography variant="body2" color="text.secondary">
            Phase actuelle
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Project Selector */}
        <Box sx={{ minWidth: 200, display: { xs: 'none', sm: 'block' } }}>
          <ProjectSelector />
        </Box>

        {/* Theme Toggle */}
        <FormControlLabel
          control={
            <Switch
              checked={true}
              onChange={onThemeToggle}
              icon={<Brightness6Icon />}
              checkedIcon={<Brightness6Icon />}
              color="primary"
            />
          }
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Brightness6Icon sx={{ fontSize: 16 }} />
              <Typography variant="caption">
                {'Sombre'}
              </Typography>
            </Box>
          }
          sx={{ mx: 1 }}
        />

        {/* Notifications */}
        <IconButton
          color="inherit"
          aria-label="Notifications (aucune nouvelle notification)"
          sx={{ position: 'relative' }}
        >
          <Badge
            badgeContent={0}
            color="error"
            aria-label="0 notifications non lues"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Menu */}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
