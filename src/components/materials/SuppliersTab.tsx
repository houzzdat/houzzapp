
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Star } from "lucide-react";

interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  rating: number;
  performance: string;
  category: string;
  location: string;
}

interface SuppliersTabProps {
  suppliers: Supplier[];
  supplierSearch: string;
  onSearchChange: (value: string) => void;
  onAddSupplier: () => void;
  onEditSupplier: (supplier: Supplier) => void;
}

export default function SuppliersTab({
  suppliers,
  supplierSearch,
  onSearchChange,
  onAddSupplier,
  onEditSupplier,
}: SuppliersTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-xl font-bold text-brand-dark-blue">Supplier Management</h3>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search suppliers..."
            value={supplierSearch}
            onChange={e => onSearchChange(e.target.value)}
            className="max-w-xs rounded-xl border-brand-gray/30"
          />
          <Button 
            onClick={onAddSupplier}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg"
            size="sm"
          >
            <Plus className="mr-2" size={16} />
            Add Supplier
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-brand-dark-blue">Name</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Contact</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Category</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Rating</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Performance</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-brand-gray py-6">
                  No suppliers found.
                </TableCell>
              </TableRow>
            ) : (
              suppliers.map((s) => (
                <TableRow key={s.id} className="hover:bg-blue-50/50">
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div className="font-medium">{s.contact}</div>
                      <div className="text-brand-gray">{s.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-brand-orange/30 text-brand-orange">
                      {s.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{s.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-green-600">{s.performance}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSupplier(s)}
                      className="text-brand-orange hover:text-brand-orange hover:bg-brand-orange/10"
                    >
                      <Edit size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
