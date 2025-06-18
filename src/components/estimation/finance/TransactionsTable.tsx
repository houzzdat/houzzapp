
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Trash2, CreditCard } from "lucide-react";
import { FinancialTransaction } from "@/services/financialTransactionService";

interface TransactionsTableProps {
  transactions: FinancialTransaction[];
  isDeleting: boolean;
  deleteTransaction: (id: string) => void;
  setShowTransactionDialog: (show: boolean) => void;
}

export default function TransactionsTable({
  transactions,
  isDeleting,
  deleteTransaction,
  setShowTransactionDialog
}: TransactionsTableProps) {
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getTransactionTypeIcon = (type: string) => {
    return type === 'amount_received' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getTransactionTypeBadge = (type: string) => {
    return type === 'amount_received' ? (
      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Credit</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Debit</Badge>
    );
  };

  const getCategoryLabel = (category: string) => {
    const labels: { [key: string]: string } = {
      operational_costs: 'Operational Costs',
      payment_from_customers: 'Customer Payment',
      loan_from_bank: 'Bank Loan',
      other_expenses: 'Other',
      material_procurement: 'Material Purchase',
      labor_payment: 'Labor Payment',
      equipment_rental: 'Equipment Rental'
    };
    return labels[category] || category;
  };

  const getPaymentModeLabel = (mode: string) => {
    const labels: { [key: string]: string } = {
      bank_transfer: 'Bank Transfer',
      upi: 'UPI',
      cash: 'Cash'
    };
    return labels[mode] || mode;
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <CreditCard className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="font-semibold text-gray-600 mb-2">No Transactions Yet</h3>
          <p className="text-gray-500 mb-4">Start by recording your first financial transaction.</p>
          <Button 
            onClick={() => setShowTransactionDialog(true)}
            className="bg-brand-orange hover:bg-brand-orange/90"
          >
            Record Transaction
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.transaction_date).toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionTypeIcon(transaction.transaction_type)}
                      {getTransactionTypeBadge(transaction.transaction_type)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{transaction.party_name}</div>
                      {transaction.pan_number && (
                        <div className="text-xs text-gray-500">PAN: {transaction.pan_number}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {getCategoryLabel(transaction.transaction_category)}
                    </Badge>
                  </TableCell>
                  <TableCell>{getPaymentModeLabel(transaction.payment_mode)}</TableCell>
                  <TableCell className={`text-right font-semibold ${
                    transaction.transaction_type === 'amount_received' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.transaction_type === 'amount_received' ? '+' : '-'}
                    {formatCurrency(Number(transaction.amount))}
                  </TableCell>
                  <TableCell>
                    {!transaction.invoice_payment_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => transaction.id && deleteTransaction(transaction.id)}
                        disabled={isDeleting}
                        className="p-1 h-8 w-8 text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
