
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { financialTransactionService, FinancialTransaction } from "@/services/financialTransactionService";
import { useToast } from "@/hooks/use-toast";

export const useFinancialTransactions = (projectId?: string) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['financial-transactions', projectId],
    queryFn: () => financialTransactionService.getFinancialTransactions(projectId),
  });

  const createTransactionMutation = useMutation({
    mutationFn: (transaction: Omit<FinancialTransaction, 'id' | 'created_at' | 'updated_at'>) =>
      financialTransactionService.createFinancialTransaction(transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions'] });
      toast({
        title: "Success",
        description: "Financial transaction recorded successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating financial transaction:', error);
      toast({
        title: "Error",
        description: "Failed to record financial transaction",
        variant: "destructive",
      });
    },
  });

  const updateTransactionMutation = useMutation({
    mutationFn: ({ id, transaction }: { id: string; transaction: Partial<FinancialTransaction> }) =>
      financialTransactionService.updateFinancialTransaction(id, transaction),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions'] });
      toast({
        title: "Success",
        description: "Financial transaction updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating financial transaction:', error);
      toast({
        title: "Error",
        description: "Failed to update financial transaction",
        variant: "destructive",
      });
    },
  });

  const deleteTransactionMutation = useMutation({
    mutationFn: (id: string) => financialTransactionService.deleteFinancialTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-transactions'] });
      toast({
        title: "Success",
        description: "Financial transaction deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting financial transaction:', error);
      toast({
        title: "Error",
        description: "Failed to delete financial transaction",
        variant: "destructive",
      });
    },
  });

  // Calculate financial summaries
  const calculateSummaries = () => {
    const paymentsReceived = transactions
      .filter(t => t.transaction_type === 'amount_received')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const paymentsMade = transactions
      .filter(t => t.transaction_type === 'payment_made')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const materialCosts = transactions
      .filter(t => t.transaction_category === 'material_procurement')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const laborCosts = transactions
      .filter(t => t.transaction_category === 'labor_payment')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const equipmentCosts = transactions
      .filter(t => t.transaction_category === 'equipment_rental')
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const otherExpenses = transactions
      .filter(t => ['operational_costs', 'other_expenses'].includes(t.transaction_category))
      .reduce((sum, t) => sum + Number(t.amount), 0);

    return {
      paymentsReceived,
      paymentsMade,
      materialCosts,
      laborCosts,
      equipmentCosts,
      otherExpenses,
      netCashFlow: paymentsReceived - paymentsMade
    };
  };

  return {
    transactions,
    isLoading,
    summaries: calculateSummaries(),
    createTransaction: createTransactionMutation.mutate,
    updateTransaction: (id: string, transaction: Partial<FinancialTransaction>) =>
      updateTransactionMutation.mutate({ id, transaction }),
    deleteTransaction: deleteTransactionMutation.mutate,
    isCreating: createTransactionMutation.isPending,
    isUpdating: updateTransactionMutation.isPending,
    isDeleting: deleteTransactionMutation.isPending,
  };
};
