
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MaterialProcurementItem } from "@/types/procurement";

interface ProcurementSummaryCardsProps {
  procurementData: MaterialProcurementItem[];
}

export default function ProcurementSummaryCards({ procurementData }: ProcurementSummaryCardsProps) {
  const totalRequiredValue = procurementData.reduce((sum, item) => sum + (item.requiredQuantity * item.unitRate), 0);
  const totalAvailableValue = procurementData.reduce((sum, item) => sum + (item.availableQuantity * item.unitRate), 0);
  const totalUsedValue = procurementData.reduce((sum, item) => sum + (item.usedTillDate * item.unitRate), 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-blue-700">Total Required Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">₹{totalRequiredValue.toLocaleString()}</div>
          <p className="text-xs text-blue-600 mt-1">Based on project estimates</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-green-700">Available Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">₹{totalAvailableValue.toLocaleString()}</div>
          <p className="text-xs text-green-600 mt-1">Current inventory value</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-purple-700">Used Till Date Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">₹{totalUsedValue.toLocaleString()}</div>
          <p className="text-xs text-purple-600 mt-1">Materials consumed so far</p>
        </CardContent>
      </Card>
    </div>
  );
}
