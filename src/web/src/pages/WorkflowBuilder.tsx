import React, { useState, useCallback, useRef } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  IconButton,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Divider,
  Tooltip,
  Fab,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  PlayArrow as PlayIcon,
  DragIndicator as DragIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'task' | 'decision' | 'parallel' | 'merge';
  description: string;
  parameters: { [key: string]: any };
  position: { x: number; y: number };
  connections: string[]; // IDs of connected steps
}

interface CustomWorkflow {
  id: string;
  name: string;
  description: string;
  module: string;
  phase: string;
  steps: WorkflowStep[];
  variables: Array<{
    name: string;
    type: string;
    required: boolean;
    defaultValue?: any;
    description?: string;
  }>;
}

const STEP_TYPES = [
  { value: 'task', label: 'Tâche', icon: '📋', color: '#2196f3' },
  { value: 'decision', label: 'Décision', icon: '🔀', color: '#ff9800' },
  { value: 'parallel', label: 'Parallèle', icon: '⚡', color: '#9c27b0' },
  { value: 'merge', label: 'Fusion', icon: '🔗', color: '#4caf50' },
];

const BMAD_MODULES = [
  { value: 'core', label: 'Core' },
  { value: 'bmm', label: 'Business Model Management' },
  { value: 'bmb', label: 'BMad Builder' },
  { value: 'cis', label: 'Creative Intelligence Systems' },
];

const BMAD_PHASES = [
  { value: 'analysis', label: 'Analysis' },
  { value: 'planning', label: 'Planning' },
  { value: 'solutioning', label: 'Solutioning' },
  { value: 'implementation', label: 'Implementation' },
];

export default function WorkflowBuilder() {
  const dispatch = useDispatch();
  const { currentProject } = useSelector((state: RootState) => state.dashboard);

  // State for workflow builder
  const [workflow, setWorkflow] = useState<CustomWorkflow>({
    id: '',
    name: '',
    description: '',
    module: 'core',
    phase: 'analysis',
    steps: [],
    variables: [],
  });

  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [draggedStep, setDraggedStep] = useState<WorkflowStep | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showStepDialog, setShowStepDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newStep, setNewStep] = useState<Partial<WorkflowStep>>({});
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  // Handle drag and drop
  const handleDragStart = useCallback((e: React.DragEvent, step: WorkflowStep) => {
    setDraggedStep(step);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggedStep || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update step position
      setWorkflow((prev) => ({
        ...prev,
        steps: prev.steps.map((step) => (step.id === draggedStep.id ? { ...step, position: { x, y } } : step)),
      }));

      setDraggedStep(null);
    },
    [draggedStep],
  );

  // Add new step
  const handleAddStep = useCallback(() => {
    const step: WorkflowStep = {
      id: `step-${Date.now()}`,
      name: newStep.name || 'Nouvelle étape',
      type: newStep.type || 'task',
      description: newStep.description || '',
      parameters: newStep.parameters || {},
      position: { x: 100, y: 100 },
      connections: [],
    };

    setWorkflow((prev) => ({
      ...prev,
      steps: [...prev.steps, step],
    }));

    setNewStep({});
    setShowStepDialog(false);
  }, [newStep]);

  // Delete step
  const handleDeleteStep = useCallback(
    (stepId: string) => {
      setWorkflow((prev) => ({
        ...prev,
        steps: prev.steps.filter((step) => step.id !== stepId),
      }));
      if (selectedStep?.id === stepId) {
        setSelectedStep(null);
      }
    },
    [selectedStep],
  );

  // Update step
  const handleUpdateStep = useCallback((updatedStep: WorkflowStep) => {
    setWorkflow((prev) => ({
      ...prev,
      steps: prev.steps.map((step) => (step.id === updatedStep.id ? updatedStep : step)),
    }));
    setSelectedStep(updatedStep);
  }, []);

  // Save workflow
  const handleSaveWorkflow = useCallback(async () => {
    if (!workflow.name.trim()) {
      setSnackbar({
        open: true,
        message: 'Le nom du workflow est obligatoire',
        severity: 'error',
      });
      return;
    }

    try {
      // Generate workflow YAML
      const workflowYaml = generateWorkflowYAML(workflow);

      // In a real implementation, this would save to the BMad project
      console.log('Saving workflow:', workflowYaml);

      setSnackbar({
        open: true,
        message: `Workflow "${workflow.name}" sauvegardé avec succès`,
        severity: 'success',
      });

      setShowSaveDialog(false);
    } catch {
      setSnackbar({
        open: true,
        message: 'Erreur lors de la sauvegarde du workflow',
        severity: 'error',
      });
    }
  }, [workflow]);

  // Generate workflow YAML
  const generateWorkflowYAML = (wf: CustomWorkflow): string => {
    const yaml = {
      name: wf.name,
      description: wf.description,
      module: wf.module,
      phase: wf.phase,
      variables: wf.variables.reduce((acc, variable) => {
        acc[variable.name] = variable.defaultValue || '';
        return acc;
      }, {} as any),
      steps: wf.steps.map((step) => ({
        id: step.id,
        name: step.name,
        type: step.type,
        description: step.description,
        parameters: step.parameters,
        position: step.position,
        connections: step.connections,
      })),
    };

    return JSON.stringify(yaml, null, 2);
  };

  if (!currentProject) {
    return (
      <Box p={3}>
        <Alert severity="info">Sélectionnez d'abord un projet pour créer des workflows personnalisés.</Alert>
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
              🏗️ Constructeur de Workflows
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Créez des workflows personnalisés pour votre projet BMad
            </Typography>
          </Box>

          <Box display="flex" gap={1}>
            <Button variant="outlined" startIcon={<SaveIcon />} onClick={() => setShowSaveDialog(true)}>
              Sauvegarder
            </Button>
            <Button variant="contained" startIcon={<PlayIcon />} color="success">
              Tester
            </Button>
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', flex: 1, gap: 2 }}>
        {/* Toolbox */}
        <Paper sx={{ width: 280, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            🧰 Outils
          </Typography>

          <Box mb={3}>
            <Typography variant="subtitle2" gutterBottom>
              Informations du workflow
            </Typography>
            <TextField
              fullWidth
              size="small"
              label="Nom du workflow"
              value={workflow.name}
              onChange={(e) => setWorkflow((prev) => ({ ...prev, name: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              label="Description"
              multiline
              rows={2}
              value={workflow.description}
              onChange={(e) => setWorkflow((prev) => ({ ...prev, description: e.target.value }))}
              sx={{ mb: 2 }}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Module</InputLabel>
                  <Select value={workflow.module} onChange={(e) => setWorkflow((prev) => ({ ...prev, module: e.target.value }))}>
                    {BMAD_MODULES.map((module) => (
                      <MenuItem key={module.value} value={module.value}>
                        {module.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Phase</InputLabel>
                  <Select value={workflow.phase} onChange={(e) => setWorkflow((prev) => ({ ...prev, phase: e.target.value }))}>
                    {BMAD_PHASES.map((phase) => (
                      <MenuItem key={phase.value} value={phase.value}>
                        {phase.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle2" gutterBottom>
            Étapes disponibles
          </Typography>

          {STEP_TYPES.map((stepType) => (
            <Card
              key={stepType.value}
              sx={{
                mb: 1,
                cursor: 'grab',
                border: '2px dashed transparent',
                '&:hover': {
                  borderColor: stepType.color,
                  bgcolor: `${stepType.color}10`,
                },
              }}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('stepType', stepType.value);
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography>{stepType.icon}</Typography>
                  <Typography variant="body2">{stepType.label}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}

          <Button fullWidth variant="outlined" startIcon={<AddIcon />} onClick={() => setShowStepDialog(true)} sx={{ mt: 2 }}>
            Ajouter une étape personnalisée
          </Button>
        </Paper>

        {/* Canvas */}
        <Paper
          ref={canvasRef}
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            background:
              'linear-gradient(45deg, #f5f5f5 25%, transparent 25%), linear-gradient(-45deg, #f5f5f5 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f5f5f5 75%), linear-gradient(-45deg, transparent 75%, #f5f5f5 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Box p={2}>
            <Typography variant="h6" gutterBottom>
              Zone de travail
            </Typography>

            {workflow.steps.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 300,
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                }}
              >
                <Typography color="textSecondary">
                  Glissez des étapes depuis la boîte à outils ou cliquez sur "Ajouter une étape"
                </Typography>
              </Box>
            ) : (
              <Box sx={{ position: 'relative', height: 400 }}>
                {workflow.steps.map((step) => (
                  <Card
                    key={step.id}
                    sx={{
                      position: 'absolute',
                      left: step.position.x,
                      top: step.position.y,
                      width: 200,
                      cursor: selectedStep?.id === step.id ? 'default' : 'pointer',
                      border: selectedStep?.id === step.id ? '2px solid #2196f3' : '1px solid #ddd',
                      boxShadow: selectedStep?.id === step.id ? 3 : 1,
                    }}
                    onClick={() => setSelectedStep(step)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, step)}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                        <Typography variant="subtitle2">
                          {STEP_TYPES.find((t) => t.value === step.type)?.icon} {step.name}
                        </Typography>
                        <Box>
                          <Tooltip title="Modifier">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedStep(step);
                                setIsEditing(true);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Supprimer">
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteStep(step.id);
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Box>
                      <Typography variant="caption" color="textSecondary">
                        {step.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Properties Panel */}
        <Paper sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Propriétés
          </Typography>

          {selectedStep ? (
            <Box>
              <TextField
                fullWidth
                size="small"
                label="Nom de l'étape"
                value={selectedStep.name}
                onChange={(e) => handleUpdateStep({ ...selectedStep, name: e.target.value })}
                sx={{ mb: 2 }}
              />

              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Type</InputLabel>
                <Select value={selectedStep.type} onChange={(e) => handleUpdateStep({ ...selectedStep, type: e.target.value as any })}>
                  {STEP_TYPES.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.icon} {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                size="small"
                label="Description"
                multiline
                rows={3}
                value={selectedStep.description}
                onChange={(e) => handleUpdateStep({ ...selectedStep, description: e.target.value })}
                sx={{ mb: 2 }}
              />

              <Typography variant="subtitle2" gutterBottom>
                Connexions
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                {workflow.steps
                  .filter((s) => s.id !== selectedStep.id)
                  .map((step) => (
                    <Chip
                      key={step.id}
                      label={step.name}
                      size="small"
                      variant={selectedStep.connections.includes(step.id) ? 'filled' : 'outlined'}
                      onClick={() => {
                        const isConnected = selectedStep.connections.includes(step.id);
                        handleUpdateStep({
                          ...selectedStep,
                          connections: isConnected
                            ? selectedStep.connections.filter((id) => id !== step.id)
                            : [...selectedStep.connections, step.id],
                        });
                      }}
                    />
                  ))}
              </Box>
            </Box>
          ) : (
            <Typography color="textSecondary">Sélectionnez une étape pour voir ses propriétés</Typography>
          )}
        </Paper>
      </Box>

      {/* Step Creation Dialog */}
      <Dialog open={showStepDialog} onClose={() => setShowStepDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Ajouter une nouvelle étape</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nom de l'étape"
            value={newStep.name || ''}
            onChange={(e) => setNewStep((prev) => ({ ...prev, name: e.target.value }))}
            sx={{ mb: 2, mt: 1 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Type d'étape</InputLabel>
            <Select value={newStep.type || 'task'} onChange={(e) => setNewStep((prev) => ({ ...prev, type: e.target.value }))}>
              {STEP_TYPES.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            value={newStep.description || ''}
            onChange={(e) => setNewStep((prev) => ({ ...prev, description: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowStepDialog(false)}>Annuler</Button>
          <Button onClick={handleAddStep} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>

      {/* Save Dialog */}
      <Dialog open={showSaveDialog} onClose={() => setShowSaveDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Sauvegarder le workflow</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Le workflow sera sauvegardé dans votre projet BMad sous forme de fichier YAML.
          </Alert>

          <TextField
            fullWidth
            label="Nom du fichier (optionnel)"
            helperText="Laissez vide pour utiliser le nom du workflow"
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" color="textSecondary">
            <strong>Emplacement:</strong> {currentProject.path}/bmad/{workflow.module}/workflows/custom/
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSaveDialog(false)}>Annuler</Button>
          <Button onClick={handleSaveWorkflow} variant="contained">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
        <Alert severity={snackbar.severity} onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
