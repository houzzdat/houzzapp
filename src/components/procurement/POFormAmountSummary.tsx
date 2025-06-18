
interface POFormAmountSummaryProps {
  totals: {
    total_amount: number;
    cgst_amount: number;
    sgst_amount: number;
    total_with_tax: number;
  };
}

export default function POFormAmountSummary({ totals }: POFormAmountSummaryProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Amount Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{totals.total_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>CGST (9%):</span>
          <span>₹{totals.cgst_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST (9%):</span>
          <span>₹{totals.sgst_amount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-2">
          <span>Total:</span>
          <span>₹{totals.total_with_tax.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
