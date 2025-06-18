
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, CheckCircle, XCircle, Clock } from "lucide-react";

const SAMPLE_REQUESTS = [
  { id: 1, material: "Cement", quantity: 200, unit: "bags", requestedBy: "Site Engineer A", date: "2024-06-14", priority: "High", status: "Pending", reason: "Foundation work starting" },
  { id: 2, material: "Steel Rods", quantity: 10, unit: "tons", requestedBy: "Site Engineer B", date: "2024-06-13", priority: "Medium", status: "Approved", reason: "Column reinforcement" },
  { id: 3, material: "Bricks", quantity: 5000, unit: "pcs", requestedBy: "Site Engineer C", date: "2024-06-12", priority: "Low", status: "Rejected", reason: "Wall construction - Phase 2" },
];

interface MaterialRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialRequest({ isOpen, onClose }: MaterialRequestProps) {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [requests, setRequests] = useState(SAMPLE_REQUESTS);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Material Request Workflow
            <Button 
              onClick={() => setShowNewRequest(true)}
              className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showNewRequest && (
          <Card className="mb-6 border-brand-orange/20">
            <CardHeader>
              <CardTitle className="text-lg">Create Material Request</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input id="material" placeholder="Material name" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="Quantity needed" className="rounded-xl" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bags">Bags</SelectItem>
                      <SelectItem value="tons">Tons</SelectItem>
                      <SelectItem value="pcs">Pieces</SelectItem>
                      <SelectItem value="meters">Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="reason">Reason/Purpose</Label>
                <Textarea id="reason" placeholder="Explain why this material is needed" className="rounded-xl" />
              </div>
              <div className="flex gap-3">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                  Submit Request
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewRequest(false)}
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
            <CardTitle>Material Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.material}</TableCell>
                    <TableCell>{request.quantity} {request.unit}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell>
                      <Badge variant={request.priority === "High" ? "destructive" : request.priority === "Medium" ? "default" : "secondary"}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <Badge className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-brand-orange">
                        <Edit className="w-4 h-4" />
                      </Button>
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
