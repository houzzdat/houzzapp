
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";

interface Defect {
  id: number;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  category: string;
  location: string;
  reportedBy: string;
  assignedTo: string;
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedDate: string;
  targetDate: string;
}

export default function QualityDefects() {
  const [defects, setDefects] = useState<Defect[]>([
    {
      id: 1,
      title: "Concrete surface crack",
      description: "Small crack observed in foundation wall section B",
      severity: "Medium",
      category: "Structural",
      location: "Foundation Wall B",
      reportedBy: "John Doe",
      assignedTo: "Mike Smith",
      status: "In Progress",
      reportedDate: "2024-01-15",
      targetDate: "2024-01-20"
    },
    {
      id: 2,
      title: "Electrical wiring exposed",
      description: "Exposed wiring in panel room needs immediate attention",
      severity: "High",
      category: "Electrical",
      location: "Panel Room 1",
      reportedBy: "Sarah Johnson",
      assignedTo: "Tom Wilson",
      status: "Open",
      reportedDate: "2024-01-16",
      targetDate: "2024-01-18"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    severity: "",
    category: "",
    location: "",
    reportedBy: "",
    assignedTo: "",
    status: "Open",
    targetDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setDefects(prev => prev.map(defect => 
        defect.id === editingId 
          ? { ...defect, ...formData, severity: formData.severity as Defect['severity'], status: formData.status as Defect['status'] }
          : defect
      ));
    } else {
      const newDefect: Defect = {
        id: Date.now(),
        ...formData,
        severity: formData.severity as Defect['severity'],
        status: formData.status as Defect['status'],
        reportedDate: new Date().toISOString().split('T')[0]
      };
      setDefects(prev => [...prev, newDefect]);
    }

    setFormData({
      title: "",
      description: "",
      severity: "",
      category: "",
      location: "",
      reportedBy: "",
      assignedTo: "",
      status: "Open",
      targetDate: ""
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (defect: Defect) => {
    setFormData({
      title: defect.title,
      description: defect.description,
      severity: defect.severity,
      category: defect.category,
      location: defect.location,
      reportedBy: defect.reportedBy,
      assignedTo: defect.assignedTo,
      status: defect.status,
      targetDate: defect.targetDate
    });
    setEditingId(defect.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setDefects(prev => prev.filter(defect => defect.id !== id));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-red-100 text-red-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Resolved": return "bg-green-100 text-green-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-brand-dark-blue">Defect Tracking</h3>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus className="mr-2" size={16} />
          Report Defect
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-brand-orange/20">
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">
              {editingId ? "Edit Defect" : "Report New Defect"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Defect Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select 
                    value={formData.severity} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Structural">Structural</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Plumbing">Plumbing</SelectItem>
                      <SelectItem value="Safety">Safety</SelectItem>
                      <SelectItem value="Finishing">Finishing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reportedBy">Reported By</Label>
                  <Input
                    id="reportedBy"
                    value={formData.reportedBy}
                    onChange={(e) => setFormData(prev => ({ ...prev, reportedBy: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDate">Target Date</Label>
                  <Input
                    id="targetDate"
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetDate: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {editingId && (
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value="Closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex gap-2">
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90">
                  {editingId ? "Update" : "Report"} Defect
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({
                      title: "",
                      description: "",
                      severity: "",
                      category: "",
                      location: "",
                      reportedBy: "",
                      assignedTo: "",
                      status: "Open",
                      targetDate: ""
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card className="border-2 border-brand-orange/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Target Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {defects.map(defect => (
                <TableRow key={defect.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-brand-dark-blue">{defect.title}</div>
                      <div className="text-sm text-brand-gray truncate max-w-48">{defect.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(defect.severity)}`}>
                      {defect.severity}
                    </span>
                  </TableCell>
                  <TableCell className="text-brand-medium-blue">{defect.category}</TableCell>
                  <TableCell className="text-brand-medium-blue">{defect.location}</TableCell>
                  <TableCell className="text-brand-medium-blue">{defect.assignedTo}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(defect.status)}`}>
                      {defect.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-brand-medium-blue">{defect.targetDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEdit(defect)}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDelete(defect.id)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
