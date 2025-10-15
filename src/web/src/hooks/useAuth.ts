import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Verify token and get user info
      verifyToken(token);
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  // Setup axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && authState.token) {
          // Token expired, try to refresh
          try {
            const refreshResponse = await axios.post(
              '/api/auth/refresh',
              {},
              {
                withCredentials: true,
              },
            );

            const newToken = refreshResponse.data.accessToken;
            localStorage.setItem('accessToken', newToken);

            setAuthState((prev) => ({
              ...prev,
              token: newToken,
              isAuthenticated: true,
            }));

            // Retry the original request with new token
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios(error.config);
          } catch (refreshError) {
            // Refresh failed, logout user
            logout();
            throw refreshError;
          }
        }
        throw error;
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [authState.token]);

  const verifyToken = useCallback(async (token: string) => {
    try {
      // Set token in axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const response = await axios.get('/api/auth/me');

      setAuthState({
        user: response.data.user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      // Token invalid, remove from storage
      localStorage.removeItem('accessToken');
      axios.defaults.headers.common['Authorization'] = '';

      setAuthState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<User> => {
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password,
      });

      const { user, accessToken } = response.data;

      // Store token
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      setAuthState({
        user,
        token: accessToken,
        isAuthenticated: true,
        isLoading: false,
      });

      return user;
    } catch (error: any) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  }, []);

  const register = useCallback(
    async (username: string, email: string, password: string, role: string = 'user'): Promise<User> => {
      try {
        const response = await axios.post('/api/auth/register', {
          username,
          email,
          password,
          role,
        });

        // Auto-login after registration
        return await login(username, password);
      } catch (error: any) {
        throw new Error(error.response?.data?.error || 'Registration failed');
      }
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to revoke refresh token
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch {
      // Ignore errors during logout
    }

    // Clear local storage and state
    localStorage.removeItem('accessToken');
    axios.defaults.headers.common['Authorization'] = '';

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const hasRole = useCallback(
    (role: string | string[]): boolean => {
      if (!authState.user) return false;

      const userRole = authState.user.role;
      const allowedRoles = Array.isArray(role) ? role : [role];

      return allowedRoles.includes(userRole);
    },
    [authState.user],
  );

  return {
    ...authState,
    login,
    register,
    logout,
    hasRole,
  };
};
