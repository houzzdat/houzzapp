
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CostEstimate, MaterialEstimate, LaborEstimate, EquipmentEstimate } from "@/utils/estimationAlgorithms";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

interface CostSummaryTabProps {
  estimate: CostEstimate;
  materials: MaterialEstimate[];
  labor: LaborEstimate[];
  equipment: EquipmentEstimate[];
}

export default function CostSummaryTab({ estimate, materials, labor, equipment }: CostSummaryTabProps) {
  const pieData = [
    { name: 'Materials', value: estimate.materialCost, color: '#3B82F6' },
    { name: 'Labor', value: estimate.laborCost, color: '#10B981' },
    { name: 'Equipment', value: estimate.equipmentCost, color: '#F59E0B' },
    { name: 'Overhead', value: estimate.overheadCost, color: '#EF4444' }
  ];

  const barData = [
    { name: 'Materials', cost: estimate.materialCost },
    { name: 'Labor', cost: estimate.laborCost },
    { name: 'Equipment', cost: estimate.equipmentCost },
    { name: 'Overhead', cost: estimate.overheadCost }
  ];

  const costBreakdown = [
    { label: 'Material Cost', value: estimate.materialCost, color: 'bg-blue-500' },
    { label: 'Labor Cost', value: estimate.laborCost, color: 'bg-green-500' },
    { label: 'Equipment Cost', value: estimate.equipmentCost, color: 'bg-yellow-500' },
    { label: 'Overhead Cost', value: estimate.overheadCost, color: 'bg-red-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Total Cost</h3>
              <p className="text-2xl font-bold text-brand-dark-blue">
                ₹{estimate.totalCost.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Contingency</h3>
              <p className="text-2xl font-bold text-yellow-600">
                ₹{estimate.contingency.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Final Cost</h3>
              <p className="text-2xl font-bold text-brand-orange">
                ₹{estimate.finalCost.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-600">Per Sq Ft</h3>
              <p className="text-2xl font-bold text-purple-600">
                ₹{Math.round(estimate.finalCost / 2000).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {costBreakdown.map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="text-sm font-semibold">
                      ₹{item.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded ${item.color}`}></div>
                    <Progress 
                      value={(item.value / estimate.totalCost) * 100} 
                      className="flex-1 h-2"
                    />
                    <span className="text-xs text-gray-500">
                      {Math.round((item.value / estimate.totalCost) * 100)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-dark-blue">Cost Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Cost Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Detailed Cost Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Materials */}
            <div>
              <h4 className="font-semibold mb-3 text-blue-700">Materials (₹{estimate.materialCost.toLocaleString()})</h4>
              <div className="space-y-2">
                {materials.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.item}</span>
                    <span>₹{item.totalCost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Labor */}
            <div>
              <h4 className="font-semibold mb-3 text-green-700">Labor (₹{estimate.laborCost.toLocaleString()})</h4>
              <div className="space-y-2">
                {labor.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.skillType}</span>
                    <span>₹{item.totalCost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div>
              <h4 className="font-semibold mb-3 text-yellow-700">Equipment (₹{estimate.equipmentCost.toLocaleString()})</h4>
              <div className="space-y-2">
                {equipment.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.equipment}</span>
                    <span>₹{item.totalCost.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
