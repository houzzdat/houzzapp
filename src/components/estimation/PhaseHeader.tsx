
import { Badge } from "@/components/ui/badge";
import { CardHeader } from "@/components/ui/card";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface PhaseHeaderProps {
  phase: string;
  isExpanded: boolean;
  phaseEstimatesCount: number;
  phaseCost: number;
  totalLaborCost: number;
  phaseColor: string;
}

export default function PhaseHeader({
  phase,
  isExpanded,
  phaseEstimatesCount,
  phaseCost,
  totalLaborCost,
  phaseColor
}: PhaseHeaderProps) {
  return (
    <CollapsibleTrigger asChild>
      <CardHeader className="cursor-pointer hover:bg-opacity-80 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            <div>
              <h3 className="font-semibold text-lg">{phase}</h3>
              <p className="text-sm opacity-80">
                {phaseEstimatesCount} labor categories • ₹{phaseCost.toLocaleString()}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {Math.round((phaseCost / totalLaborCost) * 100)}% of total
          </Badge>
        </div>
      </CardHeader>
    </CollapsibleTrigger>
  );
}
