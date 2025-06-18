
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, Banknote } from "lucide-react";

interface FinanceSummaryCardsProps {
  totalPlanned: number;
  totalSpent: number;
  totalVariance: number;
  totalPayments: number;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export default function FinanceSummaryCards({ 
  totalPlanned, 
  totalSpent, 
  totalVariance, 
  totalPayments 
}: FinanceSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Total Planned</p>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(totalPlanned)}</p>
            </div>
            <TrendingUp className="text-green-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 font-medium">Total Spent</p>
              <p className="text-2xl font-bold text-blue-800">{formatCurrency(totalSpent)}</p>
            </div>
            <Wallet className="text-blue-600" size={24} />
          </div>
        </CardContent>
      </Card>

      <Card className={`bg-gradient-to-br ${totalVariance < 0 ? 'from-green-50 to-green-100 border-green-200' : 'from-red-50 to-red-100 border-red-200'} border-2`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${totalVariance < 0 ? 'text-green-700' : 'text-red-700'}`}>Total Variance</p>
              <p className={`text-2xl font-bold ${totalVariance < 0 ? 'text-green-800' : 'text-red-800'}`}>{formatCurrency(Math.abs(totalVariance))}</p>
            </div>
            {totalVariance < 0 ? 
              <TrendingDown className="text-green-600" size={24} /> : 
              <TrendingUp className="text-red-600" size={24} />
            }
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-2 border-brand-orange/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-dark-blue font-medium">Total Payments</p>
              <p className="text-2xl font-bold text-brand-dark-blue">{formatCurrency(totalPayments)}</p>
            </div>
            <Banknote className="text-brand-orange" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
