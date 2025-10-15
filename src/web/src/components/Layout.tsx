import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../stores';
import { AppHeader, PhaseSidebar, MainContent } from './layout';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('implementation');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sidebarOpen } = useSelector((state: RootState) => state.ui);

  const handleThemeToggle = () => {
    dispatch({ type: 'ui/toggleTheme' });
  };

  const handlePhaseChange = (phase: string) => {
    setCurrentPhase(phase);
    navigate(`/${phase}`);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{ display: 'flex' }}
      role="application"
      aria-label="BMad Visual Studio - Interface de développement"
    >
      <PhaseSidebar
        drawerWidth={drawerWidth}
        sidebarOpen={sidebarOpen || mobileOpen}
        currentPhase={currentPhase}
        onPhaseChange={handlePhaseChange}
        onNavigate={path => {
          navigate(path);
          if (isMobile) setMobileOpen(false);
        }}
      />

      <Box
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
        role="main"
        aria-label="Contenu principal de l'application"
      >
        <AppHeader
          drawerWidth={drawerWidth}
          sidebarOpen={sidebarOpen || mobileOpen}
          currentPhase={currentPhase}
          onDrawerToggle={handleDrawerToggle}
          onThemeToggle={handleThemeToggle}
        />

        <MainContent
          drawerWidth={drawerWidth}
          sidebarOpen={sidebarOpen || mobileOpen}
        >
          {children}
        </MainContent>
      </Box>
    </Box>
  );
}
