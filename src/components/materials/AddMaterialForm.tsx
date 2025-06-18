
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

type MaterialCategory = Database['public']['Enums']['material_category'];

const categories: { value: MaterialCategory; label: string }[] = [
  { value: 'concrete', label: 'Concrete' },
  { value: 'steel', label: 'Steel' },
  { value: 'brick', label: 'Masonry' },
  { value: 'cement', label: 'Cement' },
  { value: 'sand', label: 'Sand' },
  { value: 'aggregate', label: 'Aggregate' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'finishing', label: 'Finishing' }
];

interface AddMaterialFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function AddMaterialForm({ onSuccess, onCancel }: AddMaterialFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '' as MaterialCategory,
    unit: '',
    base_rate: '',
    calculation_formula: '',
    wastage_factor: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.unit || !formData.base_rate) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('material_master')
        .insert({
          name: formData.name,
          category: formData.category,
          unit: formData.unit,
          base_rate: parseFloat(formData.base_rate),
          calculation_formula: formData.calculation_formula || null,
          wastage_factor: formData.wastage_factor ? parseFloat(formData.wastage_factor) / 100 : 0.05,
          description: formData.description || null
        });

      if (error) throw error;

      toast({
        title: "Material Added",
        description: "New material has been added successfully"
      });

      // Reset form
      setFormData({
        name: '',
        category: '' as MaterialCategory,
        unit: '',
        base_rate: '',
        calculation_formula: '',
        wastage_factor: '',
        description: ''
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error adding material:', error);
      toast({
        title: "Error",
        description: "Failed to add material",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Material Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter material name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="unit">Unit *</Label>
          <Input
            id="unit"
            value={formData.unit}
            onChange={(e) => handleInputChange('unit', e.target.value)}
            placeholder="e.g., kg, nos, sqm, cft"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="base_rate">Base Rate (₹) *</Label>
          <Input
            id="base_rate"
            type="number"
            step="0.01"
            min="0"
            value={formData.base_rate}
            onChange={(e) => handleInputChange('base_rate', e.target.value)}
            placeholder="Enter price in rupees"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="calculation_formula">Estimation Formula</Label>
          <Input
            id="calculation_formula"
            value={formData.calculation_formula}
            onChange={(e) => handleInputChange('calculation_formula', e.target.value)}
            placeholder="e.g., built_area * 0.4"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wastage_factor">Wastage Factor (%)</Label>
          <Input
            id="wastage_factor"
            type="number"
            step="0.1"
            min="0"
            max="100"
            value={formData.wastage_factor}
            onChange={(e) => handleInputChange('wastage_factor', e.target.value)}
            placeholder="e.g., 5 for 5%"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter material description"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Material'}
        </Button>
      </div>
    </form>
  );
}
