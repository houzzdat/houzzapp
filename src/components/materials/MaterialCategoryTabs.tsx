
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Wrench } from "lucide-react";
import { GroupedMaterials } from "@/hooks/useMaterials";
import { Database } from "@/integrations/supabase/types";
import MaterialCard from "./MaterialCard";

type Material = Database['public']['Tables']['material_master']['Row'];

interface MaterialCategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  groupedMaterials: GroupedMaterials;
  filteredMaterials: Material[];
  selectedMaterials: Material[];
  editingPrice: string | null;
  tempPrice: string;
  onSelectMaterial?: (material: Material) => void;
  onEditPrice: (material: Material) => void;
  onSavePrice: (materialId: string) => void;
  onCancelEdit: () => void;
  onPriceChange: (price: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  concrete: <Package className="h-4 w-4" />,
  steel: <Wrench className="h-4 w-4" />,
  brick: <Package className="h-4 w-4" />,
  cement: <Package className="h-4 w-4" />,
  sand: <Package className="h-4 w-4" />,
  aggregate: <Package className="h-4 w-4" />,
  electrical: <Wrench className="h-4 w-4" />,
  plumbing: <Wrench className="h-4 w-4" />,
  finishing: <Package className="h-4 w-4" />
};

const categoryLabels: Record<string, string> = {
  concrete: 'Concrete',
  steel: 'Steel',
  brick: 'Masonry',
  cement: 'Cement',
  sand: 'Sand',
  aggregate: 'Aggregate',
  electrical: 'Electrical',
  plumbing: 'Plumbing',
  finishing: 'Finishing'
};

export default function MaterialCategoryTabs({
  selectedCategory,
  onCategoryChange,
  groupedMaterials,
  filteredMaterials,
  selectedMaterials,
  editingPrice,
  tempPrice,
  onSelectMaterial,
  onEditPrice,
  onSavePrice,
  onCancelEdit,
  onPriceChange
}: MaterialCategoryTabsProps) {
  const isSelected = (material: Material) => {
    return selectedMaterials.some(selected => selected.id === material.id);
  };

  return (
    <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
      <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
        <TabsTrigger value="all">All</TabsTrigger>
        {Object.keys(groupedMaterials).map(category => (
          <TabsTrigger key={category} value={category} className="flex items-center gap-1">
            {categoryIcons[category]}
            <span className="hidden sm:inline">{categoryLabels[category]}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value={selectedCategory} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              isSelected={isSelected(material)}
              isEditing={editingPrice === material.id}
              tempPrice={tempPrice}
              categoryLabel={categoryLabels[material.category]}
              onSelect={onSelectMaterial}
              onEditPrice={onEditPrice}
              onSavePrice={onSavePrice}
              onCancelEdit={onCancelEdit}
              onPriceChange={onPriceChange}
            />
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No materials found matching your criteria
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
