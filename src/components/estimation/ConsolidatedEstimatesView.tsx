
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ProjectEstimates } from "@/utils/estimationAlgorithms";
import { Building, Calculator, Clock, DollarSign, Users, Wrench } from "lucide-react";

interface ConsolidatedEstimatesViewProps {
  projects: any[];
  allEstimates: {[key: string]: ProjectEstimates};
}

export default function ConsolidatedEstimatesView({ projects, allEstimates }: ConsolidatedEstimatesViewProps) {
  // Calculate totals across all projects
  const calculateTotals = () => {
    let totalMaterialCost = 0;
    let totalLaborCost = 0;
    let totalEquipmentCost = 0;
    let totalProjectCost = 0;
    let totalDuration = 0;
    let totalWorkers = 0;

    Object.values(allEstimates).forEach(estimate => {
      totalMaterialCost += estimate.materials.reduce((sum, m) => sum + m.totalCost, 0);
      totalLaborCost += estimate.labor.reduce((sum, l) => sum + l.totalCost, 0);
      totalEquipmentCost += estimate.equipment.reduce((sum, e) => sum + e.totalCost, 0);
      totalProjectCost += estimate.cost.finalCost;
      totalDuration += estimate.timeline.totalDuration;
      totalWorkers += estimate.labor.reduce((sum, l) => sum + l.quantity, 0);
    });

    return {
      totalMaterialCost,
      totalLaborCost,
      totalEquipmentCost,
      totalProjectCost,
      totalDuration,
      totalWorkers
    };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totals.totalProjectCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {projects.length} projects
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalDuration} days</div>
            <p className="text-xs text-muted-foreground">
              Combined project timeline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workforce</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.totalWorkers}</div>
            <p className="text-xs text-muted-foreground">
              Workers across all projects
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Portfolio Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Materials</span>
                <span className="text-sm">₹{totals.totalMaterialCost.toLocaleString()}</span>
              </div>
              <Progress 
                value={(totals.totalMaterialCost / totals.totalProjectCost) * 100} 
                className="h-2"
              />
              <p className="text-xs text-gray-500">
                {Math.round((totals.totalMaterialCost / totals.totalProjectCost) * 100)}% of total
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Labor</span>
                <span className="text-sm">₹{totals.totalLaborCost.toLocaleString()}</span>
              </div>
              <Progress 
                value={(totals.totalLaborCost / totals.totalProjectCost) * 100} 
                className="h-2"
              />
              <p className="text-xs text-gray-500">
                {Math.round((totals.totalLaborCost / totals.totalProjectCost) * 100)}% of total
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Equipment</span>
                <span className="text-sm">₹{totals.totalEquipmentCost.toLocaleString()}</span>
              </div>
              <Progress 
                value={(totals.totalEquipmentCost / totals.totalProjectCost) * 100} 
                className="h-2"
              />
              <p className="text-xs text-gray-500">
                {Math.round((totals.totalEquipmentCost / totals.totalProjectCost) * 100)}% of total
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project-wise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Project-wise Estimates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.map((project) => {
              const estimate = allEstimates[project.id];
              if (!estimate) return null;

              const materialCost = estimate.materials.reduce((sum, m) => sum + m.totalCost, 0);
              const laborCost = estimate.labor.reduce((sum, l) => sum + l.totalCost, 0);
              const equipmentCost = estimate.equipment.reduce((sum, e) => sum + e.totalCost, 0);

              return (
                <div key={project.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{project.name}</h3>
                      <p className="text-sm text-gray-600">
                        {project.type} • {project.built_up_area} sq ft • {project.number_of_floors} floors
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      ₹{estimate.cost.finalCost.toLocaleString()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-blue-600" />
                      <div>
                        <p className="font-medium">Materials</p>
                        <p className="text-gray-600">₹{materialCost.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-green-600" />
                      <div>
                        <p className="font-medium">Labor</p>
                        <p className="text-gray-600">₹{laborCost.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wrench size={16} className="text-orange-600" />
                      <div>
                        <p className="font-medium">Equipment</p>
                        <p className="text-gray-600">₹{equipmentCost.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-purple-600" />
                      <div>
                        <p className="font-medium">Duration</p>
                        <p className="text-gray-600">{estimate.timeline.totalDuration} days</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Project Progress</span>
                      <span>{Math.round((estimate.cost.finalCost / totals.totalProjectCost) * 100)}% of portfolio</span>
                    </div>
                    <Progress 
                      value={(estimate.cost.finalCost / totals.totalProjectCost) * 100} 
                      className="h-2"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Material Summary Across Projects */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Material Requirements Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(() => {
              const materialSummary: {[key: string]: {quantity: number, unit: string, totalCost: number}} = {};
              
              Object.values(allEstimates).forEach(estimate => {
                estimate.materials.forEach(material => {
                  if (materialSummary[material.item]) {
                    materialSummary[material.item].quantity += material.quantity;
                    materialSummary[material.item].totalCost += material.totalCost;
                  } else {
                    materialSummary[material.item] = {
                      quantity: material.quantity,
                      unit: material.unit,
                      totalCost: material.totalCost
                    };
                  }
                });
              });

              return Object.entries(materialSummary).map(([item, data]) => (
                <div key={item} className="bg-gray-50 rounded-lg p-3">
                  <h4 className="font-medium text-sm">{item}</h4>
                  <p className="text-lg font-semibold">{Math.round(data.quantity)} {data.unit}</p>
                  <p className="text-sm text-gray-600">₹{data.totalCost.toLocaleString()}</p>
                </div>
              ));
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
