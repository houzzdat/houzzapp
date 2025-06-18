
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const ASSIGNMENTS_SAMPLE = [
  { id: 1, worker: "John Doe", task: "Brick laying - Block A", deadline: "2024-06-15", priority: "High", status: "In Progress", progress: 75 },
  { id: 2, worker: "Mike Johnson", task: "Pipe installation", deadline: "2024-06-16", priority: "Medium", status: "Pending", progress: 0 },
  { id: 3, worker: "Sarah Wilson", task: "Door frame installation", deadline: "2024-06-14", priority: "High", status: "Completed", progress: 100 },
  { id: 4, worker: "David Brown", task: "Quality inspection", deadline: "2024-06-17", priority: "Low", status: "In Progress", progress: 30 },
];

export default function AssignmentsTab() {
  return (
    <Card className="shadow-lg border-0 rounded-2xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold text-brand-dark-blue">Worker</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Task</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Priority</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Status</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Progress</TableHead>
            <TableHead className="font-semibold text-brand-dark-blue">Deadline</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ASSIGNMENTS_SAMPLE.map(({ id, worker, task, deadline, priority, status, progress }) => (
            <TableRow key={id} className="hover:bg-blue-50/50">
              <TableCell className="font-medium">{worker}</TableCell>
              <TableCell className="text-brand-gray">{task}</TableCell>
              <TableCell>
                <Badge 
                  variant="outline" 
                  className={
                    priority === "High" 
                      ? "border-red-300 text-red-700 bg-red-50" 
                      : priority === "Medium"
                      ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                      : "border-green-300 text-green-700 bg-green-50"
                  }
                >
                  {priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge 
                  variant={status === "Completed" ? "default" : status === "In Progress" ? "secondary" : "outline"}
                  className={
                    status === "Completed" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : status === "In Progress"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : ""
                  }
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-12 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-orange h-2 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
              </TableCell>
              <TableCell className="font-semibold">{deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
