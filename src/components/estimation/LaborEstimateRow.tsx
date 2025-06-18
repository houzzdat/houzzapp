
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit, Check, X } from "lucide-react";
import { LaborEstimate } from "@/utils/estimationAlgorithms";

interface LaborEstimateRowProps {
  estimate: LaborEstimate;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updatedData: Partial<LaborEstimate>) => void;
  onCancel: () => void;
}

export default function LaborEstimateRow({
  estimate,
  isEditing,
  onEdit,
  onSave,
  onCancel
}: LaborEstimateRowProps) {
  const [editValues, setEditValues] = useState<Partial<LaborEstimate>>({
    quantity: estimate.quantity,
    rate: estimate.rate,
    duration: estimate.duration,
    totalCost: estimate.totalCost
  });

  const handleSave = () => {
    onSave(editValues);
  };

  const calculateTotal = () => {
    const quantity = editValues.quantity || estimate.quantity;
    const rate = editValues.rate || estimate.rate;
    const duration = editValues.duration || estimate.duration;
    return quantity * rate * duration;
  };

  return (
    <div className="grid grid-cols-7 gap-4 p-3 bg-white rounded-lg border items-center shadow-sm">
      <div className="font-medium">{estimate.skillType}</div>
      
      <div>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.quantity}
            onChange={(e) => setEditValues(prev => ({...prev, quantity: parseFloat(e.target.value)}))}
            className="w-full"
          />
        ) : (
          <span>{estimate.quantity}</span>
        )}
      </div>
      
      <div className="text-sm text-gray-600">{estimate.unit}</div>
      
      <div>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.rate}
            onChange={(e) => setEditValues(prev => ({...prev, rate: parseFloat(e.target.value)}))}
            className="w-full"
          />
        ) : (
          <span>₹{estimate.rate}</span>
        )}
      </div>
      
      <div>
        {isEditing ? (
          <Input
            type="number"
            value={editValues.duration}
            onChange={(e) => setEditValues(prev => ({...prev, duration: parseFloat(e.target.value)}))}
            className="w-full"
          />
        ) : (
          <span>{estimate.duration}</span>
        )}
      </div>
      
      <div className="font-semibold">
        ₹{isEditing ? calculateTotal().toLocaleString() : estimate.totalCost.toLocaleString()}
      </div>
      
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSave} className="p-1">
              <Check size={14} />
            </Button>
            <Button size="sm" variant="outline" onClick={onCancel} className="p-1">
              <X size={14} />
            </Button>
          </>
        ) : (
          <Button size="sm" variant="outline" onClick={onEdit} className="p-1">
            <Edit size={14} />
          </Button>
        )}
      </div>
    </div>
  );
}
