
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, X } from "lucide-react";

interface PhaseEditModalProps {
  editingPhase: string | null;
  phases: Array<{
    phase: string;
    actualStart: string;
    actualEnd: string;
  }>;
  onSave: (phaseName: string, actualStart: string, actualEnd: string) => void;
  onCancel: () => void;
}

export default function PhaseEditModal({ editingPhase, phases, onSave, onCancel }: PhaseEditModalProps) {
  if (!editingPhase) return null;

  const handleSave = () => {
    const startInput = document.getElementById(`start-${editingPhase}`) as HTMLInputElement;
    const endInput = document.getElementById(`end-${editingPhase}`) as HTMLInputElement;
    onSave(editingPhase, startInput.value, endInput.value);
  };

  const currentPhase = phases.find(p => p.phase === editingPhase);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-medium">Actual Start</label>
          <Input
            type="date"
            defaultValue={currentPhase?.actualStart}
            id={`start-${editingPhase}`}
            className="text-xs"
          />
        </div>
        <div>
          <label className="text-xs font-medium">Actual End</label>
          <Input
            type="date"
            defaultValue={currentPhase?.actualEnd}
            id={`end-${editingPhase}`}
            className="text-xs"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>
          <Save size={12} className="mr-1" />
          Save
        </Button>
        <Button size="sm" variant="outline" onClick={onCancel}>
          <X size={12} className="mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
