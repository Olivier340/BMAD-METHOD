# BMad Visual Studio - Project Documentation

## Project Overview

**BMad Visual Studio** is a web interface for the BMad-Method v6, providing a visual platform for managing projects, workflows, agents, and development processes.

### Quick Reference

- **Type:** Monorepo with Server and Web parts
- **Primary Language:** TypeScript
- **Architecture:** React frontend + Express backend
- **Database:** SQLite

### Parts

#### Server (Backend)

- **Type:** web (Express REST API)
- **Tech Stack:** Node.js, Express, TypeScript, SQLite
- **Root:** src/server

#### Web (Frontend)

- **Type:** web (React SPA)
- **Tech Stack:** React, TypeScript, Material-UI, Redux
- **Root:** src/web

## Generated Documentation

### Core Documentation

- [Project Structure](./project-structure.md)
- [Technology Stack](./technology-stack.md)
- [Project Parts Metadata](./project-parts.json)

### Architecture

- [Server Architecture](./architecture-server.md)
- [Web Architecture](./architecture-web.md)

### Implementation Details

- [API Contracts - Server](./api-contracts-server.md)
- [Component Inventory - Web](./component-inventory-web.md)
- [Development Guide](./development-guide.md)

### Integration

- [Integration Architecture](./integration-architecture.md)

## Existing Documentation

- [README.md](../README.md) - Main project README
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines

## Getting Started

1. **Install dependencies:** `npm install`
2. **Build and start:** `npm run serve`
3. **Access interface:** http://localhost:42065

## Next Steps for Development

- Review architecture documents for each part
- Use API contracts for backend integration
- Reference component inventory for frontend development
- Follow development guide for setup and workflows
