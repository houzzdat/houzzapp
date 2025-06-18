
import { supabase } from "@/integrations/supabase/client";

export interface FinancialTransaction {
  id?: string;
  project_id?: string;
  amount: number;
  transaction_type: 'payment_made' | 'amount_received';
  transaction_category: 'operational_costs' | 'payment_from_customers' | 'loan_from_bank' | 'other_expenses' | 'material_procurement' | 'labor_payment' | 'equipment_rental';
  party_name: string;
  pan_number?: string;
  transaction_date: string;
  payment_mode: 'bank_transfer' | 'upi' | 'cash';
  description?: string;
  invoice_payment_id?: string;
  created_at?: string;
  updated_at?: string;
}

export const financialTransactionService = {
  // Get all financial transactions for a project
  async getFinancialTransactions(projectId?: string): Promise<FinancialTransaction[]> {
    let query = supabase
      .from('financial_transactions')
      .select('*')
      .order('transaction_date', { ascending: false });
    
    if (projectId) {
      query = query.eq('project_id', projectId);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return (data || []) as FinancialTransaction[];
  },

  // Create a new financial transaction
  async createFinancialTransaction(transaction: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>): Promise<FinancialTransaction> {
    const { data, error } = await supabase
      .from('financial_transactions')
      .insert(transaction)
      .select()
      .single();
    
    if (error) throw error;
    return data as FinancialTransaction;
  },

  // Update a financial transaction
  async updateFinancialTransaction(id: string, transaction: Partial<FinancialTransaction>): Promise<FinancialTransaction> {
    const { data, error } = await supabase
      .from('financial_transactions')
      .update(transaction)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data as FinancialTransaction;
  },

  // Delete a financial transaction
  async deleteFinancialTransaction(id: string): Promise<void> {
    const { error } = await supabase
      .from('financial_transactions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
