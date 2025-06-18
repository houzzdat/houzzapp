
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QualityEstimate } from "@/utils/estimationAlgorithms";
import { CheckCircle, FileCheck, Calendar, DollarSign } from "lucide-react";

interface QualityEstimatesTabProps {
  estimate: QualityEstimate;
  onUpdate: (estimate: QualityEstimate) => void;
}

const TestingItemCard = ({ test }: { test: any }) => {
  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 text-base">
            {test.testType}
          </h4>
          
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Frequency
            </label>
            <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium text-gray-600">
              {test.frequency}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Estimated Tests
              </label>
              <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                {test.estimatedTests}
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                Cost per Test
              </label>
              <div className="bg-gray-50 px-3 py-2 rounded text-sm font-medium">
                ₹{test.costPerTest}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-gray-600">Total Cost</span>
            <Badge variant="secondary" className="text-base font-bold px-3 py-1 bg-green-100 text-green-700">
              ₹{test.totalCost.toLocaleString()}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function QualityEstimatesTab({ estimate }: QualityEstimatesTabProps) {
  const totalTests = estimate.testingSchedule.reduce((sum, test) => sum + test.estimatedTests, 0);
  const avgCostPerTest = totalTests > 0 ? Math.round(estimate.totalQualityCost / totalTests) : 0;

  return (
    <div className="space-y-6">
      {/* Quality Cost Summary */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-brand-dark-blue flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Quality Control Estimates
            </CardTitle>
            <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit">
              Total: ₹{estimate.totalQualityCost.toLocaleString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-4 w-4 text-blue-600" />
                <h4 className="font-medium text-blue-900 text-sm">Test Types</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{estimate.testingSchedule.length}</p>
              <p className="text-xs sm:text-sm text-blue-700">Different test categories</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <h4 className="font-medium text-green-900 text-sm">Total Tests</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{totalTests}</p>
              <p className="text-xs sm:text-sm text-green-700">Estimated test count</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-orange-600" />
                <h4 className="font-medium text-orange-900 text-sm">Avg Cost per Test</h4>
              </div>
              <p className="text-xl sm:text-2xl font-bold text-orange-600">₹{avgCostPerTest.toLocaleString()}</p>
              <p className="text-xs sm:text-sm text-orange-700">Average testing cost</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Quality Testing Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {estimate.testingSchedule.map((test, index) => (
              <TestingItemCard key={index} test={test} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quality Standards */}
      <Card>
        <CardHeader>
          <CardTitle className="text-brand-dark-blue">Quality Standards & Tolerances</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Concrete Quality</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Compressive strength: 28-day test</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Slump test for workability</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Cube testing frequency: Every 5 cum</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Minimum grade compliance</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Steel & Masonry</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Steel tensile strength certification</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Rebar diameter tolerance: ±3%</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Masonry alignment: ±10mm</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-brand-orange rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm text-gray-700">Joint thickness: 10-12mm</span>
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
                <h4 className="font-semibold mb-3 text-brand-dark-blue">Plumbing Systems</h4>
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
