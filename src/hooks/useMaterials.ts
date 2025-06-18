
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Material = Database['public']['Tables']['material_master']['Row'];
type MaterialCategory = Database['public']['Enums']['material_category'];

export interface GroupedMaterials {
  [category: string]: Material[];
}

export function useMaterials() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [groupedMaterials, setGroupedMaterials] = useState<GroupedMaterials>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('material_master')
        .select('*')
        .order('category', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;

      setMaterials(data || []);
      
      // Group materials by category
      const grouped = (data || []).reduce((acc, material) => {
        const category = material.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(material);
        return acc;
      }, {} as GroupedMaterials);

      setGroupedMaterials(grouped);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch materials');
      console.error('Error fetching materials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const getMaterialsByCategory = (category: MaterialCategory) => {
    return materials.filter(material => material.category === category);
  };

  const searchMaterials = (query: string) => {
    if (!query.trim()) return materials;
    
    const lowercaseQuery = query.toLowerCase();
    return materials.filter(material => 
      material.name.toLowerCase().includes(lowercaseQuery) ||
      material.description?.toLowerCase().includes(lowercaseQuery) ||
      material.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    materials,
    groupedMaterials,
    loading,
    error,
    refetch: fetchMaterials,
    getMaterialsByCategory,
    searchMaterials
  };
}
