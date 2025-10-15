# API Contracts - Server

## Overview

REST API endpoints provided by the Express server for BMad Visual Studio.

## Endpoints

### Projects API

- **GET /api/projects** - List all BMad projects
- **POST /api/projects** - Create new project
- **GET /api/projects/:id** - Get project details
- **PUT /api/projects/:id** - Update project
- **DELETE /api/projects/:id** - Delete project

### Workflows API

- **GET /api/workflows/:projectId** - List workflows for project
- **POST /api/workflows/:projectId/execute** - Execute workflow

### Agents API

- **GET /api/agents/:projectId** - List agents for project

### Events API

- **GET /api/events** - Server-Sent Events for real-time updates

## Authentication

- JWT-based authentication middleware
- Protected routes require valid token

## Response Formats

- JSON for all endpoints
- Error responses include status codes and messages
