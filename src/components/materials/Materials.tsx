import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { Users, Package, AlertTriangle } from "lucide-react";

// Import new components
import MaterialsSummaryCards from "./MaterialsSummaryCards";
import MaterialsWorkflowSection from "./MaterialsWorkflowSection";
import SuppliersTab from "./SuppliersTab";
import PurchaseOrdersTab from "./PurchaseOrdersTab";
import InventoryTab from "./InventoryTab";
import MaterialsModals from "./MaterialsModals";
import ProjectViewSelector from "../shared/ProjectViewSelector";

// Import workflow components
import MaterialRequest from "./MaterialRequest";
import MaterialReceipt from "./MaterialReceipt";
import MaterialIssue from "./MaterialIssue";
import LowStockAlert from "./LowStockAlert";
import MaterialReturn from "./MaterialReturn";
import SupplierEvaluation from "./SupplierEvaluation";

const SUPPLIERS_SAMPLE = [
  { id: 1, name: "Shree Cement", contact: "Ravi Malhotra", phone: "+91 98765 43210", rating: 4.7, performance: "97%", category: "Cement", location: "Mumbai" },
  { id: 2, name: "SteelX India", contact: "Priya Singh", phone: "+91 87654 32109", rating: 4.3, performance: "95%", category: "Steel", location: "Delhi" },
  { id: 3, name: "UltraBricks", contact: "Mohammed Khan", phone: "+91 76543 21098", rating: 4.5, performance: "98%", category: "Bricks", location: "Bangalore" },
];

const POS_SAMPLE = [
  { id: 1, pono: "PO-00125", supplier: "Shree Cement", items: "Cement - 500 bags", amount: 120000, status: "Approved", date: "2024-06-10", delivery: "2024-06-15" },
  { id: 2, pono: "PO-00126", supplier: "SteelX India", items: "Steel Rods - 50 tons", amount: 784000, status: "Pending", date: "2024-06-12", delivery: "2024-06-18" },
  { id: 3, pono: "PO-00127", supplier: "UltraBricks", items: "Red Bricks - 10000 pcs", amount: 45000, status: "Delivered", date: "2024-06-08", delivery: "2024-06-14" },
];

const INVENTORY_SAMPLE = [
  { id: 1, item: "Cement", stock: 390, unit: "bags", minStock: 100, cost: 240, supplier: "Shree Cement", lastUpdated: "2024-06-14", low: false },
  { id: 2, item: "Steel Rods", stock: 42, unit: "tons", minStock: 50, cost: 15680, supplier: "SteelX India", lastUpdated: "2024-06-13", low: true },
  { id: 3, item: "Bricks", stock: 5700, unit: "pcs", minStock: 1000, cost: 4.5, supplier: "UltraBricks", lastUpdated: "2024-06-12", low: false },
];

export default function Materials() {
  const [supplierSearch, setSupplierSearch] = useState("");
  const [tab, setTab] = useState("suppliers");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 5, 1),
    to: new Date(2024, 5, 15)
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSupplierModalOpen, setIsSupplierModalOpen] = useState(false);
  const [isPOModalOpen, setIsPOModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<any>(null);
  const [editingInventory, setEditingInventory] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");

  // Workflow modal states
  const [workflowModals, setWorkflowModals] = useState({
    materialRequest: false,
    materialReceipt: false,
    materialIssue: false,
    lowStockAlert: false,
    materialReturn: false,
    supplierEvaluation: false,
  });

  useEffect(() => {
    // Load project context from sessionStorage
    const storedContext = sessionStorage.getItem('projectContext');
    if (storedContext) {
      const parsed = JSON.parse(storedContext);
      setViewMode(parsed.viewMode || "active");
    }
  }, []);

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
  };

  // Calculate aggregates
  const totalSuppliers = SUPPLIERS_SAMPLE.length;
  const totalPOValue = POS_SAMPLE.reduce((sum, po) => sum + po.amount, 0);
  const pendingPOs = POS_SAMPLE.filter(po => po.status === "Pending").length;
  const lowStockItems = INVENTORY_SAMPLE.filter(item => item.low).length;

  // Filtered suppliers for search
  const suppliers = SUPPLIERS_SAMPLE.filter((s) =>
    s.name.toLowerCase().includes(supplierSearch.toLowerCase())
  );

  const handleAddSupplier = () => {
    setEditingSupplier(null);
    setIsSupplierModalOpen(true);
  };

  const handleEditSupplier = (supplier: any) => {
    setEditingSupplier(supplier);
    setIsSupplierModalOpen(true);
  };

  const handleEditInventory = (item: any) => {
    setEditingInventory(item);
    setIsInventoryModalOpen(true);
  };

  const openWorkflowModal = (workflow: string) => {
    setWorkflowModals(prev => ({ ...prev, [workflow]: true }));
  };

  const closeWorkflowModal = (workflow: string) => {
    setWorkflowModals(prev => ({ ...prev, [workflow]: false }));
  };

  return (
    <div className="py-6 px-4 w-full max-w-4xl mx-auto animate-fade-in">
      {/* Project View Selector */}
      <ProjectViewSelector onViewModeChange={handleViewModeChange} />

      <MaterialsWorkflowSection onOpenWorkflow={openWorkflowModal} />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-center mb-6 bg-white shadow-sm border border-brand-gray/20 rounded-xl p-1">
          <TabsTrigger value="suppliers" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <Users className="mr-2" size={16} />
            Suppliers
          </TabsTrigger>
          <TabsTrigger value="pos" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <Package className="mr-2" size={16} />
            Purchase Orders
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <AlertTriangle className="mr-2" size={16} />
            Inventory
          </TabsTrigger>
        </TabsList>

        <MaterialsSummaryCards
          totalSuppliers={totalSuppliers}
          totalPOValue={totalPOValue}
          pendingPOs={pendingPOs}
          lowStockItems={lowStockItems}
        />

        <TabsContent value="suppliers">
          <SuppliersTab
            suppliers={suppliers}
            supplierSearch={supplierSearch}
            onSearchChange={setSupplierSearch}
            onAddSupplier={handleAddSupplier}
            onEditSupplier={handleEditSupplier}
          />
        </TabsContent>

        <TabsContent value="pos">
          <PurchaseOrdersTab
            purchaseOrders={POS_SAMPLE}
            dateRange={dateRange}
            isCalendarOpen={isCalendarOpen}
            onCalendarToggle={setIsCalendarOpen}
            onDateRangeChange={setDateRange}
            onNewPO={() => setIsPOModalOpen(true)}
          />
        </TabsContent>

        <TabsContent value="inventory">
          <InventoryTab
            inventory={INVENTORY_SAMPLE}
            onAddMaterial={() => setIsInventoryModalOpen(true)}
            onEditInventory={handleEditInventory}
          />
        </TabsContent>
      </Tabs>

      <MaterialsModals
        isSupplierModalOpen={isSupplierModalOpen}
        onSupplierModalClose={() => setIsSupplierModalOpen(false)}
        editingSupplier={editingSupplier}
        isPOModalOpen={isPOModalOpen}
        onPOModalClose={() => setIsPOModalOpen(false)}
        suppliers={SUPPLIERS_SAMPLE}
        isInventoryModalOpen={isInventoryModalOpen}
        onInventoryModalClose={() => setIsInventoryModalOpen(false)}
        editingInventory={editingInventory}
      />

      {/* Workflow Modals */}
      <MaterialRequest 
        isOpen={workflowModals.materialRequest} 
        onClose={() => closeWorkflowModal('materialRequest')} 
      />
      <MaterialReceipt 
        isOpen={workflowModals.materialReceipt} 
        onClose={() => closeWorkflowModal('materialReceipt')} 
      />
      <MaterialIssue 
        isOpen={workflowModals.materialIssue} 
        onClose={() => closeWorkflowModal('materialIssue')} 
      />
      <LowStockAlert 
        isOpen={workflowModals.lowStockAlert} 
        onClose={() => closeWorkflowModal('lowStockAlert')} 
      />
      <MaterialReturn 
        isOpen={workflowModals.materialReturn} 
        onClose={() => closeWorkflowModal('materialReturn')} 
      />
      <SupplierEvaluation 
        isOpen={workflowModals.supplierEvaluation} 
        onClose={() => closeWorkflowModal('supplierEvaluation')} 
      />
    </div>
  );
}
