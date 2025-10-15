import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Play,
  Search,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Settings,
  History,
} from 'lucide-react';
import { RootState } from '../stores';
import {
  fetchWorkflows,
  executeWorkflow,
  fetchExecutions,
  fetchWorkflows as fetchWorkflowsAction,
  executeWorkflow as executeWorkflowAction,
  fetchExecutions as fetchExecutionsAction,
} from '../stores/workflowsSlice';
import { fetchProjects } from '../stores/projectsSlice';
import { WorkflowMetadata, WorkflowExecution } from '../types';

interface WorkflowManagerProps {
  className?: string;
}

const PHASE_LABELS = {
  analysis: '1 - Analyse',
  planning: '2 - Planification',
  solutioning: '3 - Solution',
  implementation: '4 - Implémentation',
};

const PHASE_COLORS = {
  analysis: 'bg-blue-100 text-blue-800',
  planning: 'bg-yellow-100 text-yellow-800',
  solutioning: 'bg-purple-100 text-purple-800',
  implementation: 'bg-green-100 text-green-800',
};

export const WorkflowManager: React.FC<WorkflowManagerProps> = ({
  className = '',
}) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);
  const { workflows, executions, loading } = useSelector(
    (state: RootState) => state.workflows
  );

  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [availablePhases, setAvailablePhases] = useState<string[]>([]);

  useEffect(() => {
    // Load projects on mount
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  useEffect(() => {
    // Load workflows when project or phase changes
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject);
      if (project) {
        dispatch(
          fetchWorkflows({
            projectId: selectedProject,
            projectPath: project.path,
          }) as any
        );
        dispatch(fetchExecutions(selectedProject) as any);
      }
    }
  }, [dispatch, selectedProject, projects]);

  useEffect(() => {
    // Extract available phases from workflows
    const phases = [...new Set(workflows.map(w => w.phase))].filter(
      p => p !== 'unknown'
    );
    setAvailablePhases(phases);
  }, [workflows]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleExecuteWorkflow = (workflow: WorkflowMetadata) => {
    if (!selectedProject) return;

    const params = {}; // Could be enhanced with a form
    dispatch(
      executeWorkflow({
        projectId: selectedProject,
        workflowId: workflow.id,
        params,
      }) as any
    );
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesPhase =
      selectedPhase === 'all' || workflow.phase === selectedPhase;
    const matchesSearch =
      !searchQuery ||
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPhase && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': {
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      }
      case 'failed': {
        return <XCircle className="h-4 w-4 text-red-600" />;
      }
      case 'running': {
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      }
      default: {
        return <Clock className="h-4 w-4 text-gray-400" />;
      }
    }
  };

  const getStatusBadge = (execution: WorkflowExecution) => {
    const baseClasses = 'text-xs';
    switch (execution.status) {
      case 'completed': {
        return (
          <Badge className={`${baseClasses} bg-green-100 text-green-800`}>
            Terminé
          </Badge>
        );
      }
      case 'failed': {
        return (
          <Badge className={`${baseClasses} bg-red-100 text-red-800`}>
            Échec
          </Badge>
        );
      }
      case 'running': {
        return (
          <Badge className={`${baseClasses} bg-blue-100 text-blue-800`}>
            En cours
          </Badge>
        );
      }
      default: {
        return (
          <Badge className={`${baseClasses} bg-gray-100 text-gray-800`}>
            En attente
          </Badge>
        );
      }
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Gestionnaire de Workflows
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Projet</label>
              <select
                value={selectedProject}
                onChange={e => handleProjectChange(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                <option value="">Sélectionner un projet...</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Phase</label>
              <select
                value={selectedPhase}
                onChange={e => setSelectedPhase(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
              >
                <option value="all">Toutes les phases</option>
                {availablePhases.map(phase => (
                  <option key={phase} value={phase}>
                    {PHASE_LABELS[phase as keyof typeof PHASE_LABELS] || phase}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">
                Rechercher
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nom ou description..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <Tabs defaultValue="workflows" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="workflows">Workflows Disponibles</TabsTrigger>
            <TabsTrigger value="executions">Historique d'Exécution</TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Workflows ({filteredWorkflows.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const project = projects.find(p => p.id === selectedProject);
                  if (project) {
                    dispatch(
                      fetchWorkflows({
                        projectId: selectedProject,
                        projectPath: project.path,
                      }) as any
                    );
                  }
                }}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`}
                />
                Actualiser
              </Button>
            </div>

            {filteredWorkflows.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Aucun workflow trouvé pour les critères sélectionnés
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredWorkflows.map(workflow => (
                  <Card key={workflow.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-base">
                            {workflow.name}
                          </CardTitle>
                          <Badge
                            className={`mt-1 ${PHASE_COLORS[workflow.phase as keyof typeof PHASE_COLORS] || 'bg-gray-100 text-gray-800'}`}
                          >
                            {PHASE_LABELS[
                              workflow.phase as keyof typeof PHASE_LABELS
                            ] || workflow.phase}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleExecuteWorkflow(workflow)}
                          disabled={loading}
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Exécuter
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-3">
                        {workflow.description ||
                          'Aucune description disponible'}
                      </p>

                      {workflow.variables && workflow.variables.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-500 mb-1">
                            Variables ({workflow.variables.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {workflow.variables.slice(0, 3).map(variable => (
                              <Badge
                                key={variable.name}
                                variant="outline"
                                className="text-xs"
                              >
                                {variable.name}
                              </Badge>
                            ))}
                            {workflow.variables.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{workflow.variables.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="text-xs text-gray-400">
                        Module: {workflow.module}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="executions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Historique d'Exécution ({executions.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  dispatch(fetchExecutions(selectedProject) as any)
                }
                disabled={loading}
              >
                <History className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>

            {executions.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Clock className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Aucun historique d'exécution trouvé
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {executions.map(execution => (
                  <Card key={execution.id}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(execution.status)}
                          <div>
                            <p className="font-medium">
                              Workflow {execution.workflowId}
                            </p>
                            <p className="text-sm text-gray-500">
                              Démarré le{' '}
                              {new Date(execution.startedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {getStatusBadge(execution)}
                      </div>

                      {execution.currentStep && (
                        <div className="mb-2">
                          <p className="text-sm font-medium">Étape actuelle:</p>
                          <p className="text-sm text-gray-600">
                            {execution.currentStep}
                          </p>
                        </div>
                      )}

                      {execution.progress !== undefined && (
                        <div className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progression</span>
                            <span>{execution.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${execution.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {execution.lastOutput && (
                        <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                          {execution.lastOutput.length > 100
                            ? `${execution.lastOutput.slice(0, 100)}...`
                            : execution.lastOutput}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}

      {!selectedProject && (
        <Card>
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Sélectionnez un projet pour voir les workflows disponibles
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
