
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import InvoiceFormBasicInfo from "./InvoiceFormBasicInfo";
import InvoiceFormPOSection from "./InvoiceFormPOSection";
import InvoiceFormAmountSection from "./InvoiceFormAmountSection";
import InvoiceFormActions from "./InvoiceFormActions";
import { Invoice } from "@/services/purchaseOrderService";

interface EditInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
}

export default function EditInvoiceDialog({ open, onOpenChange, invoice }: EditInvoiceDialogProps) {
  const { updateInvoice, isUpdatingInvoice } = usePurchaseOrders();
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

  useEffect(() => {
    if (invoice && open) {
      setFormData({
        invoice_number: invoice.invoice_number,
        po_id: invoice.po_id || '',
        po_number: invoice.po_number || '',
        vendor_name: invoice.vendor_name,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date || '',
        invoice_amount: invoice.invoice_amount,
        tax_amount: invoice.tax_amount || 0,
        total_amount: invoice.total_amount,
        notes: invoice.notes || '',
      });
    }
  }, [invoice, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoice?.id) return;

    updateInvoice(invoice.id, {
      ...formData,
      outstanding_amount: invoice.outstanding_amount, // Keep existing outstanding amount
    });
    
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
    if (invoice) {
      setFormData({
        invoice_number: invoice.invoice_number,
        po_id: invoice.po_id || '',
        po_number: invoice.po_number || '',
        vendor_name: invoice.vendor_name,
        invoice_date: invoice.invoice_date,
        due_date: invoice.due_date || '',
        invoice_amount: invoice.invoice_amount,
        tax_amount: invoice.tax_amount || 0,
        total_amount: invoice.total_amount,
        notes: invoice.notes || '',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
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

          <div className="flex gap-3">
            <button 
              type="submit" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={isUpdatingInvoice}
            >
              {isUpdatingInvoice ? "Updating..." : "Update Invoice"}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
