
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, Award, AlertCircle } from "lucide-react";

const SAMPLE_EVALUATIONS = [
  { 
    id: 1, 
    supplier: "Shree Cement", 
    category: "Cement",
    qualityScore: 92, 
    deliveryScore: 88, 
    priceScore: 85, 
    serviceScore: 90, 
    overallRating: 4.7,
    totalOrders: 25,
    onTimeDelivery: 96,
    defectRate: 2,
    lastEvaluated: "2024-06-01",
    status: "Excellent"
  },
  { 
    id: 2, 
    supplier: "SteelX India", 
    category: "Steel",
    qualityScore: 88, 
    deliveryScore: 82, 
    priceScore: 90, 
    serviceScore: 85, 
    overallRating: 4.3,
    totalOrders: 18,
    onTimeDelivery: 89,
    defectRate: 5,
    lastEvaluated: "2024-05-28",
    status: "Good"
  },
  { 
    id: 3, 
    supplier: "UltraBricks", 
    category: "Bricks",
    qualityScore: 95, 
    deliveryScore: 92, 
    priceScore: 78, 
    serviceScore: 88, 
    overallRating: 4.5,
    totalOrders: 12,
    onTimeDelivery: 100,
    defectRate: 1,
    lastEvaluated: "2024-06-05",
    status: "Excellent"
  },
];

interface SupplierEvaluationProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SupplierEvaluation({ isOpen, onClose }: SupplierEvaluationProps) {
  const [evaluations, setEvaluations] = useState(SAMPLE_EVALUATIONS);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent": return "bg-green-100 text-green-700";
      case "Good": return "bg-blue-100 text-blue-700";
      case "Average": return "bg-yellow-100 text-yellow-700";
      default: return "bg-red-100 text-red-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent": return <Award className="w-4 h-4 text-green-600" />;
      case "Good": return <TrendingUp className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-brand-orange" />
            Supplier Evaluation System
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Excellent Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {evaluations.filter(s => s.status === "Excellent").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-brand-medium-blue text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Good Suppliers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {evaluations.filter(s => s.status === "Good").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-brand-orange to-yellow-500 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(evaluations.reduce((sum, s) => sum + s.overallRating, 0) / evaluations.length).toFixed(1)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {evaluations.reduce((sum, s) => sum + s.totalOrders, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Supplier Performance Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Supplier</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Overall Rating</TableHead>
                  <TableHead>Quality Score</TableHead>
                  <TableHead>Delivery Score</TableHead>
                  <TableHead>On-Time %</TableHead>
                  <TableHead>Defect Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evaluations.map((supplier) => (
                  <TableRow key={supplier.id}>
                    <TableCell className="font-medium">{supplier.supplier}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-brand-orange/30 text-brand-orange">
                        {supplier.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= supplier.overallRating 
                                  ? "fill-yellow-400 text-yellow-400" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-semibold">{supplier.overallRating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{supplier.qualityScore}%</span>
                        </div>
                        <Progress value={supplier.qualityScore} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{supplier.deliveryScore}%</span>
                        </div>
                        <Progress value={supplier.deliveryScore} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {supplier.onTimeDelivery}%
                    </TableCell>
                    <TableCell className="font-semibold text-red-600">
                      {supplier.defectRate}%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(supplier.status)}
                        <Badge className={getStatusColor(supplier.status)}>
                          {supplier.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSupplier(supplier)}
                        className="text-brand-orange hover:text-brand-orange hover:bg-brand-orange/10"
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {selectedSupplier && (
          <Card className="border-brand-orange/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Detailed Evaluation: {selectedSupplier.supplier}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSupplier(null)}
                  className="rounded-xl"
                >
                  Close
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Quality Score</span>
                        <span className="text-sm font-medium">{selectedSupplier.qualityScore}%</span>
                      </div>
                      <Progress value={selectedSupplier.qualityScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Delivery Score</span>
                        <span className="text-sm font-medium">{selectedSupplier.deliveryScore}%</span>
                      </div>
                      <Progress value={selectedSupplier.deliveryScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Price Competitiveness</span>
                        <span className="text-sm font-medium">{selectedSupplier.priceScore}%</span>
                      </div>
                      <Progress value={selectedSupplier.priceScore} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Service Quality</span>
                        <span className="text-sm font-medium">{selectedSupplier.serviceScore}%</span>
                      </div>
                      <Progress value={selectedSupplier.serviceScore} className="h-2" />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Key Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Orders:</span>
                      <span className="font-medium">{selectedSupplier.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On-Time Delivery:</span>
                      <span className="font-medium text-green-600">{selectedSupplier.onTimeDelivery}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Defect Rate:</span>
                      <span className="font-medium text-red-600">{selectedSupplier.defectRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Evaluated:</span>
                      <span className="font-medium">{selectedSupplier.lastEvaluated}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Add Evaluation Note</h4>
                <Textarea placeholder="Add feedback or evaluation notes..." className="rounded-xl" />
                <Button className="mt-3 bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                  Save Evaluation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
}
