import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import bmadTheme from '../../theme/bmadTheme';
import AppHeader from './AppHeader';

// Mock the ProjectSelector and UserMenu components
jest.mock('../ProjectSelector', () => ({
  ProjectSelector: () => <div>Project Selector</div>,
}));

jest.mock('../UserMenu', () => ({
  __esModule: true,
  default: () => <div>User Menu</div>,
}));

interface AppHeaderProps {
  drawerWidth: number;
  sidebarOpen: boolean;
  currentPhase: string;
  onDrawerToggle: () => void;
  onThemeToggle: () => void;
}

const renderAppHeader = (props: Partial<AppHeaderProps> = {}) => {
  const defaultProps: AppHeaderProps = {
    drawerWidth: 280,
    sidebarOpen: true,
    currentPhase: 'implementation',
    onDrawerToggle: jest.fn(),
    onThemeToggle: jest.fn(),
    ...props,
  };

  return render(
    <ThemeProvider theme={bmadTheme}>
      <AppHeader {...defaultProps} />
    </ThemeProvider>
  );
};

describe('AppHeader Component', () => {
  test('renders header with phase indicator', () => {
    renderAppHeader({ currentPhase: 'analysis' });

    expect(screen.getByText(/Analysis/i)).toBeInTheDocument();
    expect(screen.getByText(/Phase actuelle/i)).toBeInTheDocument();
  });

  test('renders project selector', () => {
    renderAppHeader();

    expect(screen.getByText('Project Selector')).toBeInTheDocument();
  });

  test('renders theme toggle', () => {
    renderAppHeader();

    const themeToggle = screen.getByRole('checkbox');
    expect(themeToggle).toBeInTheDocument();
  });

  test('renders notifications bell', () => {
    renderAppHeader();

    const notificationsButton = screen.getByLabelText(/Notifications/i);
    expect(notificationsButton).toBeInTheDocument();
  });

  test('renders user menu', () => {
    renderAppHeader();

    expect(screen.getByText('User Menu')).toBeInTheDocument();
  });

  test('calls onDrawerToggle when menu button is clicked', () => {
    const onDrawerToggle = jest.fn();
    renderAppHeader({ onDrawerToggle });

    const menuButton = screen.getByLabelText(/Ouvrir le menu de navigation/i);
    fireEvent.click(menuButton);

    expect(onDrawerToggle).toHaveBeenCalledTimes(1);
  });

  test('shows different phase labels correctly', () => {
    const { rerender } = renderAppHeader({ currentPhase: 'planning' });

    expect(screen.getByText(/Planning/i)).toBeInTheDocument();

    rerender(
      <ThemeProvider theme={bmadTheme}>
        <AppHeader
          drawerWidth={280}
          sidebarOpen={true}
          currentPhase="solutioning"
          onDrawerToggle={jest.fn()}
          onThemeToggle={jest.fn()}
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/Solutioning/i)).toBeInTheDocument();
  });
});
