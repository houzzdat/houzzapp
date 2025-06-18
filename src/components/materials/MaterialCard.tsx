
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DollarSign, Edit, Check, X } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type Material = Database['public']['Tables']['material_master']['Row'];

interface MaterialCardProps {
  material: Material;
  isSelected: boolean;
  isEditing: boolean;
  tempPrice: string;
  categoryLabel: string;
  onSelect?: (material: Material) => void;
  onEditPrice: (material: Material) => void;
  onSavePrice: (materialId: string) => void;
  onCancelEdit: () => void;
  onPriceChange: (price: string) => void;
}

export default function MaterialCard({
  material,
  isSelected,
  isEditing,
  tempPrice,
  categoryLabel,
  onSelect,
  onEditPrice,
  onSavePrice,
  onCancelEdit,
  onPriceChange
}: MaterialCardProps) {
  return (
    <Card 
      className={`cursor-pointer transition-colors hover:bg-gray-50 ${
        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
      }`}
      onClick={() => onSelect?.(material)}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-sm leading-tight">{material.name}</h3>
            <Badge variant="secondary" className="text-xs">
              {categoryLabel}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <DollarSign className="h-3 w-3" />
              {isEditing ? (
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <span>₹</span>
                  <Input
                    type="number"
                    value={tempPrice}
                    onChange={(e) => onPriceChange(e.target.value)}
                    className="w-20 h-6 text-xs"
                    step="0.01"
                    min="0"
                  />
                  <span className="text-xs">/ {material.unit}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => onSavePrice(material.id)}
                  >
                    <Check className="h-3 w-3 text-green-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={onCancelEdit}
                  >
                    <X className="h-3 w-3 text-red-600" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <span>₹{material.base_rate.toLocaleString()} / {material.unit}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditPrice(material);
                    }}
                  >
                    <Edit className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {material.description && (
            <p className="text-xs text-gray-500 line-clamp-2">
              {material.description}
            </p>
          )}
          
          {material.calculation_formula && (
            <div className="text-xs text-blue-600 font-mono">
              {material.calculation_formula}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
