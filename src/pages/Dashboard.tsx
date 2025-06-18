
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectService } from "@/services/projectService";
import { useToast } from "@/components/ui/use-toast";
import { 
  Plus, 
  Calculator, 
  BarChart3, 
  Clock, 
  MapPin, 
  Building, 
  IndianRupee,
  Eye,
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import DownloadDataButton from "@/components/shared/DownloadDataButton";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      console.log('Loading projects for dashboard...');
      const projectsData = await ProjectService.getProjects();
      console.log('Projects loaded:', projectsData);
      setProjects(projectsData);
    } catch (error) {
      console.error('Error loading projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getProjectsDownloadData = () => {
    return projects.map(project => ({
      name: project.name,
      type: project.type,
      location: project.location || 'Not specified',
      builtUpArea: project.built_up_area || 'Not specified',
      floors: project.number_of_floors || 'Not specified',
      budgetRange: project.budget_range ? `₹${project.budget_range.toLocaleString()}` : 'Not specified',
      status: project.status,
      createdAt: new Date(project.created_at).toLocaleDateString(),
      updatedAt: new Date(project.updated_at).toLocaleDateString()
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center safe-area-top safe-area-bottom">
        <div className="text-center px-4">
          <BarChart3 className="mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12 animate-pulse text-brand-orange" />
          <p className="text-brand-gray text-sm sm:text-base">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget_range || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 safe-area-top safe-area-bottom">
      {/* Mobile-first Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container-responsive py-3 sm:py-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
            <div className="min-w-0 flex-1">
              <h1 className="text-brand-dark-blue font-bold truncate">
                Welcome back
              </h1>
              <p className="text-brand-gray text-sm truncate">{user?.email}</p>
            </div>
            
            {/* Mobile-optimized action buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {projects.length > 0 && (
                <DownloadDataButton
                  data={getProjectsDownloadData()}
                  filename={`projects-dashboard-${new Date().toISOString().split('T')[0]}`}
                  title="Projects Dashboard"
                />
              )}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
                className="flex-shrink-0"
              >
                <LogOut className="mr-1 sm:mr-2" size={14} />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden">Out</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-4 sm:py-6 lg:py-8">
        {/* Mobile-first Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="card-mobile sm:card-tablet">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Building className="h-6 w-6 sm:h-8 sm:w-8 text-brand-orange flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-brand-dark-blue truncate">{projects.length}</p>
                  <p className="text-brand-gray text-xs sm:text-sm">Projects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-mobile sm:card-tablet">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-brand-dark-blue truncate">{activeProjects}</p>
                  <p className="text-brand-gray text-xs sm:text-sm">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-mobile sm:card-tablet">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-brand-dark-blue truncate">{completedProjects}</p>
                  <p className="text-brand-gray text-xs sm:text-sm">Done</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-mobile sm:card-tablet col-span-2 lg:col-span-1">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <IndianRupee className="h-6 w-6 sm:h-8 sm:w-8 text-brand-orange flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold text-brand-dark-blue truncate">
                    ₹{(totalBudget / 10000000).toFixed(1)}Cr
                  </p>
                  <p className="text-brand-gray text-xs sm:text-sm">Budget</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-first Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer card-mobile sm:card-tablet" 
            onClick={() => navigate('/add-project')}
          >
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center text-brand-dark-blue text-base sm:text-lg">
                <Plus className="mr-2 flex-shrink-0" size={18} />
                <span>Create New Project</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-brand-gray text-sm">Start a new construction project with detailed specifications</p>
            </CardContent>
          </Card>

          <Card 
            className="hover:shadow-lg transition-shadow cursor-pointer card-mobile sm:card-tablet" 
            onClick={() => navigate('/project-estimation')}
          >
            <CardHeader className="pb-2 sm:pb-4">
              <CardTitle className="flex items-center text-brand-dark-blue text-base sm:text-lg">
                <Calculator className="mr-2 flex-shrink-0" size={18} />
                <span>Advanced Estimation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-brand-gray text-sm">Generate detailed cost estimates using AI algorithms</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile-first Projects List */}
        <Card className="card-mobile sm:card-tablet lg:card-desktop">
          <CardHeader>
            <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
              <CardTitle className="text-brand-dark-blue">Recent Projects</CardTitle>
              {projects.length > 0 && (
                <Button 
                  onClick={() => navigate('/add-project')} 
                  className="bg-brand-orange hover:bg-brand-orange/90 btn-mobile sm:btn-tablet"
                >
                  <Plus className="mr-1 sm:mr-2" size={16} />
                  Add Project
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {projects.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Building className="mx-auto mb-4 h-8 w-8 sm:h-12 sm:w-12 text-brand-gray" />
                <h3 className="font-semibold text-brand-dark-blue mb-2">No projects yet</h3>
                <p className="text-brand-gray mb-4 text-sm">Create your first construction project to get started</p>
                <Button 
                  onClick={() => navigate('/add-project')} 
                  className="bg-brand-orange hover:bg-brand-orange/90 btn-mobile sm:btn-tablet"
                >
                  <Plus className="mr-1 sm:mr-2" size={16} />
                  Create Project
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="border rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-brand-dark-blue text-sm sm:text-base truncate">
                              {project.name}
                            </h3>
                            <Badge 
                              variant={project.status === 'active' ? 'default' : 'secondary'}
                              className={`text-xs flex-shrink-0 ${project.status === 'active' ? 'bg-green-100 text-green-700' : ''}`}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-brand-gray">
                            <div className="flex items-center min-w-0">
                              <Building className="mr-1 flex-shrink-0" size={12} />
                              <span className="truncate">{project.type}</span>
                            </div>
                            {project.location && (
                              <div className="flex items-center min-w-0">
                                <MapPin className="mr-1 flex-shrink-0" size={12} />
                                <span className="truncate">{project.location}</span>
                              </div>
                            )}
                            {project.budget_range && (
                              <div className="flex items-center min-w-0">
                                <IndianRupee className="mr-1 flex-shrink-0" size={12} />
                                <span className="truncate">₹{project.budget_range.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/project-estimation?projectId=${project.id}`)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Eye className="mr-1" size={12} />
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">View</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/project-estimation?projectId=${project.id}`)}
                          className="flex-1 sm:flex-none text-xs"
                        >
                          <Calculator className="mr-1" size={12} />
                          <span className="hidden sm:inline">Estimate</span>
                          <span className="sm:hidden">Est.</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {projects.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" onClick={() => navigate('/project-estimation')}>
                      View All Projects
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
