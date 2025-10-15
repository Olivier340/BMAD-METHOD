-- Migration: Add active project context management
-- Description: Adds table to track the currently active project context across sessions

CREATE TABLE IF NOT EXISTS active_project_context (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  user_id TEXT DEFAULT 'default', -- Support for multiple users if needed
  context_data TEXT, -- JSON data for additional context information
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(user_id) -- Only one active project per user at a time
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_active_project_context_user_id ON active_project_context(user_id);
CREATE INDEX IF NOT EXISTS idx_active_project_context_project_id ON active_project_context(project_id);
