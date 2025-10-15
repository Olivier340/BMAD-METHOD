-- Migration: Add agent management tables
-- Description: Adds tables for agent sessions, configurations, and lifecycle management

-- Agent sessions table
CREATE TABLE IF NOT EXISTS agent_sessions (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  status TEXT NOT NULL,
  started_at TEXT,
  ended_at TEXT,
  context TEXT, -- JSON data for agent context
  logs TEXT, -- JSON array of log entries
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Agent configurations table
CREATE TABLE IF NOT EXISTS agent_configurations (
  id TEXT PRIMARY KEY,
  agent_id TEXT NOT NULL,
  project_id TEXT, -- NULL for global configurations
  user_id TEXT, -- NULL for project-wide configurations
  settings TEXT, -- JSON data for agent settings
  preferences TEXT, -- JSON data for user preferences
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(agent_id, project_id, user_id) -- Prevent duplicate configurations
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agent_sessions_project_id ON agent_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_agent_id ON agent_sessions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_sessions_status ON agent_sessions(status);
CREATE INDEX IF NOT EXISTS idx_agent_configurations_agent_id ON agent_configurations(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_configurations_project_id ON agent_configurations(project_id);
CREATE INDEX IF NOT EXISTS idx_agent_configurations_user_id ON agent_configurations(user_id);
