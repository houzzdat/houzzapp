
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EquipmentEstimate } from "@/utils/estimationAlgorithms";
import { Edit, Check, X, Wrench } from "lucide-react";

interface EquipmentEstimatesTabProps {
  estimates: EquipmentEstimate[];
  onUpdate: (estimates: EquipmentEstimate[]) => void;
}

const EquipmentItemCard = ({ 
  estimate, 
  isEditing, 
  editValues, 
  onEdit, 
  onSave, 
  onCancel, 
  onEditValueChange 
}: {
  estimate: EquipmentEstimate;
  isEditing: boolean;
  editValues: Partial<EquipmentEstimate>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEditValueChange: (values: Partial<EquipmentEstimate>) => void;
}) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Equipment Name */}
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-gray-900 text-base leading-tight">
              {estimate.equipment}
            </h4>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={isEditing ? onSave : onEdit} 
              className="ml-2 shrink-0"
            >
              {isEditing ? <Check size={14} /> : <Edit size={14} />}
            </Button>
          </div>

          {/* Quantity and Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Quantity
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editValues.quantity || estimate.quantity}
                  onChange={(e) => onEditValueChange({
                    ...editValues, 
                    quantity: parseFloat(e.target.value) || 0
                  })}
                  className="text-sm"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                  {estimate.quantity} units
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Duration
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editValues.duration || estimate.duration}
                  onChange={(e) => onEditValueChange({
                    ...editValues, 
                    duration: parseFloat(e.target.value) || 0
                  })}
                  className="text-sm"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                  {estimate.duration} days
                </div>
              )}
            </div>
          </div>

          {/* Rate */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Daily Rate
            </label>
            {isEditing ? (
              <Input
                type="number"
                value={editValues.rate || estimate.rate}
                onChange={(e) => onEditValueChange({
                  ...editValues, 
                  rate: parseFloat(e.target.value) || 0
                })}
                className="text-sm"
              />
            ) : (
              <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                ₹{estimate.rate}/day
              </div>
            )}
          </div>

          {/* Total Cost */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">Total Cost</span>
            <Badge variant="secondary" className="text-base font-bold px-3 py-1 bg-purple-100 text-purple-700">
              ₹{isEditing 
                ? ((editValues.quantity || estimate.quantity) * (editValues.duration || estimate.duration) * (editValues.rate || estimate.rate)).toLocaleString()
                : estimate.totalCost.toLocaleString()
              }
            </Badge>
          </div>

          {/* Cancel button for editing */}
          {isEditing && (
            <div className="flex justify-end pt-2">
              <Button size="sm" variant="outline" onClick={onCancel}>
                <X size={14} className="mr-1" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function EquipmentEstimatesTab({ estimates, onUpdate }: EquipmentEstimatesTabProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<EquipmentEstimate>>({});

  const handleEdit = (estimate: EquipmentEstimate) => {
    setEditingId(estimate.id);
    setEditValues({
      quantity: estimate.quantity,
      duration: estimate.duration,
      rate: estimate.rate
    });
  };

  const handleSave = () => {
    if (editingId) {
      const updatedEstimates = estimates.map(est => {
        if (est.id === editingId) {
          const newQuantity = editValues.quantity || est.quantity;
          const newDuration = editValues.duration || est.duration;
          const newRate = editValues.rate || est.rate;
          return {
            ...est,
            quantity: newQuantity,
            duration: newDuration,
            rate: newRate,
            totalCost: newQuantity * newDuration * newRate
          };
        }
        return est;
      });
      onUpdate(updatedEstimates);
      setEditingId(null);
      setEditValues({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValues({});
  };

  const totalEquipmentCost = estimates.reduce((sum, est) => sum + est.totalCost, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-brand-dark-blue flex items-center gap-2">
            <Wrench size={20} />
            Equipment Estimates
          </CardTitle>
          <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit">
            Total: ₹{totalEquipmentCost.toLocaleString()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {estimates.map((estimate) => (
            <EquipmentItemCard
              key={estimate.id}
              estimate={estimate}
              isEditing={editingId === estimate.id}
              editValues={editValues}
              onEdit={() => handleEdit(estimate)}
              onSave={handleSave}
              onCancel={handleCancel}
              onEditValueChange={setEditValues}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
