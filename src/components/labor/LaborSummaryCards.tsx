
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface LaborSummaryCardsProps {
  totalWorkers: number;
  presentWorkers: number;
  absentWorkers: number;
  lateWorkers: number;
  attendanceRate: number;
  totalHoursToday: number;
}

export default function LaborSummaryCards({
  totalWorkers,
  presentWorkers,
  absentWorkers,
  lateWorkers,
  attendanceRate,
  totalHoursToday,
}: LaborSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-to-r from-blue-500 to-brand-medium-blue text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={20} />
            Total Workers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-1">{totalWorkers}</div>
          <div className="text-blue-100 text-sm">Registered today</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserCheck size={20} />
            Present
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-1">{presentWorkers}</div>
          <div className="text-green-100 text-sm flex items-center gap-1">
            <TrendingUp size={14} />
            {attendanceRate}% rate
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <UserX size={20} />
            Absent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-1">{absentWorkers}</div>
          <div className="text-red-100 text-sm">{lateWorkers} late arrivals</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-brand-orange to-yellow-500 text-white rounded-2xl shadow-lg border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock size={20} />
            Total Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-1">{totalHoursToday}</div>
          <div className="text-orange-100 text-sm">Today's total</div>
        </CardContent>
      </Card>
    </div>
  );
}
