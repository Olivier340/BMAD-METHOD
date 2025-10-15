import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs-extra';
let db = null;
export function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}
export async function initDatabase() {
  // Ensure .bmad directory exists
  const bmadDir = path.join(process.cwd(), '.bmad');
  await fs.ensureDir(bmadDir);
  const dbPath = path.join(bmadDir, 'visual-studio.db');
  db = new Database(dbPath);
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      path TEXT NOT NULL UNIQUE,
      config TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS workflow_executions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      workflow_id TEXT NOT NULL,
      status TEXT NOT NULL,
      started_at TEXT,
      completed_at TEXT,
      results TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );
    
    CREATE TABLE IF NOT EXISTS agent_sessions (
      id TEXT PRIMARY KEY,
      project_id TEXT NOT NULL,
      agent_id TEXT NOT NULL,
      status TEXT NOT NULL,
      started_at TEXT,
      ended_at TEXT,
      logs TEXT,
      FOREIGN KEY (project_id) REFERENCES projects(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_workflow_executions_project_id ON workflow_executions(project_id);
    CREATE INDEX IF NOT EXISTS idx_agent_sessions_project_id ON agent_sessions(project_id);
  `);
  return db;
}
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}
//# sourceMappingURL=index.js.map
