
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

interface LaborDashboardCardsProps {
  totalWorkers: number;
  totalMandaysUsed: number;
  remainingMandays: number;
  totalLaborCost: number;
}

export default function LaborDashboardCards({
  totalWorkers,
  totalMandaysUsed,
  remainingMandays,
  totalLaborCost,
}: LaborDashboardCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users size={20} />
            Active Labor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalWorkers}</div>
          <div className="text-blue-100 text-sm">Total workers</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Mandays Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalMandaysUsed}</div>
          <div className="text-green-100 text-sm">Till date</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Remaining Mandays</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{remainingMandays}</div>
          <div className="text-orange-100 text-sm">As per plan</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Labor Cost</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">₹{totalLaborCost.toLocaleString()}</div>
          <div className="text-purple-100 text-sm">Total earned</div>
        </CardContent>
      </Card>
    </div>
  );
}
