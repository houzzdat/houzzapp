
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { LaborEstimate } from "@/utils/estimationAlgorithms";
import { Users, ArrowRight, Edit, Check, X, ChevronDown, ChevronRight, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getPhaseColor, sortPhases, groupEstimatesByPhase } from "@/utils/phaseUtils";

interface LaborEstimatesTabProps {
  estimates: LaborEstimate[];
  onUpdate: (estimates: LaborEstimate[]) => void;
}

const LaborItemCard = ({ 
  estimate, 
  isEditing, 
  editValues, 
  onEdit, 
  onSave, 
  onCancel, 
  onEditValueChange 
}: {
  estimate: LaborEstimate;
  isEditing: boolean;
  editValues: Partial<LaborEstimate>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEditValueChange: (values: Partial<LaborEstimate>) => void;
}) => {
  const currentQuantity = editValues.quantity ?? estimate.quantity;
  const currentDuration = editValues.duration ?? estimate.duration;
  const currentRate = editValues.rate ?? estimate.rate;
  const currentMandays = currentQuantity * currentDuration;
  const currentTotalCost = currentQuantity * currentRate * currentDuration;

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Skill Type */}
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-gray-900 text-base leading-tight">
              {estimate.skillType}
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

          {/* Quantity and Rate */}
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
                  {estimate.quantity} workers
                </div>
              )}
            </div>

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
          </div>

          {/* Duration */}
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

          {/* Mandays and Total Cost */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 flex items-center gap-1">
                <Calendar size={14} />
                Mandays
              </span>
              <Badge variant="outline" className="text-sm font-bold px-2 py-1 bg-orange-100 text-orange-700">
                {isEditing ? currentMandays : (estimate.quantity * estimate.duration)}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Total Cost</span>
              <Badge variant="secondary" className="text-sm font-bold px-2 py-1 bg-blue-100 text-blue-700">
                ₹{isEditing 
                  ? currentTotalCost.toLocaleString()
                  : estimate.totalCost.toLocaleString()
                }
              </Badge>
            </div>
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

export default function LaborEstimatesTab({ estimates, onUpdate }: LaborEstimatesTabProps) {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<LaborEstimate>>({});
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set(['Foundation']));

  // Group estimates by phase
  const groupedEstimates = groupEstimatesByPhase(estimates);
  const phases = sortPhases(Object.keys(groupedEstimates));

  const handleEdit = (estimate: LaborEstimate) => {
    setEditingId(estimate.id);
    setEditValues({
      quantity: estimate.quantity,
      rate: estimate.rate,
      duration: estimate.duration
    });
  };

  const handleSave = () => {
    if (editingId) {
      const updatedEstimates = estimates.map(est => {
        if (est.id === editingId) {
          const newQuantity = editValues.quantity || est.quantity;
          const newRate = editValues.rate || est.rate;
          const newDuration = editValues.duration || est.duration;
          return {
            ...est,
            quantity: newQuantity,
            rate: newRate,
            duration: newDuration,
            totalCost: newQuantity * newRate * newDuration
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

  const togglePhase = (phase: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phase)) {
      newExpanded.delete(phase);
    } else {
      newExpanded.add(phase);
    }
    setExpandedPhases(newExpanded);
  };

  const getPhaseTotal = (phaseEstimates: LaborEstimate[]) => {
    return phaseEstimates.reduce((sum, est) => sum + est.totalCost, 0);
  };

  const getPhaseMandays = (phaseEstimates: LaborEstimate[]) => {
    return phaseEstimates.reduce((sum, est) => sum + (est.quantity * est.duration), 0);
  };

  const totalLaborCost = estimates.reduce((sum, est) => sum + est.totalCost, 0);
  const totalMandays = estimates.reduce((sum, est) => sum + (est.quantity * est.duration), 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-brand-dark-blue flex items-center gap-2">
            <Users size={20} />
            Labor Estimates by Project Phase
          </CardTitle>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex gap-2">
              <Badge variant="outline" className="text-sm px-3 py-1 w-fit bg-orange-50 text-orange-700 border-orange-200">
                <Calendar size={14} className="mr-1" />
                {totalMandays} Mandays
              </Badge>
              <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit">
                Total: ₹{totalLaborCost.toLocaleString()}
              </Badge>
            </div>
            <Button
              onClick={() => navigate('/labor-management')}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-auto"
              size="sm"
            >
              <ArrowRight size={16} className="mr-2" />
              Labor Management
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {phases.map((phase) => {
            const phaseEstimates = groupedEstimates[phase];
            const phaseCost = getPhaseTotal(phaseEstimates);
            const phaseMandays = getPhaseMandays(phaseEstimates);
            const isExpanded = expandedPhases.has(phase);
            const phaseColor = getPhaseColor(phase);

            return (
              <Collapsible key={phase} open={isExpanded} onOpenChange={() => togglePhase(phase)}>
                <CollapsibleTrigger className="w-full">
                  <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors border-l-4 ${phaseColor.replace('border-', 'border-l-')}`}>
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                      <div className="min-w-0 flex-1 text-left">
                        <h3 className="font-semibold text-lg text-brand-dark-blue truncate">{phase}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {phaseEstimates.length} items
                          </Badge>
                          <Badge variant="outline" className="text-xs bg-orange-50 text-orange-700 border-orange-200">
                            <Calendar size={12} className="mr-1" />
                            {phaseMandays} mandays
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {Math.round((phaseCost / totalLaborCost) * 100)}% of total cost
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-3">
                      <Badge variant="secondary" className="font-semibold text-sm whitespace-nowrap">
                        ₹{phaseCost.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {phaseEstimates.map((estimate) => (
                      <LaborItemCard
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
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
