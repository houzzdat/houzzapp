
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ExpenseBreakdownCardsProps {
  materialCosts: number;
  laborCosts: number;
  equipmentCosts: number;
  otherExpenses: number;
  formatCurrency: (amount: number) => string;
}

export default function ExpenseBreakdownCards({
  materialCosts,
  laborCosts,
  equipmentCosts,
  otherExpenses,
  formatCurrency
}: ExpenseBreakdownCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Material & Machinery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">
            {formatCurrency(materialCosts)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Labor Cost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">
            {formatCurrency(laborCosts)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Equipment Rental
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">
            {formatCurrency(equipmentCosts)}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Other Expenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-semibold">
            {formatCurrency(otherExpenses)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
