
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProcurementStatusSelectProps {
  status: 'Need to procure' | 'Available';
  onChange: (value: 'Need to procure' | 'Available') => void;
}

export function ProcurementStatusSelect({ status, onChange }: ProcurementStatusSelectProps) {
  return (
    <Select value={status} onValueChange={onChange}>
      <SelectTrigger className="w-full h-8 text-xs border-none shadow-none bg-transparent p-0 hover:bg-transparent focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white border shadow-lg z-50">
        <SelectItem value="Need to procure" className="text-xs">
          <Badge variant="destructive" className="bg-red-100 text-red-700 text-xs px-2 py-1">
            Need to procure
          </Badge>
        </SelectItem>
        <SelectItem value="Available" className="text-xs">
          <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs px-2 py-1">
            Available
          </Badge>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
