
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMaterialTracking } from "@/hooks/useMaterialTracking";

interface CreateVendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateVendorDialog({ open, onOpenChange }: CreateVendorDialogProps) {
  const { createVendor, isCreatingVendor } = useMaterialTracking();
  const [formData, setFormData] = useState({
    name: '',
    contact_number: '',
    email: '',
    address: '',
    gst_number: '',
    pan_number: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVendor(formData);
    onOpenChange(false);
    setFormData({
      name: '',
      contact_number: '',
      email: '',
      address: '',
      gst_number: '',
      pan_number: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Vendor</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Vendor Name *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Vendor name"
                required
              />
            </div>
            <div>
              <Label>Contact Number</Label>
              <Input
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                placeholder="Contact number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address"
              />
            </div>
            <div>
              <Label>GST Number</Label>
              <Input
                value={formData.gst_number}
                onChange={(e) => setFormData({ ...formData, gst_number: e.target.value })}
                placeholder="GST Number"
              />
            </div>
          </div>

          <div>
            <Label>PAN Number</Label>
            <Input
              value={formData.pan_number}
              onChange={(e) => setFormData({ ...formData, pan_number: e.target.value })}
              placeholder="PAN Number"
            />
          </div>

          <div>
            <Label>Address</Label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Complete address"
            />
          </div>

          <div className="flex gap-3">
            <Button 
              type="submit" 
              className="bg-brand-orange hover:bg-brand-orange/90"
              disabled={isCreatingVendor}
            >
              {isCreatingVendor ? "Adding..." : "Add Vendor"}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
