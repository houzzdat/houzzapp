
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Invoice } from "@/services/purchaseOrderService";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  invoice: Invoice | null;
  onSubmit: (paymentData: any) => void;
  isSubmitting: boolean;
}

export default function PaymentDialog({ 
  open, 
  onOpenChange, 
  invoice, 
  onSubmit, 
  isSubmitting 
}: PaymentDialogProps) {
  const [formData, setFormData] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    amount_paid: invoice?.outstanding_amount || 0,
    payment_mode: 'bank_transfer' as 'cash' | 'bank_transfer',
    reference_number: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invoice) return;

    const balanceRemaining = (invoice.outstanding_amount || 0) - formData.amount_paid;
    
    onSubmit({
      ...formData,
      invoice_id: invoice.id,
      balance_remaining: Math.max(0, balanceRemaining),
    });

    // Reset form
    setFormData({
      payment_date: new Date().toISOString().split('T')[0],
      amount_paid: invoice?.outstanding_amount || 0,
      payment_mode: 'bank_transfer',
      reference_number: '',
      notes: '',
    });
  };

  if (!invoice) return null;

  const balanceRemaining = (invoice.outstanding_amount || 0) - formData.amount_paid;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Payment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-sm text-gray-600">Invoice: {invoice.invoice_number}</div>
            <div className="text-sm text-gray-600">Vendor: {invoice.vendor_name}</div>
            <div className="text-lg font-semibold">Outstanding: ₹{invoice.outstanding_amount?.toLocaleString()}</div>
          </div>

          <div>
            <Label htmlFor="payment_date">Payment Date</Label>
            <Input
              id="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData(prev => ({ ...prev, payment_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="amount_paid">Amount Paid</Label>
            <Input
              id="amount_paid"
              type="number"
              step="0.01"
              value={formData.amount_paid}
              onChange={(e) => setFormData(prev => ({ ...prev, amount_paid: parseFloat(e.target.value) || 0 }))}
              max={invoice.outstanding_amount}
              required
            />
          </div>

          <div>
            <Label>Balance Remaining</Label>
            <div className="p-2 bg-gray-50 rounded border">
              ₹{Math.max(0, balanceRemaining).toLocaleString()}
            </div>
          </div>

          <div>
            <Label htmlFor="payment_mode">Payment Mode</Label>
            <Select value={formData.payment_mode} onValueChange={(value: 'cash' | 'bank_transfer') => 
              setFormData(prev => ({ ...prev, payment_mode: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="reference_number">Reference Number (Optional)</Label>
            <Input
              id="reference_number"
              value={formData.reference_number}
              onChange={(e) => setFormData(prev => ({ ...prev, reference_number: e.target.value }))}
              placeholder="Transaction ID, Check No., etc."
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional payment details..."
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Recording...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
