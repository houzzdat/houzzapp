
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import { getBarPosition, formatDate } from "@/utils/ganttDateUtils";

interface GanttPhase {
  id: string;
  phase: string;
  duration: number;
  plannedStart?: string;
  plannedEnd?: string;
  actualStart?: string;
  actualEnd?: string;
  dependencies?: string[];
  progress_percentage?: number;
  critical_path?: boolean;
}

interface GanttPhaseBarProps {
  phase: GanttPhase;
  minDate: Date;
  totalDays: number;
  onEdit?: (phaseId: string) => void;
}

export default function GanttPhaseBar({ phase, minDate, totalDays, onEdit }: GanttPhaseBarProps) {
  const plannedPos = phase.plannedStart && phase.plannedEnd 
    ? getBarPosition(phase.plannedStart, phase.plannedEnd, minDate, totalDays)
    : { left: 0, width: 0 };
  
  const actualPos = phase.actualStart && phase.actualEnd 
    ? getBarPosition(phase.actualStart, phase.actualEnd, minDate, totalDays) 
    : { left: 0, width: 0 };
  
  // Calculate actual duration for display
  const actualDuration = phase.plannedStart && phase.plannedEnd
    ? Math.ceil((new Date(phase.plannedEnd).getTime() - new Date(phase.plannedStart).getTime()) / (1000 * 60 * 60 * 24)) + 1
    : phase.duration;

  return (
    <div className="flex items-center">
      <div className="w-64 flex-shrink-0 pr-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <span className="font-medium text-sm text-brand-dark-blue truncate block">
              {phase.phase}
            </span>
            {phase.plannedStart && phase.plannedEnd && (
              <div className="text-xs text-gray-500 mt-1">
                Planned: {phase.plannedStart} to {phase.plannedEnd}
              </div>
            )}
            {phase.actualStart && phase.actualEnd && (
              <div className="text-xs text-green-600 mt-1">
                Actual: {phase.actualStart} to {phase.actualEnd}
              </div>
            )}
            <div className="text-xs text-gray-600 mt-1">
              Duration: {actualDuration} days
            </div>
            {phase.critical_path && (
              <Badge variant="destructive" className="text-xs mt-1">Critical</Badge>
            )}
          </div>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(phase.id)}
              className="p-1 h-6 w-6 flex-shrink-0"
            >
              <Edit size={12} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex-1 relative h-16 bg-gray-100 rounded border" style={{ minWidth: `${Math.max(800, totalDays * 8)}px` }}>
        {/* Planned Timeline Bar */}
        {phase.plannedStart && phase.plannedEnd && (
          <div
            className="absolute top-1 h-5 bg-blue-400 rounded text-white text-xs flex items-center justify-center"
            style={{
              left: `${plannedPos.left}%`,
              width: `${plannedPos.width}%`,
              minWidth: '60px'
            }}
          >
            <span className="truncate px-1 text-xs">
              {actualDuration}d
            </span>
          </div>
        )}
        
        {/* Actual Timeline Bar */}
        {phase.actualStart && phase.actualEnd && (
          <div
            className="absolute bottom-1 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center"
            style={{
              left: `${actualPos.left}%`,
              width: `${actualPos.width}%`,
              minWidth: '60px'
            }}
          >
            <span className="truncate px-1 text-xs">Actual</span>
          </div>
        )}
      </div>
    </div>
  );
}
