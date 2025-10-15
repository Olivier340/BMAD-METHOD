import { Router, Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { eventEmitter } from './events';

export const authRouter: Router = Router();
const authService = new AuthService();

// POST /api/auth/register - Register new user
authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email and password are required' });
    }

    const user = await authService.registerUser(username, email, password, role || 'user');

    // Emit user registered event
    eventEmitter.emit('user-registered', { userId: user.id, username: user.username });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: Error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: error.message || 'Registration failed' });
  }
});

// POST /api/auth/login - Authenticate user
authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const { user, tokens } = await authService.authenticateUser(username, password);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Emit login event
    eventEmitter.emit('user-login', { userId: user.id, username: user.username });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      accessToken: tokens.accessToken,
    });
  } catch (error: Error) {
    console.error('Login error:', error);
    res.status(401).json({ error: error.message || 'Authentication failed' });
  }
});

// POST /api/auth/refresh - Refresh access token
authRouter.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const tokens = await authService.refreshAccessToken(refreshToken);

    // Set new refresh token as httpOnly cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      message: 'Token refreshed successfully',
      accessToken: tokens.accessToken,
    });
  } catch (error: Error) {
    console.error('Token refresh error:', error);
    res.status(401).json({ error: error.message || 'Token refresh failed' });
  }
});

// POST /api/auth/logout - Logout user
authRouter.post('/logout', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    // Clear refresh token cookie
    res.clearCookie('refreshToken');

    res.json({ message: 'Logout successful' });
  } catch (error: Error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// GET /api/auth/me - Get current user info
authRouter.get('/me', authService.createAuthMiddleware(), async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const user = await authService.getUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error: Error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to get user info' });
  }
});

// GET /api/auth/users - Get all users (admin only)
authRouter.get(
  '/users',
  authService.createAuthMiddleware(),
  authService.createRoleMiddleware(['admin']),
  async (req: Request, res: Response) => {
    try {
      const users = await authService.getAllUsers();
      res.json({ users });
    } catch (error: Error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Failed to get users' });
    }
  },
);

// PUT /api/auth/users/:userId - Update user (admin only)
authRouter.put(
  '/users/:userId',
  authService.createAuthMiddleware(),
  authService.createRoleMiddleware(['admin']),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const updates = req.body;

      const user = await authService.updateUser(userId, updates);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Emit user updated event
      eventEmitter.emit('user-updated', { userId: user.id, updates });

      res.json({
        message: 'User updated successfully',
        user,
      });
    } catch (error: Error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  },
);

// DELETE /api/auth/users/:userId - Delete user (admin only)
authRouter.delete(
  '/users/:userId',
  authService.createAuthMiddleware(),
  authService.createRoleMiddleware(['admin']),
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const deleted = await authService.deleteUser(userId);

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Emit user deleted event
      eventEmitter.emit('user-deleted', { userId });

      res.json({ message: 'User deleted successfully' });
    } catch (error: Error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },
);
