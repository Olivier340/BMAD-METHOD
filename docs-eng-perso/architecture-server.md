# Architecture - Server (Backend)

## Executive Summary

Express.js REST API server providing backend services for BMad Visual Studio.

## Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Language:** TypeScript
- **Database:** SQLite
- **Authentication:** JWT

## Architecture Pattern

- **Type:** Monolithic API server
- **Style:** RESTful API with real-time events

## Data Architecture

- **Database:** SQLite for development
- **Models:** Project, Workflow, Agent entities
- **Migrations:** Prisma (planned)

## API Design

- **Endpoints:** RESTful routes for CRUD operations
- **Real-time:** Server-Sent Events for live updates
- **Error Handling:** Centralized error middleware

## Component Overview

- **Services:** ProjectService, WorkflowService, AgentService
- **Routes:** Modular API routes
- **Integrations:** IDE Integration Hub

## Source Tree

```
src/server/
├── api/          # REST API routes
├── services/     # Business logic
├── database/     # Database configuration
└── integrations/ # IDE integrations
```

## Development Workflow

- **Setup:** npm install, environment configuration
- **Run:** npm run dev (with hot reload)
- **Build:** npm run build
- **Test:** Jest unit tests (planned)

## Deployment Architecture

- **Target:** Node.js hosting (local, Docker, cloud)
- **Environment:** .env files for configuration
- **Scaling:** Single instance for development
