
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

interface GanttChartProps {
  phases: GanttPhase[];
  title?: string;
  onUpdatePhase?: (phaseId: string, actualStart: string, actualEnd: string) => void;
  showProjections?: boolean;
}

export default function GanttChart({ 
  phases, 
  title = "Project Timeline", 
  onUpdatePhase,
  showProjections = true 
}: GanttChartProps) {
  const [editingPhase, setEditingPhase] = useState<string | null>(null);

  // Calculate the overall project timeline from all phases
  const calculateProjectDates = () => {
    const validPhases = phases.filter(p => p.plannedStart && p.plannedEnd);
    if (validPhases.length === 0) {
      const today = new Date();
      return { startDate: today, endDate: today };
    }

    const allDates = validPhases.flatMap(p => [
      new Date(p.plannedStart!),
      new Date(p.plannedEnd!),
      ...(p.actualStart ? [new Date(p.actualStart)] : []),
      ...(p.actualEnd ? [new Date(p.actualEnd)] : [])
    ]);

    const startDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const endDate = new Date(Math.max(...allDates.map(d => d.getTime())));

    return { startDate, endDate };
  };

  const { startDate, endDate } = calculateProjectDates();
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Use consistent pixel width - 8px per day for both header and bars
  const pixelsPerDay = 8;
  const totalWidth = Math.max(800, totalDays * pixelsPerDay);

  // Calculate bar position and width using consistent pixel logic
  const getBarPosition = (start: string, end: string) => {
    const taskStartDate = new Date(start);
    const taskEndDate = new Date(end);
    
    // Calculate days from project start
    const startOffset = Math.floor((taskStartDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const endOffset = Math.floor((taskEndDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = endOffset - startOffset + 1;
    
    // Convert to percentage based on total width
    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;
    
    return { left: Math.max(0, leftPercent), width: Math.min(100 - leftPercent, widthPercent) };
  };

  const handleEditPhase = (phaseId: string) => {
    setEditingPhase(phaseId);
  };

  const handleSaveEdit = () => {
    if (!editingPhase) return;
    
    const startInput = document.getElementById(`start-${editingPhase}`) as HTMLInputElement;
    const endInput = document.getElementById(`end-${editingPhase}`) as HTMLInputElement;
    
    if (onUpdatePhase && startInput && endInput) {
      onUpdatePhase(editingPhase, startInput.value, endInput.value);
    }
    
    setEditingPhase(null);
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Calculate actual days taken for a phase
  const calculateActualDays = (actualStart: string, actualEnd: string) => {
    const startDate = new Date(actualStart);
    const endDate = new Date(actualEnd);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-brand-dark-blue flex items-center gap-2">
          <Calendar size={20} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Project Summary */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-blue-800">Project Start:</span> {formatDate(startDate)}
            </div>
            <div>
              <span className="font-medium text-blue-800">Project End:</span> {formatDate(endDate)}
            </div>
            <div>
              <span className="font-medium text-blue-800">Total Duration:</span> {totalDays} days
            </div>
          </div>
        </div>

        {/* Gantt Chart */}
        <div className="overflow-x-auto">
          {/* Phase Bars */}
          <div className="space-y-4">
            {phases.map((phase) => {
              if (!phase.plannedStart || !phase.plannedEnd) return null;
              
              const plannedPos = getBarPosition(phase.plannedStart, phase.plannedEnd);
              const actualPos = phase.actualStart && phase.actualEnd 
                ? getBarPosition(phase.actualStart, phase.actualEnd) 
                : null;
              
              const actualDaysTaken = phase.actualStart && phase.actualEnd 
                ? calculateActualDays(phase.actualStart, phase.actualEnd)
                : 0;
              
              return (
                <div key={phase.id} className="flex items-center">
                  <div className="w-64 flex-shrink-0 pr-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm text-brand-dark-blue truncate block">
                          {phase.phase}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Planned: {phase.plannedStart} to {phase.plannedEnd}
                        </div>
                        {phase.actualStart && phase.actualEnd && (
                          <div className="text-xs text-green-600 mt-1">
                            Actual: {phase.actualStart} to {phase.actualEnd}
                          </div>
                        )}
                      </div>
                      {onUpdatePhase && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditPhase(phase.id)}
                          className="p-1 h-6 w-6 flex-shrink-0"
                        >
                          ✏️
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 relative h-16 bg-gray-100 rounded border" style={{ minWidth: `${totalWidth}px`, width: `${totalWidth}px` }}>
                    {/* Planned Timeline Bar */}
                    <div
                      className="absolute top-2 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-medium"
                      style={{
                        left: `${plannedPos.left}%`,
                        width: `${plannedPos.width}%`,
                        minWidth: '80px'
                      }}
                    >
                      <span className="truncate px-2 text-xs font-medium">
                        {phase.duration} days planned
                      </span>
                    </div>
                    
                    {/* Actual Timeline Bar */}
                    {actualPos && (
                      <div
                        className="absolute bottom-2 h-5 bg-green-500 rounded text-white text-xs flex items-center justify-center font-medium"
                        style={{
                          left: `${actualPos.left}%`,
                          width: `${actualPos.width}%`,
                          minWidth: '80px'
                        }}
                      >
                        <span className="truncate px-2 text-xs font-medium">
                          {actualDaysTaken} days actual
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Edit Modal */}
        {editingPhase && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="font-semibold mb-4">
                Update Actual Dates: {phases.find(p => p.id === editingPhase)?.phase}
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Actual Start</label>
                    <Input
                      type="date"
                      defaultValue={phases.find(p => p.id === editingPhase)?.actualStart}
                      id={`start-${editingPhase}`}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Actual End</label>
                    <Input
                      type="date"
                      defaultValue={phases.find(p => p.id === editingPhase)?.actualEnd}
                      id={`end-${editingPhase}`}
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => setEditingPhase(null)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveEdit}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium mb-3">Legend</h4>
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Planned Timeline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Actual Timeline</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
