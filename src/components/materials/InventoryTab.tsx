
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";

interface InventoryItem {
  id: number;
  item: string;
  stock: number;
  unit: string;
  minStock: number;
  cost: number;
  supplier: string;
  lastUpdated: string;
  low: boolean;
}

interface InventoryTabProps {
  inventory: InventoryItem[];
  onAddMaterial: () => void;
  onEditInventory: (item: InventoryItem) => void;
}

export default function InventoryTab({
  inventory,
  onAddMaterial,
  onEditInventory,
}: InventoryTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-brand-dark-blue">Inventory Management</h3>
        <Button 
          onClick={onAddMaterial}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg"
          size="sm"
        >
          <Plus className="mr-2" size={16} />
          Add Material
        </Button>
      </div>

      <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-brand-dark-blue">Material</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Stock</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Unit Cost</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Supplier</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Status</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} className="hover:bg-blue-50/50">
                <TableCell className="font-medium">{item.item}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div className="font-semibold">{item.stock} {item.unit}</div>
                    <div className="text-brand-gray">Min: {item.minStock}</div>
                  </div>
                </TableCell>
                <TableCell className="font-semibold">₹{item.cost}</TableCell>
                <TableCell className="text-brand-gray">{item.supplier}</TableCell>
                <TableCell>
                  {item.low ? (
                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 animate-pulse">
                      Low Stock
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                      In Stock
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditInventory(item)}
                    className="text-brand-orange hover:text-brand-orange hover:bg-brand-orange/10"
                  >
                    <Edit size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
