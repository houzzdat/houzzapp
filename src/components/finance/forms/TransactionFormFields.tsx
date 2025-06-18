
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FinancialTransaction } from "@/services/financialTransactionService";

interface TransactionFormFieldsProps {
  formData: {
    amount: number;
    transaction_type: 'payment_made' | 'amount_received';
    transaction_category: FinancialTransaction['transaction_category'];
    party_name: string;
    pan_number: string;
    transaction_date: string;
    payment_mode: 'bank_transfer' | 'upi' | 'cash';
    description: string;
  };
  setFormData: (data: any) => void;
}

export default function TransactionFormFields({ formData, setFormData }: TransactionFormFieldsProps) {
  const getTransactionCategoryOptions = () => {
    if (formData.transaction_type === 'amount_received') {
      return [
        { value: 'payment_from_customers', label: 'Payment from Customers' },
        { value: 'loan_from_bank', label: 'Loan from Bank' },
        { value: 'other_expenses', label: 'Other Income' },
      ];
    } else {
      return [
        { value: 'operational_costs', label: 'Operational Costs' },
        { value: 'material_procurement', label: 'Material Procurement' },
        { value: 'labor_payment', label: 'Labor Payment' },
        { value: 'equipment_rental', label: 'Equipment Rental' },
        { value: 'other_expenses', label: 'Other Expenses' },
      ];
    }
  };

  return (
    <>
      <div>
        <Label htmlFor="amount">Amount</Label>
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
        <Label htmlFor="transaction_type">Transaction Type</Label>
        <Select
          value={formData.transaction_type}
          onValueChange={(value: 'payment_made' | 'amount_received') => {
            setFormData(prev => ({ 
              ...prev, 
              transaction_type: value,
              transaction_category: value === 'amount_received' ? 'payment_from_customers' : 'operational_costs'
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="payment_made">Payment Made</SelectItem>
            <SelectItem value="amount_received">Amount Received</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="transaction_category">Transaction Category</Label>
        <Select
          value={formData.transaction_category}
          onValueChange={(value: FinancialTransaction['transaction_category']) =>
            setFormData(prev => ({ ...prev, transaction_category: value }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getTransactionCategoryOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="party_name">Party Name</Label>
        <Input
          id="party_name"
          value={formData.party_name}
          onChange={(e) => setFormData(prev => ({ ...prev, party_name: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="pan_number">PAN Number (Optional)</Label>
        <Input
          id="pan_number"
          value={formData.pan_number}
          onChange={(e) => setFormData(prev => ({ ...prev, pan_number: e.target.value }))}
          placeholder="ABCDE1234F"
        />
      </div>

      <div>
        <Label htmlFor="transaction_date">Transaction Date</Label>
        <Input
          id="transaction_date"
          type="date"
          value={formData.transaction_date}
          onChange={(e) => setFormData(prev => ({ ...prev, transaction_date: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="payment_mode">Payment Mode</Label>
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
            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            <SelectItem value="upi">UPI</SelectItem>
            <SelectItem value="cash">Cash</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Additional details about the transaction..."
          rows={2}
        />
      </div>
    </>
  );
}
