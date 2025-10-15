import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Bot,
  Play,
  Square,
  RefreshCw,
  Settings,
  Activity,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';
import { RootState } from '../stores';
import {
  fetchAgents,
  fetchActiveAgents,
  activateAgent,
  deactivateAgent,
  fetchAgentSessions,
  configureAgent,
  reloadAgent,
  validateAgent,
  fetchAgentStatistics,
} from '../stores/agentsSlice';
import { fetchProjects } from '../stores/projectsSlice';
import { AgentMetadata, AgentSession } from '../types';

interface AgentManagerProps {
  className?: string;
}

const STATUS_COLORS = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  loading: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800',
};

const CAPABILITY_ICONS = {
  workflows: Zap,
  tools: Settings,
  contextSync: Activity,
  fileSync: Users,
  realTime: Clock,
};

export const AgentManager: React.FC<AgentManagerProps> = ({
  className = '',
}) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);
  const { agents, activeAgents, sessions, loading } = useSelector(
    (state: RootState) => state.agents
  );

  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [showConfiguration, setShowConfiguration] = useState(false);

  useEffect(() => {
    // Load projects on mount
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  useEffect(() => {
    // Load agents when project changes
    if (selectedProject) {
      const project = projects.find(p => p.id === selectedProject);
      if (project) {
        dispatch(
          fetchAgents({
            projectId: selectedProject,
            projectPath: project.path,
          }) as any
        );
        dispatch(fetchActiveAgents(selectedProject) as any);
        dispatch(fetchAgentSessions(selectedProject) as any);
        dispatch(fetchAgentStatistics(selectedProject) as any);
      }
    }
  }, [dispatch, selectedProject, projects]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const handleActivateAgent = (agentId: string) => {
    if (!selectedProject) return;

    dispatch(
      activateAgent({
        projectId: selectedProject,
        agentId,
        context: {},
      }) as any
    );
  };

  const handleDeactivateAgent = (sessionId: string) => {
    dispatch(deactivateAgent(sessionId) as any);
  };

  const handleReloadAgent = (agentId: string) => {
    if (!selectedProject) return;

    dispatch(
      reloadAgent({
        projectId: selectedProject,
        agentId,
      }) as any
    );
  };

  const handleValidateAgent = (agentId: string) => {
    if (!selectedProject) return;

    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      dispatch(
        validateAgent({
          projectId: selectedProject,
          agentId,
          projectPath: project.path,
        }) as any
      );
    }
  };

  const getAgentStatus = (agent: AgentMetadata) => {
    return activeAgents.includes(agent.id) ? 'active' : 'inactive';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': {
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      }
      case 'loading': {
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      }
      case 'error': {
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      }
      default: {
        return <Clock className="h-4 w-4 text-gray-400" />;
      }
    }
  };

  const renderCapabilities = (capabilities: any) => {
    if (!capabilities) return null;

    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {Object.entries(capabilities).map(([capability, enabled]) => {
          if (!enabled) return null;

          const IconComponent =
            CAPABILITY_ICONS[capability as keyof typeof CAPABILITY_ICONS];
          if (!IconComponent) return null;

          return (
            <Badge key={capability} variant="outline" className="text-xs">
              <IconComponent className="h-3 w-3 mr-1" />
              {capability}
            </Badge>
          );
        })}
      </div>
    );
  };

  const renderAgentCard = (agent: AgentMetadata) => {
    const status = getAgentStatus(agent);
    const isActive = status === 'active';
    const activeSession = sessions.find(
      s => s.agentId === agent.id && s.status === 'active'
    );

    return (
      <Card key={agent.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{agent.icon}</span>
                <CardTitle className="text-base">{agent.name}</CardTitle>
              </div>
              <Badge
                className={`text-xs ${STATUS_COLORS[status as keyof typeof STATUS_COLORS]}`}
              >
                {status}
              </Badge>
            </div>
            <div className="flex gap-1">
              {isActive ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleReloadAgent(agent.id)}
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Recharger
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleValidateAgent(agent.id)}
                    disabled={loading}
                  >
                    Valider
                  </Button>
                  {activeSession && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeactivateAgent(activeSession.id)}
                    >
                      <Square className="h-4 w-4 mr-1" />
                      Désactiver
                    </Button>
                  )}
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleActivateAgent(agent.id)}
                  disabled={loading}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Activer
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">{agent.title}</p>

          {renderCapabilities(agent.capabilities)}

          {agent.dependencies && agent.dependencies.length > 0 && (
            <div className="mt-2">
              <p className="text-xs font-medium text-gray-500 mb-1">
                Dépendances ({agent.dependencies.length})
              </p>
              <div className="flex flex-wrap gap-1">
                {agent.dependencies.map(depId => (
                  <Badge key={depId} variant="outline" className="text-xs">
                    {depId}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-400 mt-2">
            Module: {agent.module}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Project Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Gestionnaire d'Agents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Projet</label>
              <Select
                value={selectedProject}
                onValueChange={handleProjectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un projet..." />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProject && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const project = projects.find(
                      p => p.id === selectedProject
                    );
                    if (project) {
                      dispatch(
                        fetchAgents({
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
            )}
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Agents Disponibles</TabsTrigger>
            <TabsTrigger value="sessions">Sessions Actives</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Agents Disponibles ({agents.length})
              </h3>
            </div>

            {agents.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Bot className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">
                    Aucun agent trouvé pour ce projet
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agents.map(renderAgentCard)}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Sessions Actives (
                {sessions.filter(s => s.status === 'active').length})
              </h3>
            </div>

            {sessions.filter(s => s.status === 'active').length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500">Aucune session d'agent active</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {sessions
                  .filter(s => s.status === 'active')
                  .map(session => {
                    const agent = agents.find(a => a.id === session.agentId);
                    if (!agent) return null;

                    return (
                      <Card key={session.id}>
                        <CardContent className="py-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{agent.icon}</span>
                              <div>
                                <p className="font-medium">{agent.name}</p>
                                <p className="text-sm text-gray-500">
                                  Démarrée le{' '}
                                  {new Date(session.startedAt).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusIcon('active')}
                              <Badge className={STATUS_COLORS.active}>
                                Active
                              </Badge>
                            </div>
                          </div>

                          {session.context &&
                            Object.keys(session.context).length > 0 && (
                              <div className="mb-2">
                                <p className="text-sm font-medium">Contexte:</p>
                                <pre className="text-xs bg-gray-50 p-2 rounded mt-1 overflow-x-auto">
                                  {JSON.stringify(session.context, null, 2)}
                                </pre>
                              </div>
                            )}

                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleReloadAgent(agent.id)}
                              disabled={loading}
                            >
                              <RefreshCw className="h-4 w-4 mr-1" />
                              Recharger
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeactivateAgent(session.id)}
                            >
                              <Square className="h-4 w-4 mr-1" />
                              Désactiver
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Configuration des Agents
              </h3>
            </div>

            <Card>
              <CardContent className="py-8 text-center">
                <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Interface de configuration des agents - à implémenter
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cette section permettra de configurer les paramètres et
                  préférences des agents
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {!selectedProject && (
        <Card>
          <CardContent className="py-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Sélectionnez un projet pour voir les agents disponibles
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
