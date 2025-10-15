# Development Guide

## Prerequisites

- **Node.js:** 18+
- **npm or pnpm:** Package manager (project uses pnpm)
- **Git:** For version control

## Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bmad-code-org/BMAD-METHOD.git
   cd bmad-method-perso
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment variables:**
   Create `.env` files if needed (see `.env.example` if available)

## Local Development Commands

### Backend Development

- **Build backend:**

  ```bash
  npm run build:backend
  # or
  pnpm build:backend
  ```

- **Start development server:**
  ```bash
  npm run serve
  # or
  pnpm serve
  ```

### Frontend Development

- **Build frontend:**

  ```bash
  npm run build:frontend
  # or
  pnpm build:frontend
  ```

- **Start frontend dev server (separate):**
  ```bash
  cd src/web && npm run dev
  ```

### Combined Commands

- **Build everything:**

  ```bash
  npm run build
  ```

- **Start full application:**
  ```bash
  npm run serve  # Builds and starts server + frontend
  ```

## Testing

- **Lint code:**

  ```bash
  npm run lint
  ```

- **Fix linting issues:**

  ```bash
  npm run lint:fix
  ```

- **Format code:**
  ```bash
  npm run format:fix
  ```

## Project Structure for Development

- **Backend:** `src/server/` - Express API, services, database
- **Frontend:** `src/web/` - React application, components, stores
- **Modules:** `bmad/` - BMAD method modules and workflows

## Common Development Tasks

1. **Add new API endpoint:** Edit `src/server/api/`
2. **Add new React component:** Create in `src/web/src/components/`
3. **Update Redux state:** Edit slices in `src/web/src/stores/`
4. **Add new workflow:** Create in appropriate `bmad/bmm/workflows/` folder

## IDE Integration

- **VS Code:** Extensions for TypeScript, React, ESLint
- **Cursor:** BMAD rules integration
- **Other IDEs:** Standard web development setup
