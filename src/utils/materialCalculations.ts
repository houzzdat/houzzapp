
// Foundation Materials Calculation - Industry standard formulas
export function calculateExcavation(buildingFootprint: { length: number; width: number }, foundationDepth: number, soilType: string) {
  const baseVolume = buildingFootprint.length * buildingFootprint.width * foundationDepth;
  const soilFactor = getSoilFactor(soilType);
  const wasteFactor = 1.02; // 2% waste
  return baseVolume * soilFactor * wasteFactor;
}

function getSoilFactor(soilType: string): number {
  const factors: { [key: string]: number } = {
    'soft': 1.0,
    'medium': 1.05,
    'hard': 1.10,
    'rock': 1.15
  };
  return factors[soilType] || 1.0;
}

// PCC Calculation - Standard 1:4:8 mix
export function calculatePCC(foundationArea: number, pccThickness: number = 0.075) {
  const volume = foundationArea * pccThickness;
  return {
    volume_cum: volume * 1.02, // 2% waste
    cement_bags: volume * 4.5, // For 1:4:8 mix (industry standard)
    sand_cft: volume * 10.5,   // Corrected sand quantity
    aggregate_cft: volume * 21.0 // Corrected aggregate quantity
  };
}

// Structural Concrete Calculation - Realistic industry formulas
export function calculateStructuralConcrete(builtArea: number, floors: number, concreteGrade: string) {
  const algorithms = {
    cement: {
      formula: "builtArea * 0.22 * floors", // Realistic: 0.22 bags per sqft
      unit: "bags",
      wastage: 0.02
    },
    sand: {
      formula: "builtArea * 0.8 * floors", // Realistic: 0.8 cft per sqft
      unit: "cft",
      wastage: 0.03
    },
    coarseAggregate: {
      formula: "builtArea * 0.9 * floors", // Realistic: 0.9 cft per sqft
      unit: "cft", 
      wastage: 0.03
    },
    steel: {
      formula: "builtArea * 2.8 * floors", // Realistic: 2.8 kg per sqft
      unit: "kg",
      wastage: 0.03
    }
  };
  
  return processCalculations(algorithms, { builtArea, floors });
}

function processCalculations(algorithms: any, params: any) {
  const results: any = {};
  
  for (const [key, config] of Object.entries(algorithms)) {
    const formula = (config as any).formula;
    let quantity = 0;
    
    // Simple formula evaluation - corrected calculations
    if (formula.includes("builtArea * 0.22 * floors")) {
      quantity = params.builtArea * 0.22 * params.floors;
    } else if (formula.includes("builtArea * 0.8 * floors")) {
      quantity = params.builtArea * 0.8 * params.floors;
    } else if (formula.includes("builtArea * 0.9 * floors")) {
      quantity = params.builtArea * 0.9 * params.floors;
    } else if (formula.includes("builtArea * 2.8 * floors")) {
      quantity = params.builtArea * 2.8 * params.floors;
    }
    
    const wastage = (config as any).wastage || 0;
    results[key] = {
      quantity: Math.round(quantity * (1 + wastage)),
      unit: (config as any).unit,
      wastage: wastage * 100
    };
  }
  
  return results;
}

// Masonry Materials Calculation - Industry standard
export function calculateMasonry(wallArea: number, wallThickness: number, brickType: string) {
  const brickSizes: { [key: string]: { length: number; height: number; thickness: number } } = {
    standard: { length: 0.19, height: 0.09, thickness: 0.09 },
    modular: { length: 0.19, height: 0.09, thickness: 0.09 }
  };
  
  const brick = brickSizes[brickType] || brickSizes.standard;
  const mortarThickness = 0.01; // 10mm mortar joint
  
  const brickArea = (brick.length + mortarThickness) * (brick.height + mortarThickness);
  const bricksPerSqm = 1 / brickArea;
  
  // Industry standard: 55-60 bricks per sqm for 230mm wall
  const actualBricksPerSqm = wallThickness >= 0.23 ? 55 : 40;
  
  return {
    bricks: Math.ceil(wallArea * actualBricksPerSqm * 1.03), // 3% wastage
    mortar_cft: wallArea * wallThickness * 0.18, // 18% mortar volume
    cement_bags: (wallArea * wallThickness * 0.18) / 1.6, // 1:6 mortar
    sand_cft: (wallArea * wallThickness * 0.18) * 0.85 // Sand component
  };
}

// Electrical Materials Calculation - Realistic quantities
export function calculateElectricalMaterials(builtArea: number, floors: number, roomCount: number) {
  const lightPoints = roomCount * 1.5; // 1.5 lights per room
  const fanPoints = roomCount * 0.8;   // 0.8 fans per room  
  const socketPoints = roomCount * 2.5; // 2.5 sockets per room
  const totalPoints = lightPoints + fanPoints + socketPoints;
  
  const wireLength = totalPoints * 15; // 15m per point (realistic)
  
  return {
    wiring: {
      lightPoints,
      fanPoints,
      socketPoints,
      wireLength,
      pvcConduit: Math.round(wireLength * 1.1),
      concealedBoxes: totalPoints,
      switches: lightPoints + fanPoints,
      sockets: socketPoints
    },
    protection: {
      mcbSingle: Math.ceil(totalPoints / 12), // 12 points per MCB
      mcbTriple: Math.ceil(floors), 
      distributionBoard: floors
    }
  };
}

// Plumbing Materials Calculation - Industry realistic
export function calculatePlumbingMaterials(bathrooms: number, kitchens: number, floors: number) {
  const waterPoints = {
    bathroom: 4, // 4 points per bathroom (realistic)
    kitchen: 2   // 2 points per kitchen
  };
  
  const totalWaterPoints = (bathrooms * waterPoints.bathroom) + (kitchens * waterPoints.kitchen);
  
  return {
    cpvcPipes: {
      "15mm": totalWaterPoints * 4,  // 4m per point
      "20mm": floors * 8,           // 8m per floor
      "25mm": floors * 4            // 4m per floor
    },
    pvcPipes: {
      "75mm": bathrooms * 4,         // 4m per bathroom
      "50mm": (bathrooms + kitchens) * 2, // 2m per fixture
      "110mm": floors * 8           // 8m per floor
    },
    fittings: {
      elbows: totalWaterPoints * 2, 
      tees: totalWaterPoints * 1, 
      couplings: totalWaterPoints * 1.5,
      ballValves: totalWaterPoints
    }
  };
}

// Flooring Materials Calculation - Industry standard
export function calculateFlooringMaterials(floorArea: number, floorType: string) {
  const floorSpecs: { [key: string]: any } = {
    vitrifiedTiles: {
      coverage: 0.36, // sqm per tile (600x600mm)
      wastage: 0.08,
      adhesive: 2.5,  // kg per sqm
      grout: 0.8      // kg per sqm
    },
    ceramicTiles: {
      coverage: 0.25, // sqm per tile (500x500mm)
      wastage: 0.08,
      adhesive: 2.0,
      grout: 0.6
    },
    granite: {
      wastage: 0.05,
      adhesive: 3.0,
      grout: 0
    }
  };
  
  const spec = floorSpecs[floorType] || floorSpecs.ceramicTiles;
  const adjustedArea = floorArea * (1 + spec.wastage);
  
  return {
    tiles: spec.coverage ? Math.ceil(adjustedArea / spec.coverage) : adjustedArea,
    adhesive_kg: adjustedArea * spec.adhesive,
    grout_kg: adjustedArea * spec.grout,
    area_sqm: adjustedArea
  };
}

// Paint Calculation Algorithm - Industry standard coverage
export function calculatePaintMaterials(paintableArea: number, coats: number = 2, paintType: string = "emulsion") {
  const paintCoverage: { [key: string]: number } = {
    emulsion: 16,      // 16 sqm per liter (industry standard)
    enamel: 14,        // 14 sqm per liter
    primer: 18,        // 18 sqm per liter
    texture: 12        // 12 sqm per liter
  };
  
  const coverage = paintCoverage[paintType] || paintCoverage.emulsion;
  const wastage = 0.08; // 8% wastage
  
  return {
    primer_liters: Math.ceil((paintableArea / 18) * (1 + wastage)),
    paint_liters: Math.ceil((paintableArea * coats / coverage) * (1 + wastage)),
    putty_kg: paintableArea * 0.3, // 0.3 kg per sqm
    area_covered: paintableArea
  };
}

// Material Wastage Factors - Industry standard
export const wastageFactor = {
  concrete: 0.02,      // 2%
  steel: 0.03,         // 3%
  masonry: 0.03,       // 3%
  tiles: 0.08,         // 8%
  electrical: 0.03,    // 3%
  plumbing: 0.03,      // 3%
  paint: 0.08,         // 8%
  waterproofing: 0.08  // 8%
};

// Regional Adjustment Factors - Realistic
export const regionalFactors = {
  bangalore: {
    material: 1.0,
    labor: 1.05,
    transport: 1.02
  },
  mumbai: {
    material: 1.12,
    labor: 1.18,
    transport: 1.06
  },
  delhi: {
    material: 1.05,
    labor: 1.10,
    transport: 1.04
  },
  chennai: {
    material: 1.02,
    labor: 1.08,
    transport: 1.03
  },
  hyderabad: {
    material: 0.95,
    labor: 1.05,
    transport: 1.02
  },
  pune: {
    material: 1.0,
    labor: 1.06,
    transport: 1.02
  }
};

// Quality Grade Multipliers - Realistic
export const qualityMultipliers = {
  economy: 0.90,
  standard: 1.0,
  premium: 1.25,
  luxury: 1.50
};
