
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";

interface PurchaseOrder {
  id: number;
  pono: string;
  supplier: string;
  items: string;
  amount: number;
  status: string;
  date: string;
  delivery: string;
}

interface PurchaseOrdersTabProps {
  purchaseOrders: PurchaseOrder[];
  dateRange: { from: Date | undefined; to: Date | undefined };
  isCalendarOpen: boolean;
  onCalendarToggle: (open: boolean) => void;
  onDateRangeChange: (range: { from: Date | undefined; to: Date | undefined }) => void;
  onNewPO: () => void;
}

export default function PurchaseOrdersTab({
  purchaseOrders,
  dateRange,
  isCalendarOpen,
  onCalendarToggle,
  onDateRangeChange,
  onNewPO,
}: PurchaseOrdersTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h3 className="text-xl font-bold text-brand-dark-blue">Purchase Orders</h3>
        <div className="flex items-center gap-3">
          <Popover open={isCalendarOpen} onOpenChange={onCalendarToggle}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="rounded-xl border-brand-gray/30 hover:border-brand-orange">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from && dateRange.to 
                  ? `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`
                  : "Select date range"
                }
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-xl" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => onDateRangeChange({ from: range?.from, to: range?.to })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button 
            onClick={onNewPO}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg"
            size="sm"
          >
            <Plus className="mr-2" size={16} />
            New PO
          </Button>
        </div>
      </div>

      <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50">
              <TableHead className="font-semibold text-brand-dark-blue">PO #</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Supplier</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Items</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Amount</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Status</TableHead>
              <TableHead className="font-semibold text-brand-dark-blue">Delivery</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseOrders.map((po) => (
              <TableRow key={po.id} className="hover:bg-blue-50/50">
                <TableCell className="font-medium">{po.pono}</TableCell>
                <TableCell className="font-medium">{po.supplier}</TableCell>
                <TableCell className="text-brand-gray text-sm">{po.items}</TableCell>
                <TableCell className="font-bold text-brand-dark-blue">₹{po.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge 
                    variant={po.status === "Approved" ? "default" : po.status === "Delivered" ? "secondary" : "destructive"}
                    className={
                      po.status === "Approved" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                      po.status === "Delivered" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                      "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {po.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-brand-gray">{po.delivery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
