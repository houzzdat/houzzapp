
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MaterialsModalsProps {
  isSupplierModalOpen: boolean;
  onSupplierModalClose: () => void;
  editingSupplier: any;
  
  isPOModalOpen: boolean;
  onPOModalClose: () => void;
  suppliers: any[];
  
  isInventoryModalOpen: boolean;
  onInventoryModalClose: () => void;
  editingInventory: any;
}

export default function MaterialsModals({
  isSupplierModalOpen,
  onSupplierModalClose,
  editingSupplier,
  isPOModalOpen,
  onPOModalClose,
  suppliers,
  isInventoryModalOpen,
  onInventoryModalClose,
  editingInventory,
}: MaterialsModalsProps) {
  return (
    <>
      {/* Supplier Modal */}
      <Dialog open={isSupplierModalOpen} onOpenChange={onSupplierModalClose}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplierName">Supplier Name</Label>
                <Input id="supplierName" placeholder="Enter supplier name" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cement">Cement</SelectItem>
                    <SelectItem value="steel">Steel</SelectItem>
                    <SelectItem value="bricks">Bricks</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contact">Contact Person</Label>
                <Input id="contact" placeholder="Contact person name" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+91 xxxxx xxxxx" className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="City, State" className="rounded-xl" />
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onSupplierModalClose} className="rounded-xl">
                Cancel
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                {editingSupplier ? 'Update' : 'Add'} Supplier
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Purchase Order Modal */}
      <Dialog open={isPOModalOpen} onOpenChange={onPOModalClose}>
        <DialogContent className="rounded-2xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Select>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier.id} value={supplier.name}>{supplier.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="deliveryDate">Delivery Date</Label>
                <Input id="deliveryDate" type="date" className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label htmlFor="items">Items Description</Label>
              <Input id="items" placeholder="e.g., Cement - 500 bags" className="rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" type="number" placeholder="Enter quantity" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="amount">Total Amount (₹)</Label>
                <Input id="amount" type="number" placeholder="Enter amount" className="rounded-xl" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onPOModalClose} className="rounded-xl">
                Cancel
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                Create PO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Inventory Modal */}
      <Dialog open={isInventoryModalOpen} onOpenChange={onInventoryModalClose}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>{editingInventory ? 'Update Inventory' : 'Add New Material'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materialName">Material Name</Label>
                <Input id="materialName" placeholder="Enter material name" className="rounded-xl" />
              </div>
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
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input id="currentStock" type="number" placeholder="Current stock" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="minStock">Min Stock</Label>
                <Input id="minStock" type="number" placeholder="Minimum stock" className="rounded-xl" />
              </div>
              <div>
                <Label htmlFor="unitCost">Unit Cost (₹)</Label>
                <Input id="unitCost" type="number" placeholder="Cost per unit" className="rounded-xl" />
              </div>
            </div>
            <div>
              <Label htmlFor="materialSupplier">Primary Supplier</Label>
              <Select>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map(supplier => (
                    <SelectItem key={supplier.id} value={supplier.name}>{supplier.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onInventoryModalClose} className="rounded-xl">
                Cancel
              </Button>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                {editingInventory ? 'Update' : 'Add'} Material
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
