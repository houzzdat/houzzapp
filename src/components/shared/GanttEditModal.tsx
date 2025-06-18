
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react";

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

interface GanttEditModalProps {
  editingPhase: string | null;
  phases: GanttPhase[];
  onSave: (phaseId: string, actualStart: string, actualEnd: string) => void;
  onCancel: () => void;
}

export default function GanttEditModal({ editingPhase, phases, onSave, onCancel }: GanttEditModalProps) {
  if (!editingPhase) return null;

  const phase = phases.find(p => p.id === editingPhase);
  if (!phase) return null;

  const handleSave = () => {
    const startInput = document.getElementById(`start-${editingPhase}`) as HTMLInputElement;
    const endInput = document.getElementById(`end-${editingPhase}`) as HTMLInputElement;
    onSave(editingPhase, startInput.value, endInput.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="font-semibold mb-4">
          Update Actual Dates: {phase.phase}
        </h3>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-medium">Actual Start</label>
              <Input
                type="date"
                defaultValue={phase.actualStart}
                id={`start-${editingPhase}`}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Actual End</label>
              <Input
                type="date"
                defaultValue={phase.actualEnd}
                id={`end-${editingPhase}`}
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              <X size={12} className="mr-1" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save size={12} className="mr-1" />
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
