# Architecture - Web (Frontend)

## Executive Summary

React SPA frontend for BMad Visual Studio with Material-UI components.

## Technology Stack

- **Framework:** React 18.x
- **Language:** TypeScript
- **Build Tool:** Vite 4.x
- **UI Library:** Material-UI 5.x
- **State Management:** Redux Toolkit

## Architecture Pattern

- **Type:** Single Page Application (SPA)
- **Style:** Component-based with routing

## Component Overview

- **Pages:** Dashboard, Projects, Workflows, Agents, IDE Hub
- **Components:** Layout, MetricsCard, ActivityFeed, QuickActions
- **Stores:** Redux slices for state management

## Source Tree

```
src/web/src/
├── components/  # Reusable UI components
├── pages/       # Route-based pages
├── stores/      # Redux state management
├── services/    # API clients
└── hooks/       # Custom React hooks
```

## Development Workflow

- **Setup:** npm install in src/web/
- **Run:** npm run dev (Vite dev server)
- **Build:** npm run build
- **Test:** React Testing Library (planned)

## Deployment Architecture

- **Build:** Static files served by Express server
- **Integration:** Proxy API calls to backend
