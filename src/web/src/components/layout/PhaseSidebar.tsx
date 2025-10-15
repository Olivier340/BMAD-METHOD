import {
  Box,
  Drawer,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Analytics as AnalysisIcon,
  Assignment as PlanningIcon,
  Architecture as SolutioningIcon,
  Code as ImplementationIcon,
  Dashboard as DashboardIcon,
  Folder as FolderIcon,
  Timeline as WorkflowIcon,
  SmartToy as SmartToyIcon,
  Hub as HubIcon,
  ViewKanban as KanbanIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

interface PhaseSidebarProps {
  drawerWidth: number;
  sidebarOpen: boolean;
  currentPhase: string;
  onPhaseChange: (phase: string) => void;
  onNavigate: (path: string) => void;
}

const PHASE_ITEMS = [
  {
    id: 'analysis',
    label: 'Analysis',
    icon: <AnalysisIcon />,
    description: 'Brainstorming, research, brief creation',
    path: '/analysis',
    workflows: [
      'brainstorm-project',
      'brainstorm-game',
      'research',
      'product-brief',
      'game-brief',
    ],
  },
  {
    id: 'planning',
    label: 'Planning',
    icon: <PlanningIcon />,
    description: 'PRD/GDD creation, UX specification',
    path: '/planning',
    workflows: ['plan-project', 'ux-spec'],
  },
  {
    id: 'solutioning',
    label: 'Solutioning',
    icon: <SolutioningIcon />,
    description: 'Architecture design, technical specs',
    path: '/solutioning',
    workflows: ['solution-architecture', 'tech-spec'],
  },
  {
    id: 'implementation',
    label: 'Implementation',
    icon: <ImplementationIcon />,
    description: 'Story development and testing',
    path: '/implementation',
    workflows: ['create-story', 'dev-story', 'story-approved'],
  },
];

const QUICK_ACTIONS = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
  { text: 'Workflows', icon: <WorkflowIcon />, path: '/workflows' },
  { text: 'Kanban', icon: <KanbanIcon />, path: '/kanban' },
  { text: 'Agents', icon: <SmartToyIcon />, path: '/agents' },
  { text: 'IDE Hub', icon: <HubIcon />, path: '/ide-hub' },
];

export default function PhaseSidebar({
  drawerWidth,
  sidebarOpen,
  currentPhase,
  onPhaseChange,
  onNavigate,
}: PhaseSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ px: 2, py: 1 }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 600 }}
        >
          BMad Visual Studio
        </Typography>
      </Toolbar>
      <Divider />

      {/* Phase Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Typography
          variant="overline"
          sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}
        >
          Phases BMad-Method
        </Typography>
        <List dense>
          {PHASE_ITEMS.map(phase => {
            const isActive = currentPhase === phase.id;

            return (
              <ListItem key={phase.id} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    onPhaseChange(phase.id);
                    onNavigate(phase.path);
                  }}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                    color: isActive ? 'primary.contrastText' : 'text.primary',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'primary.dark'
                        : 'action.hover',
                    },
                    '& .MuiListItemIcon-root': {
                      color: isActive ? 'primary.contrastText' : 'inherit',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {phase.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={phase.label}
                    secondary={phase.description}
                    primaryTypographyProps={{
                      variant: 'body2',
                      fontWeight: isActive ? 600 : 400,
                    }}
                    secondaryTypographyProps={{
                      variant: 'caption',
                      color: isActive
                        ? 'primary.contrastText'
                        : 'text.secondary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 2 }} />

        {/* Quick Actions */}
        <Typography
          variant="overline"
          sx={{ px: 2, py: 1, display: 'block', color: 'text.secondary' }}
        >
          Actions Rapides
        </Typography>
        <List dense>
          {QUICK_ACTIONS.map(item => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => onNavigate(item.path)}
                sx={{
                  mx: 1,
                  borderRadius: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />
      <List dense>
        <ListItem disablePadding>
          <ListItemButton onClick={() => onNavigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: sidebarOpen ? drawerWidth : 0 },
        flexShrink: { md: 0 },
      }}
      aria-label="Navigation principale"
    >
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobile && sidebarOpen}
        onClose={() => {}} // Controlled by parent
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: 'none', md: sidebarOpen ? 'block' : 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open={sidebarOpen}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
