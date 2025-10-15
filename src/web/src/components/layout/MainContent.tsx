import React from 'react';
import { Box } from '@mui/material';

interface MainContentProps {
  children: React.ReactNode;
  drawerWidth: number;
  sidebarOpen: boolean;
}

export default function MainContent({
  children,
  drawerWidth,
  sidebarOpen,
}: MainContentProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        bgcolor: 'background.default',
        p: 3,
        width: { md: sidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%' },
        mt: '64px', // AppBar height
        minHeight: 'calc(100vh - 64px)',
        transition: theme =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
      role="main"
      aria-label="Contenu principal"
    >
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-40px',
          left: '6px',
          background: 'var(--mui-palette-primary-main)',
          color: 'white',
          padding: '8px',
          textDecoration: 'none',
          borderRadius: '4px',
          zIndex: 1000,
        }}
        onFocus={e => {
          e.target.style.top = '6px';
        }}
        onBlur={e => {
          e.target.style.top = '-40px';
        }}
      >
        Aller au contenu principal
      </a>

      <Box id="main-content" tabIndex={-1} sx={{ outline: 'none' }}>
        {children}
      </Box>
    </Box>
  );
}
