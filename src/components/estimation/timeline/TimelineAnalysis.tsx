
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface TimelineAnalysisProps {
  phases: Array<{
    phase: string;
    duration: number;
    actualStart: string;
    actualEnd: string;
  }>;
  totalDuration: number;
  projectionDeviation: number | null;
}

export default function TimelineAnalysis({ phases, totalDuration, projectionDeviation }: TimelineAnalysisProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Timeline Analysis</h3>
      
      {/* Legend */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3">Legend</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Planned Timeline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Actual Timeline</span>
          </div>
        </div>
      </div>
      
      {/* Projections */}
      {projectionDeviation !== null && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
            <TrendingUp size={16} />
            Project Projections
          </h4>
          <div className="space-y-2 text-sm text-yellow-800">
            <p>
              <span className="font-semibold">Average Deviation:</span> {projectionDeviation > 0 ? '+' : ''}{Math.round(projectionDeviation)} days per phase
            </p>
            <p>
              <span className="font-semibold">Projected Total Delay:</span> {projectionDeviation > 0 ? '+' : ''}{Math.round(projectionDeviation * phases.length)} days
            </p>
            <p className="text-xs">
              {projectionDeviation > 0 
                ? 'Project is running behind schedule. Consider resource optimization.'
                : projectionDeviation < 0 
                  ? 'Project is ahead of schedule. Great progress!'
                  : 'Project is on track as planned.'
              }
            </p>
          </div>
        </div>
      )}
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Timeline Summary</h4>
        <div className="space-y-1 text-sm text-blue-800">
          <p>Total Project Duration: <span className="font-semibold">{totalDuration} days</span></p>
          <p>Working Days: <span className="font-semibold">{Math.round(totalDuration * 0.85)} days</span></p>
          <p>Buffer Time: <span className="font-semibold">{Math.round(totalDuration * 0.15)} days</span></p>
          <p>Phases Completed: <span className="font-semibold">
            {phases.filter(p => p.actualStart && p.actualEnd).length} / {phases.length}
          </span></p>
        </div>
      </div>
    </div>
  );
}
