
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface POFormItemSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function POFormItemSection({ formData, setFormData }: POFormItemSectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Item Name *</Label>
          <Input
            value={formData.item_name}
            onChange={(e) => setFormData({ ...formData, item_name: e.target.value })}
            placeholder="Item name"
            required
          />
        </div>
        <div>
          <Label>Brand</Label>
          <Input
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            placeholder="Brand name"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Quantity *</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <Label>Unit *</Label>
          <Input
            value={formData.unit}
            onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            placeholder="Unit (kg, nos, etc.)"
            required
          />
        </div>
        <div>
          <Label>Unit Rate *</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.unit_rate}
            onChange={(e) => setFormData({ ...formData, unit_rate: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
      </div>
    </>
  );
}
