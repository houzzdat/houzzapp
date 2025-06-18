
import { useState, useEffect } from "react";
import { MaterialEstimate } from "@/utils/estimationAlgorithms";
import { MaterialProcurementItem } from "@/types/procurement";

export function useProcurementData() {
  const [procurementData, setProcurementData] = useState<MaterialProcurementItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProcurementData();
  }, []);

  const loadProcurementData = () => {
    try {
      // Get material estimates from sessionStorage
      const storedEstimates = sessionStorage.getItem('materialEstimates');
      if (storedEstimates) {
        const estimates: MaterialEstimate[] = JSON.parse(storedEstimates);
        
        // Transform estimates into procurement data with mock available quantities and used till date
        const procurementItems: MaterialProcurementItem[] = estimates.map(estimate => {
          // Mock available quantities (in real app, this would come from inventory system)
          const availableQuantity = Math.max(0, estimate.quantity - Math.floor(Math.random() * estimate.quantity));
          // Mock used till date (in real app, this would come from project tracking system)
          const usedTillDate = Math.floor(Math.random() * estimate.quantity * 0.7);
          
          // Determine status based on availability and usage
          const status: 'Need to procure' | 'Available' = 
            availableQuantity === 0 && usedTillDate < estimate.quantity 
              ? 'Need to procure' 
              : 'Available';
          
          return {
            ...estimate,
            availableQuantity,
            requiredQuantity: estimate.quantity,
            usedTillDate,
            status
          };
        });
        
        setProcurementData(procurementItems);
      }
    } catch (error) {
      console.error('Error loading procurement data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (itemId: string, newStatus: 'Need to procure' | 'Available') => {
    setProcurementData(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  return {
    procurementData,
    isLoading,
    handleStatusChange
  };
}
