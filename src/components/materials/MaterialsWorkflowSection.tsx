
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Truck, Package, Bell, RotateCcw, Star } from "lucide-react";

interface MaterialsWorkflowSectionProps {
  onOpenWorkflow: (workflow: string) => void;
}

export default function MaterialsWorkflowSection({ onOpenWorkflow }: MaterialsWorkflowSectionProps) {
  return (
    <Card className="mb-6 bg-gradient-to-r from-brand-orange/5 to-brand-medium-blue/5 border-brand-orange/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-brand-orange" />
          Material Workflows
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('materialRequest')}
            className="flex items-center gap-2 border-blue-200 hover:bg-blue-50 rounded-xl"
          >
            <ClipboardList className="w-4 h-4" />
            Material Request
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('materialReceipt')}
            className="flex items-center gap-2 border-green-200 hover:bg-green-50 rounded-xl"
          >
            <Truck className="w-4 h-4" />
            Material Receipt
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('materialIssue')}
            className="flex items-center gap-2 border-purple-200 hover:bg-purple-50 rounded-xl"
          >
            <Package className="w-4 h-4" />
            Material Issue
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('lowStockAlert')}
            className="flex items-center gap-2 border-yellow-200 hover:bg-yellow-50 rounded-xl"
          >
            <Bell className="w-4 h-4" />
            Low Stock Alerts
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('materialReturn')}
            className="flex items-center gap-2 border-red-200 hover:bg-red-50 rounded-xl"
          >
            <RotateCcw className="w-4 h-4" />
            Material Return
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenWorkflow('supplierEvaluation')}
            className="flex items-center gap-2 border-orange-200 hover:bg-orange-50 rounded-xl"
          >
            <Star className="w-4 h-4" />
            Supplier Evaluation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
