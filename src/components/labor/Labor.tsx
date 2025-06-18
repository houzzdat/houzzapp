import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Users, Clock, DollarSign, CalendarIcon, Settings } from "lucide-react";
import { format } from "date-fns";

import LaborSummaryCards from "./LaborSummaryCards";
import AttendanceTab from "./AttendanceTab";
import AssignmentsTab from "./AssignmentsTab";
import PayrollTab from "./PayrollTab";
import AttendanceWorkflow from "./AttendanceWorkflow";
import PayrollWorkflow from "./PayrollWorkflow";
import ProjectViewSelector from "../shared/ProjectViewSelector";

const ATTENDANCE_SAMPLE = [
  { id: 1, name: "John Doe", role: "Mason", status: "Present", hours: 8, clockIn: "08:00", clockOut: "17:00" },
  { id: 2, name: "Jane Smith", role: "Electrician", status: "Absent", hours: 0, clockIn: "-", clockOut: "-" },
  { id: 3, name: "Mike Johnson", role: "Plumber", status: "Present", hours: 7.5, clockIn: "08:30", clockOut: "17:00" },
  { id: 4, name: "Sarah Wilson", role: "Carpenter", status: "Late", hours: 6, clockIn: "10:00", clockOut: "17:00" },
  { id: 5, name: "David Brown", role: "Foreman", status: "Present", hours: 9, clockIn: "07:00", clockOut: "17:00" },
];

const ASSIGNMENTS_SAMPLE = [
  { id: 1, worker: "John Doe", task: "Brick laying - Block A", deadline: "2024-06-15", priority: "High", status: "In Progress", progress: 75 },
  { id: 2, worker: "Mike Johnson", task: "Pipe installation", deadline: "2024-06-16", priority: "Medium", status: "Pending", progress: 0 },
  { id: 3, worker: "Sarah Wilson", task: "Door frame installation", deadline: "2024-06-14", priority: "High", status: "Completed", progress: 100 },
  { id: 4, worker: "David Brown", task: "Quality inspection", deadline: "2024-06-17", priority: "Low", status: "In Progress", progress: 30 },
];

const PAYROLL_SAMPLE = [
  { id: 1, name: "John Doe", hours: 40, rate: 500, total: 20000, department: "Construction", date: "2024-06-14" },
  { id: 2, name: "Jane Smith", hours: 35, rate: 600, total: 21000, department: "Electrical", date: "2024-06-13" },
  { id: 3, name: "Mike Johnson", hours: 42, rate: 550, total: 23100, department: "Plumbing", date: "2024-06-12" },
  { id: 4, name: "Sarah Wilson", hours: 38, rate: 580, total: 22040, department: "Construction", date: "2024-06-11" },
];

export default function Labor() {
  const [tab, setTab] = useState("attendance");
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: new Date(2024, 5, 1),
    to: new Date(2024, 5, 15)
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showWorkflows, setShowWorkflows] = useState(false);
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");

  const totalTasks = ASSIGNMENTS_SAMPLE.length;
  const completedTasks = ASSIGNMENTS_SAMPLE.filter(t => t.status === "Completed").length;
  const inProgressTasks = ASSIGNMENTS_SAMPLE.filter(t => t.status === "In Progress").length;
  const pendingTasks = ASSIGNMENTS_SAMPLE.filter(t => t.status === "Pending").length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const avgProgress = Math.round(ASSIGNMENTS_SAMPLE.reduce((sum, item) => sum + item.progress, 0) / totalTasks);

  // Calculate payroll aggregates
  const totalHours = PAYROLL_SAMPLE.reduce((sum, item) => sum + item.hours, 0);
  const totalPayroll = PAYROLL_SAMPLE.reduce((sum, item) => sum + item.total, 0);
  const avgHourlyRate = totalPayroll / totalHours;
  const activeWorkers = PAYROLL_SAMPLE.length;

  const totalWorkers = ATTENDANCE_SAMPLE.length;
  const presentWorkers = ATTENDANCE_SAMPLE.filter(w => w.status === "Present").length;
  const absentWorkers = ATTENDANCE_SAMPLE.filter(w => w.status === "Absent").length;
  const lateWorkers = ATTENDANCE_SAMPLE.filter(w => w.status === "Late").length;
  const attendanceRate = Math.round((presentWorkers / totalWorkers) * 100);
  const totalHoursToday = ATTENDANCE_SAMPLE.reduce((sum, item) => sum + item.hours, 0);

  return (
    <div className="py-6 px-4 w-full max-w-4xl mx-auto animate-fade-in">
      {/* Header with Workflow Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-dark-blue">Labor Management</h2>
        <Button
          onClick={() => setShowWorkflows(!showWorkflows)}
          variant="outline"
          className="rounded-xl border-brand-orange/30 hover:border-brand-orange"
        >
          <Settings size={16} className="mr-2" />
          {showWorkflows ? "Hide Workflows" : "Show Workflows"}
        </Button>
      </div>

      {/* Project View Selector */}
      <ProjectViewSelector onViewModeChange={setViewMode} />

      {/* Summary Cards */}
      <LaborSummaryCards
        totalWorkers={totalWorkers}
        presentWorkers={presentWorkers}
        absentWorkers={absentWorkers}
        lateWorkers={lateWorkers}
        attendanceRate={attendanceRate}
        totalHoursToday={totalHoursToday}
      />

      {/* Workflows Section */}
      {showWorkflows && (
        <div className="mb-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AttendanceWorkflow />
            <PayrollWorkflow />
          </div>
        </div>
      )}

      {/* Main Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-center mb-6 bg-white shadow-sm border border-brand-gray/20 rounded-xl p-1">
          <TabsTrigger value="attendance" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <Users className="mr-2" size={16} />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <Clock className="mr-2" size={16} />
            Assignments
          </TabsTrigger>
          <TabsTrigger value="payroll" className="flex-1 data-[state=active]:bg-brand-orange data-[state=active]:text-white rounded-lg transition-all">
            <DollarSign className="mr-2" size={16} />
            Payroll
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance" className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-xl font-bold text-brand-dark-blue">Daily Attendance</h3>
            <div className="flex items-center gap-3">
              <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="rounded-xl border-brand-gray/30 hover:border-brand-orange">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(new Date(), 'MMM dd, yyyy')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl" align="end">
                  <Calendar
                    mode="single"
                    selected={new Date()}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
              <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg" size="sm" disabled>
                + Add Worker
              </Button>
            </div>
          </div>
          <AttendanceTab />
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-xl font-bold text-brand-dark-blue">Task Assignments</h3>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg" size="sm" disabled>
              + New Assignment
            </Button>
          </div>
          <AssignmentsTab />
        </TabsContent>

        <TabsContent value="payroll" className="space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <h3 className="text-xl font-bold text-brand-dark-blue">Payroll Management</h3>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl shadow-lg" size="sm" disabled>
              Generate Report
            </Button>
          </div>
          <PayrollTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
