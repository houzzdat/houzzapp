
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FinancialTransaction } from "@/services/financialTransactionService";
import TransactionFormFields from "./forms/TransactionFormFields";

interface FinancialTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (transaction: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>) => void;
  isSubmitting: boolean;
  projectId?: string;
}

export default function FinancialTransactionDialog({
  open,
  onOpenChange,
  onSubmit,
  isSubmitting,
  projectId
}: FinancialTransactionDialogProps) {
  const [formData, setFormData] = useState({
    amount: 0,
    transaction_type: 'payment_made' as 'payment_made' | 'amount_received',
    transaction_category: 'operational_costs' as FinancialTransaction['transaction_category'],
    party_name: '',
    pan_number: '',
    transaction_date: new Date().toISOString().split('T')[0],
    payment_mode: 'bank_transfer' as 'bank_transfer' | 'upi' | 'cash',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transactionData = {
      ...formData,
      project_id: projectId,
      pan_number: formData.pan_number || undefined,
      description: formData.description || undefined,
    };

    onSubmit(transactionData);
    
    // Reset form
    setFormData({
      amount: 0,
      transaction_type: 'payment_made',
      transaction_category: 'operational_costs',
      party_name: '',
      pan_number: '',
      transaction_date: new Date().toISOString().split('T')[0],
      payment_mode: 'bank_transfer',
      description: '',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Record Financial Transaction</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <TransactionFormFields formData={formData} setFormData={setFormData} />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Recording...' : 'Record Transaction'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
