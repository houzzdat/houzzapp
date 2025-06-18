
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MaterialProcurementItem } from "@/types/procurement";
import ProcurementTableRow from "./ProcurementTableRow";

interface ProcurementTableProps {
  procurementData: MaterialProcurementItem[];
  onStatusChange: (itemId: string, newStatus: 'Need to procure' | 'Available') => void;
  onCreatePO: (item: MaterialProcurementItem) => void;
  onOrderFromHouzzdat: (item: MaterialProcurementItem) => void;
}

export default function ProcurementTable({
  procurementData,
  onStatusChange,
  onCreatePO,
  onOrderFromHouzzdat
}: ProcurementTableProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
      <CardHeader className="bg-slate-50 border-b border-gray-100">
        <CardTitle className="text-brand-dark-blue text-lg font-semibold">
          Material Requirements vs Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-gray-100">
                <TableHead className="w-[12%] text-xs font-bold text-brand-dark-blue h-12 px-4">
                  Category
                </TableHead>
                <TableHead className="w-[18%] text-xs font-bold text-brand-dark-blue h-12 px-4">
                  Item
                </TableHead>
                <TableHead className="w-[10%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Required
                </TableHead>
                <TableHead className="w-[10%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Used Till Date
                </TableHead>
                <TableHead className="w-[10%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Available
                </TableHead>
                <TableHead className="w-[8%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Rate
                </TableHead>
                <TableHead className="w-[10%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Value
                </TableHead>
                <TableHead className="w-[10%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Status
                </TableHead>
                <TableHead className="w-[12%] text-xs font-bold text-brand-dark-blue text-center h-12 px-2">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procurementData.map((item) => (
                <ProcurementTableRow
                  key={item.id}
                  item={item}
                  onStatusChange={onStatusChange}
                  onCreatePO={onCreatePO}
                  onOrderFromHouzzdat={onOrderFromHouzzdat}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
