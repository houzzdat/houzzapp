
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { EnhancedProjectEstimates } from "@/utils/enhancedEstimationAlgorithms";
import { Calculator, Home, Zap, Droplets, Square, Palette, TrendingUp, ChevronDown, ChevronRight } from "lucide-react";

interface EnhancedEstimationTabProps {
  estimates: EnhancedProjectEstimates;
  projectData: any;
}

// New Material Detail Card Component
const MaterialDetailCard = ({ 
  material, 
  quantity, 
  unit, 
  cost,
  details
}: { 
  material: string; 
  quantity: number | string; 
  unit: string; 
  cost: number | string;
  details?: { label: string; value: string | number }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 text-base mb-2">
                {material}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {quantity} {unit}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-base font-bold px-3 py-1">
                {typeof cost === 'number' ? `₹${cost.toLocaleString()}` : cost}
              </Badge>
              {details && details.length > 0 && (
                isOpen ? <ChevronDown className="h-5 w-5 text-gray-500" /> : <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      
      {details && details.length > 0 && (
        <CollapsibleContent>
          <div className="bg-gray-50 mx-0 mt-2 p-4 rounded-lg border">
            <h5 className="font-medium text-gray-800 mb-3 text-sm">Material Breakdown</h5>
            <div className="space-y-3">
              {details.map((detail, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span className="text-sm text-gray-700 font-medium">{detail.label}</span>
                  <span className="text-sm font-semibold text-gray-900 bg-white px-2 py-1 rounded">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      )}
    </Collapsible>
  );
};

export default function EnhancedEstimationTab({ estimates, projectData }: EnhancedEstimationTabProps) {
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
  
  const sections = [
    {
      id: 'foundation',
      title: 'Foundation Work',
      icon: Home,
      color: 'bg-blue-50 border-blue-200',
      totalCost: estimates.foundation.excavation.cost + estimates.foundation.pcc.cost
    },
    {
      id: 'structure',
      title: 'Structural Work',
      icon: Home,
      color: 'bg-green-50 border-green-200',
      totalCost: estimates.structure.totalCost
    },
    {
      id: 'masonry',
      title: 'Masonry Work',
      icon: Square,
      color: 'bg-orange-50 border-orange-200',
      totalCost: estimates.masonry.totalCost
    },
    {
      id: 'electrical',
      title: 'Electrical Work',
      icon: Zap,
      color: 'bg-yellow-50 border-yellow-200',
      totalCost: estimates.electrical.totalCost
    },
    {
      id: 'plumbing',
      title: 'Plumbing Work',
      icon: Droplets,
      color: 'bg-cyan-50 border-cyan-200',
      totalCost: estimates.plumbing.totalCost
    },
    {
      id: 'flooring',
      title: 'Flooring Work',
      icon: Square,
      color: 'bg-purple-50 border-purple-200',
      totalCost: estimates.flooring.totalCost
    },
    {
      id: 'painting',
      title: 'Painting Work',
      icon: Palette,
      color: 'bg-pink-50 border-pink-200',
      totalCost: estimates.painting.totalCost
    }
  ];

  return (
    <div className="space-y-6">
      {/* Summary Cards - Optimized for mobile */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-brand-orange/10 to-brand-orange/20 border-brand-orange/30">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Calculator className="h-5 w-5 text-brand-orange" />
              </div>
              <div>
                <p className="text-xs font-medium text-brand-dark-blue">Total Cost</p>
                <p className="text-lg font-bold text-brand-dark-blue">
                  {formatCurrency(estimates.totalCost)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Home className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-blue-700">Materials</p>
                <p className="text-lg font-bold text-blue-800">
                  {formatCurrency(estimates.breakdown.materials)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-700">Labor</p>
                <p className="text-lg font-bold text-green-800">
                  {formatCurrency(estimates.breakdown.labor)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Calculator className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-purple-700">Other</p>
                <p className="text-lg font-bold text-purple-800">
                  {formatCurrency(estimates.breakdown.transport + estimates.breakdown.overhead + estimates.breakdown.profit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Breakdown with New Card Design */}
      <Tabs defaultValue="foundation" className="space-y-4">
        {/* Optimized tabs for mobile */}
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 min-w-[400px] lg:min-w-0">
            {sections.map((section) => (
              <TabsTrigger 
                key={section.id} 
                value={section.id} 
                className="text-xs p-2 min-h-[44px] flex flex-col items-center gap-1"
              >
                <section.icon className="h-4 w-4" />
                <span className="leading-tight text-center">
                  {section.title.split(' ')[0]}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="foundation" className="space-y-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>Foundation Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.foundation.excavation.cost + estimates.foundation.pcc.cost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Excavation Work"
                quantity={estimates.foundation.excavation.volume_cum.toFixed(2)}
                unit="cum"
                cost={formatCurrency(estimates.foundation.excavation.cost)}
              />
              <MaterialDetailCard
                material="PCC Foundation"
                quantity={estimates.foundation.pcc.volume_cum.toFixed(2)}
                unit="cum"
                cost={formatCurrency(estimates.foundation.pcc.cost)}
                details={[
                  { label: 'Cement', value: `${Math.round(estimates.foundation.pcc.cement_bags)} bags` },
                  { label: 'Sand', value: `${Math.round(estimates.foundation.pcc.sand_cft)} cft` },
                  { label: 'Aggregate', value: `${Math.round(estimates.foundation.pcc.aggregate_cft)} cft` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card className="bg-green-50 border-green-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>Structural Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.structure.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Concrete Work"
                quantity="Complete"
                unit="job"
                cost={formatCurrency(estimates.structure.totalCost)}
                details={[
                  { label: 'Cement', value: `${estimates.structure.concrete.cement.quantity} ${estimates.structure.concrete.cement.unit}` },
                  { label: 'Sand', value: `${estimates.structure.concrete.sand.quantity} ${estimates.structure.concrete.sand.unit}` },
                  { label: 'Aggregate', value: `${estimates.structure.concrete.aggregate.quantity} ${estimates.structure.concrete.aggregate.unit}` },
                  { label: 'Steel', value: `${estimates.structure.concrete.steel.quantity} ${estimates.structure.concrete.steel.unit}` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="masonry" className="space-y-4">
          <Card className="bg-orange-50 border-orange-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5" />
                  <span>Masonry Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.masonry.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Brick Masonry"
                quantity={estimates.masonry.bricks}
                unit="nos"
                cost={formatCurrency(estimates.masonry.totalCost)}
                details={[
                  { label: 'Bricks', value: `${estimates.masonry.bricks} nos` },
                  { label: 'Cement', value: `${Math.round(estimates.masonry.cement_bags)} bags` },
                  { label: 'Sand', value: `${estimates.masonry.sand_cft.toFixed(1)} cft` },
                  { label: 'Mortar', value: `${estimates.masonry.mortar_cft.toFixed(1)} cft` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="electrical" className="space-y-4">
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>Electrical Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.electrical.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Electrical Installation"
                quantity="Complete"
                unit="job"
                cost={formatCurrency(estimates.electrical.totalCost)}
                details={[
                  { label: 'Wire Length', value: `${estimates.electrical.wiring.wireLength} m` },
                  { label: 'Light Points', value: `${estimates.electrical.wiring.lightPoints} nos` },
                  { label: 'Fan Points', value: `${estimates.electrical.wiring.fanPoints} nos` },
                  { label: 'Socket Points', value: `${estimates.electrical.wiring.socketPoints} nos` },
                  { label: 'MCBs', value: `${estimates.electrical.protection.mcbSingle} nos` },
                  { label: 'Distribution Board', value: `${estimates.electrical.protection.distributionBoard} nos` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plumbing" className="space-y-4">
          <Card className="bg-cyan-50 border-cyan-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  <span>Plumbing Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.plumbing.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Plumbing Installation"
                quantity="Complete"
                unit="job"
                cost={formatCurrency(estimates.plumbing.totalCost)}
                details={[
                  ...Object.entries(estimates.plumbing.cpvcPipes).map(([size, length]) => ({
                    label: `CPVC ${size}`,
                    value: `${length} m`
                  })),
                  ...Object.entries(estimates.plumbing.pvcPipes).map(([size, length]) => ({
                    label: `PVC ${size}`,
                    value: `${length} m`
                  })),
                  { label: 'Ball Valves', value: `${estimates.plumbing.fittings.ballValves} nos` },
                  { label: 'Elbows', value: `${estimates.plumbing.fittings.elbows} nos` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flooring" className="space-y-4">
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5" />
                  <span>Flooring Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.flooring.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Floor Tiling"
                quantity={estimates.flooring.area_sqm.toFixed(1)}
                unit="sqm"
                cost={formatCurrency(estimates.flooring.totalCost)}
                details={[
                  { label: 'Tiles', value: `${estimates.flooring.tiles} nos` },
                  { label: 'Adhesive', value: `${estimates.flooring.adhesive_kg.toFixed(1)} kg` },
                  { label: 'Grout', value: `${estimates.flooring.grout_kg.toFixed(1)} kg` },
                  { label: 'Area', value: `${estimates.flooring.area_sqm.toFixed(1)} sqm` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="painting" className="space-y-4">
          <Card className="bg-pink-50 border-pink-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  <span>Painting Work</span>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {formatCurrency(estimates.painting.totalCost)}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <MaterialDetailCard
                material="Wall Painting"
                quantity={estimates.painting.area_covered.toFixed(1)}
                unit="sqm"
                cost={formatCurrency(estimates.painting.totalCost)}
                details={[
                  { label: 'Primer', value: `${estimates.painting.primer_liters} ltrs` },
                  { label: 'Paint', value: `${estimates.painting.paint_liters} ltrs` },
                  { label: 'Putty', value: `${estimates.painting.putty_kg.toFixed(1)} kg` },
                  { label: 'Area', value: `${estimates.painting.area_covered.toFixed(1)} sqm` }
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Cost Breakdown Summary - Mobile optimized */}
      <Card className="bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Cost Breakdown Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(estimates.breakdown).map(([key, value]) => (
              <div key={key} className="bg-white p-4 rounded-lg border text-center">
                <h4 className="font-medium capitalize text-slate-700 text-sm mb-1">{key}</h4>
                <p className="text-lg font-bold text-slate-900 mb-1">{formatCurrency(value)}</p>
                <p className="text-xs text-slate-500">
                  {((value / estimates.totalCost) * 100).toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
