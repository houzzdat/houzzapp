
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useMaterialTracking } from "@/hooks/useMaterialTracking";

interface MaterialUsedTabProps {
  dateRange?: DateRange;
}

export default function MaterialUsedTab({ dateRange }: MaterialUsedTabProps) {
  const {
    materialUsage,
    materialEstimates,
    isLoading,
    createMaterialUsage,
    deleteMaterialUsage,
    isCreatingUsage,
  } = useMaterialTracking(dateRange);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: '',
    unit: '',
    used_for: '',
    given_to: '',
  });

  const handleItemSelect = (itemName: string) => {
    const selectedItem = materialEstimates.find(item => item.item === itemName);
    if (selectedItem) {
      setFormData({
        ...formData,
        item: selectedItem.item,
        category: selectedItem.category,
        unit: selectedItem.unit,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMaterialUsage({
      item: formData.item,
      category: formData.category,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      used_for: formData.used_for,
      given_to: formData.given_to,
      usage_date: new Date().toISOString().split('T')[0],
    });
    
    setFormData({
      item: '',
      category: '',
      quantity: '',
      unit: '',
      used_for: '',
      given_to: '',
    });
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    deleteMaterialUsage(id);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading material data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Material Used Form */}
      {showAddForm && (
        <Card className="border-brand-orange/20">
          <CardHeader>
            <CardTitle className="text-lg">Record Material Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item">Item Name</Label>
                  <Select value={formData.item} onValueChange={handleItemSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material from estimates" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialEstimates.map((item, index) => (
                        <SelectItem key={index} value={item.item}>
                          {item.item} ({item.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Auto-filled from selection"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    placeholder="Auto-filled from selection"
                    required
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="used_for">Used For</Label>
                  <Input
                    id="used_for"
                    value={formData.used_for}
                    onChange={(e) => setFormData({ ...formData, used_for: e.target.value })}
                    placeholder="e.g., Foundation work, Column construction"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="given_to">Given To</Label>
                  <Input
                    id="given_to"
                    value={formData.given_to}
                    onChange={(e) => setFormData({ ...formData, given_to: e.target.value })}
                    placeholder="e.g., Team A, Foreman John"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  disabled={isCreatingUsage}
                >
                  {isCreatingUsage ? "Recording..." : "Record Usage"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus size={16} className="mr-2" />
          Record Material Usage
        </Button>
      )}

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Material Usage Records</CardTitle>
        </CardHeader>
        <CardContent>
          {materialUsage.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No material usage records found for the selected date range.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Used For</TableHead>
                  <TableHead>Given To</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialUsage.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.usage_date}</TableCell>
                    <TableCell className="font-medium">{record.item}</TableCell>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>{record.quantity} {record.unit}</TableCell>
                    <TableCell>{record.used_for}</TableCell>
                    <TableCell>{record.given_to}</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(record.id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
