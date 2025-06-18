
import { Card, CardContent } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";

interface PaymentSummaryCardsProps {
  totalEarned: number;
  totalPaid: number;
  pendingPayment: number;
}

export default function PaymentSummaryCards({
  totalEarned,
  totalPaid,
  pendingPayment
}: PaymentSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={20} />
            <span className="font-medium">Total Earned</span>
          </div>
          <div className="text-2xl font-bold">₹{totalEarned.toLocaleString()}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={20} />
            <span className="font-medium">Paid Amount</span>
          </div>
          <div className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee size={20} />
            <span className="font-medium">Pending</span>
          </div>
          <div className="text-2xl font-bold">₹{pendingPayment.toLocaleString()}</div>
        </CardContent>
      </Card>
    </div>
  );
}
