
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import InvoiceFormBasicInfo from "./InvoiceFormBasicInfo";
import InvoiceFormPOSection from "./InvoiceFormPOSection";
import InvoiceFormAmountSection from "./InvoiceFormAmountSection";
import InvoiceFormActions from "./InvoiceFormActions";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateInvoiceDialog({ open, onOpenChange }: CreateInvoiceDialogProps) {
  const { createInvoice, isCreatingInvoice } = usePurchaseOrders();
  const [formData, setFormData] = useState({
    invoice_number: '',
    po_id: '',
    po_number: '',
    vendor_name: '',
    invoice_date: '',
    due_date: '',
    invoice_amount: 0,
    tax_amount: 0,
    total_amount: 0,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createInvoice({
      ...formData,
      status: 'received',
    });
    
    onOpenChange(false);
    setFormData({
      invoice_number: '',
      po_id: '',
      po_number: '',
      vendor_name: '',
      invoice_date: '',
      due_date: '',
      invoice_amount: 0,
      tax_amount: 0,
      total_amount: 0,
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Invoice</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <InvoiceFormBasicInfo
            formData={formData}
            setFormData={setFormData}
          />

          <InvoiceFormPOSection
            formData={formData}
            setFormData={setFormData}
          />

          <InvoiceFormAmountSection
            formData={formData}
            setFormData={setFormData}
          />

          <InvoiceFormActions
            isCreating={isCreatingInvoice}
            onCancel={() => onOpenChange(false)}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
