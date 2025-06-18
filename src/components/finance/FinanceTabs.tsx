
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Receipt, Wallet, Banknote } from "lucide-react";

interface FinanceTabsProps {
  tab: string;
  onTabChange: (value: string) => void;
  filteredBudget: any[];
  filteredPayments: any[];
  filteredExpenses: any[];
  totalPlanned: number;
  totalSpent: number;
  totalVariance: number;
  totalPayments: number;
  totalExpenses: number;
}

const formatCurrency = (amount: number) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export default function FinanceTabs({
  tab,
  onTabChange,
  filteredBudget,
  filteredPayments,
  filteredExpenses,
  totalPlanned,
  totalSpent,
  totalVariance,
  totalPayments,
  totalExpenses
}: FinanceTabsProps) {
  return (
    <Tabs value={tab} onValueChange={onTabChange}>
      <TabsList className="w-full justify-center mb-4 bg-white border-2 border-brand-orange/20">
        <TabsTrigger value="budget" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
          <Wallet className="mr-2" size={16}/>Budget ({filteredBudget.length})
        </TabsTrigger>
        <TabsTrigger value="payments" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
          <Banknote className="mr-2" size={16}/>Payments ({filteredPayments.length})
        </TabsTrigger>
        <TabsTrigger value="expenses" className="data-[state=active]:bg-brand-orange data-[state=active]:text-white">
          <Receipt className="mr-2" size={16}/>Expenses ({filteredExpenses.length})
        </TabsTrigger>
      </TabsList>

      {/* Budget Tab */}
      <TabsContent value="budget">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-brand-gray">
            Showing {filteredBudget.length} budget items
          </div>
          <Button variant="secondary" size="sm" disabled className="bg-brand-medium-blue/10 text-brand-medium-blue">
            Export Budget
          </Button>
        </div>
        <div className="rounded-xl border-2 border-brand-orange/20 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-dark-blue/5">
                <TableHead className="text-brand-dark-blue font-semibold">Item</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Planned</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Spent</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Variance</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBudget.map(row => (
                <TableRow key={row.id} className="hover:bg-brand-orange/5">
                  <TableCell className="font-medium text-brand-dark-blue">{row.item}</TableCell>
                  <TableCell className="text-brand-medium-blue">{formatCurrency(row.planned)}</TableCell>
                  <TableCell className="text-brand-medium-blue">{formatCurrency(row.spent)}</TableCell>
                  <TableCell>
                    <span className={`font-semibold ${row.variance < 0 ? "text-green-600" : "text-red-600"}`}>
                      {formatCurrency(Math.abs(row.variance))}
                    </span>
                  </TableCell>
                  <TableCell className="text-brand-gray">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 p-4 bg-brand-dark-blue/5 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-brand-gray">Total Planned</p>
              <p className="text-lg font-bold text-brand-dark-blue">{formatCurrency(totalPlanned)}</p>
            </div>
            <div>
              <p className="text-sm text-brand-gray">Total Spent</p>
              <p className="text-lg font-bold text-brand-dark-blue">{formatCurrency(totalSpent)}</p>
            </div>
            <div>
              <p className="text-sm text-brand-gray">Net Variance</p>
              <p className={`text-lg font-bold ${totalVariance < 0 ? "text-green-600" : "text-red-600"}`}>
                {formatCurrency(Math.abs(totalVariance))}
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Payments Tab */}
      <TabsContent value="payments">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-brand-gray">
            Showing {filteredPayments.length} payments • Total: {formatCurrency(totalPayments)}
          </div>
          <Button variant="secondary" size="sm" disabled className="bg-brand-medium-blue/10 text-brand-medium-blue">
            + Add Payment
          </Button>
        </div>
        <div className="rounded-xl border-2 border-brand-orange/20 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-dark-blue/5">
                <TableHead className="text-brand-dark-blue font-semibold">Description</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Method</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Amount</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map(row => (
                <TableRow key={row.id} className="hover:bg-brand-orange/5">
                  <TableCell className="font-medium text-brand-dark-blue">{row.desc}</TableCell>
                  <TableCell className="text-brand-medium-blue">{row.method}</TableCell>
                  <TableCell className="font-semibold text-brand-orange">{formatCurrency(row.amount)}</TableCell>
                  <TableCell className="text-brand-gray">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>

      {/* Expenses Tab */}
      <TabsContent value="expenses">
        <div className="mb-4 flex justify-between items-center">
          <div className="text-sm text-brand-gray">
            Showing {filteredExpenses.length} expenses • Total: {formatCurrency(totalExpenses)}
          </div>
          <Button variant="secondary" size="sm" disabled className="bg-brand-medium-blue/10 text-brand-medium-blue">
            Export Expenses
          </Button>
        </div>
        <div className="rounded-xl border-2 border-brand-orange/20 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-brand-dark-blue/5">
                <TableHead className="text-brand-dark-blue font-semibold">Purpose</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Category</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Amount</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">By</TableHead>
                <TableHead className="text-brand-dark-blue font-semibold">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.map(row => (
                <TableRow key={row.id} className="hover:bg-brand-orange/5">
                  <TableCell className="font-medium text-brand-dark-blue">{row.purpose}</TableCell>
                  <TableCell className="text-brand-medium-blue">{row.category}</TableCell>
                  <TableCell className="font-semibold text-brand-orange">{formatCurrency(row.amount)}</TableCell>
                  <TableCell className="text-brand-medium-blue">{row.by}</TableCell>
                  <TableCell className="text-brand-gray">{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
    </Tabs>
  );
}
