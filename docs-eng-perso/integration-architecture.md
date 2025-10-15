# Integration Architecture

## Overview

BMad Visual Studio integrates multiple components and external systems.

## Part-to-Part Integration

### Web ↔ Server

- **Protocol:** REST API over HTTP
- **Direction:** Web (client) → Server (API)
- **Endpoints Used:**
  - Projects CRUD
  - Workflows discovery and execution
  - Agents management
  - Real-time events (SSE)
- **Authentication:** JWT tokens

### Server ↔ IDEs

- **Integration Hub:** `src/server/integrations/IDEIntegrationHub.ts`
- **Supported IDEs:**
  - Cursor AI
  - Claude Code
  - Gemini CLI
  - VS Code
- **Communication:** Context synchronization and event passing

## External Integrations

- **File System:** Scans for BMad projects and workflows
- **Package Managers:** npm/pnpm for dependency management
- **Version Control:** Git integration (planned)

## Data Flow

1. User interacts with React frontend
2. Frontend makes API calls to Express server
3. Server processes requests and accesses SQLite database
4. Server sends real-time updates via SSE
5. IDE integrations receive context updates

## Integration Points

- **Discovery:** Automatic scanning of project structures
- **Execution:** Workflow execution across IDEs
- **Monitoring:** Real-time status updates
