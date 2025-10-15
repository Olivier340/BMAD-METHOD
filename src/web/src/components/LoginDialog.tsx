import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff, Login as LoginIcon, PersonAdd as RegisterIcon } from '@mui/icons-material';
import axios from 'axios';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`auth-tabpanel-${index}`} aria-labelledby={`auth-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any, token: string) => void;
}

export default function LoginDialog({ open, onClose, onLoginSuccess }: LoginDialogProps) {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setError('');
  };

  const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', loginForm);

      // Store access token
      localStorage.setItem('accessToken', response.data.accessToken);

      // Call success callback
      onLoginSuccess(response.data.user, response.data.accessToken);

      onClose();
    } catch (error: any) {
      setError(error.response?.data?.error || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await axios.post('/api/auth/register', {
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        role: registerForm.role,
      });

      // Auto-login after successful registration
      const loginResponse = await axios.post('/api/auth/login', {
        username: registerForm.username,
        password: registerForm.password,
      });

      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      onLoginSuccess(loginResponse.data.user, loginResponse.data.accessToken);

      onClose();
    } catch (error: any) {
      setError(error.response?.data?.error || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter') {
      action();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="div" gutterBottom>
          🔐 Connexion à BMad Visual Studio
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="auth tabs">
          <Tab icon={<LoginIcon />} label="Se connecter" id="auth-tab-0" aria-controls="auth-tabpanel-0" />
          <Tab icon={<RegisterIcon />} label="S'inscrire" id="auth-tab-1" aria-controls="auth-tabpanel-1" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <TabPanel value={tabValue} index={0}>
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Connectez-vous avec votre compte BMad Visual Studio
            </Typography>

            <TextField
              fullWidth
              label="Nom d'utilisateur"
              value={loginForm.username}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, username: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, handleLogin)}
              sx={{ mb: 2, mt: 2 }}
            />

            <TextField
              fullWidth
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={loginForm.password}
              onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, handleLogin)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            <Typography variant="caption" color="textSecondary">
              💡 Compte admin par défaut : admin / admin123
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Créez votre compte BMad Visual Studio
            </Typography>

            <TextField
              fullWidth
              label="Nom d'utilisateur"
              value={registerForm.username}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, username: e.target.value }))}
              sx={{ mb: 2, mt: 2 }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, email: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Rôle</InputLabel>
              <Select value={registerForm.role} onChange={(e) => setRegisterForm((prev) => ({ ...prev, role: e.target.value }))}>
                <MenuItem value="user">Utilisateur</MenuItem>
                <MenuItem value="viewer">Observateur</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={registerForm.password}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, password: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirmer le mot de passe"
              type={showPassword ? 'text' : 'password'}
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
              onKeyPress={(e) => handleKeyPress(e, handleRegister)}
            />
          </Box>
        </TabPanel>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Annuler</Button>
        <Button
          variant="contained"
          onClick={tabValue === 0 ? handleLogin : handleRegister}
          disabled={loading}
          startIcon={tabValue === 0 ? <LoginIcon /> : <RegisterIcon />}
        >
          {loading ? 'Chargement...' : tabValue === 0 ? 'Se connecter' : "S'inscrire"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
