
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, ArrowRight, CheckCircle, Clock } from "lucide-react";

const SAMPLE_ISSUES = [
  { id: 1, material: "Cement", quantity: 50, unit: "bags", issuedTo: "Team A - Foundation", requestedBy: "Foreman John", date: "2024-06-14", workOrder: "WO-001", status: "Issued" },
  { id: 2, material: "Steel Rods", quantity: 2, unit: "tons", issuedTo: "Team B - Column", requestedBy: "Foreman Mike", date: "2024-06-13", workOrder: "WO-002", status: "Pending" },
  { id: 3, material: "Bricks", quantity: 1000, unit: "pcs", issuedTo: "Team C - Wall", requestedBy: "Foreman Sarah", date: "2024-06-12", workOrder: "WO-003", status: "Issued" },
];

interface MaterialIssueProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialIssue({ isOpen, onClose }: MaterialIssueProps) {
  const [showNewIssue, setShowNewIssue] = useState(false);
  const [issues, setIssues] = useState(SAMPLE_ISSUES);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Issued": return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Issued": return "bg-green-100 text-green-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Material Issue Workflow
            <Button 
              onClick={() => setShowNewIssue(true)}
              className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Issue Material
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showNewIssue && (
          <Card className="mb-6 border-brand-orange/20">
            <CardHeader>
              <CardTitle className="text-lg">Issue Material to Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cement">Cement (390 bags available)</SelectItem>
                      <SelectItem value="steel">Steel Rods (42 tons available)</SelectItem>
                      <SelectItem value="bricks">Bricks (5700 pcs available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity to Issue</Label>
                  <Input id="quantity" type="number" placeholder="Quantity" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workOrder">Work Order</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select work order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WO-001">WO-001 - Foundation Work</SelectItem>
                      <SelectItem value="WO-002">WO-002 - Column Construction</SelectItem>
                      <SelectItem value="WO-003">WO-003 - Wall Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="team">Issue To Team/Person</Label>
                  <Input id="team" placeholder="Team or person name" className="rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="requestedBy">Requested By</Label>
                  <Input id="requestedBy" placeholder="Foreman/Supervisor name" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="purpose">Purpose/Location</Label>
                  <Input id="purpose" placeholder="Specific use or location" className="rounded-xl" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                  Issue Material
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewIssue(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Material Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Issued To</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Work Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell className="font-medium">{issue.material}</TableCell>
                    <TableCell>{issue.quantity} {issue.unit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-brand-orange" />
                        {issue.issuedTo}
                      </div>
                    </TableCell>
                    <TableCell>{issue.requestedBy}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-brand-orange/30 text-brand-orange">
                        {issue.workOrder}
                      </Badge>
                    </TableCell>
                    <TableCell>{issue.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(issue.status)}
                        <Badge className={getStatusColor(issue.status)}>
                          {issue.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
