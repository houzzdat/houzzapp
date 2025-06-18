
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";
import { useMaterials } from "@/hooks/useMaterials";
import { Database } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import MaterialSearch from "./MaterialSearch";
import MaterialCategoryTabs from "./MaterialCategoryTabs";

type Material = Database['public']['Tables']['material_master']['Row'];

interface MaterialBrowserProps {
  onSelectMaterial?: (material: Material) => void;
  selectedMaterials?: Material[];
}

export default function MaterialBrowser({ onSelectMaterial, selectedMaterials = [] }: MaterialBrowserProps) {
  const { materials, groupedMaterials, loading, error, refetch } = useMaterials();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const { toast } = useToast();

  const filteredMaterials = React.useMemo(() => {
    let filtered = materials;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(material => 
        material.name.toLowerCase().includes(query) ||
        material.description?.toLowerCase().includes(query)
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(material => material.category === selectedCategory);
    }

    return filtered;
  }, [materials, searchQuery, selectedCategory]);

  const handleEditPrice = (material: Material) => {
    setEditingPrice(material.id);
    setTempPrice(material.base_rate.toString());
  };

  const handleSavePrice = async (materialId: string) => {
    const newPrice = parseFloat(tempPrice);
    if (isNaN(newPrice) || newPrice <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price greater than 0",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('material_master')
        .update({ base_rate: newPrice })
        .eq('id', materialId);

      if (error) throw error;

      await refetch();
      setEditingPrice(null);
      toast({
        title: "Price Updated",
        description: "Material price has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating price:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update material price",
        variant: "destructive"
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingPrice(null);
    setTempPrice('');
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading materials...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Material Browser
        </CardTitle>
        <CardDescription>
          Browse and select from {materials.length} available materials. Click the edit icon to modify prices.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <MaterialSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        <MaterialCategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          groupedMaterials={groupedMaterials}
          filteredMaterials={filteredMaterials}
          selectedMaterials={selectedMaterials}
          editingPrice={editingPrice}
          tempPrice={tempPrice}
          onSelectMaterial={onSelectMaterial}
          onEditPrice={handleEditPrice}
          onSavePrice={handleSavePrice}
          onCancelEdit={handleCancelEdit}
          onPriceChange={setTempPrice}
        />
      </CardContent>
    </Card>
  );
}
