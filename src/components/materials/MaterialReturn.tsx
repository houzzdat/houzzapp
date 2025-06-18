
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
import { Plus, RotateCcw, CheckCircle, Clock, XCircle } from "lucide-react";

const SAMPLE_RETURNS = [
  { id: 1, material: "Cement", quantity: 10, unit: "bags", reason: "Damaged during transport", returnedBy: "Site Engineer A", date: "2024-06-14", status: "Processed", refundAmount: 2400 },
  { id: 2, material: "Steel Rods", quantity: 0.5, unit: "tons", reason: "Wrong specifications", returnedBy: "Foreman John", date: "2024-06-13", status: "Pending", refundAmount: 7840 },
  { id: 3, material: "Tiles", quantity: 50, unit: "boxes", reason: "Excess after completion", returnedBy: "Site Engineer B", date: "2024-06-12", status: "Approved", refundAmount: 15000 },
];

interface MaterialReturnProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialReturn({ isOpen, onClose }: MaterialReturnProps) {
  const [showNewReturn, setShowNewReturn] = useState(false);
  const [returns, setReturns] = useState(SAMPLE_RETURNS);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Approved": return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case "Rejected": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processed": return "bg-green-100 text-green-700";
      case "Approved": return "bg-blue-100 text-blue-700";
      case "Rejected": return "bg-red-100 text-red-700";
      default: return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Material Return Workflow
            <Button 
              onClick={() => setShowNewReturn(true)}
              className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Process Return
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showNewReturn && (
          <Card className="mb-6 border-brand-orange/20">
            <CardHeader>
              <CardTitle className="text-lg">Process Material Return</CardTitle>
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
                      <SelectItem value="cement">Cement</SelectItem>
                      <SelectItem value="steel">Steel Rods</SelectItem>
                      <SelectItem value="bricks">Bricks</SelectItem>
                      <SelectItem value="tiles">Tiles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity to Return</Label>
                  <Input id="quantity" type="number" placeholder="Return quantity" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="returnType">Return Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select return type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="damaged">Damaged/Defective</SelectItem>
                      <SelectItem value="excess">Excess Materials</SelectItem>
                      <SelectItem value="wrong">Wrong Specifications</SelectItem>
                      <SelectItem value="unused">Unused/Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="returnedBy">Returned By</Label>
                  <Input id="returnedBy" placeholder="Person processing return" className="rounded-xl" />
                </div>
              </div>

              <div>
                <Label htmlFor="reason">Detailed Reason</Label>
                <Textarea id="reason" placeholder="Explain the reason for return in detail" className="rounded-xl" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="condition">Material Condition</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Current condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good - Can be reused</SelectItem>
                      <SelectItem value="fair">Fair - Limited use</SelectItem>
                      <SelectItem value="poor">Poor - Cannot be reused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="refundAmount">Expected Refund Amount</Label>
                  <Input id="refundAmount" type="number" placeholder="Amount in ₹" className="rounded-xl" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                  Process Return
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewReturn(false)}
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
            <CardTitle>Material Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Material</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Returned By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Refund Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {returns.map((returnItem) => (
                  <TableRow key={returnItem.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-brand-orange" />
                        {returnItem.material}
                      </div>
                    </TableCell>
                    <TableCell>{returnItem.quantity} {returnItem.unit}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="text-sm text-brand-gray truncate" title={returnItem.reason}>
                        {returnItem.reason}
                      </div>
                    </TableCell>
                    <TableCell>{returnItem.returnedBy}</TableCell>
                    <TableCell>{returnItem.date}</TableCell>
                    <TableCell className="font-semibold text-brand-dark-blue">
                      ₹{returnItem.refundAmount.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(returnItem.status)}
                        <Badge className={getStatusColor(returnItem.status)}>
                          {returnItem.status}
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
