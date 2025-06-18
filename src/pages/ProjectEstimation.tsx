import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Calculator, Edit } from "lucide-react";
import { ProjectEstimates, calculateProjectEstimates } from "@/utils/estimationAlgorithms";
import MaterialEstimatesTab from "@/components/estimation/MaterialEstimatesTab";
import LaborEstimatesTab from "@/components/estimation/LaborEstimatesTab";
import EquipmentEstimatesTab from "@/components/estimation/EquipmentEstimatesTab";
import TimelineEstimatesTab from "@/components/estimation/TimelineEstimatesTab";
import CostSummaryTab from "@/components/estimation/CostSummaryTab";
import SafetyEstimatesTab from "@/components/estimation/SafetyEstimatesTab";
import QualityEstimatesTab from "@/components/estimation/QualityEstimatesTab";
import ConsolidatedEstimatesView from "@/components/estimation/ConsolidatedEstimatesView";
import { useToast } from "@/components/ui/use-toast";
import { ProjectService } from "@/services/projectService";
import { calculateEnhancedProjectEstimates } from "@/utils/enhancedEstimationAlgorithms";
import DownloadDataButton from "@/components/shared/DownloadDataButton";
import FinanceTab from "@/components/estimation/FinanceTab";

export default function ProjectEstimation() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [estimates, setEstimates] = useState<ProjectEstimates | null>(null);
  const [allProjectsEstimates, setAllProjectsEstimates] = useState<{[key: string]: ProjectEstimates}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [projectData, setProjectData] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [activeView, setActiveView] = useState<'individual' | 'consolidated'>('individual');
  const [enhancedEstimates, setEnhancedEstimates] = useState<any>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      loadProjectEstimates(selectedProjectId);
    }
  }, [selectedProjectId]);

  const loadProjects = async () => {
    try {
      console.log('Loading projects...');
      const projectsData = await ProjectService.getProjects();
      console.log('Projects loaded:', projectsData);
      setProjects(projectsData);
      
      // Set initial project from URL params or first project
      const projectIdFromUrl = searchParams.get('projectId');
      const initialProjectId = projectIdFromUrl || (projectsData.length > 0 ? projectsData[0].id : '');
      
      if (initialProjectId) {
        setSelectedProjectId(initialProjectId);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    }
  };

  const loadProjectEstimates = async (projectId: string) => {
    try {
      setIsLoading(true);
      console.log('Loading project data for:', projectId);
      const project = await ProjectService.getProject(projectId);
      console.log('Project data loaded:', project);
      setProjectData(project);
      
      // Generate estimates using the project data
      console.log('Calculating estimates with project data:', project);
      const calculatedEstimates = calculateProjectEstimates(project);
      console.log('Calculated estimates:', calculatedEstimates);
      setEstimates(calculatedEstimates);
      
      // Generate enhanced estimates using new algorithms
      const enhancedCalculatedEstimates = calculateEnhancedProjectEstimates(project);
      console.log('Enhanced calculated estimates:', enhancedCalculatedEstimates);
      setEnhancedEstimates(enhancedCalculatedEstimates);
      
      // Try to save estimates to database if they don't exist
      try {
        await ProjectService.generateAndSaveEstimates(projectId, project);
        console.log('Estimates saved to database');
      } catch (saveError) {
        console.warn('Could not save estimates to database:', saveError);
      }
      
    } catch (error) {
      console.error('Error loading project estimates:', error);
      toast({
        title: "Error",
        description: "Failed to load project estimates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAllProjectsEstimates = async () => {
    try {
      setIsLoading(true);
      const allEstimates: {[key: string]: ProjectEstimates} = {};
      
      for (const project of projects) {
        console.log('Calculating estimates for project:', project.name);
        const calculatedEstimates = calculateProjectEstimates(project);
        allEstimates[project.id] = calculatedEstimates;
      }
      
      setAllProjectsEstimates(allEstimates);
      console.log('All projects estimates loaded:', allEstimates);
    } catch (error) {
      console.error('Error loading all projects estimates:', error);
      toast({
        title: "Error",
        description: "Failed to load consolidated estimates. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewChange = (view: 'individual' | 'consolidated') => {
    setActiveView(view);
    if (view === 'consolidated') {
      loadAllProjectsEstimates();
    }
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    // Update URL to reflect selected project
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('projectId', projectId);
    window.history.replaceState({}, '', newUrl.toString());
  };

  const handleSaveEstimates = async () => {
    if (!selectedProjectId || !estimates) return;
    
    try {
      await ProjectService.generateAndSaveEstimates(selectedProjectId, projectData);
      toast({
        title: "Estimates Saved",
        description: "Project estimates have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving estimates:', error);
      toast({
        title: "Error",
        description: "Failed to save estimates. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerateEstimates = () => {
    if (projectData && selectedProjectId) {
      setIsLoading(true);
      setTimeout(() => {
        const newEstimates = calculateProjectEstimates(projectData);
        const newEnhancedEstimates = calculateEnhancedProjectEstimates(projectData);
        setEstimates(newEstimates);
        setEnhancedEstimates(newEnhancedEstimates);
        setIsLoading(false);
        toast({
          title: "Estimates Regenerated",
          description: "Project estimates have been recalculated using updated algorithms.",
        });
      }, 1000);
    }
  };

  const handleEditProject = () => {
    if (selectedProjectId) {
      navigate(`/add-project?edit=${selectedProjectId}`);
    }
  };

  const getDownloadData = () => {
    if (!estimates) return [];
    
    if (activeView === 'consolidated') {
      // Prepare consolidated data for download
      const consolidatedData: any[] = [];
      Object.entries(allProjectsEstimates).forEach(([projectId, estimate]) => {
        const project = projects.find(p => p.id === projectId);
        if (project && estimate) {
          consolidatedData.push({
            projectName: project.name,
            type: project.type,
            location: project.location || 'Not specified',
            builtUpArea: project.built_up_area || 'Not specified',
            floors: project.number_of_floors || 'Not specified',
            materialCost: estimate.materials.reduce((sum, m) => sum + m.totalCost, 0),
            laborCost: estimate.labor.reduce((sum, l) => sum + l.totalCost, 0),
            equipmentCost: estimate.equipment.reduce((sum, e) => sum + e.totalCost, 0),
            totalCost: estimate.cost.totalCost,
            duration: estimate.timeline.totalDuration
          });
        }
      });
      return consolidatedData;
    } else {
      // Prepare individual project data for download
      const projectInfo = projectData ? {
        projectName: projectData.name,
        type: projectData.type,
        location: projectData.location || 'Not specified',
        builtUpArea: projectData.built_up_area || 'Not specified',
        floors: projectData.number_of_floors || 'Not specified',
        status: projectData.status
      } : {};

      const materialData = estimates.materials.map(m => ({
        ...projectInfo,
        category: 'Material',
        item: m.item,
        quantity: m.quantity,
        unit: m.unit,
        unitRate: m.unitRate,
        totalCost: m.totalCost
      }));

      const laborData = estimates.labor.map(l => ({
        ...projectInfo,
        category: 'Labor',
        item: l.skillType || 'Worker', // Fixed: use skillType instead of role/skill
        quantity: l.quantity,
        unit: 'days',
        unitRate: l.rate || l.duration, // Fixed: use rate instead of dailyRate/unitRate
        totalCost: l.totalCost
      }));

      const equipmentData = estimates.equipment.map(e => ({
        ...projectInfo,
        category: 'Equipment',
        item: e.equipment || 'Equipment', // Fixed: use equipment instead of equipmentType/name
        quantity: e.quantity,
        unit: 'days',
        unitRate: e.rate || e.duration, // Fixed: use rate instead of dailyRate/unitRate
        totalCost: e.totalCost
      }));

      return [...materialData, ...laborData, ...equipmentData];
    }
  };

  const getDownloadFilename = () => {
    if (activeView === 'consolidated') {
      return `consolidated-estimates-${new Date().toISOString().split('T')[0]}`;
    } else {
      const projectName = projectData?.name || 'project';
      return `${projectName.toLowerCase().replace(/\s+/g, '-')}-estimates-${new Date().toISOString().split('T')[0]}`;
    }
  };

  const getDownloadTitle = () => {
    if (activeView === 'consolidated') {
      return 'Consolidated Project Estimates';
    } else {
      return `${projectData?.name || 'Project'} Estimates`;
    }
  };

  if (isLoading || (activeView === 'individual' && !estimates)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center safe-area-top safe-area-bottom">
        <div className="text-center px-4">
          <Calculator className="mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12 animate-spin text-brand-orange" />
          <p className="text-brand-gray text-sm sm:text-base">
            {activeView === 'consolidated' 
              ? 'Loading consolidated estimates for all projects...'
              : 'Calculating estimates using advanced algorithms...'
            }
          </p>
          {selectedProjectId && activeView === 'individual' && (
            <p className="text-xs sm:text-sm text-brand-gray mt-2">Loading project: {selectedProjectId}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 safe-area-top safe-area-bottom">
      <div className="container-responsive py-4 sm:py-6">
        {/* Mobile-first Header */}
        <div className="space-y-4 sm:space-y-6 mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            size="sm"
            className="mb-2"
          >
            <ArrowLeft className="mr-2" size={14} />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Button>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-brand-dark-blue font-bold mb-2">
                Advanced Project Estimation
              </h1>
              <p className="text-brand-gray text-sm">
                {activeView === 'consolidated' 
                  ? `Showing estimates for ${projects.length} projects`
                  : `${projectData?.name || "Select a project"} - Algorithm-based calculations`
                }
              </p>
            </div>
            
            {/* View Toggle - Mobile optimized */}
            <div className="flex gap-2">
              <Button
                variant={activeView === 'individual' ? 'default' : 'outline'}
                onClick={() => handleViewChange('individual')}
                className="flex-1 sm:flex-none bg-brand-orange hover:bg-brand-orange/90 text-white text-sm"
                size="sm"
              >
                Individual
              </Button>
              <Button
                variant={activeView === 'consolidated' ? 'default' : 'outline'}
                onClick={() => handleViewChange('consolidated')}
                className="flex-1 sm:flex-none bg-brand-orange hover:bg-brand-orange/90 text-white text-sm"
                size="sm"
              >
                Consolidated
              </Button>
            </div>
            
            {/* Project Selection - Mobile optimized */}
            {activeView === 'individual' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-dark-blue">
                  Select Project
                </label>
                <Select value={selectedProjectId} onValueChange={handleProjectChange}>
                  <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder="Choose a project..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        <div className="truncate">{project.name}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {/* Project Details Summary - Mobile optimized */}
            {activeView === 'individual' && projectData && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-blue-900 mb-3 text-sm">Project Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Type:</span>
                      <span className="text-blue-700">{projectData.type}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Location:</span>
                      <span className="text-blue-700">{projectData.location || 'Not specified'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Built-up Area:</span>
                      <span className="text-blue-700">{projectData.built_up_area ? `${projectData.built_up_area} sq ft` : 'Not specified'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Floors:</span>
                      <span className="text-blue-700">{projectData.number_of_floors || 'Not specified'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Budget Range:</span>
                      <span className="text-blue-700">{projectData.budget_range ? `₹${projectData.budget_range.toLocaleString()}` : 'Not specified'}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="font-medium text-blue-800 block">Status:</span>
                      <span className="text-blue-700">{projectData.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Action Buttons - Improved Mobile Layout */}
            <div className="space-y-3">
              {/* Download Data Button - Full width on mobile */}
              {((activeView === 'individual' && estimates) || (activeView === 'consolidated' && Object.keys(allProjectsEstimates).length > 0)) && (
                <div className="w-full">
                  <DownloadDataButton
                    data={getDownloadData()}
                    filename={getDownloadFilename()}
                    title={getDownloadTitle()}
                  />
                </div>
              )}
              
              {/* Project Action Buttons - Stacked for mobile */}
              {activeView === 'individual' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <Button
                    variant="outline"
                    onClick={handleEditProject}
                    className="flex items-center justify-center gap-2 text-sm"
                    size="sm"
                    disabled={!selectedProjectId}
                  >
                    <Edit size={14} />
                    Edit Project
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleRegenerateEstimates}
                    className="flex items-center justify-center gap-2 text-sm"
                    size="sm"
                    disabled={!selectedProjectId}
                  >
                    <Calculator size={14} />
                    Regenerate
                  </Button>
                  <Button
                    onClick={handleSaveEstimates}
                    className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center justify-center gap-2 text-sm"
                    size="sm"
                    disabled={!selectedProjectId}
                  >
                    <Save size={14} />
                    Save Estimates
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Individual Project View - Mobile optimized */}
        {activeView === 'individual' && selectedProjectId && (
          <Tabs defaultValue="materials" className="space-y-4 sm:space-y-6">
            <div className="overflow-x-auto pb-2">
              <TabsList className="grid w-full grid-cols-8 min-w-[700px] sm:min-w-0">
                <TabsTrigger value="materials" className="text-xs sm:text-sm">Materials</TabsTrigger>
                <TabsTrigger value="labor" className="text-xs sm:text-sm">Labor</TabsTrigger>
                <TabsTrigger value="equipment" className="text-xs sm:text-sm">Equipment</TabsTrigger>
                <TabsTrigger value="timeline" className="text-xs sm:text-sm">Timeline</TabsTrigger>
                <TabsTrigger value="safety" className="text-xs sm:text-sm">Safety</TabsTrigger>
                <TabsTrigger value="quality" className="text-xs sm:text-sm">Quality</TabsTrigger>
                <TabsTrigger value="finance" className="text-xs sm:text-sm">Finance</TabsTrigger>
                <TabsTrigger value="summary" className="text-xs sm:text-sm">Summary</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="materials">
              <MaterialEstimatesTab 
                estimates={estimates.materials}
                enhancedEstimates={enhancedEstimates}
                onUpdate={(updatedMaterials) => 
                  setEstimates(prev => prev ? {...prev, materials: updatedMaterials} : null)
                }
              />
            </TabsContent>

            <TabsContent value="labor">
              <LaborEstimatesTab 
                estimates={estimates.labor}
                onUpdate={(updatedLabor) => 
                  setEstimates(prev => prev ? {...prev, labor: updatedLabor} : null)
                }
              />
            </TabsContent>

            <TabsContent value="equipment">
              <EquipmentEstimatesTab 
                estimates={estimates.equipment}
                onUpdate={(updatedEquipment) => 
                  setEstimates(prev => prev ? {...prev, equipment: updatedEquipment} : null)
                }
              />
            </TabsContent>

            <TabsContent value="timeline">
              <TimelineEstimatesTab 
                estimate={estimates.timeline}
                onUpdate={(updatedTimeline) => 
                  setEstimates(prev => prev ? {...prev, timeline: updatedTimeline} : null)
                }
              />
            </TabsContent>

            <TabsContent value="safety">
              <SafetyEstimatesTab 
                estimate={estimates.safety}
                onUpdate={(updatedSafety) => 
                  setEstimates(prev => prev ? {...prev, safety: updatedSafety} : null)
                }
              />
            </TabsContent>

            <TabsContent value="quality">
              <QualityEstimatesTab 
                estimate={estimates.quality}
                onUpdate={(updatedQuality) => 
                  setEstimates(prev => prev ? {...prev, quality: updatedQuality} : null)
                }
              />
            </TabsContent>

            <TabsContent value="finance">
              <FinanceTab projectId={selectedProjectId} />
            </TabsContent>

            <TabsContent value="summary">
              <CostSummaryTab 
                estimate={estimates.cost}
                materials={estimates.materials}
                labor={estimates.labor}
                equipment={estimates.equipment}
              />
            </TabsContent>
          </Tabs>
        )}

        {/* Consolidated View */}
        {activeView === 'consolidated' && (
          <ConsolidatedEstimatesView 
            projects={projects}
            allEstimates={allProjectsEstimates}
          />
        )}

        {/* Empty State - Mobile optimized */}
        {!selectedProjectId && projects.length === 0 && activeView === 'individual' && (
          <Card className="text-center py-8 sm:py-12">
            <CardContent className="px-4">
              <Calculator className="mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12 text-brand-gray" />
              <h3 className="font-semibold text-brand-dark-blue mb-2">No projects found</h3>
              <p className="text-brand-gray text-sm mb-4">Please create a project first to generate estimates.</p>
              <Button 
                onClick={() => navigate('/add-project')} 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                size="sm"
              >
                Create Project
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
