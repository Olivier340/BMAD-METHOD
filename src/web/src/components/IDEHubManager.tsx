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
import { Input } from './ui/input';
import {
  Monitor,
  Wifi,
  WifiOff,
  Settings,
  RefreshCw,
  Shield,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  FileText,
  Bot,
  Workflow,
  Database,
} from 'lucide-react';
import { RootState } from '../stores';
import { fetchProjects } from '../stores/projectsSlice';
import { IDEConnection, IDECapabilities } from '../types';

interface IDEHubManagerProps {
  className?: string;
}

const CAPABILITY_ICONS = {
  agents: Bot,
  workflows: Workflow,
  contextSync: Database,
  fileSync: FileText,
  realTime: Zap,
  commandExecution: Settings,
};

const STATUS_COLORS = {
  connected: 'bg-green-100 text-green-800',
  disconnected: 'bg-gray-100 text-gray-800',
  connecting: 'bg-blue-100 text-blue-800',
  error: 'bg-red-100 text-red-800',
};

const AVAILABLE_IDES = [
  {
    type: 'cursor',
    name: 'Cursor AI',
    description: 'Integrated development environment with AI assistance',
    capabilities: {
      agents: true,
      workflows: true,
      contextSync: true,
      fileSync: true,
      realTime: true,
      commandExecution: true,
    },
    defaultConfig: {
      host: 'localhost',
      port: 8080,
      workspace: process.cwd(),
      syncInterval: 5000,
      autoConnect: true,
    },
  },
  {
    type: 'vscode',
    name: 'Visual Studio Code',
    description: 'Microsoft Visual Studio Code IDE',
    capabilities: {
      agents: true,
      workflows: true,
      contextSync: true,
      fileSync: false,
      realTime: false,
      commandExecution: true,
    },
    defaultConfig: {
      host: 'localhost',
      port: 3001,
      apiKey: '',
      workspace: process.cwd(),
      syncInterval: 10_000,
      autoConnect: false,
    },
  },
  {
    type: 'claude-code',
    name: 'Claude Code',
    description: 'AI-powered coding assistant',
    capabilities: {
      agents: true,
      workflows: false,
      contextSync: true,
      fileSync: false,
      realTime: false,
      commandExecution: false,
    },
    defaultConfig: {
      host: 'localhost',
      port: 3002,
      apiKey: '',
      workspace: process.cwd(),
      syncInterval: 15_000,
      autoConnect: false,
    },
  },
];

export const IDEHubManager: React.FC<IDEHubManagerProps> = ({
  className = '',
}) => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state: RootState) => state.projects);

  const [connections, setConnections] = useState<Map<string, IDEConnection>>(
    new Map()
  );
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [connectionConfigs, setConnectionConfigs] = useState<Map<string, any>>(
    new Map()
  );

  useEffect(() => {
    dispatch(fetchProjects() as any);
  }, [dispatch]);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
    // Load existing connections for this project
    loadProjectConnections(projectId);
  };

  const loadProjectConnections = async (projectId: string) => {
    // This would load existing connections from the backend
    // For now, we'll initialize with empty connections
    const newConnections = new Map<string, IDEConnection>();

    for (const ide of AVAILABLE_IDES) {
      newConnections.set(ide.type, {
        type: ide.type,
        status: 'disconnected',
        capabilities: ide.capabilities,
        config: ide.defaultConfig,
      });
    }

    setConnections(newConnections);
  };

  const handleConnectIDE = async (ideType: string) => {
    if (!selectedProject) return;

    // Update connection status
    setConnections(prev => {
      const newConnections = new Map(prev);
      const connection = newConnections.get(ideType);
      if (connection) {
        newConnections.set(ideType, {
          ...connection,
          status: 'connecting',
        });
      }
      return newConnections;
    });

    try {
      // Simulate connection process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, this would call the backend API
      // const response = await axios.post(`/api/ide/${selectedProject}/connect`, {
      //   ideType,
      //   config: connectionConfigs.get(ideType)
      // });

      // For demo purposes, we'll simulate success
      setConnections(prev => {
        const newConnections = new Map(prev);
        const connection = newConnections.get(ideType);
        if (connection) {
          newConnections.set(ideType, {
            ...connection,
            status: 'connected',
            lastSync: new Date().toISOString(),
          });
        }
        return newConnections;
      });
    } catch {
      setConnections(prev => {
        const newConnections = new Map(prev);
        const connection = newConnections.get(ideType);
        if (connection) {
          newConnections.set(ideType, {
            ...connection,
            status: 'error',
          });
        }
        return newConnections;
      });
    }
  };

  const handleDisconnectIDE = async (ideType: string) => {
    setConnections(prev => {
      const newConnections = new Map(prev);
      const connection = newConnections.get(ideType);
      if (connection) {
        newConnections.set(ideType, {
          ...connection,
          status: 'disconnected',
        });
      }
      return newConnections;
    });

    // In a real implementation, this would call the backend API
    // await axios.post(`/api/ide/${selectedProject}/disconnect`, { ideType });
  };

  const handleConfigChange = (ideType: string, config: any) => {
    setConnectionConfigs(prev => {
      const newConfigs = new Map(prev);
      newConfigs.set(ideType, config);
      return newConfigs;
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': {
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      }
      case 'connecting': {
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

  const renderCapabilities = (capabilities: IDECapabilities) => {
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

  const renderConnectionCard = (
    ide: (typeof AVAILABLE_IDES)[0],
    connection: IDEConnection
  ) => {
    const isConnected = connection.status === 'connected';

    return (
      <Card key={ide.type} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Monitor className="h-5 w-5" />
                <CardTitle className="text-base">{ide.name}</CardTitle>
              </div>
              <Badge
                className={`text-xs ${STATUS_COLORS[connection.status as keyof typeof STATUS_COLORS]}`}
              >
                {connection.status}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(connection.status)}
              {isConnected ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDisconnectIDE(ide.type)}
                >
                  <WifiOff className="h-4 w-4 mr-1" />
                  Déconnecter
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleConnectIDE(ide.type)}
                  disabled={connection.status === 'connecting'}
                >
                  <Wifi className="h-4 w-4 mr-1" />
                  Connecter
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-3">{ide.description}</p>

          {renderCapabilities(ide.capabilities)}

          {connection.lastSync && (
            <div className="mt-2 text-xs text-gray-500">
              Dernière sync: {new Date(connection.lastSync).toLocaleString()}
            </div>
          )}

          {/* Configuration Section */}
          <div className="mt-3 pt-3 border-t">
            <details className="text-sm">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Configuration
              </summary>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-medium">Host</label>
                    <Input
                      size="sm"
                      value={connection.config?.host || ide.defaultConfig.host}
                      onChange={e =>
                        handleConfigChange(ide.type, {
                          ...connection.config,
                          host: e.target.value,
                        })
                      }
                      placeholder="localhost"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium">Port</label>
                    <Input
                      size="sm"
                      type="number"
                      value={connection.config?.port || ide.defaultConfig.port}
                      onChange={e =>
                        handleConfigChange(ide.type, {
                          ...connection.config,
                          port: Number.parseInt(e.target.value),
                        })
                      }
                      placeholder="8080"
                    />
                  </div>
                </div>

                {ide.type === 'vscode' && (
                  <div>
                    <label className="text-xs font-medium">API Key</label>
                    <Input
                      size="sm"
                      type="password"
                      value={connection.config?.apiKey || ''}
                      onChange={e =>
                        handleConfigChange(ide.type, {
                          ...connection.config,
                          apiKey: e.target.value,
                        })
                      }
                      placeholder="API Key pour VS Code"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium">
                    Intervalle de sync (ms)
                  </label>
                  <Input
                    size="sm"
                    type="number"
                    value={
                      connection.config?.syncInterval ||
                      ide.defaultConfig.syncInterval
                    }
                    onChange={e =>
                      handleConfigChange(ide.type, {
                        ...connection.config,
                        syncInterval: Number.parseInt(e.target.value),
                      })
                    }
                    placeholder="5000"
                  />
                </div>
              </div>
            </details>
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
            <Monitor className="h-5 w-5" />
            Hub d'intégration IDE
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
          </div>
        </CardContent>
      </Card>

      {selectedProject && (
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="connections">Connexions IDE</TabsTrigger>
            <TabsTrigger value="sync">Synchronisation</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>

          <TabsContent value="connections" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Environnements de Développement Connectés
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadProjectConnections(selectedProject)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Actualiser
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {AVAILABLE_IDES.map(ide => {
                const connection = connections.get(ide.type) || {
                  type: ide.type,
                  status: 'disconnected',
                  capabilities: ide.capabilities,
                  config: ide.defaultConfig,
                };
                return renderConnectionCard(ide, connection);
              })}
            </div>
          </TabsContent>

          <TabsContent value="sync" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Synchronisation Bidirectionnelle
              </h3>
            </div>

            <Card>
              <CardContent className="py-8 text-center">
                <Activity className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Système de synchronisation temps réel - à implémenter
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cette section affichera l'état de la synchronisation entre les
                  IDEs connectés
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Sécurité et Authentification
              </h3>
            </div>

            <Card>
              <CardContent className="py-8 text-center">
                <Shield className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  Gestion de la sécurité des connexions - à implémenter
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Cette section permettra de gérer les tokens d'authentification
                  et les permissions
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
              Sélectionnez un projet pour gérer les connexions IDE
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
