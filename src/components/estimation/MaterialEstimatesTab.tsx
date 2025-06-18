import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialEstimate } from "@/utils/estimationAlgorithms";
import { EnhancedProjectEstimates } from "@/utils/enhancedEstimationAlgorithms";
import { Edit, Check, X, ShoppingCart, ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface MaterialEstimatesTabProps {
  estimates: MaterialEstimate[];
  enhancedEstimates?: EnhancedProjectEstimates;
  onUpdate: (estimates: MaterialEstimate[]) => void;
}

const MaterialItemCard = ({ 
  estimate, 
  isEditing, 
  editValues, 
  onEdit, 
  onSave, 
  onCancel, 
  onEditValueChange 
}: {
  estimate: MaterialEstimate;
  isEditing: boolean;
  editValues: Partial<MaterialEstimate>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onEditValueChange: (values: Partial<MaterialEstimate>) => void;
}) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Item Name */}
          <div className="flex items-start justify-between">
            <h4 className="font-semibold text-gray-900 text-base leading-tight">
              {estimate.item}
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

          {/* Quantity and Unit */}
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
                  {estimate.quantity} {estimate.unit}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Unit Rate
              </label>
              {isEditing ? (
                <Input
                  type="number"
                  value={editValues.unitRate || estimate.unitRate}
                  onChange={(e) => onEditValueChange({
                    ...editValues, 
                    unitRate: parseFloat(e.target.value) || 0
                  })}
                  className="text-sm"
                />
              ) : (
                <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                  ₹{estimate.unitRate}
                </div>
              )}
            </div>
          </div>

          {/* Total Cost */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">Total Cost</span>
            <Badge variant="secondary" className="text-base font-bold px-3 py-1 bg-green-100 text-green-700">
              ₹{isEditing 
                ? ((editValues.quantity || estimate.quantity) * (editValues.unitRate || estimate.unitRate)).toLocaleString()
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

export default function MaterialEstimatesTab({ estimates, enhancedEstimates, onUpdate }: MaterialEstimatesTabProps) {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Partial<MaterialEstimate>>({});
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Use enhanced estimates if available, otherwise fall back to basic estimates
  const getConsolidatedMaterials = (): MaterialEstimate[] => {
    if (!enhancedEstimates) {
      return estimates;
    }
    
    const consolidatedMaterials: MaterialEstimate[] = [];

    // Foundation materials
    consolidatedMaterials.push({
      id: 'excavation',
      category: 'Foundation',
      item: 'Excavation Work',
      quantity: enhancedEstimates.foundation.excavation.volume_cum,
      unit: 'cum',
      unitRate: 150,
      totalCost: enhancedEstimates.foundation.excavation.cost,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'pcc-cement',
      category: 'Foundation',
      item: 'PCC Cement',
      quantity: Math.round(enhancedEstimates.foundation.pcc.cement_bags),
      unit: 'bags',
      unitRate: 380,
      totalCost: Math.round(enhancedEstimates.foundation.pcc.cement_bags) * 380,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'pcc-sand',
      category: 'Foundation',
      item: 'PCC Sand',
      quantity: Math.round(enhancedEstimates.foundation.pcc.sand_cft),
      unit: 'cft',
      unitRate: 45,
      totalCost: Math.round(enhancedEstimates.foundation.pcc.sand_cft) * 45,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'pcc-aggregate',
      category: 'Foundation',
      item: 'PCC Aggregate',
      quantity: Math.round(enhancedEstimates.foundation.pcc.aggregate_cft),
      unit: 'cft',
      unitRate: 55,
      totalCost: Math.round(enhancedEstimates.foundation.pcc.aggregate_cft) * 55,
      isEditable: true
    });

    // Structural materials
    consolidatedMaterials.push({
      id: 'structural-cement',
      category: 'Structural',
      item: 'Structural Cement',
      quantity: enhancedEstimates.structure.concrete.cement.quantity,
      unit: enhancedEstimates.structure.concrete.cement.unit,
      unitRate: 380,
      totalCost: enhancedEstimates.structure.concrete.cement.cost,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'structural-sand',
      category: 'Structural',
      item: 'Structural Sand',
      quantity: enhancedEstimates.structure.concrete.sand.quantity,
      unit: enhancedEstimates.structure.concrete.sand.unit,
      unitRate: 45,
      totalCost: enhancedEstimates.structure.concrete.sand.cost,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'structural-aggregate',
      category: 'Structural',
      item: 'Structural Aggregate',
      quantity: enhancedEstimates.structure.concrete.aggregate.quantity,
      unit: enhancedEstimates.structure.concrete.aggregate.unit,
      unitRate: 55,
      totalCost: enhancedEstimates.structure.concrete.aggregate.cost,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'steel-reinforcement',
      category: 'Structural',
      item: 'Steel Reinforcement',
      quantity: enhancedEstimates.structure.concrete.steel.quantity,
      unit: enhancedEstimates.structure.concrete.steel.unit,
      unitRate: 65,
      totalCost: enhancedEstimates.structure.concrete.steel.cost,
      isEditable: true
    });

    // Masonry materials
    consolidatedMaterials.push({
      id: 'masonry-bricks',
      category: 'Masonry',
      item: 'Clay Bricks',
      quantity: enhancedEstimates.masonry.bricks,
      unit: 'nos',
      unitRate: 8,
      totalCost: enhancedEstimates.masonry.bricks * 8,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'masonry-cement',
      category: 'Masonry',
      item: 'Masonry Cement',
      quantity: Math.round(enhancedEstimates.masonry.cement_bags),
      unit: 'bags',
      unitRate: 380,
      totalCost: Math.round(enhancedEstimates.masonry.cement_bags) * 380,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'masonry-sand',
      category: 'Masonry',
      item: 'Masonry Sand',
      quantity: Math.round(enhancedEstimates.masonry.sand_cft),
      unit: 'cft',
      unitRate: 45,
      totalCost: Math.round(enhancedEstimates.masonry.sand_cft) * 45,
      isEditable: true
    });

    // Electrical materials
    consolidatedMaterials.push({
      id: 'electrical-wire',
      category: 'Electrical',
      item: 'Electrical Wire',
      quantity: enhancedEstimates.electrical.wiring.wireLength,
      unit: 'm',
      unitRate: 45,
      totalCost: enhancedEstimates.electrical.wiring.wireLength * 45,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'electrical-mcb',
      category: 'Electrical',
      item: 'Single MCB',
      quantity: enhancedEstimates.electrical.protection.mcbSingle,
      unit: 'nos',
      unitRate: 180,
      totalCost: enhancedEstimates.electrical.protection.mcbSingle * 180,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'electrical-db',
      category: 'Electrical',
      item: 'Distribution Board',
      quantity: enhancedEstimates.electrical.protection.distributionBoard,
      unit: 'nos',
      unitRate: 2500,
      totalCost: enhancedEstimates.electrical.protection.distributionBoard * 2500,
      isEditable: true
    });

    // Plumbing materials
    consolidatedMaterials.push({
      id: 'plumbing-cpvc',
      category: 'Plumbing',
      item: 'CPVC Pipes (15mm)',
      quantity: enhancedEstimates.plumbing.cpvcPipes['15mm'] || 0,
      unit: 'm',
      unitRate: 25,
      totalCost: (enhancedEstimates.plumbing.cpvcPipes['15mm'] || 0) * 25,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'plumbing-pvc',
      category: 'Plumbing',
      item: 'PVC Pipes (110mm)',
      quantity: enhancedEstimates.plumbing.pvcPipes['110mm'] || 0,
      unit: 'm',
      unitRate: 35,
      totalCost: (enhancedEstimates.plumbing.pvcPipes['110mm'] || 0) * 35,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'plumbing-valves',
      category: 'Plumbing',
      item: 'Ball Valves',
      quantity: enhancedEstimates.plumbing.fittings.ballValves,
      unit: 'nos',
      unitRate: 150,
      totalCost: enhancedEstimates.plumbing.fittings.ballValves * 150,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'plumbing-elbows',
      category: 'Plumbing',
      item: 'Elbows',
      quantity: enhancedEstimates.plumbing.fittings.elbows,
      unit: 'nos',
      unitRate: 25,
      totalCost: enhancedEstimates.plumbing.fittings.elbows * 25,
      isEditable: true
    });

    // Flooring materials
    consolidatedMaterials.push({
      id: 'flooring-tiles',
      category: 'Flooring',
      item: 'Floor Tiles',
      quantity: enhancedEstimates.flooring.tiles,
      unit: 'nos',
      unitRate: 35,
      totalCost: enhancedEstimates.flooring.tiles * 35,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'flooring-adhesive',
      category: 'Flooring',
      item: 'Tile Adhesive',
      quantity: Math.round(enhancedEstimates.flooring.adhesive_kg),
      unit: 'kg',
      unitRate: 12,
      totalCost: Math.round(enhancedEstimates.flooring.adhesive_kg) * 12,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'flooring-grout',
      category: 'Flooring',
      item: 'Tile Grout',
      quantity: Math.round(enhancedEstimates.flooring.grout_kg),
      unit: 'kg',
      unitRate: 25,
      totalCost: Math.round(enhancedEstimates.flooring.grout_kg) * 25,
      isEditable: true
    });

    // Painting materials
    consolidatedMaterials.push({
      id: 'painting-primer',
      category: 'Painting',
      item: 'Primer',
      quantity: enhancedEstimates.painting.primer_liters,
      unit: 'ltrs',
      unitRate: 120,
      totalCost: enhancedEstimates.painting.primer_liters * 120,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'painting-paint',
      category: 'Painting',
      item: 'Paint',
      quantity: enhancedEstimates.painting.paint_liters,
      unit: 'ltrs',
      unitRate: 180,
      totalCost: enhancedEstimates.painting.paint_liters * 180,
      isEditable: true
    });

    consolidatedMaterials.push({
      id: 'painting-putty',
      category: 'Painting',
      item: 'Wall Putty',
      quantity: Math.round(enhancedEstimates.painting.putty_kg),
      unit: 'kg',
      unitRate: 25,
      totalCost: Math.round(enhancedEstimates.painting.putty_kg) * 25,
      isEditable: true
    });

    return consolidatedMaterials;
  };

  const materialsToShow = getConsolidatedMaterials();

  // Group materials by category
  const groupedMaterials = materialsToShow.reduce((groups, material) => {
    const category = material.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(material);
    return groups;
  }, {} as Record<string, MaterialEstimate[]>);

  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  const getCategoryTotal = (materials: MaterialEstimate[]) => {
    return materials.reduce((sum, material) => sum + material.totalCost, 0);
  };

  const handleEdit = (estimate: MaterialEstimate) => {
    setEditingId(estimate.id);
    setEditValues({
      quantity: estimate.quantity,
      unitRate: estimate.unitRate,
      totalCost: estimate.totalCost
    });
  };

  const handleSave = () => {
    if (editingId) {
      const updatedEstimates = materialsToShow.map(est => {
        if (est.id === editingId) {
          const newQuantity = editValues.quantity || est.quantity;
          const newUnitRate = editValues.unitRate || est.unitRate;
          return {
            ...est,
            quantity: newQuantity,
            unitRate: newUnitRate,
            totalCost: newQuantity * newUnitRate
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

  const handleProcurementPlanning = () => {
    sessionStorage.setItem('materialEstimates', JSON.stringify(materialsToShow));
    navigate('/material-procurement');
  };

  const totalMaterialCost = materialsToShow.reduce((sum, est) => sum + est.totalCost, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <CardTitle className="text-brand-dark-blue">Material Estimates</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700 w-fit">
              Consolidated Ballpark Estimates
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit">
              Total: ₹{totalMaterialCost.toLocaleString()}
            </Badge>
            <Button
              onClick={handleProcurementPlanning}
              className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full sm:w-auto"
              size="sm"
            >
              <ShoppingCart className="mr-2" size={16} />
              Procurement Planning
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedMaterials).map(([category, materials]) => {
            const isCollapsed = collapsedCategories.has(category);
            const categoryTotal = getCategoryTotal(materials);
            
            return (
              <Collapsible key={category} open={!isCollapsed} onOpenChange={() => toggleCategory(category)}>
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      {isCollapsed ? (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                      <h3 className="font-semibold text-lg text-brand-dark-blue">{category}</h3>
                      <Badge variant="outline" className="ml-2">
                        {materials.length} items
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="font-semibold text-sm sm:text-base">
                      ₹{categoryTotal.toLocaleString()}
                    </Badge>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {materials.map((estimate) => (
                      <MaterialItemCard
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
