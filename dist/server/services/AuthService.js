import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database';
export class AuthService {
  jwtSecret;
  jwtRefreshSecret;
  saltRounds = 12;
  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'bmad-visual-studio-secret-key-2024';
    this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || 'bmad-visual-studio-refresh-secret-key-2024';
  }
  async initializeDatabase() {
    const db = getDatabase();
    // Create users table
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_login TEXT,
        is_active INTEGER DEFAULT 1
      );
    `);
    // Create refresh tokens table
    db.exec(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token TEXT NOT NULL UNIQUE,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        is_revoked INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `);
    // Create default admin user if no users exist
    const existingUsers = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (existingUsers.count === 0) {
      await this.createDefaultAdmin();
    }
  }
  async createDefaultAdmin() {
    const db = getDatabase();
    const hashedPassword = await bcrypt.hash('admin123', this.saltRounds);
    db.prepare(
      `
      INSERT INTO users (id, username, email, password, role, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(uuidv4(), 'admin', 'admin@bmad.local', hashedPassword, 'admin', new Date().toISOString(), new Date().toISOString(), 1);
    console.log('✅ Default admin user created: admin/admin123');
  }
  async registerUser(username, email, password, role = 'user') {
    const db = getDatabase();
    // Check if user already exists
    const existingUser = db.prepare('SELECT * FROM users WHERE username = ? OR email = ?').get(username, email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, this.saltRounds);
    const userId = uuidv4();
    const now = new Date().toISOString();
    const user = {
      id: userId,
      username,
      email,
      password: hashedPassword,
      role: role,
      createdAt: now,
      updatedAt: now,
      isActive: true,
    };
    db.prepare(
      `
      INSERT INTO users (id, username, email, password, role, created_at, updated_at, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(userId, username, email, hashedPassword, role, now, now, 1);
    return user;
  }
  async authenticateUser(username, password) {
    const db = getDatabase();
    // Find user
    const user = db.prepare('SELECT * FROM users WHERE username = ? AND is_active = 1').get(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    // Update last login
    db.prepare('UPDATE users SET last_login = ?, updated_at = ? WHERE id = ?').run(
      new Date().toISOString(),
      new Date().toISOString(),
      user.id,
    );
    // Generate tokens
    const tokens = await this.generateTokens(user);
    return { user, tokens };
  }
  async generateTokens(user) {
    const payload = {
      userId: user.id,
      username: user.username,
      role: user.role,
    };
    // Access token (15 minutes)
    const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: '15m' });
    // Refresh token (7 days)
    const refreshTokenId = uuidv4();
    const refreshToken = jwt.sign({ tokenId: refreshTokenId, userId: user.id }, this.jwtRefreshSecret, { expiresIn: '7d' });
    // Store refresh token in database
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
    const db = getDatabase();
    db.prepare(
      `
      INSERT INTO refresh_tokens (id, user_id, token, expires_at, created_at, is_revoked)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).run(refreshTokenId, user.id, refreshToken, expiresAt, new Date().toISOString(), 0);
    return { accessToken, refreshToken };
  }
  async refreshAccessToken(refreshToken) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret);
      const db = getDatabase();
      // Check if refresh token exists and is not revoked
      const tokenRecord = db
        .prepare(
          `
        SELECT * FROM refresh_tokens
        WHERE id = ? AND user_id = ? AND is_revoked = 0 AND expires_at > ?
      `,
        )
        .get(decoded.tokenId, decoded.userId, new Date().toISOString());
      if (!tokenRecord) {
        throw new Error('Invalid refresh token');
      }
      // Get user
      const user = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(decoded.userId);
      if (!user) {
        throw new Error('User not found');
      }
      // Generate new tokens
      const tokens = await this.generateTokens(user);
      // Revoke old refresh token
      db.prepare('UPDATE refresh_tokens SET is_revoked = 1 WHERE id = ?').run(decoded.tokenId);
      return tokens;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
  async verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, this.jwtSecret);
      return decoded;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }
  async logout(refreshToken) {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtRefreshSecret);
      const db = getDatabase();
      // Revoke refresh token
      db.prepare('UPDATE refresh_tokens SET is_revoked = 1 WHERE id = ?').run(decoded.tokenId);
    } catch (error) {
      // Token already invalid, ignore
    }
  }
  async getUserById(userId) {
    const db = getDatabase();
    const user = db.prepare('SELECT * FROM users WHERE id = ? AND is_active = 1').get(userId);
    if (!user) {
      return null;
    }
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  async getAllUsers() {
    const db = getDatabase();
    const users = db.prepare('SELECT * FROM users WHERE is_active = 1 ORDER BY created_at DESC').all();
    // Remove passwords from response
    return users.map(({ password, ...user }) => user);
  }
  async updateUser(userId, updates) {
    const db = getDatabase();
    const allowedFields = ['username', 'email', 'role'];
    const updateFields = [];
    const values = [];
    Object.entries(updates).forEach(([key, value]) => {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    });
    if (updateFields.length === 0) {
      return null;
    }
    values.push(new Date().toISOString(), userId);
    db.prepare(
      `
      UPDATE users
      SET ${updateFields.join(', ')}, updated_at = ?
      WHERE id = ?
    `,
    ).run(...values);
    return this.getUserById(userId);
  }
  async deleteUser(userId) {
    const db = getDatabase();
    // Soft delete - deactivate user
    const result = db.prepare('UPDATE users SET is_active = 0, updated_at = ? WHERE id = ?').run(new Date().toISOString(), userId);
    return result.changes > 0;
  }
  // Middleware helper for Express
  createAuthMiddleware() {
    return async (req, res, next) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'Access token required' });
        }
        const token = authHeader.substring(7);
        const decoded = await this.verifyAccessToken(token);
        // Add user info to request
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid access token' });
      }
    };
  }
  // Role-based access control middleware
  createRoleMiddleware(allowedRoles) {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ error: 'Authentication required' });
      }
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'Insufficient permissions' });
      }
      next();
    };
  }
}
//# sourceMappingURL=AuthService.js.map
