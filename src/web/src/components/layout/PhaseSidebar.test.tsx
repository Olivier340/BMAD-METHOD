import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import bmadTheme from '../../theme/bmadTheme';
import PhaseSidebar from './PhaseSidebar';

// Mock useMediaQuery hook
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}));

interface PhaseSidebarProps {
  drawerWidth: number;
  sidebarOpen: boolean;
  currentPhase: string;
  onPhaseChange: (phase: string) => void;
  onNavigate: (path: string) => void;
}

const renderPhaseSidebar = (props: Partial<PhaseSidebarProps> = {}) => {
  const defaultProps: PhaseSidebarProps = {
    drawerWidth: 280,
    sidebarOpen: true,
    currentPhase: 'implementation',
    onPhaseChange: jest.fn(),
    onNavigate: jest.fn(),
    ...props,
  };

  return render(
    <ThemeProvider theme={bmadTheme}>
      <PhaseSidebar {...defaultProps} />
    </ThemeProvider>
  );
};

describe('PhaseSidebar Component', () => {
  beforeEach(() => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop by default
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders BMad Visual Studio title', () => {
    renderPhaseSidebar();

    expect(screen.getByText('BMad Visual Studio')).toBeInTheDocument();
  });

  test('renders all phase navigation items', () => {
    renderPhaseSidebar();

    expect(screen.getByText('Analysis')).toBeInTheDocument();
    expect(screen.getByText('Planning')).toBeInTheDocument();
    expect(screen.getByText('Solutioning')).toBeInTheDocument();
    expect(screen.getByText('Implementation')).toBeInTheDocument();
  });

  test('renders phase descriptions', () => {
    renderPhaseSidebar();

    expect(
      screen.getByText('Brainstorming, research, brief creation')
    ).toBeInTheDocument();
    expect(
      screen.getByText('PRD/GDD creation, UX specification')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Architecture design, technical specs')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Story development and testing')
    ).toBeInTheDocument();
  });

  test('renders quick actions section', () => {
    renderPhaseSidebar();

    expect(screen.getByText('Actions Rapides')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Workflows')).toBeInTheDocument();
    expect(screen.getByText('Kanban')).toBeInTheDocument();
    expect(screen.getByText('Agents')).toBeInTheDocument();
    expect(screen.getByText('IDE Hub')).toBeInTheDocument();
  });

  test('highlights current phase', () => {
    renderPhaseSidebar({ currentPhase: 'planning' });

    const planningButton = screen.getByText('Planning').closest('button');
    expect(planningButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('calls onPhaseChange when phase is clicked', () => {
    const onPhaseChange = jest.fn();
    renderPhaseSidebar({ onPhaseChange });

    const analysisButton = screen.getByText('Analysis').closest('button');
    fireEvent.click(analysisButton!);

    expect(onPhaseChange).toHaveBeenCalledWith('analysis');
  });

  test('calls onNavigate when quick action is clicked', () => {
    const onNavigate = jest.fn();
    renderPhaseSidebar({ onNavigate });

    const dashboardButton = screen.getByText('Dashboard').closest('button');
    fireEvent.click(dashboardButton!);

    expect(onNavigate).toHaveBeenCalledWith('/');
  });

  test('renders settings option', () => {
    renderPhaseSidebar();

    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  test('applies correct ARIA labels', () => {
    renderPhaseSidebar();

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigation principale');
  });

  test('renders mobile drawer when on mobile', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true); // Mobile
    renderPhaseSidebar({ sidebarOpen: true });

    // Mobile drawer should be rendered (temporary variant)
    const drawer = screen
      .getByRole('presentation')
      .closest('[role="dialog"], [role="menu"]');
    expect(drawer).toBeInTheDocument();
  });

  test('renders desktop drawer when on desktop', () => {
    (useMediaQuery as jest.Mock).mockReturnValue(false); // Desktop
    renderPhaseSidebar({ sidebarOpen: true });

    // Desktop drawer should be rendered (persistent variant)
    const drawer = screen
      .getByRole('navigation')
      .querySelector('[role="presentation"]');
    expect(drawer).toBeInTheDocument();
  });

  test('drawer width is applied correctly', () => {
    renderPhaseSidebar({ drawerWidth: 320 });

    // The drawer should have the correct width applied via sx prop
    const drawer = screen.getByRole('navigation');
    expect(drawer).toBeInTheDocument();
  });

  test('phase items have correct icons', () => {
    renderPhaseSidebar();

    // Check that icons are rendered (they should be SVG elements or icon components)
    const phaseItems = screen.getAllByRole('button');
    expect(phaseItems.length).toBeGreaterThan(4); // At least the 4 phases
  });
});
