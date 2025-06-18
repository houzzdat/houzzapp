
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";

interface InvoiceFormPOSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export default function InvoiceFormPOSection({ formData, setFormData }: InvoiceFormPOSectionProps) {
  const { purchaseOrders } = usePurchaseOrders();

  const handlePOSelect = (poId: string) => {
    const selectedPO = purchaseOrders.find(po => po.id === poId);
    if (selectedPO) {
      setFormData({
        ...formData,
        po_id: poId,
        po_number: selectedPO.po_number,
        vendor_name: selectedPO.vendor_name,
      });
    }
  };

  return (
    <>
      <div>
        <Label>Related PO (Optional)</Label>
        <Select value={formData.po_id} onValueChange={handlePOSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select related PO" />
          </SelectTrigger>
          <SelectContent>
            {purchaseOrders.map((po) => (
              <SelectItem key={po.id} value={po.id!}>
                {po.po_number} - {po.vendor_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Vendor Name *</Label>
        <Input
          value={formData.vendor_name}
          onChange={(e) => setFormData({ ...formData, vendor_name: e.target.value })}
          placeholder="Vendor name"
          required
        />
      </div>
    </>
  );
}
