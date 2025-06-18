
import {
  Hammer,
  ClipboardList,
  Users,
  Search,
  Settings,
  Building,
  HardHat,
  Wrench,
  FileText,
  Calendar
} from "lucide-react";

const TASK_ICONS = {
  construction: Hammer,
  management: ClipboardList,
  team: Users,
  survey: Search,
  setup: Settings,
  building: Building,
  safety: HardHat,
  maintenance: Wrench,
  documentation: FileText,
  planning: Calendar,
} as const;

type TaskCategory = keyof typeof TASK_ICONS;

interface TaskIconProps {
  category?: string;
  className?: string;
}

const TaskIcon = ({ category, className = "h-4 w-4" }: TaskIconProps) => {
  const IconComponent = TASK_ICONS[(category as TaskCategory)] || ClipboardList;
  
  return <IconComponent className={className} />;
};

export default TaskIcon;
export { TASK_ICONS };
export type { TaskCategory };
