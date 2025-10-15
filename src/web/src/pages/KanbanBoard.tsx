import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Avatar,
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
  Fab,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';

interface Epic {
  id: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  stories: string[]; // Story IDs
}

interface Story {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  epicId?: string;
  points?: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
  storyId?: string;
  estimatedHours?: number;
  actualHours?: number;
  createdAt: string;
  updatedAt: string;
}

const STATUS_COLORS = {
  todo: '#757575',
  'in-progress': '#2196f3',
  review: '#ff9800',
  done: '#4caf50',
  planning: '#9c27b0',
  completed: '#4caf50',
};

const PRIORITY_COLORS = {
  low: '#4caf50',
  medium: '#ff9800',
  high: '#f44336',
  critical: '#d32f2f',
};

export default function KanbanBoard() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.dashboard);

  // State for Kanban board
  const [epics, setEpics] = useState<Epic[]>([
    {
      id: 'epic-1',
      title: 'Interface utilisateur moderne',
      description: 'Développer une interface utilisateur moderne et intuitive pour BMad Visual Studio',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Développeur',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stories: ['story-1', 'story-2'],
    },
  ]);

  const [stories, setStories] = useState<Story[]>([
    {
      id: 'story-1',
      title: 'Dashboard principal',
      description: 'Créer le tableau de bord principal avec métriques et activité',
      status: 'done',
      priority: 'high',
      assignee: 'Développeur',
      epicId: 'epic-1',
      points: 8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['ui', 'dashboard'],
    },
    {
      id: 'story-2',
      title: 'Gestion des workflows',
      description: 'Interface pour gérer et exécuter les workflows BMad',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Développeur',
      epicId: 'epic-1',
      points: 13,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['workflows', 'execution'],
    },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-1',
      title: 'Créer le composant Dashboard',
      description: 'Implémenter le composant React pour le tableau de bord',
      status: 'done',
      assignee: 'Développeur',
      storyId: 'story-1',
      estimatedHours: 8,
      actualHours: 6,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'task-2',
      title: 'Intégrer les métriques temps réel',
      description: 'Connecter le dashboard aux API temps réel',
      status: 'in-progress',
      assignee: 'Développeur',
      storyId: 'story-1',
      estimatedHours: 4,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const [showEpicDialog, setShowEpicDialog] = useState(false);
  const [showStoryDialog, setShowStoryDialog] = useState(false);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [newItem, setNewItem] = useState<any>({});

  // Filter items by status for columns
  const getItemsByStatus = (items: any[], status: string) => {
    return items.filter((item) => item.status === status);
  };

  // Get epic by ID
  const getEpicById = (epicId: string) => {
    return epics.find((epic) => epic.id === epicId);
  };

  // Get story by ID
  const getStoryById = (storyId: string) => {
    return stories.find((story) => story.id === storyId);
  };

  // Handle item creation/update
  const handleSaveEpic = () => {
    if (editingItem) {
      setEpics((prev) =>
        prev.map((epic) => (epic.id === editingItem.id ? { ...editingItem, ...newItem, updatedAt: new Date().toISOString() } : epic)),
      );
    } else {
      const epic: Epic = {
        id: `epic-${Date.now()}`,
        title: newItem.title || '',
        description: newItem.description || '',
        status: 'planning',
        priority: newItem.priority || 'medium',
        assignee: newItem.assignee,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        stories: [],
      };
      setEpics((prev) => [...prev, epic]);
    }
    setShowEpicDialog(false);
    setEditingItem(null);
    setNewItem({});
  };

  const handleSaveStory = () => {
    if (editingItem) {
      setStories((prev) =>
        prev.map((story) => (story.id === editingItem.id ? { ...editingItem, ...newItem, updatedAt: new Date().toISOString() } : story)),
      );
    } else {
      const story: Story = {
        id: `story-${Date.now()}`,
        title: newItem.title || '',
        description: newItem.description || '',
        status: 'todo',
        priority: newItem.priority || 'medium',
        assignee: newItem.assignee,
        epicId: newItem.epicId,
        points: newItem.points || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: newItem.tags || [],
      };
      setStories((prev) => [...prev, story]);

      // Add story to epic if specified
      if (newItem.epicId) {
        setEpics((prev) => prev.map((epic) => (epic.id === newItem.epicId ? { ...epic, stories: [...epic.stories, story.id] } : epic)));
      }
    }
    setShowStoryDialog(false);
    setEditingItem(null);
    setNewItem({});
  };

  const handleSaveTask = () => {
    if (editingItem) {
      setTasks((prev) =>
        prev.map((task) => (task.id === editingItem.id ? { ...editingItem, ...newItem, updatedAt: new Date().toISOString() } : task)),
      );
    } else {
      const task: Task = {
        id: `task-${Date.now()}`,
        title: newItem.title || '',
        description: newItem.description || '',
        status: 'todo',
        assignee: newItem.assignee,
        storyId: newItem.storyId,
        estimatedHours: newItem.estimatedHours || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setTasks((prev) => [...prev, task]);
    }
    setShowTaskDialog(false);
    setEditingItem(null);
    setNewItem({});
  };

  // Handle item deletion
  const handleDeleteEpic = (epicId: string) => {
    setEpics((prev) => prev.filter((epic) => epic.id !== epicId));
    setStories((prev) => prev.filter((story) => story.epicId !== epicId));
  };

  const handleDeleteStory = (storyId: string) => {
    setStories((prev) => prev.filter((story) => story.id !== storyId));
    setTasks((prev) => prev.filter((task) => task.storyId !== storyId));
    setEpics((prev) =>
      prev.map((epic) => ({
        ...epic,
        stories: epic.stories.filter((id) => id !== storyId),
      })),
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  // Move item between columns
  const moveItem = (itemId: string, newStatus: string, itemType: 'epic' | 'story' | 'task') => {
    switch (itemType) {
      case 'epic': {
        setEpics((prev) => prev.map((epic) => (epic.id === itemId ? { ...epic, status: newStatus as any } : epic)));
        break;
      }
      case 'story': {
        setStories((prev) => prev.map((story) => (story.id === itemId ? { ...story, status: newStatus as any } : story)));
        break;
      }
      case 'task': {
        setTasks((prev) => prev.map((task) => (task.id === itemId ? { ...task, status: newStatus as any } : task)));
        break;
      }
    }
  };

  if (!currentProject) {
    return (
      <Box p={3}>
        <Alert severity="info">Sélectionnez d'abord un projet pour voir le tableau Kanban.</Alert>
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
              📋 Tableau Kanban - {currentProject.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Gestion des Epics, Stories et Tâches
            </Typography>
          </Box>

          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingItem(null);
                setNewItem({});
                setShowEpicDialog(true);
              }}
            >
              Nouvel Epic
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingItem(null);
                setNewItem({});
                setShowStoryDialog(true);
              }}
            >
              Nouvelle Story
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setEditingItem(null);
                setNewItem({});
                setShowTaskDialog(true);
              }}
            >
              Nouvelle Tâche
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Kanban Columns */}
      <Box sx={{ display: 'flex', flex: 1, gap: 2, overflow: 'auto' }}>
        {/* Epics Columns */}
        <Box sx={{ minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            🚀 Epics
          </Typography>

          {['planning', 'in-progress', 'review', 'completed'].map((status) => (
            <Paper key={status} sx={{ p: 2, mb: 2, minHeight: 200 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
                    mr: 1,
                  }}
                />
                {status === 'planning' && 'Planifié'}
                {status === 'in-progress' && 'En cours'}
                {status === 'review' && 'En révision'}
                {status === 'completed' && 'Terminé'}
              </Typography>

              {getItemsByStatus(epics, status).map((epic) => (
                <Card key={epic.id} sx={{ mb: 1, cursor: 'pointer' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2">{epic.title}</Typography>
                      <Box>
                        <Chip
                          label={epic.priority}
                          size="small"
                          sx={{
                            bgcolor: PRIORITY_COLORS[epic.priority as keyof typeof PRIORITY_COLORS],
                            color: 'white',
                            mr: 1,
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItem(epic);
                            setNewItem(epic);
                            setShowEpicDialog(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEpic(epic.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {epic.description}
                    </Typography>
                    {epic.assignee && (
                      <Box display="flex" alignItems="center" mt={1}>
                        <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="caption">{epic.assignee}</Typography>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Paper>
          ))}
        </Box>

        {/* Stories Columns */}
        <Box sx={{ minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            📖 Stories
          </Typography>

          {['todo', 'in-progress', 'review', 'done'].map((status) => (
            <Paper key={status} sx={{ p: 2, mb: 2, minHeight: 200 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
                    mr: 1,
                  }}
                />
                {status === 'todo' && 'À faire'}
                {status === 'in-progress' && 'En cours'}
                {status === 'review' && 'En révision'}
                {status === 'done' && 'Terminé'}
              </Typography>

              {getItemsByStatus(stories, status).map((story) => (
                <Card key={story.id} sx={{ mb: 1, cursor: 'pointer' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Box display="flex" alignItems="flex-start" justifyContent="space-between" mb={1}>
                      <Typography variant="subtitle2">{story.title}</Typography>
                      <Box>
                        <Chip label={story.points} size="small" sx={{ mr: 1 }} />
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingItem(story);
                            setNewItem(story);
                            setShowStoryDialog(true);
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteStory(story.id);
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {story.description}
                    </Typography>
                    <Box mt={1}>
                      {story.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ mr: 0.5, mb: 0.5 }} />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          ))}
        </Box>

        {/* Tasks Columns */}
        <Box sx={{ minWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            ✅ Tâches
          </Typography>

          {['todo', 'in-progress', 'done'].map((status) => (
            <Paper key={status} sx={{ p: 2, mb: 2, minHeight: 200 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: STATUS_COLORS[status as keyof typeof STATUS_COLORS],
                    mr: 1,
                  }}
                />
                {status === 'todo' && 'À faire'}
                {status === 'in-progress' && 'En cours'}
                {status === 'done' && 'Terminé'}
              </Typography>

              {getItemsByStatus(tasks, status).map((task) => (
                <Card key={task.id} sx={{ mb: 1, cursor: 'pointer' }}>
                  <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                    <Typography variant="subtitle2">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                    {task.estimatedHours && (
                      <Box display="flex" alignItems="center" mt={1}>
                        <ScheduleIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="caption">
                          {task.actualHours || 0}h / {task.estimatedHours}h
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setEditingItem(task);
                        setNewItem(task);
                        setShowTaskDialog(true);
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Creation/Edit Dialogs */}
      <Dialog open={showEpicDialog} onClose={() => setShowEpicDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? "Modifier l'Epic" : 'Créer un nouvel Epic'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            value={newItem.title || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newItem.description || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Priorité</InputLabel>
                <Select
                  value={newItem.priority || 'medium'}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="low">Faible</MenuItem>
                  <MenuItem value="medium">Moyen</MenuItem>
                  <MenuItem value="high">Élevé</MenuItem>
                  <MenuItem value="critical">Critique</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Assigné à"
                value={newItem.assignee || ''}
                onChange={(e) => setNewItem((prev) => ({ ...prev, assignee: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEpicDialog(false)}>Annuler</Button>
          <Button onClick={handleSaveEpic} variant="contained">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showStoryDialog} onClose={() => setShowStoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Modifier la Story' : 'Créer une nouvelle Story'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            value={newItem.title || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newItem.description || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Epic</InputLabel>
                <Select value={newItem.epicId || ''} onChange={(e) => setNewItem((prev) => ({ ...prev, epicId: e.target.value }))}>
                  <MenuItem value="">Aucun</MenuItem>
                  {epics.map((epic) => (
                    <MenuItem key={epic.id} value={epic.id}>
                      {epic.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel>Priorité</InputLabel>
                <Select
                  value={newItem.priority || 'medium'}
                  onChange={(e) => setNewItem((prev) => ({ ...prev, priority: e.target.value }))}
                >
                  <MenuItem value="low">Faible</MenuItem>
                  <MenuItem value="medium">Moyen</MenuItem>
                  <MenuItem value="high">Élevé</MenuItem>
                  <MenuItem value="critical">Critique</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Points"
                type="number"
                value={newItem.points || 0}
                onChange={(e) => setNewItem((prev) => ({ ...prev, points: Number.parseInt(e.target.value) || 0 }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStoryDialog(false)}>Annuler</Button>
          <Button onClick={handleSaveStory} variant="contained">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showTaskDialog} onClose={() => setShowTaskDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Modifier la Tâche' : 'Créer une nouvelle Tâche'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Titre"
            value={newItem.title || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, title: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newItem.description || ''}
            onChange={(e) => setNewItem((prev) => ({ ...prev, description: e.target.value }))}
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Story</InputLabel>
                <Select value={newItem.storyId || ''} onChange={(e) => setNewItem((prev) => ({ ...prev, storyId: e.target.value }))}>
                  <MenuItem value="">Aucune</MenuItem>
                  {stories.map((story) => (
                    <MenuItem key={story.id} value={story.id}>
                      {story.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Heures estimées"
                type="number"
                value={newItem.estimatedHours || 0}
                onChange={(e) => setNewItem((prev) => ({ ...prev, estimatedHours: Number.parseInt(e.target.value) || 0 }))}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Assigné à"
                value={newItem.assignee || ''}
                onChange={(e) => setNewItem((prev) => ({ ...prev, assignee: e.target.value }))}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTaskDialog(false)}>Annuler</Button>
          <Button onClick={handleSaveTask} variant="contained">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
