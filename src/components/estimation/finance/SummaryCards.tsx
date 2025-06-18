
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface SummaryCardsProps {
  paymentsReceived: number;
  paymentsMade: number;
  netCashFlow: number;
  formatCurrency: (amount: number) => string;
}

export default function SummaryCards({
  paymentsReceived,
  paymentsMade,
  netCashFlow,
  formatCurrency
}: SummaryCardsProps) {
  return (
    <>
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-green-50 border-green-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-800 flex items-center gap-2">
              <TrendingUp size={16} />
              Total Payments Received
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">
              {formatCurrency(paymentsReceived)}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-800 flex items-center gap-2">
              <TrendingDown size={16} />
              Total Payments Made
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">
              {formatCurrency(paymentsMade)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Net Cash Flow Summary */}
      <Card className={`${netCashFlow >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-sm font-medium flex items-center gap-2 ${netCashFlow >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
            <DollarSign size={16} />
            Net Cash Flow
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
            {formatCurrency(netCashFlow)}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
