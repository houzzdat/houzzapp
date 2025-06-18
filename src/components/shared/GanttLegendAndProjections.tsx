
import { TrendingUp } from "lucide-react";

interface GanttLegendAndProjectionsProps {
  projectionDeviation: number | null;
  phases: any[];
}

export default function GanttLegendAndProjections({ projectionDeviation, phases }: GanttLegendAndProjectionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
      
      {projectionDeviation !== null && (
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-medium text-yellow-900 mb-2 flex items-center gap-2">
            <TrendingUp size={16} />
            Projections
          </h4>
          <div className="space-y-1 text-sm text-yellow-800">
            <p>
              <span className="font-semibold">Avg Deviation:</span> {projectionDeviation > 0 ? '+' : ''}{Math.round(projectionDeviation)} days
            </p>
            <p>
              <span className="font-semibold">Projected Delay:</span> {projectionDeviation > 0 ? '+' : ''}{Math.round(projectionDeviation * phases.length)} days
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
