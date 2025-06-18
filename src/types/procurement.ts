
import { MaterialEstimate } from "@/utils/estimationAlgorithms";

export interface MaterialProcurementItem extends MaterialEstimate {
  availableQuantity: number;
  requiredQuantity: number;
  usedTillDate: number;
  status: 'Need to procure' | 'Available';
}
