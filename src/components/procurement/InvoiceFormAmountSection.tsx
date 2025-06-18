
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface InvoiceFormAmountSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function InvoiceFormAmountSection({ formData, setFormData }: InvoiceFormAmountSectionProps) {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Invoice Amount *</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.invoice_amount}
            onChange={(e) => setFormData({ ...formData, invoice_amount: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        <div>
          <Label>Tax Amount</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.tax_amount}
            onChange={(e) => setFormData({ ...formData, tax_amount: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label>Total Amount *</Label>
          <Input
            type="number"
            step="0.01"
            value={formData.total_amount}
            onChange={(e) => setFormData({ ...formData, total_amount: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
      </div>

      <div>
        <Label>Notes</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Additional notes"
        />
      </div>
    </>
  );
}
