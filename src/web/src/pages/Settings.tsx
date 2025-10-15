import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, Save as SaveIcon, Folder as FolderIcon } from '@mui/icons-material';

export default function Settings() {
  const [scanPaths, setScanPaths] = useState<string[]>(['/home/oga', '/home/oga/projects', '/home/oga/www']);

  const [newPath, setNewPath] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const handleAddPath = () => {
    if (newPath.trim() && !scanPaths.includes(newPath.trim())) {
      setScanPaths((prev) => [...prev, newPath.trim()]);
      setNewPath('');
    }
  };

  const handleRemovePath = (pathToRemove: string) => {
    setScanPaths((prev) => prev.filter((path) => path !== pathToRemove));
  };

  const handleSaveSettings = async () => {
    setSaveStatus('saving');

    try {
      // In a real implementation, this would save to backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSaveStatus('saved');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch {
      setSaveStatus('error');

      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }
  };

  const getStatusMessage = () => {
    switch (saveStatus) {
      case 'saving': {
        return 'Sauvegarde en cours...';
      }
      case 'saved': {
        return 'Paramètres sauvegardés avec succès !';
      }
      case 'error': {
        return 'Erreur lors de la sauvegarde';
      }
      default: {
        return '';
      }
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          ⚙️ Paramètres
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Configurez les paramètres de BMad Visual Studio
        </Typography>
      </Paper>

      {/* Status Alert */}
      {saveStatus !== 'idle' && (
        <Alert severity={saveStatus === 'saved' ? 'success' : saveStatus === 'error' ? 'error' : 'info'} sx={{ mb: 2 }}>
          {getStatusMessage()}
        </Alert>
      )}

      <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
        {/* Scan Paths Settings */}
        <Paper sx={{ flex: 1, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <FolderIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Dossiers de scan automatique
          </Typography>

          <Typography variant="body2" color="textSecondary" paragraph>
            Configurez les dossiers dans lesquels BMad Visual Studio recherchera automatiquement les projets BMad.
          </Typography>

          {/* Add new path */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              fullWidth
              label="Nouveau dossier à scanner"
              value={newPath}
              onChange={(e) => setNewPath(e.target.value)}
              placeholder="/chemin/vers/dossier"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAddPath();
                }
              }}
            />
            <Button variant="contained" onClick={handleAddPath} disabled={!newPath.trim()}>
              <AddIcon />
            </Button>
          </Box>

          {/* List of scan paths */}
          <List>
            {scanPaths.map((path, index) => (
              <ListItem key={index}>
                <ListItemText primary={path} secondary={`Dossier ${index + 1}`} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleRemovePath(path)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>

          {scanPaths.length === 0 && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Aucun dossier de scan configuré. Ajoutez au moins un dossier pour permettre la détection automatique des projets.
            </Alert>
          )}
        </Paper>

        {/* Actions Panel */}
        <Paper sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Actions
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="contained" fullWidth onClick={handleSaveSettings} disabled={saveStatus === 'saving'} startIcon={<SaveIcon />}>
              {saveStatus === 'saving' ? 'Sauvegarde...' : 'Sauvegarder les paramètres'}
            </Button>

            <Divider />

            <Typography variant="subtitle2" gutterBottom>
              Informations système
            </Typography>

            <Card variant="outlined">
              <CardContent sx={{ p: 2 }}>
                <Typography variant="body2" gutterBottom>
                  <strong>Version BMad :</strong> 6.0.0-alpha.0
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Serveur :</strong> Fallback Mode
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Base de données :</strong> SQLite
                </Typography>
                <Typography variant="body2">
                  <strong>Dossiers scannés :</strong> {scanPaths.length}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
