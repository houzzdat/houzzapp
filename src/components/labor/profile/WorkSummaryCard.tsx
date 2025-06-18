
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type Worker = Database['public']['Tables']['workers']['Row'];

interface WorkSummaryCardProps {
  worker: Worker;
  totalWorkingDays: number;
  attendanceRate: number;
}

export default function WorkSummaryCard({ 
  worker, 
  totalWorkingDays, 
  attendanceRate 
}: WorkSummaryCardProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-brand-dark-blue">Work Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{totalWorkingDays}</div>
            <div className="text-sm text-blue-800">Days Worked</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{Math.round(attendanceRate)}%</div>
            <div className="text-sm text-green-800">Attendance</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-brand-gray">Phase:</span>
            <Badge variant="outline">{worker.phase || 'Not assigned'}</Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-gray">Rate/Day:</span>
            <span className="font-semibold">₹{worker.rate_per_day}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
