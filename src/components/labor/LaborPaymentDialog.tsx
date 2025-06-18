
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLaborData } from "@/hooks/useLaborData";

interface LaborPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (paymentData: {
    worker_id: string;
    amount: number;
    payment_date: string;
    payment_mode: 'bank_transfer' | 'upi' | 'cash';
    notes?: string;
  }) => void;
  isSubmitting: boolean;
}

export default function LaborPaymentDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting
}: LaborPaymentDialogProps) {
  const { workerStats } = useLaborData();
  const [formData, setFormData] = useState({
    worker_id: '',
    amount: 0,
    payment_date: new Date().toISOString().split('T')[0],
    payment_mode: 'cash' as 'bank_transfer' | 'upi' | 'cash',
    notes: '',
  });

  const selectedWorker = workerStats.find(w => w.id === formData.worker_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.worker_id || formData.amount <= 0) return;
    
    onSubmit(formData);
    
    // Reset form
    setFormData({
      worker_id: '',
      amount: 0,
      payment_date: new Date().toISOString().split('T')[0],
      payment_mode: 'cash',
      notes: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Record Labor Payment</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="worker_id">Labor Name</Label>
            <Select
              value={formData.worker_id}
              onValueChange={(value) => setFormData(prev => ({ ...prev, worker_id: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select labor" />
              </SelectTrigger>
              <SelectContent>
                {workerStats.map((worker) => (
                  <SelectItem key={worker.id} value={worker.id!}>
                    {worker.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedWorker && (
            <div>
              <Label>Category</Label>
              <Input value={selectedWorker.category || ''} readOnly className="bg-gray-100" />
            </div>
          )}

          <div>
            <Label htmlFor="amount">Amount Paid</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
              required
              min="0.01"
            />
          </div>

          <div>
            <Label htmlFor="payment_date">Paid On Date</Label>
            <Input
              id="payment_date"
              type="date"
              value={formData.payment_date}
              onChange={(e) => setFormData(prev => ({ ...prev, payment_date: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="payment_mode">Mode of Payment</Label>
            <Select
              value={formData.payment_mode}
              onValueChange={(value: 'bank_transfer' | 'upi' | 'cash') =>
                setFormData(prev => ({ ...prev, payment_mode: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes..."
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || !formData.worker_id || formData.amount <= 0}>
              {isSubmitting ? 'Recording...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
