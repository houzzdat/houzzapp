import { useState } from "react";
import { Layers, CheckSquare, AlertCircle, FileText } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ProjectViewSelector from "../shared/ProjectViewSelector";
import QualityChecklists from "./QualityChecklists";
import QualityDefects from "./QualityDefects";
import QualityReports from "./QualityReports";

export default function Quality() {
  const [tab, setTab] = useState("checklists");
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");
  const [selectedProject, setSelectedProject] = useState("");

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
  };

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="py-6 px-4 w-full max-w-6xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark-blue flex items-center gap-3">
          <Layers className="text-brand-orange" size={24} />
          Quality Control
        </h2>
      </div>

      {/* Project View Selector */}
      <ProjectViewSelector 
        onViewModeChange={handleViewModeChange}
        onProjectChange={handleProjectChange}
      />

      {/* Quality Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Quality Score</p>
                <p className="text-2xl font-bold text-blue-800">92%</p>
              </div>
              <CheckSquare className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 font-medium">Open Defects</p>
                <p className="text-2xl font-bold text-red-800">3</p>
              </div>
              <AlertCircle className="text-red-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-2 border-brand-orange/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-dark-blue font-medium">Pending Reviews</p>
                <p className="text-2xl font-bold text-brand-dark-blue">7</p>
              </div>
              <FileText className="text-brand-orange" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-center mb-4 bg-white border-2 border-brand-orange/20">
          <TabsTrigger value="checklists" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <CheckSquare className="mr-2" size={16}/>Checklists
          </TabsTrigger>
          <TabsTrigger value="defects" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <AlertCircle className="mr-2" size={16}/>Defects
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <FileText className="mr-2" size={16}/>Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="checklists">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <QualityChecklists />
          </div>
        </TabsContent>

        <TabsContent value="defects">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <QualityDefects />
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <QualityReports />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
