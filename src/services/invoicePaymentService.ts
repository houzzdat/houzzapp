
import { supabase } from "@/integrations/supabase/client";

export interface InvoicePayment {
  id?: string;
  invoice_id: string;
  payment_date: string;
  amount_paid: number;
  balance_remaining: number;
  payment_mode: 'cash' | 'bank_transfer';
  reference_number?: string;
  confirmation_image_url?: string;
  notes?: string;
  created_at?: string;
}

export const invoicePaymentService = {
  // Get payments for an invoice
  async getInvoicePayments(invoiceId: string): Promise<InvoicePayment[]> {
    const { data, error } = await supabase
      .from('invoice_payments')
      .select('*')
      .eq('invoice_id', invoiceId)
      .order('payment_date', { ascending: false });
    
    if (error) throw error;
    return (data || []).map(payment => ({
      ...payment,
      payment_mode: payment.payment_mode as 'cash' | 'bank_transfer'
    }));
  },

  // Create a new payment
  async createPayment(payment: Omit<InvoicePayment, 'id' | 'created_at'>): Promise<InvoicePayment> {
    const { data, error } = await supabase
      .from('invoice_payments')
      .insert(payment)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      payment_mode: data.payment_mode as 'cash' | 'bank_transfer'
    };
  },

  // Update payment
  async updatePayment(id: string, payment: Partial<InvoicePayment>): Promise<InvoicePayment> {
    const { data, error } = await supabase
      .from('invoice_payments')
      .update(payment)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return {
      ...data,
      payment_mode: data.payment_mode as 'cash' | 'bank_transfer'
    };
  },

  // Delete payment
  async deletePayment(id: string): Promise<void> {
    const { error } = await supabase
      .from('invoice_payments')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
