
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const ATTENDANCE_SAMPLE = [
  { id: 1, name: "John Doe", role: "Mason", status: "Present", hours: 8, clockIn: "08:00", clockOut: "17:00" },
  { id: 2, name: "Jane Smith", role: "Electrician", status: "Absent", hours: 0, clockIn: "-", clockOut: "-" },
  { id: 3, name: "Mike Johnson", role: "Plumber", status: "Present", hours: 7.5, clockIn: "08:30", clockOut: "17:00" },
  { id: 4, name: "Sarah Wilson", role: "Carpenter", status: "Late", hours: 6, clockIn: "10:00", clockOut: "17:00" },
  { id: 5, name: "David Brown", role: "Foreman", status: "Present", hours: 9, clockIn: "07:00", clockOut: "17:00" },
];

export default function AttendanceTab() {
  return (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold text-brand-dark-blue">Name</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Role</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Status</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Clock In</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Clock Out</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Hours</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ATTENDANCE_SAMPLE.map(({ id, name, role, status, hours, clockIn, clockOut }) => (
            <TableRow key={id} className="hover:bg-blue-50/50">
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell className="text-brand-gray">{role}</TableCell>
              <TableCell>
                <Badge 
                  variant={status === "Present" ? "default" : status === "Absent" ? "destructive" : "secondary"}
                  className={
                    status === "Present" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : status === "Late"
                      ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      : ""
                  }
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell className="text-brand-gray">{clockIn}</TableCell>
              <TableCell className="text-brand-gray">{clockOut}</TableCell>
              <TableCell className="font-semibold">{hours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
