import { useState } from "react";
import { MessageSquare, Users, Bell, Send } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProjectViewSelector from "../shared/ProjectViewSelector";

export default function Comms() {
  const [tab, setTab] = useState("messages");
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
          <MessageSquare className="text-brand-orange" size={24} />
          Communications
        </h2>
      </div>

      {/* Project View Selector */}
      <ProjectViewSelector 
        onViewModeChange={handleViewModeChange}
        onProjectChange={handleProjectChange}
      />

      {/* Communication Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 font-medium">Unread Messages</p>
                <p className="text-2xl font-bold text-blue-800">5</p>
              </div>
              <MessageSquare className="text-blue-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 font-medium">Active Users</p>
                <p className="text-2xl font-bold text-green-800">12</p>
              </div>
              <Users className="text-green-600" size={24} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-2 border-brand-orange/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-brand-dark-blue font-medium">Notifications</p>
                <p className="text-2xl font-bold text-brand-dark-blue">8</p>
              </div>
              <Bell className="text-brand-orange" size={24} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-center mb-4 bg-white border-2 border-brand-orange/20">
          <TabsTrigger value="messages" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <MessageSquare className="mr-2" size={16}/>Messages
          </TabsTrigger>
          <TabsTrigger value="team" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <Users className="mr-2" size={16}/>Team
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
            <Bell className="mr-2" size={16}/>Notifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Team Messages</h3>
            <p className="text-brand-gray">Team messaging coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Team Directory</h3>
            <p className="text-brand-gray">Team management coming soon...</p>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <div className="bg-white rounded-xl border-2 border-brand-orange/20 p-6">
            <h3 className="text-lg font-semibold text-brand-dark-blue mb-4">Notification Center</h3>
            <p className="text-brand-gray">Notification management coming soon...</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
