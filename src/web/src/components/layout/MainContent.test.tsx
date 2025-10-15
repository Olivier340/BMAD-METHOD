import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import bmadTheme from '../../theme/bmadTheme';
import MainContent from './MainContent';

// Mock child component
const MockChild = () => <div>Contenu principal de test</div>;

interface MainContentProps {
  children: React.ReactNode;
  drawerWidth: number;
  sidebarOpen: boolean;
}

const renderMainContent = (props: Partial<MainContentProps> = {}) => {
  const defaultProps: MainContentProps = {
    children: <MockChild />,
    drawerWidth: 280,
    sidebarOpen: true,
    ...props,
  };

  return render(
    <ThemeProvider theme={bmadTheme}>
      <MainContent {...defaultProps} />
    </ThemeProvider>
  );
};

describe('MainContent Component', () => {
  test('renders main content area', () => {
    renderMainContent();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByLabelText(/Contenu principal/i)).toBeInTheDocument();
  });

  test('renders child content', () => {
    renderMainContent();

    expect(screen.getByText('Contenu principal de test')).toBeInTheDocument();
  });

  test('has skip navigation link for accessibility', () => {
    renderMainContent();

    const skipLink = screen.getByText(/Aller au contenu principal/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  test('skip link has proper focus behavior', () => {
    renderMainContent();

    const skipLink = screen.getByText(/Aller au contenu principal/i);

    // Initially hidden
    expect(skipLink).toHaveStyle({ top: '-40px' });

    // When focused, should become visible
    fireEvent.focus(skipLink);
    expect(skipLink).toHaveStyle({ top: '6px' });

    // When blurred, should hide again
    fireEvent.blur(skipLink);
    expect(skipLink).toHaveStyle({ top: '-40px' });
  });

  test('main content has proper tab index for keyboard navigation', () => {
    renderMainContent();

    const mainContent = screen.getByLabelText(/Contenu principal/i);
    expect(mainContent).toHaveAttribute('tabIndex', '-1');
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  test('adjusts width based on sidebar state', () => {
    const { rerender } = renderMainContent({ sidebarOpen: true });

    let mainContent = screen.getByRole('main');
    expect(mainContent).toHaveStyle({ width: 'calc(100% - 280px)' });

    rerender(
      <ThemeProvider theme={bmadTheme}>
        <MainContent drawerWidth={280} sidebarOpen={false}>
          <MockChild />
        </MainContent>
      </ThemeProvider>
    );

    mainContent = screen.getByRole('main');
    expect(mainContent).toHaveStyle({ width: '100%' });
  });
});
