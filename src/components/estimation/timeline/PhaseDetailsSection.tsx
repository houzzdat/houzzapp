
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PhaseEditModal from "./PhaseEditModal";

interface PhaseDetailsSectionProps {
  phases: Array<{
    phase: string;
    duration: number;
    plannedStart: string;
    plannedEnd: string;
    actualStart: string;
    actualEnd: string;
    dependencies: string[];
  }>;
  totalDuration: number;
  editingPhase: string | null;
  onSave: (phaseName: string, actualStart: string, actualEnd: string) => void;
  onCancel: () => void;
}

export default function PhaseDetailsSection({ 
  phases, 
  totalDuration, 
  editingPhase, 
  onSave, 
  onCancel 
}: PhaseDetailsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Phase Details</h3>
      {phases.map((phase) => (
        <div key={phase.phase} className="border rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium truncate flex-1 mr-2">{phase.phase}</h4>
            <Badge variant="outline" className="flex-shrink-0">{phase.duration} days</Badge>
          </div>
          
          {editingPhase === phase.phase ? (
            <PhaseEditModal
              editingPhase={editingPhase}
              phases={phases}
              onSave={onSave}
              onCancel={onCancel}
            />
          ) : (
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="font-medium text-blue-600">Planned:</span>
                  <div className="text-xs">{phase.plannedStart} to {phase.plannedEnd}</div>
                </div>
                <div>
                  <span className="font-medium text-green-600">Actual:</span>
                  <div className="text-xs">{phase.actualStart && phase.actualEnd ? `${phase.actualStart} to ${phase.actualEnd}` : 'Not set'}</div>
                </div>
              </div>
              
              <Progress 
                value={(phase.duration / totalDuration) * 100} 
                className="h-2"
              />
              
              {phase.dependencies.length > 0 && (
                <p className="text-xs text-gray-600">
                  Dependencies: {phase.dependencies.join(", ")}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
