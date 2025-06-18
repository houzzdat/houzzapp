
import { 
  calculateExcavation, 
  calculatePCC, 
  calculateStructuralConcrete,
  calculateMasonry,
  calculateElectricalMaterials,
  calculatePlumbingMaterials,
  calculateFlooringMaterials,
  calculatePaintMaterials,
  wastageFactor,
  regionalFactors,
  qualityMultipliers
} from './materialCalculations';

export interface EnhancedProjectEstimates {
  foundation: FoundationEstimate;
  structure: StructureEstimate;
  masonry: MasonryEstimate;
  electrical: ElectricalEstimate;
  plumbing: PlumbingEstimate;
  flooring: FlooringEstimate;
  painting: PaintingEstimate;
  totalCost: number;
  breakdown: CostBreakdown;
}

export interface FoundationEstimate {
  excavation: {
    volume_cum: number;
    cost: number;
  };
  pcc: {
    volume_cum: number;
    cement_bags: number;
    sand_cft: number;
    aggregate_cft: number;
    cost: number;
  };
}

export interface StructureEstimate {
  concrete: {
    cement: { quantity: number; unit: string; cost: number };
    sand: { quantity: number; unit: string; cost: number };
    aggregate: { quantity: number; unit: string; cost: number };
    steel: { quantity: number; unit: string; cost: number };
  };
  totalCost: number;
}

export interface MasonryEstimate {
  bricks: number;
  mortar_cft: number;
  cement_bags: number;
  sand_cft: number;
  totalCost: number;
}

export interface ElectricalEstimate {
  wiring: any;
  protection: any;
  totalCost: number;
}

export interface PlumbingEstimate {
  cpvcPipes: any;
  pvcPipes: any;
  fittings: any;
  totalCost: number;
}

export interface FlooringEstimate {
  tiles: number;
  adhesive_kg: number;
  grout_kg: number;
  area_sqm: number;
  totalCost: number;
}

export interface PaintingEstimate {
  primer_liters: number;
  paint_liters: number;
  putty_kg: number;
  area_covered: number;
  totalCost: number;
}

export interface CostBreakdown {
  materials: number;
  labor: number;
  transport: number;
  overhead: number;
  profit: number;
}

export function calculateEnhancedProjectEstimates(projectData: any): EnhancedProjectEstimates {
  console.log('Starting enhanced estimation calculation with project data:', projectData);
  
  const builtArea = projectData.built_up_area || 0;
  const floors = projectData.number_of_floors || 1;
  const location = projectData.location || 'bangalore';
  const qualityGrade = projectData.quality_standards || 'standard';
  
  // Get regional and quality multipliers
  const regionFactor = regionalFactors[location.toLowerCase()] || regionalFactors.bangalore;
  const qualityFactor = qualityMultipliers[qualityGrade.toLowerCase()] || qualityMultipliers.standard;
  
  // Foundation calculations - corrected to industry standards
  const foundationArea = builtArea * 0.08; // 8% of built area (realistic for foundation footprint)
  const foundationDepth = 1.2; 
  const soilType = projectData.soil_type || 'medium';
  
  const excavationVolume = calculateExcavation(
    { length: Math.sqrt(foundationArea), width: Math.sqrt(foundationArea) }, 
    foundationDepth, 
    soilType
  );
  
  const pccData = calculatePCC(foundationArea);
  
  const foundation: FoundationEstimate = {
    excavation: {
      volume_cum: excavationVolume,
      cost: excavationVolume * 120 * regionFactor.material
    },
    pcc: {
      ...pccData,
      cost: (pccData.cement_bags * 350) + (pccData.sand_cft * 40) + (pccData.aggregate_cft * 50)
    }
  };
  
  // Structure calculations - corrected formulas based on industry standards
  const structureData = calculateStructuralConcrete(builtArea, floors, 'M25');
  const structure: StructureEstimate = {
    concrete: {
      cement: {
        quantity: Math.round(structureData.cement.quantity),
        unit: structureData.cement.unit,
        cost: Math.round(structureData.cement.quantity) * 350 * regionFactor.material * qualityFactor
      },
      sand: {
        quantity: Math.round(structureData.sand.quantity),
        unit: structureData.sand.unit,
        cost: Math.round(structureData.sand.quantity) * 40 * regionFactor.material
      },
      aggregate: {
        quantity: Math.round(structureData.coarseAggregate.quantity),
        unit: structureData.coarseAggregate.unit,
        cost: Math.round(structureData.coarseAggregate.quantity) * 50 * regionFactor.material
      },
      steel: {
        quantity: Math.round(structureData.steel.quantity),
        unit: structureData.steel.unit,
        cost: Math.round(structureData.steel.quantity) * 60 * regionFactor.material * qualityFactor
      }
    },
    totalCost: 0
  };
  
  structure.totalCost = structure.concrete.cement.cost + structure.concrete.sand.cost + 
                       structure.concrete.aggregate.cost + structure.concrete.steel.cost;
  
  // Masonry calculations - corrected wall area calculation
  const wallArea = builtArea * 0.35 * floors; // 35% of built area per floor (realistic for residential)
  const wallThickness = projectData.wall_thickness || 0.23;
  const masonryData = calculateMasonry(wallArea, wallThickness, 'standard');
  
  const masonry: MasonryEstimate = {
    bricks: Math.round(masonryData.bricks),
    mortar_cft: masonryData.mortar_cft,
    cement_bags: Math.round(masonryData.cement_bags),
    sand_cft: Math.round(masonryData.sand_cft),
    totalCost: (Math.round(masonryData.bricks) * 7) + 
               (Math.round(masonryData.cement_bags) * 350) + 
               (Math.round(masonryData.sand_cft) * 40)
  };
  
  // Electrical calculations - realistic room count
  const roomCount = Math.ceil(builtArea / 150) + floors; // More realistic: 1 room per 150 sqft + 1 per floor
  const electricalData = calculateElectricalMaterials(builtArea, floors, roomCount);
  
  const electrical: ElectricalEstimate = {
    wiring: electricalData.wiring,
    protection: electricalData.protection,
    totalCost: (electricalData.wiring.wireLength * 35) + 
               (electricalData.protection.mcbSingle * 150) + 
               (electricalData.protection.distributionBoard * 2000)
  };
  
  // Plumbing calculations - realistic bathroom/kitchen count
  const bathrooms = Math.max(1, Math.ceil(builtArea / 400)); // 1 bathroom per 400 sqft
  const kitchens = Math.min(floors, 2); // Max 2 kitchens even for multi-floor
  const plumbingData = calculatePlumbingMaterials(bathrooms, kitchens, floors);
  
  const plumbing: PlumbingEstimate = {
    ...plumbingData,
    totalCost: (plumbingData.cpvcPipes['15mm'] * 20) + 
               (plumbingData.pvcPipes['110mm'] * 30) + 
               (plumbingData.fittings.ballValves * 120) + 
               (plumbingData.fittings.elbows * 20)
  };
  
  // Flooring calculations - actual floor area
  const flooringArea = builtArea * floors * 0.85; // 85% of total built area (excluding walls)
  const floorType = projectData.flooring_type || 'ceramicTiles';
  const flooringData = calculateFlooringMaterials(flooringArea, floorType);
  
  const flooring: FlooringEstimate = {
    ...flooringData,
    totalCost: (flooringData.tiles * 30) + 
               (flooringData.adhesive_kg * 10) + 
               (flooringData.grout_kg * 20)
  };
  
  // Painting calculations - wall and ceiling area
  const paintableArea = (wallArea * 0.85) + (builtArea * floors); // 85% wall area (minus doors/windows) + ceiling
  const paintingData = calculatePaintMaterials(paintableArea, 2, 'emulsion');
  
  const painting: PaintingEstimate = {
    ...paintingData,
    totalCost: (paintingData.primer_liters * 100) + 
               (paintingData.paint_liters * 150) + 
               (paintingData.putty_kg * 20)
  };
  
  // Calculate total costs with realistic margins
  const materialsCost = foundation.excavation.cost + foundation.pcc.cost + structure.totalCost + 
                       masonry.totalCost + electrical.totalCost + plumbing.totalCost + 
                       flooring.totalCost + painting.totalCost;
  
  const laborCost = materialsCost * 0.35 * regionFactor.labor;
  const transportCost = materialsCost * 0.05 * regionFactor.transport;
  const overheadCost = (materialsCost + laborCost + transportCost) * 0.12;
  const profitCost = (materialsCost + laborCost + transportCost + overheadCost) * 0.08;
  
  const totalCost = materialsCost + laborCost + transportCost + overheadCost + profitCost;
  
  const breakdown: CostBreakdown = {
    materials: materialsCost,
    labor: laborCost,
    transport: transportCost,
    overhead: overheadCost,
    profit: profitCost
  };
  
  return {
    foundation,
    structure,
    masonry,
    electrical,
    plumbing,
    flooring,
    painting,
    totalCost,
    breakdown
  };
}
