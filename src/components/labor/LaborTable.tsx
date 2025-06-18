
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users } from "lucide-react";
import { Database } from "@/integrations/supabase/types";
import AttendanceDatePicker from "./AttendanceDatePicker";

type WorkerStats = Database['public']['Views']['worker_stats']['Row'];

interface LaborTableProps {
  workerStats: WorkerStats[];
  isLoading: boolean;
  isUpdatingAttendance: boolean;
  calculateDaysPresent: (workerId: string) => number;
  handleAttendanceChange: (workerId: string, date: Date, attendanceType: 'absent' | 'half-day' | 'full-day') => void;
  handleViewProfile: (workerId: string) => void;
}

export default function LaborTable({
  workerStats,
  isLoading,
  isUpdatingAttendance,
  calculateDaysPresent,
  handleAttendanceChange,
  handleViewProfile,
}: LaborTableProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-orange mx-auto"></div>
        <p className="text-brand-gray mt-2">Loading workers...</p>
      </div>
    );
  }

  if (workerStats.length === 0) {
    return (
      <div className="text-center py-8">
        <Users size={48} className="text-gray-400 mx-auto mb-4" />
        <p className="text-brand-gray">No workers found. Add your first worker to get started.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Phase</TableHead>
          <TableHead className="text-right">Rate/Day</TableHead>
          <TableHead className="text-center">Days Present</TableHead>
          <TableHead className="text-center">Mark Attendance</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workerStats.map((worker) => {
          const daysPresent = calculateDaysPresent(worker.id!);
          
          return (
            <TableRow key={worker.id}>
              <TableCell>
                <button
                  onClick={() => handleViewProfile(worker.id!)}
                  className="font-medium text-brand-dark-blue hover:underline text-left"
                >
                  {worker.name}
                </button>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{worker.category}</Badge>
              </TableCell>
              <TableCell>{worker.phase || 'Not assigned'}</TableCell>
              <TableCell className="text-right">₹{worker.rate_per_day}</TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">
                  {daysPresent % 1 === 0 ? daysPresent : daysPresent.toFixed(1)}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <AttendanceDatePicker
                  workerId={worker.id!}
                  workerName={worker.name!}
                  currentAttendance={worker.today_attendance}
                  isUpdating={isUpdatingAttendance}
                  onAttendanceChange={handleAttendanceChange}
                />
              </TableCell>
              <TableCell className="text-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleViewProfile(worker.id!)}
                >
                  <Eye size={14} className="mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
