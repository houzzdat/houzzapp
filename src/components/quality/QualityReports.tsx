
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download, Eye, FileText } from "lucide-react";

interface QualityReport {
  id: number;
  title: string;
  type: "Daily" | "Weekly" | "Monthly" | "Incident" | "Audit";
  description: string;
  generatedBy: string;
  generatedDate: string;
  period: string;
  status: "Draft" | "Final" | "Approved";
  findings: string;
  recommendations: string;
}

export default function QualityReports() {
  const [reports, setReports] = useState<QualityReport[]>([
    {
      id: 1,
      title: "Weekly Quality Inspection Report",
      type: "Weekly",
      description: "Comprehensive weekly quality assessment for all project areas",
      generatedBy: "Quality Manager",
      generatedDate: "2024-01-15",
      period: "Jan 8-14, 2024",
      status: "Final",
      findings: "Overall quality standards maintained. Minor issues in finishing work detected.",
      recommendations: "Increase supervision in finishing areas. Additional training for finishing crew recommended."
    },
    {
      id: 2,
      title: "Foundation Audit Report",
      type: "Audit",
      description: "Detailed audit of foundation construction quality",
      generatedBy: "Senior Inspector",
      generatedDate: "2024-01-12",
      period: "Jan 12, 2024",
      status: "Approved",
      findings: "Foundation construction meets all specifications. Concrete strength tests passed.",
      recommendations: "Continue current practices. Schedule next audit in 2 weeks."
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [viewingReport, setViewingReport] = useState<QualityReport | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    generatedBy: "",
    period: "",
    findings: "",
    recommendations: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newReport: QualityReport = {
      id: Date.now(),
      ...formData,
      type: formData.type as QualityReport['type'],
      generatedDate: new Date().toISOString().split('T')[0],
      status: "Draft"
    };
    
    setReports(prev => [...prev, newReport]);
    setFormData({
      title: "",
      type: "",
      description: "",
      generatedBy: "",
      period: "",
      findings: "",
      recommendations: ""
    });
    setShowForm(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Final": return "bg-blue-100 text-blue-800";
      case "Approved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Daily": return "bg-blue-100 text-blue-800";
      case "Weekly": return "bg-green-100 text-green-800";
      case "Monthly": return "bg-purple-100 text-purple-800";
      case "Incident": return "bg-red-100 text-red-800";
      case "Audit": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-brand-dark-blue">Quality Reports</h3>
        <Button 
          onClick={() => setShowForm(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus className="mr-2" size={16} />
          Generate Report
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-brand-orange/20">
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">Generate New Quality Report</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Report Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Report Type</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Incident">Incident</SelectItem>
                      <SelectItem value="Audit">Audit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="generatedBy">Generated By</Label>
                  <Input
                    id="generatedBy"
                    value={formData.generatedBy}
                    onChange={(e) => setFormData(prev => ({ ...prev, generatedBy: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="period">Report Period</Label>
                  <Input
                    id="period"
                    value={formData.period}
                    onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
                    placeholder="e.g., Jan 15-21, 2024"
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

              <div className="space-y-2">
                <Label htmlFor="findings">Key Findings</Label>
                <Textarea
                  id="findings"
                  value={formData.findings}
                  onChange={(e) => setFormData(prev => ({ ...prev, findings: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommendations</Label>
                <Textarea
                  id="recommendations"
                  value={formData.recommendations}
                  onChange={(e) => setFormData(prev => ({ ...prev, recommendations: e.target.value }))}
                  rows={4}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90">
                  Generate Report
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      title: "",
                      type: "",
                      description: "",
                      generatedBy: "",
                      period: "",
                      findings: "",
                      recommendations: ""
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

      {viewingReport && (
        <Card className="border-2 border-brand-orange/20">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-brand-dark-blue flex items-center gap-2">
                  <FileText className="text-brand-orange" size={20} />
                  {viewingReport.title}
                </CardTitle>
                <p className="text-brand-gray text-sm mt-1">{viewingReport.description}</p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setViewingReport(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-brand-medium-blue">Type:</span>
                <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs ${getTypeColor(viewingReport.type)}`}>
                  {viewingReport.type}
                </div>
              </div>
              <div>
                <span className="font-medium text-brand-medium-blue">Status:</span>
                <div className={`inline-block ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(viewingReport.status)}`}>
                  {viewingReport.status}
                </div>
              </div>
              <div>
                <span className="font-medium text-brand-medium-blue">Period:</span>
                <div className="text-brand-dark-blue">{viewingReport.period}</div>
              </div>
              <div>
                <span className="font-medium text-brand-medium-blue">Generated:</span>
                <div className="text-brand-dark-blue">{viewingReport.generatedDate}</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-brand-dark-blue mb-2">Key Findings</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-brand-dark-blue">
                  {viewingReport.findings}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-brand-dark-blue mb-2">Recommendations</h4>
                <div className="bg-gray-50 p-4 rounded-lg text-brand-dark-blue">
                  {viewingReport.recommendations}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-2 border-brand-orange/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Generated By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map(report => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="font-medium text-brand-dark-blue">{report.title}</div>
                    <div className="text-sm text-brand-gray truncate max-w-48">{report.description}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(report.type)}`}>
                      {report.type}
                    </span>
                  </TableCell>
                  <TableCell className="text-brand-medium-blue">{report.period}</TableCell>
                  <TableCell className="text-brand-medium-blue">{report.generatedBy}</TableCell>
                  <TableCell className="text-brand-medium-blue">{report.generatedDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setViewingReport(report)}
                      >
                        <Eye size={14} />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                      >
                        <Download size={14} />
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
