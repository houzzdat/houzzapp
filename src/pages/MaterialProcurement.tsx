
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Package } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useProcurementData } from "@/hooks/useProcurementData";
import ProcurementSummaryCards from "@/components/procurement/ProcurementSummaryCards";
import ProcurementTabs from "@/components/procurement/ProcurementTabs";
import CreatePODialog from "@/components/procurement/CreatePODialog";
import DownloadDataButton from "@/components/shared/DownloadDataButton";
import DateRangeSelector from "@/components/shared/DateRangeSelector";
import { MaterialProcurementItem } from "@/types/procurement";

export default function MaterialProcurement() {
  const navigate = useNavigate();
  const { procurementData, isLoading, handleStatusChange } = useProcurementData();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  const [showCreatePO, setShowCreatePO] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MaterialProcurementItem | undefined>();

  const handleCreatePO = (item: MaterialProcurementItem) => {
    setSelectedItem(item);
    setShowCreatePO(true);
  };

  const handleOrderFromHouzzdat = (item: MaterialProcurementItem) => {
    // Placeholder for Houzzdat integration
    console.log('Order from Houzzdat:', item);
  };

  const getProcurementDownloadData = () => {
    return procurementData.map(material => ({
      source: 'Procurement',
      item: material.item,
      category: material.category,
      quantity: material.requiredQuantity,
      unit: material.unit,
      unitPrice: material.unitRate,
      totalCost: material.requiredQuantity * material.unitRate,
      supplier: 'TBD',
      status: material.status,
      lastUpdated: new Date().toLocaleDateString(),
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-brand-orange" />
          <p className="text-brand-gray">Loading procurement data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate("/project-estimation")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Project Estimates
          </Button>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark-blue mb-2 flex items-center gap-3">
                <Package className="h-8 w-8 text-brand-orange" />
                Material Procurement Planning
              </h1>
              <p className="text-brand-gray">
                Manage material procurement, suppliers, and delivery schedules
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {procurementData.length > 0 && (
                <DownloadDataButton
                  data={getProcurementDownloadData()}
                  filename={`material-procurement-${new Date().toISOString().split('T')[0]}`}
                  title="Material Procurement Data"
                />
              )}
              <Button 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-auto"
                onClick={() => navigate('/material-tracking')}
              >
                <TrendingUp className="mr-2" size={16} />
                Track Material Flow
              </Button>
            </div>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="mb-6">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="p-4">
              <DateRangeSelector
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </CardContent>
          </Card>
        </div>

        {/* Summary Cards */}
        <div className="mb-6">
          <ProcurementSummaryCards 
            procurementData={procurementData}
          />
        </div>

        {/* Procurement Management */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-brand-dark-blue flex items-center gap-2">
              <Package size={20} className="text-brand-orange" />
              Material Procurement Management
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ProcurementTabs 
              procurementData={procurementData}
              onStatusChange={handleStatusChange}
              onCreatePO={handleCreatePO}
              onOrderFromHouzzdat={handleOrderFromHouzzdat}
            />
          </CardContent>
        </Card>

        {/* Create PO Dialog */}
        <CreatePODialog
          open={showCreatePO}
          onOpenChange={setShowCreatePO}
          item={selectedItem}
        />
      </div>
    </div>
  );
}
