
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, FileText, Shield, Clock, Upload } from "lucide-react";

const INCIDENT_REPORTS = [
  { id: 1, title: "Minor Cut Incident", reporter: "John Doe", severity: "Low", status: "Under Review", date: "2024-06-14", description: "Worker sustained minor cut while handling materials" },
  { id: 2, title: "Slip and Fall", reporter: "Site Supervisor", severity: "Medium", status: "Investigation Complete", date: "2024-06-13", description: "Worker slipped on wet surface near concrete area" },
  { id: 3, title: "Equipment Malfunction", reporter: "Safety Officer", severity: "High", status: "Action Required", date: "2024-06-12", description: "Crane safety mechanism failed during operation" }
];

const SAFETY_INSPECTIONS = [
  { id: 1, area: "Scaffolding Zone A", inspector: "Safety Team", status: "Scheduled", date: "2024-06-16", time: "10:00 AM" },
  { id: 2, area: "Electrical Panel Room", inspector: "External Auditor", status: "Completed", date: "2024-06-14", time: "2:00 PM" },
  { id: 3, area: "Material Storage Area", inspector: "Site Manager", status: "In Progress", date: "2024-06-15", time: "9:00 AM" }
];

const TRAINING_SESSIONS = [
  { id: 1, title: "Fire Safety Training", instructor: "External Trainer", participants: 25, status: "Scheduled", date: "2024-06-18", duration: "2 hours" },
  { id: 2, title: "PPE Usage Workshop", instructor: "Safety Officer", participants: 30, status: "Completed", date: "2024-06-10", duration: "1 hour" },
  { id: 3, title: "First Aid Certification", instructor: "Medical Team", participants: 15, status: "In Progress", date: "2024-06-15", duration: "4 hours" }
];

export default function SafetyWorkflow() {
  const [newIncident, setNewIncident] = useState({
    title: "",
    severity: "",
    description: "",
    location: ""
  });

  return (
    <div className="space-y-6">
      {/* Incident Reporting */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <AlertTriangle className="text-red-500" size={20} />
              Incident Reports
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl" size="sm">
                  Report Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader>
                  <DialogTitle>Report Safety Incident</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Incident Title</Label>
                    <Input 
                      value={newIncident.title}
                      onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                      placeholder="Brief incident title"
                    />
                  </div>
                  <div>
                    <Label>Severity Level</Label>
                    <select 
                      className="w-full p-2 border rounded-lg"
                      value={newIncident.severity}
                      onChange={(e) => setNewIncident({...newIncident, severity: e.target.value})}
                    >
                      <option value="">Select severity</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input 
                      value={newIncident.location}
                      onChange={(e) => setNewIncident({...newIncident, location: e.target.value})}
                      placeholder="Where did this occur?"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea 
                      value={newIncident.description}
                      onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                      placeholder="Detailed description of the incident"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Attach Photos/Documents</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                      <p className="text-sm text-gray-500">Click to upload files</p>
                    </div>
                  </div>
                  <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Submit Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {INCIDENT_REPORTS.map((incident) => (
              <div key={incident.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-brand-dark-blue">{incident.title}</div>
                    <div className="text-sm text-brand-gray">Reported by {incident.reporter} on {incident.date}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        incident.severity === "High" || incident.severity === "Critical"
                          ? "border-red-300 text-red-700 bg-red-50"
                          : incident.severity === "Medium"
                          ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                          : "border-green-300 text-green-700 bg-green-50"
                      }
                    >
                      {incident.severity}
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {incident.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-brand-gray">{incident.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Inspections */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
            <Shield className="text-brand-orange" size={20} />
            Safety Inspections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {SAFETY_INSPECTIONS.map((inspection) => (
              <div key={inspection.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{inspection.area}</div>
                  <div className="text-sm text-brand-gray">Inspector: {inspection.inspector}</div>
                  <div className="text-xs text-brand-gray">{inspection.date} at {inspection.time}</div>
                </div>
                <Badge 
                  variant={inspection.status === "Completed" ? "default" : inspection.status === "In Progress" ? "secondary" : "outline"}
                  className={
                    inspection.status === "Completed" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : inspection.status === "In Progress"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }
                >
                  {inspection.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Training Sessions */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
            <FileText className="text-brand-orange" size={20} />
            Training Sessions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {TRAINING_SESSIONS.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{session.title}</div>
                  <div className="text-sm text-brand-gray">Instructor: {session.instructor} • {session.participants} participants</div>
                  <div className="text-xs text-brand-gray">{session.date} • Duration: {session.duration}</div>
                </div>
                <Badge 
                  variant={session.status === "Completed" ? "default" : session.status === "In Progress" ? "secondary" : "outline"}
                  className={
                    session.status === "Completed" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : session.status === "In Progress"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }
                >
                  {session.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
