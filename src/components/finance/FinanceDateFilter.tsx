
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays } from "lucide-react";

interface FinanceDateFilterProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function FinanceDateFilter({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: FinanceDateFilterProps) {
  return (
    <Card className="mb-6 bg-white shadow-lg border-2 border-brand-orange/10">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-brand-dark-blue">
          <CalendarDays className="text-brand-orange" size={20} />
          Date Range Filter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="start-date" className="text-brand-medium-blue font-medium">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              className="border-2 border-brand-dark-blue/20 focus:border-brand-orange"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date" className="text-brand-medium-blue font-medium">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              className="border-2 border-brand-dark-blue/20 focus:border-brand-orange"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
