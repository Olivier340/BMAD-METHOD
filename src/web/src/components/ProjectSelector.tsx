import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
// Unused imports - keeping for potential future use
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
import { RefreshCw, FolderOpen, History, X } from 'lucide-react';
import { RootState } from '../stores';
import {
  fetchProjects,
  scanProjects,
  getActiveProject,
  setActiveProject,
  clearActiveProject,
  switchToProject,
  getProjectNavigationHistory,
} from '../stores/projectsSlice';
import { Project } from '../types';

interface ProjectSelectorProps {
  className?: string;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  className = '',
}) => {
  const dispatch = useDispatch();
  const { projects, currentProject, loading } = useSelector(
    (state: RootState) => state.projects
  );
  const [history, setHistory] = useState<Project[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    // Load projects and active project on component mount
    dispatch(fetchProjects() as any);
    dispatch(getActiveProject() as any);
    dispatch(getProjectNavigationHistory(5) as any).then((result: any) => {
      if (result.payload) {
        setHistory(result.payload);
      }
    });
  }, [dispatch]);

  const handleProjectSelect = (projectId: string) => {
    dispatch(setActiveProject(projectId) as any);
  };

  const handleScanProjects = () => {
    dispatch(scanProjects() as any);
  };

  const handleClearActive = () => {
    dispatch(clearActiveProject() as any);
  };

  const handleSwitchToProject = (projectId: string) => {
    dispatch(switchToProject(projectId) as any);
  };

  const handleToggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Contexte de projet
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleScanProjects}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Active Project Display */}
        {currentProject && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Projet actif
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearActive}
                className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {currentProject.name}
              </Badge>
              <span className="text-xs text-blue-600 truncate">
                {currentProject.path}
              </span>
            </div>
          </div>
        )}

        {/* Project Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Sélectionner un projet</label>
          <select
            onChange={e => handleProjectSelect(e.target.value)}
            value={currentProject?.id || ''}
            className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-900"
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name} {project.isActive ? '(Actif)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleHistory}
            className="flex-1"
          >
            <History className="h-4 w-4 mr-1" />
            Historique
          </Button>
        </div>

        {/* Navigation History */}
        {showHistory && history.length > 0 && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Historique récent</label>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {history.map(project => (
                <Button
                  key={project.id}
                  variant={
                    project.id === currentProject?.id ? 'default' : 'outline'
                  }
                  size="sm"
                  onClick={() => handleSwitchToProject(project.id)}
                  className="w-full justify-start text-left"
                >
                  <div className="truncate">
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs opacity-70 truncate">
                      {project.path}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Project Stats */}
        <div className="pt-2 border-t">
          <div className="text-xs text-muted-foreground">
            {projects.length} projet{projects.length > 1 ? 's' : ''} disponible
            {projects.length > 1 ? 's' : ''}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
