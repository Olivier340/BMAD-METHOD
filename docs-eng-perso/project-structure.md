# Project Structure Analysis

## Repository Type: Monorepo

This project is structured as a monorepo with multiple distinct parts:

### Parts Detected:

1. **Server (Backend)**
   - Root Path: `src/server`
   - Project Type: web
   - Technologies: Node.js, Express, TypeScript, SQLite
   - Purpose: API server and backend services

2. **Web (Frontend)**
   - Root Path: `src/web`
   - Project Type: web
   - Technologies: React, TypeScript, Material-UI, Redux
   - Purpose: React frontend application

### Integration Points:

- Server provides REST API endpoints consumed by the React frontend
- Shared types and interfaces between server and client
- Real-time communication via Server-Sent Events (SSE)

### Architecture Match:

- Server: web-express-api (Express REST API)
- Web: web-react-express-separate (React + Express Separate)
