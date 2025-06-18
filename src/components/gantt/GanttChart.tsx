import { useState, useEffect } from "react";
import { Plus, CalendarCheck, Upload, Filter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TaskModal from "./TaskModal";
import ExcelUploader from "./ExcelUploader";
import TaskIcon from "./TaskIcon";
import ProjectViewSelector from "../shared/ProjectViewSelector";

type Task = {
  id: string;
  title: string;
  start: string;
  end: string;
  assignedTo: string;
  progress: number;
  dependencies: string[];
  category?: string;
};

const DEMO_TASKS: Task[] = [
  { 
    id: "1", 
    title: "Site Setup", 
    start: "2024-06-16", 
    end: "2024-06-17", 
    assignedTo: "Vikram", 
    progress: 100, 
    dependencies: [], 
    category: "setup" 
  },
  { 
    id: "2", 
    title: "Foundation Pouring", 
    start: "2024-06-18", 
    end: "2024-06-23", 
    assignedTo: "Ayesha", 
    progress: 45, 
    dependencies: ["1"], 
    category: "construction" 
  },
  { 
    id: "3", 
    title: "Framing", 
    start: "2024-06-24", 
    end: "2024-07-08", 
    assignedTo: "Raju", 
    progress: 10, 
    dependencies: ["2"], 
    category: "building" 
  },
];

const dt = (dateStr: string) => new Date(dateStr);

const daysBetween = (d1: string, d2: string) =>
  Math.round((dt(d2).getTime() - dt(d1).getTime()) / (1000 * 3600 * 24)) + 1;

const projectStart = "2024-06-16";
const projectEnd = "2024-07-08";
const allDaysCount = daysBetween(projectStart, projectEnd);

const getColor = (idx: number) =>
  ["bg-blue-500", "bg-orange-500", "bg-green-500", "bg-violet-500", "bg-yellow-500"][idx % 5];

const GanttChart = () => {
  const [tasks, setTasks] = useState<Task[]>(DEMO_TASKS);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showExcelUploader, setShowExcelUploader] = useState(false);
  const [activeTab, setActiveTab] = useState("gantt");
  const [viewMode, setViewMode] = useState<"active" | "consolidated">("active");

  useEffect(() => {
    // Load project context from sessionStorage
    const storedContext = sessionStorage.getItem('projectContext');
    if (storedContext) {
      const parsed = JSON.parse(storedContext);
      setViewMode(parsed.viewMode || "active");
    }
  }, []);

  const handleViewModeChange = (newViewMode: "active" | "consolidated") => {
    setViewMode(newViewMode);
  };

  const milestones = tasks
    .filter((t) => t.progress === 100)
    .map((t) => ({
      label: t.title,
      date: t.end,
    }));

  const handleTasksImport = (importedTasks: Task[]) => {
    setTasks(prev => [...prev, ...importedTasks]);
  };

  const projectStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.progress === 100).length,
    inProgress: tasks.filter(t => t.progress > 0 && t.progress < 100).length,
    avgProgress: Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)
  };

  return (
    <div className="w-full px-4 mx-auto max-w-4xl pt-6 pb-4">
      {/* Enhanced Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-dark-blue flex items-center gap-3">
              <CalendarCheck size={24} className="text-brand-orange" />
              Project Planning
            </h1>
            <p className="text-brand-gray text-sm mt-1">
              Manage timelines, track progress, and coordinate your project
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExcelUploader(true)}
              className="border-brand-orange/20 text-brand-orange hover:bg-brand-orange/10"
            >
              <Upload size={16} />
              Import Excel
            </Button>
            <Button
              size="sm"
              onClick={() => setShowTaskModal(true)}
              className="bg-brand-orange text-white hover:bg-brand-orange/90"
            >
              <Plus size={16} />
              Add Task
            </Button>
          </div>
        </div>

        {/* Project View Selector */}
        <ProjectViewSelector onViewModeChange={handleViewModeChange} />

        {/* Project Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-2xl font-bold text-brand-dark-blue">{projectStats.totalTasks}</div>
            <div className="text-sm text-brand-gray">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-600">{projectStats.completedTasks}</div>
            <div className="text-sm text-brand-gray">Completed</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-2xl font-bold text-brand-orange">{projectStats.inProgress}</div>
            <div className="text-sm text-brand-gray">In Progress</div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
            <div className="text-2xl font-bold text-brand-medium-blue">{projectStats.avgProgress}%</div>
            <div className="text-sm text-brand-gray">Avg Progress</div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gantt">Gantt View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="gantt" className="mt-6">
            {/* Gantt Chart */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-brand-dark-blue">Timeline View</h3>
                  <Button variant="ghost" size="sm">
                    <Filter size={16} />
                    Filter
                  </Button>
                </div>
              </div>

              <div className="p-4 overflow-x-auto">
                {/* Days header */}
                <div className="flex gap-1 border-b border-gray-200 pb-3 mb-4 text-xs font-medium">
                  {Array(allDaysCount)
                    .fill(0)
                    .map((_, idx) => {
                      const d = new Date(dt(projectStart).getTime() + idx * 24 * 60 * 60 * 1000);
                      return (
                        <div
                          key={idx}
                          className="w-12 text-center text-brand-gray"
                        >
                          <div className="font-semibold">{d.getDate().toString().padStart(2, "0")}</div>
                          <div className="text-xs">{d.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2)}</div>
                        </div>
                      );
                    })}
                </div>

                {/* Task bars */}
                <div className="space-y-3">
                  {tasks.map((task, i) => {
                    const startIdx = daysBetween(projectStart, task.start) - 1;
                    const length = daysBetween(task.start, task.end);
                    return (
                      <div key={task.id} className="flex items-center gap-4 group">
                        <div className="w-48 flex-shrink-0">
                          <div className="flex items-center gap-2 mb-1">
                            <TaskIcon category={task.category} className="h-4 w-4 text-brand-orange" />
                            <span className="font-medium text-sm text-brand-dark-blue truncate">
                              {task.title}
                            </span>
                          </div>
                          <div className="text-xs text-brand-gray">
                            {task.assignedTo} • {task.progress}%
                          </div>
                        </div>

                        <div className="flex-1 relative">
                          <div className="flex items-center">
                            {startIdx > 0 && (
                              <div style={{ width: `${startIdx * 3}rem` }} />
                            )}
                            <div
                              className={`h-8 rounded-lg relative flex items-center ${getColor(i)} shadow-sm border border-white/20`}
                              style={{
                                width: `${length * 3}rem`,
                                minWidth: `${Math.max(length * 3, 6)}rem`,
                              }}
                            >
                              <div className="ml-3 text-white text-xs font-medium truncate flex-1">
                                {task.title}
                              </div>
                              <div className="mr-2 text-white/90 text-xs">
                                {task.progress}%
                              </div>
                              {/* Progress overlay */}
                              <div
                                className="absolute left-0 top-0 h-full rounded-l-lg bg-white/20"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-brand-dark-blue">Task List</h3>
              </div>
              <div className="p-4 space-y-3">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                    <TaskIcon category={task.category} className="h-5 w-5 text-brand-orange" />
                    <div className="flex-1">
                      <div className="font-medium text-brand-dark-blue">{task.title}</div>
                      <div className="text-sm text-brand-gray">
                        {task.start} - {task.end} • {task.assignedTo}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-brand-dark-blue">{task.progress}%</div>
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-brand-orange rounded-full"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
              <CalendarCheck size={48} className="mx-auto text-brand-gray mb-4" />
              <h3 className="font-semibold text-brand-dark-blue mb-2">Calendar View</h3>
              <p className="text-brand-gray">Calendar integration coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Milestones */}
      {milestones.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-semibold text-green-800 mb-2">🎉 Completed Milestones</h4>
          <div className="flex flex-wrap gap-2">
            {milestones.map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full"
              >
                ✅ {m.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <TaskModal 
        open={showTaskModal} 
        setOpen={setShowTaskModal} 
        addTask={(t) => setTasks(prev => [...prev, t])} 
      />
      
      <ExcelUploader 
        open={showExcelUploader}
        setOpen={setShowExcelUploader}
        onTasksImported={handleTasksImport}
      />
    </div>
  );
};

export default GanttChart;
