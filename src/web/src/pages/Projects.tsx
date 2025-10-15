import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import { fetchProjects, scanProjects, selectProject, createProject } from '../stores/projectsSlice';

export default function Projects() {
  const dispatch = useDispatch();
  const { projects, loading, error, currentProject } = useSelector((state: RootState) => state.projects);

  // State for create project dialog
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    path: '',
    template: 'basic',
  });

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(scanProjects());
  };

  const handleSelectProject = (projectId: string) => {
    dispatch(selectProject(projectId));
  };

  const handleCreateProject = () => {
    if (!newProject.name.trim() || !newProject.path.trim()) {
      return;
    }

    dispatch(
      createProject({
        name: newProject.name,
        path: newProject.path,
        config: {
          core: { version: '1.0.0' },
          bmm: { enabled: newProject.template !== 'minimal' },
          bmb: { enabled: newProject.template === 'full' },
          cis: { enabled: newProject.template === 'full' },
        },
        manifest: {
          name: newProject.name,
          version: '1.0.0',
          modules:
            newProject.template === 'minimal'
              ? ['core']
              : newProject.template === 'basic'
                ? ['core', 'bmm']
                : ['core', 'bmm', 'bmb', 'cis'],
        },
        modules:
          newProject.template === 'minimal' ? ['core'] : newProject.template === 'basic' ? ['core', 'bmm'] : ['core', 'bmm', 'bmb', 'cis'],
      }),
    );

    setShowCreateDialog(false);
    setNewProject({ name: '', path: '', template: 'basic' });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Projets BMad</Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={handleRefresh}>
          Scanner les projets
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {projects.length === 0 ? (
        <Alert severity="info">
          Aucun projet trouvé. Utilisez le bouton "Scanner les projets" pour détecter les projets BMad dans votre système.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card
                raised={currentProject?.id === project.id}
                onClick={() => handleSelectProject(project.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {project.name}
                  </Typography>
                  <Typography color="textSecondary" variant="body2" gutterBottom>
                    {project.path}
                  </Typography>

                  <Box mt={2} mb={2}>
                    {project.modules.map((module) => (
                      <Chip key={module} label={module} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>

                  <Typography variant="caption" display="block">
                    Phase: {project.status?.phase || 'N/A'}
                  </Typography>

                  {currentProject?.id === project.id && <Chip label="Sélectionné" color="primary" size="small" sx={{ mt: 1 }} />}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Fab color="primary" aria-label="add" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={() => setShowCreateDialog(true)}>
        <AddIcon />
      </Fab>

      {/* Create Project Dialog */}
      <Dialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Créer un nouveau projet BMad</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom du projet"
            value={newProject.name}
            onChange={(e) => setNewProject((prev) => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />

          <TextField
            fullWidth
            label="Chemin du projet"
            value={newProject.path}
            onChange={(e) => setNewProject((prev) => ({ ...prev, path: e.target.value }))}
            sx={{ mb: 2 }}
            helperText="Chemin absolu où créer le projet"
          />

          <FormControl fullWidth>
            <InputLabel>Template</InputLabel>
            <Select value={newProject.template} onChange={(e) => setNewProject((prev) => ({ ...prev, template: e.target.value }))}>
              <MenuItem value="minimal">Minimal (Core uniquement)</MenuItem>
              <MenuItem value="basic">Basique (Core + BMM)</MenuItem>
              <MenuItem value="full">Complet (Tous les modules)</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCreateDialog(false)}>Annuler</Button>
          <Button onClick={handleCreateProject} variant="contained">
            Créer le projet
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
