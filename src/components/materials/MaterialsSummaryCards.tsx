
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, TrendingUp, Package, AlertTriangle } from "lucide-react";

interface MaterialsSummaryCardsProps {
  totalSuppliers: number;
  totalPOValue: number;
  pendingPOs: number;
  lowStockItems: number;
}

export default function MaterialsSummaryCards({
  totalSuppliers,
  totalPOValue,
  pendingPOs,
  lowStockItems,
}: MaterialsSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-r from-blue-500 to-brand-medium-blue text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users size={16} />
            Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{totalSuppliers}</div>
          <div className="text-blue-100 text-xs">Active vendors</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp size={16} />
            PO Value
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">₹{(totalPOValue/1000).toFixed(0)}K</div>
          <div className="text-green-100 text-xs">This period</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-brand-orange to-yellow-500 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Package size={16} />
            Pending POs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{pendingPOs}</div>
          <div className="text-orange-100 text-xs">Needs approval</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertTriangle size={16} />
            Low Stock
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold mb-1">{lowStockItems}</div>
          <div className="text-red-100 text-xs">Items to reorder</div>
        </CardContent>
      </Card>
    </div>
  );
}
