import { useState, useEffect } from "react";
import { Calendar, Clock, Target, TrendingUp, Edit, Save, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import ProjectViewSelector from "../shared/ProjectViewSelector";
import GanttChart from "../shared/GanttChart";
import { ProjectService } from "@/services/projectService";
import { useToast } from "@/components/ui/use-toast";

export default function Planning() {
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");
  const [tab, setTab] = useState("schedule");
  const [projectData, setProjectData] = useState<any>(null);
  const [estimates, setEstimates] = useState<any>(null);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [allProjectsTimeline, setAllProjectsTimeline] = useState<{[key: string]: any[]}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [currentProjectId, setCurrentProjectId] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    loadProjectContext();
  }, []);

  // Listen for timeline updates from estimation module and project context updates
  useEffect(() => {
    const handleTimelineUpdate = (event: CustomEvent) => {
      const { projectId, timelineData: updatedTimeline } = event.detail;
      console.log('Received timeline update:', { projectId, timelineData: updatedTimeline });
      
      if (viewMode === "active" && currentProjectId === projectId) {
        setTimelineData(updatedTimeline);
      } else if (viewMode === "consolidated") {
        setAllProjectsTimeline(prev => ({
          ...prev,
          [projectId]: updatedTimeline
        }));
      }
    };

    // Listen for project context updates
    const handleProjectContextUpdate = (event: CustomEvent) => {
      const { selectedProject, viewMode: newViewMode } = event.detail;
      
      if (newViewMode && newViewMode !== viewMode) {
        setViewMode(newViewMode);
      }
      
      if (selectedProject && selectedProject !== currentProjectId) {
        setCurrentProjectId(selectedProject);
        loadSingleProjectData(selectedProject);
      }
    };

    window.addEventListener('timelineUpdated', handleTimelineUpdate as EventListener);
    window.addEventListener('projectContextUpdated', handleProjectContextUpdate as EventListener);
    
    return () => {
      window.removeEventListener('timelineUpdated', handleTimelineUpdate as EventListener);
      window.removeEventListener('projectContextUpdated', handleProjectContextUpdate as EventListener);
    };
  }, [viewMode, currentProjectId]);

  const loadProjectContext = async () => {
    try {
      const storedContext = sessionStorage.getItem('projectContext');
      if (storedContext) {
        const context = JSON.parse(storedContext);
        setViewMode(context.viewMode || "active");
        
        if (context.selectedProject) {
          setCurrentProjectId(context.selectedProject);
        }
        
        if (context.viewMode === "consolidated") {
          await loadAllProjectsTimeline();
        } else if (context.selectedProject) {
          await loadSingleProjectData(context.selectedProject);
        }
      }
    } catch (error) {
      console.error('Error loading project context:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSingleProjectData = async (projectId: string) => {
    try {
      console.log('Loading project data for:', projectId);
      const project = await ProjectService.getProject(projectId);
      const projectEstimates = await ProjectService.getProjectEstimates(projectId);
      setProjectData(project);
      setEstimates(projectEstimates);
      
      console.log('Project estimates loaded:', projectEstimates);
      
      // Priority 1: Load from Timeline Estimation Tab (project-estimation page)
      const estimationTimeline = sessionStorage.getItem(`timeline_${projectId}`);
      if (estimationTimeline) {
        const parsedTimeline = JSON.parse(estimationTimeline);
        console.log('Loading timeline from estimation module:', parsedTimeline);
        setTimelineData(parsedTimeline);
        return;
      }
      
      // Priority 2: Load from project estimates and convert to timeline format
      if (projectEstimates && projectEstimates.timeline && Array.isArray(projectEstimates.timeline) && projectEstimates.timeline.length > 0) {
        const projectStartDate = new Date();
        const formatDate = (date: Date) => date.toISOString().split('T')[0];
        
        const timelineFromEstimates = projectEstimates.timeline.map((phase: any, index: number) => {
          const plannedStart = new Date(projectStartDate);
          const prevPhasesTotalDuration = projectEstimates.timeline.slice(0, index).reduce((sum: number, p: any) => sum + (p.duration || 0), 0);
          plannedStart.setDate(plannedStart.getDate() + prevPhasesTotalDuration);
          
          const plannedEnd = new Date(plannedStart);
          plannedEnd.setDate(plannedEnd.getDate() + (phase.duration || 1) - 1);

          return {
            id: `${projectId}-${phase.phase}`,
            phase: phase.phase,
            duration: phase.duration || 1,
            plannedStart: formatDate(plannedStart),
            plannedEnd: formatDate(plannedEnd),
            actualStart: '',
            actualEnd: '',
            dependencies: phase.dependencies || [],
            progress_percentage: 0,
            critical_path: false,
            project_id: projectId,
            projectId: projectId
          };
        });
        
        console.log('Loading timeline from project estimates:', timelineFromEstimates);
        setTimelineData(timelineFromEstimates);
        
        // Save to session storage to sync with estimation module
        sessionStorage.setItem(`timeline_${projectId}`, JSON.stringify(timelineFromEstimates));
      } else {
        console.log('No valid project estimates found, setting empty timeline');
        setTimelineData([]);
      }
    } catch (error) {
      console.error('Error loading project data:', error);
      setTimelineData([]);
    }
  };

  const loadAllProjectsTimeline = async () => {
    try {
      const projects = await ProjectService.getProjects();
      const allTimelines: {[key: string]: any[]} = {};
      
      for (const project of projects) {
        // Check for estimation timeline first
        const estimationTimeline = sessionStorage.getItem(`timeline_${project.id}`);
        if (estimationTimeline) {
          allTimelines[project.id] = JSON.parse(estimationTimeline);
        } else {
          // Fallback to project estimates
          const projectEstimates = await ProjectService.getProjectEstimates(project.id);
          if (projectEstimates && projectEstimates.timeline && Array.isArray(projectEstimates.timeline) && projectEstimates.timeline.length > 0) {
            const projectStartDate = new Date();
            const formatDate = (date: Date) => date.toISOString().split('T')[0];
            
            const timeline = projectEstimates.timeline.map((phase: any, index: number) => {
              const plannedStart = new Date(projectStartDate);
              const prevPhasesTotalDuration = projectEstimates.timeline.slice(0, index).reduce((sum: number, p: any) => sum + (p.duration || 0), 0);
              plannedStart.setDate(plannedStart.getDate() + prevPhasesTotalDuration);
              
              const plannedEnd = new Date(plannedStart);
              plannedEnd.setDate(plannedEnd.getDate() + (phase.duration || 1) - 1);

              return {
                id: `${project.id}-${phase.phase}`,
                phase: phase.phase,
                duration: phase.duration || 1,
                plannedStart: formatDate(plannedStart),
                plannedEnd: formatDate(plannedEnd),
                actualStart: '',
                actualEnd: '',
                dependencies: phase.dependencies || [],
                progress_percentage: 0,
                critical_path: false,
                project_id: project.id,
                projectId: project.id
              };
            });
            
            allTimelines[project.id] = timeline;
          }
        }
      }
      
      setAllProjectsTimeline(allTimelines);
      
      // Flatten all timelines for display
      const flattenedTimeline = Object.values(allTimelines).flat();
      setTimelineData(flattenedTimeline);
    } catch (error) {
      console.error('Error loading all projects timeline:', error);
    }
  };

  const handleViewModeChange = async (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
    setIsLoading(true);
    
    try {
      if (newViewMode === "consolidated") {
        await loadAllProjectsTimeline();
      } else {
        const storedContext = sessionStorage.getItem('projectContext');
        if (storedContext) {
          const context = JSON.parse(storedContext);
          if (context.selectedProject) {
            await loadSingleProjectData(context.selectedProject);
          }
        }
      }
    } catch (error) {
      console.error('Error changing view mode:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProjectChange = async (projectId: string) => {
    try {
      setIsLoading(true);
      setCurrentProjectId(projectId);
      await loadSingleProjectData(projectId);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePhaseActualDates = async (phaseId: string, actualStart: string, actualEnd: string) => {
    try {
      // Update local state
      const updatedTimeline = timelineData.map(phase => 
        phase.id === phaseId 
          ? { ...phase, actualStart, actualEnd, progress_percentage: (actualStart && actualEnd) ? 100 : phase.progress_percentage }
          : phase
      );
      setTimelineData(updatedTimeline);

      // Sync with estimation module
      if (currentProjectId) {
        sessionStorage.setItem(`timeline_${currentProjectId}`, JSON.stringify(updatedTimeline));
        
        // Dispatch event to notify estimation module
        window.dispatchEvent(new CustomEvent('timelineUpdated', {
          detail: {
            projectId: currentProjectId,
            timelineData: updatedTimeline
          }
        }));
      }

      toast({
        title: "Phase Updated",
        description: "Actual dates have been updated and synced with project estimation.",
      });
    } catch (error) {
      console.error('Error updating phase dates:', error);
      toast({
        title: "Error",
        description: "Failed to update phase dates. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditPhase = (phaseId: string) => {
    setEditingPhase(phaseId);
  };

  const handleSaveActualDates = (phaseId: string) => {
    const startInput = document.getElementById(`actual-start-${phaseId}`) as HTMLInputElement;
    const endInput = document.getElementById(`actual-end-${phaseId}`) as HTMLInputElement;
    
    if (startInput && endInput) {
      handleUpdatePhaseActualDates(phaseId, startInput.value, endInput.value);
    }
    setEditingPhase(null);
  };

  const handleCancelEdit = () => {
    setEditingPhase(null);
  };

  const getTaskStats = () => {
    if (!timelineData || timelineData.length === 0) return { active: 0, onSchedule: 0, milestones: 0, progress: 0 };
    
    // For active view, we should only count phases from the selected project
    let phasesToCount = timelineData;
    
    if (viewMode === "active" && currentProjectId) {
      // Filter phases to only include those from the selected project
      phasesToCount = timelineData.filter((phase: any) => 
        phase.project_id === currentProjectId || phase.projectId === currentProjectId
      );
    }
    
    const active = phasesToCount.length;
    const completed = phasesToCount.filter((phase: any) => phase.actualStart && phase.actualEnd).length;
    const onSchedulePercentage = active > 0 ? Math.round((completed / active) * 100) : 0;
    const avgProgress = active > 0 ? Math.round(phasesToCount.reduce((sum: number, phase: any) => sum + (phase.progress_percentage || 0), 0) / active) : 0;
    
    return {
      active,
      onSchedule: onSchedulePercentage,
      milestones: phasesToCount.filter((phase: any) => phase.phase.toLowerCase().includes('milestone')).length,
      progress: avgProgress
    };
  };

  const stats = getTaskStats();

  // Get filtered timeline data for display
  const getFilteredTimelineData = () => {
    if (viewMode === "active" && currentProjectId) {
      // Filter phases to only show those from the selected project
      return timelineData.filter((phase: any) => 
        phase.project_id === currentProjectId || phase.projectId === currentProjectId
      );
    }
    return timelineData;
  };

  const filteredTimelineData = getFilteredTimelineData();

  console.log('Current timeline data:', timelineData);
  console.log('Filtered timeline data:', filteredTimelineData);
  console.log('Current project:', projectData);
  console.log('Current estimates:', estimates);

  if (isLoading) {
    return (
      <div className="py-6 px-4 w-full max-w-4xl mx-auto animate-fade-in">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="h-32 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[1,2,3,4].map(i => <div key={i} className="h-24 bg-gray-200 rounded"></div>)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 w-full max-w-4xl mx-auto animate-fade-in">
      {/* Enhanced Header - Matching Dashboard Style */}
      <div className="mb-6">
        <div className="flex items-center gap-3 sm:gap-4 mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-brand-orange to-brand-orange/80 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Calendar size={20} className="text-white sm:hidden" />
            <Calendar size={24} className="text-white hidden sm:block" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-responsive-xl sm:text-responsive-2xl font-bold text-brand-dark-blue text-wrap-safe">Project Planning</h2>
            <p className="text-brand-gray text-responsive-xs sm:text-responsive-sm text-wrap-safe">
              Timeline management, phase tracking, and project milestones
              {projectData && viewMode === "active" && <span className="block mt-1 font-medium text-brand-medium-blue">{projectData.name}</span>}
              {viewMode === "consolidated" && <span className="block mt-1 font-medium text-brand-medium-blue">All Projects Combined</span>}
            </p>
          </div>
        </div>

        {/* Project View Selector - Enhanced styling */}
        <div className="bg-slate-50 rounded-xl p-4 mb-4">
          <ProjectViewSelector 
            onViewModeChange={handleViewModeChange} 
            onProjectChange={handleProjectChange}
          />
        </div>
      </div>

      {/* Planning Summary Cards - Enhanced styling */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Active Phases</p>
                <p className="text-2xl font-bold text-blue-800">{stats.active}</p>
              </div>
              <Target className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">On Schedule</p>
                <p className="text-2xl font-bold text-green-800">{stats.onSchedule}%</p>
              </div>
              <Clock className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Milestones</p>
                <p className="text-2xl font-bold text-yellow-800">{stats.milestones}</p>
              </div>
              <Target className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-2 border-brand-orange/30 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-dark-blue font-medium">Progress</p>
                <p className="text-2xl font-bold text-brand-dark-blue">{stats.progress}%</p>
              </div>
              <TrendingUp className="text-brand-orange" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200/50">
        <Tabs value={tab} onValueChange={setTab}>
          <div className="p-4 border-b border-slate-200/50">
            <TabsList className="w-full justify-center bg-slate-50 border border-slate-200">
              <TabsTrigger value="schedule" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
                <Calendar className="mr-2" size={16}/>Phase Timeline
              </TabsTrigger>
              <TabsTrigger value="gantt" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
                <TrendingUp className="mr-2" size={16}/>Gantt Chart
              </TabsTrigger>
              <TabsTrigger value="milestones" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
                <Target className="mr-2" size={16}/>Milestones
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="schedule" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-6">
                {viewMode === "active" ? `${projectData?.name || "Project"} Phase Timeline` : "All Projects Phase Timeline"}
              </h3>
              {filteredTimelineData && filteredTimelineData.length > 0 ? (
                <div className="grid gap-4">
                  {filteredTimelineData.map((phase: any, index: number) => (
                    <Card key={phase.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-brand-dark-blue text-lg">{phase.phase}</h4>
                              <Badge variant="outline" className="text-brand-medium-blue">
                                {phase.duration} days
                              </Badge>
                              {phase.critical_path && (
                                <Badge variant="destructive">Critical Path</Badge>
                              )}
                            </div>
                            
                            {/* Scheduled Dates */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <h5 className="font-medium text-blue-700 text-sm">📅 Scheduled Timeline</h5>
                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                  <div className="text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-blue-600 font-medium">Start:</span>
                                      <span className="text-blue-800">{phase.plannedStart || 'Not set'}</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-blue-600 font-medium">End:</span>
                                      <span className="text-blue-800">{phase.plannedEnd || 'Not set'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-green-700 text-sm">✅ Actual Timeline</h5>
                                  {editingPhase !== phase.id && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditPhase(phase.id)}
                                      className="h-6 px-2 text-xs"
                                    >
                                      <Edit size={12} className="mr-1" />
                                      Edit
                                    </Button>
                                  )}
                                </div>
                                
                                {editingPhase === phase.id ? (
                                  <div className="bg-green-50 rounded-lg p-3 border border-green-200 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <label className="text-xs font-medium text-green-700">Actual Start</label>
                                        <Input
                                          type="date"
                                          defaultValue={phase.actualStart || ''}
                                          id={`actual-start-${phase.id}`}
                                          className="text-xs h-8"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-xs font-medium text-green-700">Actual End</label>
                                        <Input
                                          type="date"
                                          defaultValue={phase.actualEnd || ''}
                                          id={`actual-end-${phase.id}`}
                                          className="text-xs h-8"
                                        />
                                      </div>
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        size="sm"
                                        onClick={() => handleSaveActualDates(phase.id)}
                                        className="h-7 px-3 text-xs bg-green-600 hover:bg-green-700"
                                      >
                                        <Save size={10} className="mr-1" />
                                        Save
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={handleCancelEdit}
                                        className="h-7 px-3 text-xs"
                                      >
                                        <X size={10} className="mr-1" />
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                                    <div className="text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-green-600 font-medium">Start:</span>
                                        <span className="text-green-800">{phase.actualStart || 'Not started'}</span>
                                      </div>
                                      <div className="flex justify-between mt-1">
                                        <span className="text-green-600 font-medium">End:</span>
                                        <span className="text-green-800">{phase.actualEnd || 'Not completed'}</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex-1 bg-gray-200 rounded-full h-3">
                                <div 
                                  className="bg-brand-orange h-3 rounded-full transition-all duration-300" 
                                  style={{ width: `${phase.progress_percentage || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium text-brand-dark-blue min-w-[3rem]">
                                {phase.progress_percentage || 0}%
                              </span>
                            </div>
                            
                            {/* Dependencies */}
                            {phase.dependencies && phase.dependencies.length > 0 && (
                              <div className="text-sm text-brand-gray">
                                <span className="font-medium">Dependencies:</span> {phase.dependencies.join(', ')}
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-brand-gray mb-4" />
                  <h3 className="font-semibold text-brand-dark-blue mb-2">No Timeline Data</h3>
                  <p className="text-brand-gray">
                    {viewMode === "active" 
                      ? "No phase timeline data available for this project. Visit Project Estimation to generate timeline data."
                      : "No phase timeline data available for any projects."
                    }
                  </p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="gantt" className="p-6">
            <div className="space-y-6">
              {filteredTimelineData && filteredTimelineData.length > 0 ? (
                <GanttChart
                  phases={filteredTimelineData}
                  title={viewMode === "active" ? `${projectData?.name || "Project"} Gantt Chart` : "All Projects Gantt Chart"}
                  onUpdatePhase={handleUpdatePhaseActualDates}
                  showProjections={true}
                />
              ) : (
                <div className="text-center py-12">
                  <Calendar size={48} className="mx-auto text-brand-gray mb-4" />
                  <h3 className="font-semibold text-brand-dark-blue mb-2">No Timeline Data</h3>
                  <p className="text-brand-gray">No Gantt chart data available for this project.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="milestones" className="p-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-brand-dark-blue mb-6">
                {viewMode === "active" ? `${projectData?.name || "Project"} Milestones` : "All Projects Milestones"}
              </h3>
              {filteredTimelineData && filteredTimelineData.length > 0 ? (
                <div className="space-y-3">
                  {filteredTimelineData
                    .filter((phase: any) => phase.phase.toLowerCase().includes('milestone') || phase.critical_path)
                    .map((milestone: any) => (
                      <Card key={milestone.id} className="border border-slate-200">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-4 h-4 rounded-full ${milestone.progress_percentage === 100 ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <div className="flex-1">
                              <h4 className="font-medium text-brand-dark-blue">{milestone.phase}</h4>
                              <p className="text-sm text-brand-gray">{milestone.duration} days duration</p>
                            </div>
                            <Badge variant={milestone.progress_percentage === 100 ? "default" : "secondary"}>
                              {milestone.progress_percentage === 100 ? 'Completed' : 'In Progress'}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target size={48} className="mx-auto text-brand-gray mb-4" />
                  <h3 className="font-semibold text-brand-dark-blue mb-2">No Milestones</h3>
                  <p className="text-brand-gray">No milestone data available for this project.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
