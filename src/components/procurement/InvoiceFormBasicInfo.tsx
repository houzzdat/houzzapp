
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InvoiceFormBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function InvoiceFormBasicInfo({ formData, setFormData }: InvoiceFormBasicInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="invoice_number">Invoice Number</Label>
        <Input
          id="invoice_number"
          value={formData.invoice_number}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, invoice_number: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="vendor_name">Vendor Name</Label>
        <Input
          id="vendor_name"
          value={formData.vendor_name}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, vendor_name: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="invoice_date">Invoice Date</Label>
        <Input
          id="invoice_date"
          type="date"
          value={formData.invoice_date}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, invoice_date: e.target.value }))}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="due_date">Due Date</Label>
        <Input
          id="due_date"
          type="date"
          value={formData.due_date}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, due_date: e.target.value }))}
        />
      </div>
    </div>
  );
}
