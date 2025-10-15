import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import bmadTheme from '../theme/bmadTheme';
import uiSlice from '../stores/uiSlice';
import Layout from './Layout';

// Mock child component
const MockChild = () => <div>Contenu de test</div>;

// Create a mock store
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      ui: uiSlice,
    },
    preloadedState: {
      ui: {
        theme: 'dark',
        sidebarOpen: true,
        notifications: [],
        ...initialState,
      },
    },
  });
};

// Wrapper component for tests
const TestWrapper = ({
  children,
  store,
}: {
  children: React.ReactNode;
  store?: any;
}) => {
  const mockStore = store || createMockStore();
  return (
    <Provider store={mockStore}>
      <ThemeProvider theme={bmadTheme}>
        <BrowserRouter>
          <Layout>{children}</Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

describe('Layout Component', () => {
  test('renders main layout structure', () => {
    render(
      <TestWrapper>
        <MockChild />
      </TestWrapper>
    );

    // Check for main layout elements
    expect(screen.getByRole('application')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Contenu principal de l'application/i)
    ).toBeInTheDocument();
  });

  test('renders child content', () => {
    render(
      <TestWrapper>
        <MockChild />
      </TestWrapper>
    );

    expect(screen.getByText('Contenu de test')).toBeInTheDocument();
  });

  test('has proper ARIA labels for accessibility', () => {
    render(
      <TestWrapper>
        <MockChild />
      </TestWrapper>
    );

    // Check for accessibility labels
    expect(
      screen.getByLabelText(/BMad Visual Studio - Interface de développement/i)
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Zone de contenu principale/i)
    ).toBeInTheDocument();
  });

  test('skip navigation link is present for keyboard users', () => {
    render(
      <TestWrapper>
        <MockChild />
      </TestWrapper>
    );

    const skipLink = screen.getByText(/Aller au contenu principal/i);
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
