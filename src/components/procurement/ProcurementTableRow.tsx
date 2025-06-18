
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";
import { TableRow, TableCell } from "@/components/ui/table";
import { MaterialProcurementItem } from "@/types/procurement";
import { ProcurementStatusSelect } from "./ProcurementStatusSelect";

interface ProcurementTableRowProps {
  item: MaterialProcurementItem;
  onStatusChange: (itemId: string, newStatus: 'Need to procure' | 'Available') => void;
  onCreatePO: (item: MaterialProcurementItem) => void;
  onOrderFromHouzzdat: (item: MaterialProcurementItem) => void;
}

export default function ProcurementTableRow({ 
  item, 
  onStatusChange, 
  onCreatePO, 
  onOrderFromHouzzdat 
}: ProcurementTableRowProps) {
  return (
    <TableRow className="hover:bg-blue-50/30 transition-colors border-b border-gray-50 last:border-b-0">
      <TableCell className="px-4 py-4">
        <div className="text-xs text-brand-gray font-medium bg-gray-50 px-2 py-1 rounded-md w-fit">
          {item.category}
        </div>
      </TableCell>
      <TableCell className="px-4 py-4">
        <div className="text-sm font-semibold text-brand-dark-blue" title={item.item}>
          {item.item}
        </div>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <div className="bg-blue-50 rounded-lg px-3 py-2">
          <div className="text-sm font-bold text-blue-700">
            {item.requiredQuantity}
          </div>
          <div className="text-xs text-blue-600">{item.unit}</div>
        </div>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <div className="bg-purple-50 rounded-lg px-3 py-2">
          <div className="text-sm font-bold text-purple-700">
            {item.usedTillDate}
          </div>
          <div className="text-xs text-purple-600">{item.unit}</div>
        </div>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <div className="bg-green-50 rounded-lg px-3 py-2">
          <div className="text-sm font-bold text-green-700">
            {item.availableQuantity}
          </div>
          <div className="text-xs text-green-600">{item.unit}</div>
        </div>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <Badge variant="outline" className="font-semibold text-xs bg-gray-50">
          ₹{item.unitRate}
        </Badge>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <div className="bg-red-50 rounded-lg px-3 py-2">
          <div className="text-sm font-bold text-red-700">
            ₹{((item.requiredQuantity - item.usedTillDate) * item.unitRate).toLocaleString()}
          </div>
        </div>
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <ProcurementStatusSelect
          status={item.status}
          onChange={(value) => onStatusChange(item.id, value)}
        />
      </TableCell>
      <TableCell className="text-center px-2 py-4">
        <div className="flex flex-col gap-2">
          {item.status === 'Need to procure' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCreatePO(item)}
                className="h-8 px-3 text-xs border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg font-medium"
              >
                <FileText size={12} className="mr-1" />
                Create PO
              </Button>
              <Button
                size="sm"
                onClick={() => onOrderFromHouzzdat(item)}
                className="h-8 px-3 text-xs bg-brand-orange hover:bg-brand-orange/90 text-white rounded-lg font-medium shadow-sm"
              >
                <ExternalLink size={12} className="mr-1" />
                Houzzdat
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
