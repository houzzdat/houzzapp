
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MaterialProcurementItem } from "@/types/procurement";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import POFormVendorSection from "./POFormVendorSection";
import POFormItemSection from "./POFormItemSection";
import POFormDeliverySection from "./POFormDeliverySection";
import POFormAmountSummary from "./POFormAmountSummary";
import POFormActions from "./POFormActions";
import CreateVendorDialog from "./CreateVendorDialog";

interface CreatePODialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: MaterialProcurementItem;
}

export default function CreatePODialog({ open, onOpenChange, item }: CreatePODialogProps) {
  const { createPurchaseOrder, isCreatingPO } = usePurchaseOrders();
  const [showCreateVendor, setShowCreateVendor] = useState(false);
  const [formData, setFormData] = useState({
    vendor_id: '',
    vendor_name: '',
    vendor_address: '',
    vendor_gst: '',
    item_name: item?.item || '',
    brand: '',
    quantity: item?.requiredQuantity || 0,
    unit: item?.unit || '',
    unit_rate: item?.unitRate || 0,
    expected_delivery_date: '',
    delivery_address: '',
    payment_terms: '',
  });

  const calculateTotals = () => {
    const totalAmount = formData.quantity * formData.unit_rate;
    const cgstAmount = (totalAmount * 9) / 100;
    const sgstAmount = (totalAmount * 9) / 100;
    const totalWithTax = totalAmount + cgstAmount + sgstAmount;
    
    return {
      total_amount: totalAmount,
      cgst_amount: cgstAmount,
      sgst_amount: sgstAmount,
      total_with_tax: totalWithTax,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totals = calculateTotals();
    
    createPurchaseOrder({
      ...formData,
      ...totals,
      cgst_rate: 9,
      sgst_rate: 9,
      status: 'pending',
    });
    
    onOpenChange(false);
    setFormData({
      vendor_id: '',
      vendor_name: '',
      vendor_address: '',
      vendor_gst: '',
      item_name: '',
      brand: '',
      quantity: 0,
      unit: '',
      unit_rate: 0,
      expected_delivery_date: '',
      delivery_address: '',
      payment_terms: '',
    });
  };

  const totals = calculateTotals();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Purchase Order</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <POFormVendorSection
              formData={formData}
              setFormData={setFormData}
              onCreateVendor={() => setShowCreateVendor(true)}
            />

            <POFormItemSection
              formData={formData}
              setFormData={setFormData}
            />

            <POFormDeliverySection
              formData={formData}
              setFormData={setFormData}
            />

            <POFormAmountSummary totals={totals} />

            <POFormActions
              isCreating={isCreatingPO}
              onCancel={() => onOpenChange(false)}
            />
          </form>
        </DialogContent>
      </Dialog>

      <CreateVendorDialog
        open={showCreateVendor}
        onOpenChange={setShowCreateVendor}
      />
    </>
  );
}
