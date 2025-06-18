
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface POFormDeliverySectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function POFormDeliverySection({ formData, setFormData }: POFormDeliverySectionProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Expected Delivery Date</Label>
          <Input
            type="date"
            value={formData.expected_delivery_date}
            onChange={(e) => setFormData({ ...formData, expected_delivery_date: e.target.value })}
          />
        </div>
        <div>
          <Label>Payment Terms</Label>
          <Input
            value={formData.payment_terms}
            onChange={(e) => setFormData({ ...formData, payment_terms: e.target.value })}
            placeholder="e.g., 30 days, Advance, etc."
          />
        </div>
      </div>

      <div>
        <Label>Delivery Address *</Label>
        <Textarea
          value={formData.delivery_address}
          onChange={(e) => setFormData({ ...formData, delivery_address: e.target.value })}
          placeholder="Delivery address"
          required
        />
      </div>
    </>
  );
}
