
import { CardContent } from "@/components/ui/card";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { LaborEstimate } from "@/utils/estimationAlgorithms";
import LaborEstimateRow from "./LaborEstimateRow";

interface PhaseContentProps {
  phaseEstimates: LaborEstimate[];
  editingId: string | null;
  onEdit: (estimate: LaborEstimate) => void;
  onSave: (id: string, updatedData: Partial<LaborEstimate>) => void;
  onCancel: () => void;
}

export default function PhaseContent({
  phaseEstimates,
  editingId,
  onEdit,
  onSave,
  onCancel
}: PhaseContentProps) {
  return (
    <CollapsibleContent>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-4 p-3 bg-white bg-opacity-50 rounded-lg font-semibold text-sm">
            <div>Skill Type</div>
            <div>Quantity</div>
            <div>Unit</div>
            <div>Rate (₹/day)</div>
            <div>Duration (days)</div>
            <div>Total (₹)</div>
            <div>Actions</div>
          </div>
          
          {phaseEstimates.map((estimate) => (
            <LaborEstimateRow
              key={estimate.id}
              estimate={estimate}
              isEditing={editingId === estimate.id}
              onEdit={() => onEdit(estimate)}
              onSave={(updatedData) => onSave(estimate.id, updatedData)}
              onCancel={onCancel}
            />
          ))}
        </div>
      </CardContent>
    </CollapsibleContent>
  );
}
