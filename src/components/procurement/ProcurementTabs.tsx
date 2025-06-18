
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcurementTable from "./ProcurementTable";
import PurchaseOrdersTab from "./PurchaseOrdersTab";
import InvoicesTab from "./InvoicesTab";
import { MaterialProcurementItem } from "@/types/procurement";

interface ProcurementTabsProps {
  procurementData: MaterialProcurementItem[];
  onStatusChange: (itemId: string, newStatus: 'Need to procure' | 'Available') => void;
  onCreatePO: (item: MaterialProcurementItem) => void;
  onOrderFromHouzzdat: (item: MaterialProcurementItem) => void;
}

export default function ProcurementTabs({
  procurementData,
  onStatusChange,
  onCreatePO,
  onOrderFromHouzzdat
}: ProcurementTabsProps) {
  return (
    <Tabs defaultValue="requirements" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="requirements">Material Requirements</TabsTrigger>
        <TabsTrigger value="purchase-orders">POs Placed</TabsTrigger>
        <TabsTrigger value="invoices">Invoices</TabsTrigger>
      </TabsList>
      
      <TabsContent value="requirements" className="mt-6">
        <ProcurementTable 
          procurementData={procurementData}
          onStatusChange={onStatusChange}
          onCreatePO={onCreatePO}
          onOrderFromHouzzdat={onOrderFromHouzzdat}
        />
      </TabsContent>
      
      <TabsContent value="purchase-orders" className="mt-6">
        <PurchaseOrdersTab />
      </TabsContent>
      
      <TabsContent value="invoices" className="mt-6">
        <InvoicesTab />
      </TabsContent>
    </Tabs>
  );
}
