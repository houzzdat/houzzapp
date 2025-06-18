
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProjectService } from "@/services/projectService";

interface ProjectContext {
  selectedProject: string;
  projectName?: string;
  viewMode: "active" | "consolidated";
  estimates?: any;
}

interface ProjectViewSelectorProps {
  onViewModeChange?: (viewMode: "active" | "consolidated") => void;
  onProjectChange?: (projectId: string) => void;
}

export default function ProjectViewSelector({ onViewModeChange, onProjectChange }: ProjectViewSelectorProps) {
  const [context, setContext] = useState<ProjectContext>({
    selectedProject: '',
    viewMode: "active",
  });
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
    loadContextFromStorage();
  }, []);

  // Listen for project context changes from other components
  useEffect(() => {
    const handleStorageChange = () => {
      loadContextFromStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events
    const handleProjectContextUpdate = (event: CustomEvent) => {
      const { selectedProject, projectName, viewMode } = event.detail;
      setContext(prev => ({
        ...prev,
        selectedProject: selectedProject || prev.selectedProject,
        projectName: projectName || prev.projectName,
        viewMode: viewMode || prev.viewMode
      }));
    };

    window.addEventListener('projectContextUpdated', handleProjectContextUpdate as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectContextUpdated', handleProjectContextUpdate as EventListener);
    };
  }, []);

  const loadProjects = async () => {
    try {
      const projectsData = await ProjectService.getProjects();
      setProjects(projectsData);
      
      // If no current selection and projects exist, set the first one
      const storedContext = sessionStorage.getItem('projectContext');
      if (!storedContext && projectsData.length > 0) {
        const firstProject = projectsData[0];
        const initialContext = { 
          selectedProject: firstProject.id,
          projectName: firstProject.name,
          viewMode: "active" as const
        };
        setContext(initialContext);
        sessionStorage.setItem('projectContext', JSON.stringify(initialContext));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadContextFromStorage = () => {
    const storedContext = sessionStorage.getItem('projectContext');
    if (storedContext) {
      try {
        const parsed = JSON.parse(storedContext);
        setContext(parsed);
      } catch (error) {
        console.error('Error parsing stored context:', error);
      }
    }
  };

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    const selectedProject = projects.find(p => p.id === context.selectedProject);
    const updatedContext = { 
      ...context, 
      viewMode: newViewMode,
      projectName: newViewMode === "active" ? selectedProject?.name : undefined
    };
    setContext(updatedContext);
    sessionStorage.setItem('projectContext', JSON.stringify(updatedContext));
    onViewModeChange?.(newViewMode);
  };

  const handleProjectChange = (projectId: string) => {
    const selectedProject = projects.find(p => p.id === projectId);
    const updatedContext = { 
      ...context, 
      selectedProject: projectId,
      projectName: selectedProject?.name
    };
    setContext(updatedContext);
    sessionStorage.setItem('projectContext', JSON.stringify(updatedContext));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('projectContextUpdated', {
      detail: updatedContext
    }));
    
    onProjectChange?.(projectId);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 mb-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 mb-6">
      <div className="flex flex-col gap-4">
        {/* Project Selection - Only show when in Active mode */}
        {context.viewMode === "active" && projects.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <label className="font-semibold text-responsive-sm text-brand-medium-blue flex-shrink-0">Active Project:</label>
            <select
              className="flex-1 border-2 border-brand-dark-blue/20 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-responsive-sm bg-white focus:ring-2 focus:ring-brand-orange focus:border-brand-orange transition-all min-w-0"
              value={context.selectedProject}
              onChange={e => handleProjectChange(e.target.value)}
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        )}
        
        {/* View Mode Selection */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-brand-dark-blue">
              {context.viewMode === "active" ? "Active Project View" : "Consolidated View"}
            </h4>
            {context.viewMode === "active" && context.projectName && (
              <p className="text-sm text-brand-gray">{context.projectName}</p>
            )}
            {context.viewMode === "consolidated" && (
              <p className="text-sm text-brand-gray">All projects combined</p>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={context.viewMode === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("active")}
              className={context.viewMode === "active" ? "bg-brand-orange hover:bg-brand-orange/90" : ""}
            >
              Active Project
            </Button>
            <Button
              variant={context.viewMode === "consolidated" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("consolidated")}
              className={context.viewMode === "consolidated" ? "bg-brand-orange hover:bg-brand-orange/90" : ""}
            >
              Consolidated
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
