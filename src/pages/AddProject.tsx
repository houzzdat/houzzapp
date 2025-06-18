
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Form components
import ProjectInformationSection from "@/components/project-form/ProjectInformationSection";
import SiteInformationSection from "@/components/project-form/SiteInformationSection";
import BuildingSpecificationsSection from "@/components/project-form/BuildingSpecificationsSection";
import StructuralDetailsSection from "@/components/project-form/StructuralDetailsSection";
import ClientRequirementsSection from "@/components/project-form/ClientRequirementsSection";
import RegulatoryInformationSection from "@/components/project-form/RegulatoryInformationSection";
import ResourceConstraintsSection from "@/components/project-form/ResourceConstraintsSection";
import MEPSystemsSection from "@/components/project-form/MEPSystemsSection";
import MaterialStandardsSection from "@/components/project-form/MaterialStandardsSection";
import QualityControlSection from "@/components/project-form/QualityControlSection";
import RegionalFactorsSection from "@/components/project-form/RegionalFactorsSection";
import IntegrationSection from "@/components/project-form/IntegrationSection";
import ProcurementSection from "@/components/project-form/ProcurementSection";
import EnvironmentalSection from "@/components/project-form/EnvironmentalSection";

// Utilities
import { formSchema, ProjectFormValues } from "@/utils/projectFormSchema";
import { getDefaultValues } from "@/utils/projectFormDefaults";
import { createProject, updateProject, mapProjectToFormValues } from "@/utils/projectFormSubmission";
import { ProjectService } from "@/services/projectService";

export default function AddProject() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const editProjectId = searchParams.get('edit');
  const isEditMode = !!editProjectId;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(),
  });

  // Load existing project data when in edit mode
  useEffect(() => {
    const loadProjectData = async () => {
      if (!editProjectId) return;
      
      try {
        setIsLoading(true);
        const project = await ProjectService.getProject(editProjectId);
        
        if (project) {
          const formValues = mapProjectToFormValues(project);
          form.reset(formValues);
        }
      } catch (error) {
        console.error('Error loading project data:', error);
        toast({
          title: "Error Loading Project",
          description: "Failed to load project data for editing.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [editProjectId, form, toast]);

  const onSubmit = async (values: ProjectFormValues) => {
    try {
      setIsSubmitting(true);
      
      if (isEditMode && editProjectId) {
        await updateProject(editProjectId, values);
        toast({
          title: "Project Updated Successfully",
          description: `${values.projectName} has been updated.`,
        });
        navigate(`/project-estimation?id=${editProjectId}`);
      } else {
        const project = await createProject(values);
        toast({
          title: "Project Created Successfully",
          description: `${values.projectName} has been created with automated estimates.`,
        });
        navigate(`/project-estimation?id=${project.id}`);
      }
      
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: isEditMode ? "Error Updating Project" : "Error Creating Project",
        description: isEditMode ? "There was an error updating the project. Please try again." : "There was an error creating the project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-brand-gray">Loading project data...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-brand-dark-blue">
            {isEditMode ? 'Edit Project' : 'Add New Project'}
          </h1>
          <p className="text-brand-gray mt-2">
            {isEditMode 
              ? 'Update project details and regenerate estimates as needed'
              : 'Enter comprehensive project details to generate automated estimates'
            }
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Basic project details and timeline</CardDescription>
              </CardHeader>
              <CardContent>
                <ProjectInformationSection form={form} />
              </CardContent>
            </Card>

            {/* Regional Factors */}
            <Card>
              <CardHeader>
                <CardTitle>Regional Factors</CardTitle>
                <CardDescription>Location and regional considerations</CardDescription>
              </CardHeader>
              <CardContent>
                <RegionalFactorsSection form={form} />
              </CardContent>
            </Card>

            {/* Site Information */}
            <Card>
              <CardHeader>
                <CardTitle>Site Information & Conditions</CardTitle>
                <CardDescription>Details about the project location and site conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <SiteInformationSection form={form} />
              </CardContent>
            </Card>

            {/* Building Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Building Specifications</CardTitle>
                <CardDescription>Technical specifications and architectural details</CardDescription>
              </CardHeader>
              <CardContent>
                <BuildingSpecificationsSection form={form} />
              </CardContent>
            </Card>

            {/* Structural Details */}
            <Card>
              <CardHeader>
                <CardTitle>Structural Details</CardTitle>
                <CardDescription>Details about the structural design and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <StructuralDetailsSection form={form} />
              </CardContent>
            </Card>

            {/* MEP Systems */}
            <Card>
              <CardHeader>
                <CardTitle>MEP Systems</CardTitle>
                <CardDescription>Mechanical, Electrical, and Plumbing requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <MEPSystemsSection form={form} />
              </CardContent>
            </Card>

            {/* Material Standards */}
            <Card>
              <CardHeader>
                <CardTitle>Material Standards</CardTitle>
                <CardDescription>Quality and type specifications for materials</CardDescription>
              </CardHeader>
              <CardContent>
                <MaterialStandardsSection form={form} />
              </CardContent>
            </Card>

            {/* Client Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Client Requirements</CardTitle>
                <CardDescription>Budget, quality standards, and special requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ClientRequirementsSection form={form} />
              </CardContent>
            </Card>

            {/* Quality Control */}
            <Card>
              <CardHeader>
                <CardTitle>Quality Control</CardTitle>
                <CardDescription>Testing and quality assurance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <QualityControlSection form={form} />
              </CardContent>
            </Card>

            {/* Regulatory Information */}
            <Card>
              <CardHeader>
                <CardTitle>Safety & Compliance</CardTitle>
                <CardDescription>Building codes, permits, and compliance requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <RegulatoryInformationSection form={form} />
              </CardContent>
            </Card>

            {/* Procurement */}
            <Card>
              <CardHeader>
                <CardTitle>Procurement Preferences</CardTitle>
                <CardDescription>Supplier and procurement preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <ProcurementSection form={form} />
              </CardContent>
            </Card>

            {/* Integration */}
            <Card>
              <CardHeader>
                <CardTitle>System Integration</CardTitle>
                <CardDescription>Technology integration requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationSection form={form} />
              </CardContent>
            </Card>

            {/* Environmental */}
            <Card>
              <CardHeader>
                <CardTitle>Environmental Considerations</CardTitle>
                <CardDescription>Green building and sustainability requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <EnvironmentalSection form={form} />
              </CardContent>
            </Card>

            {/* Resource Constraints */}
            <Card>
              <CardHeader>
                <CardTitle>Resource Constraints</CardTitle>
                <CardDescription>Workforce, equipment, and material constraints</CardDescription>
              </CardHeader>
              <CardContent>
                <ResourceConstraintsSection form={form} />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-brand-orange hover:bg-brand-orange/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isEditMode ? 'Updating Project...' : 'Creating Project...'}
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={16} />
                    {isEditMode ? 'Update Project' : 'Create Project & Generate Estimates'}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
