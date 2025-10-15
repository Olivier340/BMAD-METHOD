import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Alert,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  PersonOutline as UserIcon,
  Visibility as ViewerIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../stores';
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

interface CreateUserForm {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user' | 'viewer';
}

export default function UserManagement() {
  const { user: currentUser, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<CreateUserForm>({
    username: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');

  // Check if current user is admin
  const isAdmin = currentUser?.role === 'admin';

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth/users');
      setUsers(response.data.users);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      setError('');
      await axios.post('/api/auth/register', {
        username: newUser.username,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role,
      });

      setShowCreateDialog(false);
      setNewUser({ username: '', email: '', password: '', role: 'user' });
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      setError(error.response?.data?.error || "Erreur lors de la création de l'utilisateur");
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;

    try {
      setError('');
      await axios.put(`/api/auth/users/${editingUser.id}`, {
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });

      setShowEditDialog(false);
      setEditingUser(null);
      setNewUser({ username: '', email: '', password: '', role: 'user' });
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      setError(error.response?.data?.error || "Erreur lors de la modification de l'utilisateur");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      setError('');
      await axios.delete(`/api/auth/users/${userId}`);
      fetchUsers(); // Refresh user list
    } catch (error: any) {
      setError(error.response?.data?.error || "Erreur lors de la suppression de l'utilisateur");
    }
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setNewUser({
      username: user.username,
      email: user.email,
      password: '',
      role: user.role,
    });
    setShowEditDialog(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': {
        return <AdminIcon fontSize="small" />;
      }
      case 'user': {
        return <UserIcon fontSize="small" />;
      }
      case 'viewer': {
        return <ViewerIcon fontSize="small" />;
      }
      default: {
        return <PersonIcon fontSize="small" />;
      }
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': {
        return 'error';
      }
      case 'user': {
        return 'primary';
      }
      case 'viewer': {
        return 'secondary';
      }
      default: {
        return 'default';
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isAuthenticated) {
    return (
      <Box p={3}>
        <Alert severity="warning">Vous devez être connecté pour accéder à cette page.</Alert>
      </Box>
    );
  }

  if (!isAdmin) {
    return (
      <Box p={3}>
        <Alert severity="error">Accès refusé. Cette page nécessite des privilèges d'administrateur.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" gutterBottom>
              👥 Gestion des utilisateurs
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Gérez les utilisateurs et leurs permissions BMad Visual Studio
            </Typography>
          </Box>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowCreateDialog(true)}>
            Nouvel utilisateur
          </Button>
        </Box>
      </Paper>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Users Table */}
      <Paper sx={{ flex: 1, overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 200px)' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Créé le</TableCell>
                <TableCell>Dernière connexion</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <PersonIcon />
                      <Typography variant="body2">{user.username}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip icon={getRoleIcon(user.role)} label={user.role} color={getRoleColor(user.role)} size="small" />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{user.lastLogin ? formatDate(user.lastLogin) : 'Jamais'}</TableCell>
                  <TableCell>
                    <Chip label={user.isActive ? 'Actif' : 'Inactif'} color={user.isActive ? 'success' : 'default'} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton size="small" onClick={() => openEditDialog(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteUser(user.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Create User Dialog */}
      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser((prev) => ({ ...prev, password: e.target.value }))}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth>
            <InputLabel>Rôle</InputLabel>
            <Select value={newUser.role} onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value as any }))}>
              <MenuItem value="admin">
                <AdminIcon sx={{ mr: 1 }} />
                Administrateur
              </MenuItem>
              <MenuItem value="user">
                <UserIcon sx={{ mr: 1 }} />
                Utilisateur
              </MenuItem>
              <MenuItem value="viewer">
                <ViewerIcon sx={{ mr: 1 }} />
                Observateur
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Annuler</Button>
          <Button onClick={handleCreateUser} variant="contained">
            Créer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Modifier l'utilisateur</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom d'utilisateur"
            value={newUser.username}
            onChange={(e) => setNewUser((prev) => ({ ...prev, username: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />

          <TextField
            fullWidth
            label="Email"
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth>
            <InputLabel>Rôle</InputLabel>
            <Select value={newUser.role} onChange={(e) => setNewUser((prev) => ({ ...prev, role: e.target.value as any }))}>
              <MenuItem value="admin">
                <AdminIcon sx={{ mr: 1 }} />
                Administrateur
              </MenuItem>
              <MenuItem value="user">
                <UserIcon sx={{ mr: 1 }} />
                Utilisateur
              </MenuItem>
              <MenuItem value="viewer">
                <ViewerIcon sx={{ mr: 1 }} />
                Observateur
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Annuler</Button>
          <Button onClick={handleEditUser} variant="contained">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
