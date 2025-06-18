import { useState } from "react";
import { Shield, AlertTriangle, CheckCircle, Calendar } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SafetyWorkflow from "./SafetyWorkflow";
import ProjectViewSelector from "../shared/ProjectViewSelector";

export default function Safety() {
  const [tab, setTab] = useState("incidents");
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");
  const [selectedProject, setSelectedProject] = useState("");

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="py-6 px-4 w-full max-w-4xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark-blue flex items-center gap-3">
          <Shield className="text-brand-orange" size={24} />
          Safety Management
        </h2>
      </div>

      {/* Project View Selector */}
      <ProjectViewSelector 
        onViewModeChange={handleViewModeChange}
        onProjectChange={handleProjectChange}
      />

      {/* Safety Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Safety Score</p>
                <p className="text-2xl font-bold text-green-800">98%</p>
              </div>
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-700 font-medium">Active Incidents</p>
                <p className="text-2xl font-bold text-yellow-800">2</p>
              </div>
              <AlertTriangle className="text-yellow-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-2 border-brand-orange/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-dark-blue font-medium">Inspections Due</p>
                <p className="text-2xl font-bold text-brand-dark-blue">5</p>
              </div>
              <Calendar className="text-brand-orange" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <SafetyWorkflow />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-center mb-4 bg-white border-2 border-brand-orange/20">
          <TabsTrigger value="incidents" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <AlertTriangle className="mr-2" size={16}/>Incidents
          </TabsTrigger>
          <TabsTrigger value="inspections" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <CheckCircle className="mr-2" size={16}/>Inspections
          </TabsTrigger>
          <TabsTrigger value="training" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <Shield className="mr-2" size={16}/>Training
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidents">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Recent Incidents</h3>
            <p className="text-brand-gray">Safety incident management coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="inspections">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Safety Inspections</h3>
            <p className="text-brand-gray">Safety inspection tracking coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="training">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Safety Training</h3>
            <p className="text-brand-gray">Safety training management coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
