
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const PAYROLL_SAMPLE = [
  { id: 1, name: "John Doe", hours: 40, rate: 500, total: 20000, department: "Construction", date: "2024-06-14" },
  { id: 2, name: "Jane Smith", hours: 35, rate: 600, total: 21000, department: "Electrical", date: "2024-06-13" },
  { id: 3, name: "Mike Johnson", hours: 42, rate: 550, total: 23100, department: "Plumbing", date: "2024-06-12" },
  { id: 4, name: "Sarah Wilson", hours: 38, rate: 580, total: 22040, department: "Construction", date: "2024-06-11" },
];

export default function PayrollTab() {
  return (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold text-brand-dark-blue">Name</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Department</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Hours</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Rate (₹)</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Total (₹)</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PAYROLL_SAMPLE.map(({ id, name, department, hours, rate, total, date }) => (
            <TableRow key={id} className="hover:bg-blue-50/50">
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-brand-orange/30 text-brand-orange">
                  {department}
                </Badge>
              </TableCell>
              <TableCell className="font-semibold">{hours}</TableCell>
              <TableCell className="text-brand-gray">₹{rate}</TableCell>
              <TableCell className="font-bold text-brand-dark-blue">₹{total.toLocaleString()}</TableCell>
              <TableCell className="text-sm text-brand-gray">{date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
