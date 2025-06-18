
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type AttendanceRecord = Database['public']['Tables']['attendance_records']['Row'];

interface AttendanceHistoryCardProps {
  attendanceRecords: AttendanceRecord[];
}

export default function AttendanceHistoryCard({ attendanceRecords }: AttendanceHistoryCardProps) {
  const formattedAttendanceRecords = attendanceRecords.slice(0, 10).map(record => ({
    date: record.date,
    status: record.status === 'full-day' ? 'Present' : 
           record.status === 'half-day' ? 'Half Day' : 'Absent',
    hours: record.status === 'full-day' ? 8 : 
           record.status === 'half-day' ? 4 : 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brand-dark-blue flex items-center gap-2">
          <Calendar size={20} />
          Recent Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        {formattedAttendanceRecords.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedAttendanceRecords.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={record.status === 'Present' ? 'default' : 
                             record.status === 'Half Day' ? 'secondary' : 'destructive'}
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{record.hours}h</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center text-brand-gray py-4">No attendance records found</p>
        )}
      </CardContent>
    </Card>
  );
}
