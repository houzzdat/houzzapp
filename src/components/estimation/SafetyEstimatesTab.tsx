
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafetyEstimate } from "@/utils/estimationAlgorithms";
import { Shield, Users, Clock, AlertTriangle } from "lucide-react";

interface SafetyEstimatesTabProps {
  estimate: SafetyEstimate;
  onUpdate: (estimate: SafetyEstimate) => void;
}

const PPEItemCard = ({ item }: { item: any }) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-base">
            {item.item}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Per Worker
              </label>
              <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                {item.quantityPerWorker}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Total Quantity
              </label>
              <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                {item.totalQuantity}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Unit Cost
            </label>
            <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
              ₹{item.unitCost}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">Total Cost</span>
            <Badge variant="secondary" className="text-base font-bold px-3 py-1 bg-red-100 text-red-700">
              ₹{item.totalCost.toLocaleString()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function SafetyEstimatesTab({ estimate }: SafetyEstimatesTabProps) {
  return (
    <div className="space-y-6">
      {/* Safety Cost Summary */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-brand-dark-blue flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Safety Estimates
            </CardTitle>
            <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit">
              Total: ₹{estimate.totalSafetyCost.toLocaleString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-900 text-sm">Training Hours</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{estimate.trainingHours}</p>
              <p className="text-xs sm:text-sm text-blue-700">Total training required</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-900 text-sm">Equipment Budget</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600">₹{estimate.safetyEquipmentBudget.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-green-700">Safety equipment cost</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <h4 className="font-medium text-orange-900 text-sm">First Aid Stations</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">{estimate.firstAidStations}</p>
              <p className="text-xs sm:text-sm text-orange-700">Required stations</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h4 className="font-medium text-purple-900 text-sm">PPE Items</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-purple-600">{estimate.ppeRequirements.length}</p>
              <p className="text-xs sm:text-sm text-purple-700">Types of PPE</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* PPE Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">PPE Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {estimate.ppeRequirements.map((item, index) => (
              <PPEItemCard key={index} item={item} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Safety Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Safety Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Training Requirements</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">General safety orientation (8 hours per worker)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Equipment-specific training</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Emergency response procedures</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">First aid and CPR certification</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Safety Protocols</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Daily safety briefings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Weekly safety inspections</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Incident reporting system</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Emergency evacuation plans</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Electrical Safety</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Insulation resistance testing</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Earth continuity checks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">RCD functionality tests</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Cable installation verification</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Site Safety</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Water pressure tests: 1.5x working pressure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Leak detection protocols</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Pipe joint integrity checks</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Drainage system testing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
