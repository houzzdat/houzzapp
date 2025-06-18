
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMaterialTracking } from "@/hooks/useMaterialTracking";

interface POFormVendorSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  onCreateVendor: () => void;
}

export default function POFormVendorSection({ formData, setFormData, onCreateVendor }: POFormVendorSectionProps) {
  const { vendors } = useMaterialTracking();

  const handleVendorSelect = (vendorId: string) => {
    const selectedVendor = vendors.find(v => v.id === vendorId);
    if (selectedVendor) {
      setFormData({
        ...formData,
        vendor_id: vendorId,
        vendor_name: selectedVendor.name,
        vendor_address: selectedVendor.address || '',
        vendor_gst: selectedVendor.gst_number || '',
      });
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Vendor *</Label>
          <div className="flex gap-2">
            <Select value={formData.vendor_id} onValueChange={handleVendorSelect}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor.id} value={vendor.id!}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCreateVendor}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
        <div>
          <Label>Vendor GST</Label>
          <Input
            value={formData.vendor_gst}
            onChange={(e) => setFormData({ ...formData, vendor_gst: e.target.value })}
            placeholder="GST Number"
          />
        </div>
      </div>

      <div>
        <Label>Vendor Address</Label>
        <Textarea
          value={formData.vendor_address}
          onChange={(e) => setFormData({ ...formData, vendor_address: e.target.value })}
          placeholder="Vendor address"
        />
      </div>
    </>
  );
}
