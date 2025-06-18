
import { supabase } from '@/integrations/supabase/client';
import { financialTransactionService } from './financialTransactionService';

export interface LaborPayment {
  id?: string;
  worker_id: string;
  amount: number;
  payment_date: string;
  payment_method?: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export const laborPaymentService = {
  // Record a labor payment
  async recordPayment(paymentData: {
    worker_id: string;
    amount: number;
    payment_date: string;
    payment_mode: 'bank_transfer' | 'upi' | 'cash';
    notes?: string;
  }): Promise<void> {
    // Get worker details for the financial transaction
    const { data: worker, error: workerError } = await supabase
      .from('workers')
      .select('name, category')
      .eq('id', paymentData.worker_id)
      .single();

    if (workerError) {
      console.error('Error fetching worker details:', workerError);
      throw workerError;
    }

    // Record payment in payment_records table
    const { error: paymentError } = await supabase
      .from('payment_records')
      .insert({
        worker_id: paymentData.worker_id,
        amount: paymentData.amount,
        payment_date: paymentData.payment_date,
        payment_method: paymentData.payment_mode,
        notes: paymentData.notes || null
      });

    if (paymentError) {
      console.error('Error recording payment:', paymentError);
      throw paymentError;
    }

    // Create financial transaction
    await financialTransactionService.createFinancialTransaction({
      amount: paymentData.amount,
      transaction_type: 'payment_made',
      transaction_category: 'labor_payment',
      party_name: worker.name,
      transaction_date: paymentData.payment_date,
      payment_mode: paymentData.payment_mode,
      description: `Labor payment to ${worker.name} (${worker.category})`
    });

    // Update worker's payment_made total
    const { data: totalPayments } = await supabase
      .from('payment_records')
      .select('amount')
      .eq('worker_id', paymentData.worker_id);

    const totalPaid = totalPayments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

    await supabase
      .from('workers')
      .update({ 
        payment_made: totalPaid,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentData.worker_id);
  }
};
