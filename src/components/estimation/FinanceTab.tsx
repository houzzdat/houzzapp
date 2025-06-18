
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFinancialTransactions } from "@/hooks/useFinancialTransactions";
import FinancialTransactionDialog from "@/components/finance/FinancialTransactionDialog";
import SummaryCards from "./finance/SummaryCards";
import ExpenseBreakdownCards from "./finance/ExpenseBreakdownCards";
import TransactionsTable from "./finance/TransactionsTable";

interface FinanceTabProps {
  projectId?: string;
}

export default function FinanceTab({ projectId }: FinanceTabProps) {
  const [showTransactionDialog, setShowTransactionDialog] = useState(false);
  const {
    transactions,
    isLoading,
    summaries,
    createTransaction,
    deleteTransaction,
    isCreating,
    isDeleting
  } = useFinancialTransactions(projectId);

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading financial data...</div>;
  }

  return (
    <div className="space-y-6">
      <SummaryCards
        paymentsReceived={summaries.paymentsReceived}
        paymentsMade={summaries.paymentsMade}
        netCashFlow={summaries.netCashFlow}
        formatCurrency={formatCurrency}
      />

      <ExpenseBreakdownCards
        materialCosts={summaries.materialCosts}
        laborCosts={summaries.laborCosts}
        equipmentCosts={summaries.equipmentCosts}
        otherExpenses={summaries.otherExpenses}
        formatCurrency={formatCurrency}
      />

      {/* Add Transaction Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Financial Transactions</h3>
        <Button 
          onClick={() => setShowTransactionDialog(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus size={16} className="mr-2" />
          Record Transaction
        </Button>
      </div>

      <TransactionsTable
        transactions={transactions}
        isDeleting={isDeleting}
        deleteTransaction={deleteTransaction}
        setShowTransactionDialog={setShowTransactionDialog}
      />

      <FinancialTransactionDialog
        open={showTransactionDialog}
        onOpenChange={setShowTransactionDialog}
        onSubmit={createTransaction}
        isSubmitting={isCreating}
        projectId={projectId}
      />
    </div>
  );
}
