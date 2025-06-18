export interface ProjectEstimates {
  materials: MaterialEstimate[];
  labor: LaborEstimate[];
  equipment: EquipmentEstimate[];
  timeline: TimelineEstimate;
  cost: CostEstimate;
  safety: SafetyEstimate;
  quality: QualityEstimate;
}

export interface MaterialEstimate {
  id: string;
  category: string;
  item: string;
  quantity: number;
  unit: string;
  unitRate: number;
  totalCost: number;
  isEditable: boolean;
  actualQuantity?: number;
  actualCost?: number;
  variance?: number;
}

export interface LaborEstimate {
  id: string;
  skillType: string;
  quantity: number;
  unit: string;
  rate: number;
  duration: number;
  totalCost: number;
  isEditable: boolean;
  phase?: string;
  actualQuantity?: number;
  actualDuration?: number;
  actualCost?: number;
  variance?: number;
}

export interface EquipmentEstimate {
  id: string;
  equipment: string;
  quantity: number;
  duration: number;
  rate: number;
  totalCost: number;
  isEditable: boolean;
  actualDuration?: number;
  actualCost?: number;
  variance?: number;
}

export interface TimelineEstimate {
  totalDuration: number;
  phases: {
    phase: string;
    duration: number;
    dependencies: string[];
    percentageOfTotal: number;
    actualDuration?: number;
    variance?: number;
  }[];
  bufferTime: number;
  actualTotalDuration?: number;
}

export interface CostEstimate {
  materialCost: number;
  laborCost: number;
  equipmentCost: number;
  overheadCost: number;
  totalCost: number;
  contingency: number;
  finalCost: number;
  actualMaterialCost?: number;
  actualLaborCost?: number;
  actualEquipmentCost?: number;
  actualOverheadCost?: number;
  actualTotalCost?: number;
  variance?: number;
}

export interface SafetyEstimate {
  ppeRequirements: {
    item: string;
    quantityPerWorker: number;
    totalQuantity: number;
    unitCost: number;
    totalCost: number;
  }[];
  trainingHours: number;
  safetyEquipmentBudget: number;
  firstAidStations: number;
  totalSafetyCost: number;
}

export interface QualityEstimate {
  testingSchedule: {
    testType: string;
    frequency: string;
    estimatedTests: number;
    costPerTest: number;
    totalCost: number;
  }[];
  totalQualityCost: number;
}

export function calculateProjectEstimates(projectData: any): ProjectEstimates {
  console.log('Starting estimation calculation with project data:', projectData);
  
  const materials = calculateMaterialEstimates(projectData);
  const labor = calculateLaborEstimates(projectData);
  const equipment = calculateEquipmentEstimates(projectData);
  const timeline = calculateTimelineEstimate(projectData);
  const safety = calculateSafetyEstimates(projectData);
  const quality = calculateQualityEstimates(projectData);
  const cost = calculateCostEstimate(materials, labor, equipment, projectData);

  console.log('Calculated materials:', materials);
  console.log('Calculated labor:', labor);
  console.log('Calculated equipment:', equipment);

  return {
    materials,
    labor,
    equipment,
    timeline,
    cost,
    safety,
    quality
  };
}

function calculateMaterialEstimates(data: any): MaterialEstimate[] {
  const estimates: MaterialEstimate[] = [];
  // Fix: Use correct database field name
  const builtUpArea = data.built_up_area || 0;
  
  console.log('Material calculation - Built-up Area:', builtUpArea);

  // Cement calculation: Built-up Area × 0.4 bags
  const cementBags = builtUpArea * 0.4;
  estimates.push({
    id: 'cement',
    category: 'Binding',
    item: 'OPC Cement (50kg)',
    quantity: Math.round(cementBags),
    unit: 'bags',
    unitRate: 380,
    totalCost: Math.round(cementBags * 380),
    isEditable: true
  });

  // Steel calculation: Built-up Area × 4 kg
  const steelQuantity = builtUpArea * 4;
  estimates.push({
    id: 'steel',
    category: 'Structural',
    item: 'Steel Reinforcement',
    quantity: Math.round(steelQuantity),
    unit: 'kg',
    unitRate: 65,
    totalCost: Math.round(steelQuantity * 65),
    isEditable: true
  });

  // Sand calculation: Built-up Area × 1.8 cft
  const sandQuantity = builtUpArea * 1.8;
  estimates.push({
    id: 'sand',
    category: 'Aggregate',
    item: 'River Sand',
    quantity: Math.round(sandQuantity),
    unit: 'cft',
    unitRate: 45,
    totalCost: Math.round(sandQuantity * 45),
    isEditable: true
  });

  // Aggregate calculation: Built-up Area × 1.35 cft
  const aggregateQuantity = builtUpArea * 1.35;
  estimates.push({
    id: 'aggregate',
    category: 'Aggregate',
    item: '20mm Aggregate',
    quantity: Math.round(aggregateQuantity),
    unit: 'cft',
    unitRate: 55,
    totalCost: Math.round(aggregateQuantity * 55),
    isEditable: true
  });

  // Bricks calculation: Built-up Area × 8 units
  const brickQuantity = builtUpArea * 8;
  estimates.push({
    id: 'bricks',
    category: 'Masonry',
    item: 'Clay Bricks',
    quantity: Math.round(brickQuantity),
    unit: 'nos',
    unitRate: 8,
    totalCost: Math.round(brickQuantity * 8),
    isEditable: true
  });

  return estimates;
}

// Helper function to deduplicate material estimates
export function deduplicateMaterialEstimates(estimates: MaterialEstimate[]): MaterialEstimate[] {
  const deduplicatedMap = new Map<string, MaterialEstimate>();
  
  estimates.forEach(estimate => {
    // Create a key based on item name and category for deduplication
    const normalizedItem = estimate.item.toLowerCase().trim();
    const key = `${estimate.category}-${normalizedItem}`;
    
    if (deduplicatedMap.has(key)) {
      // If duplicate found, combine quantities and costs
      const existing = deduplicatedMap.get(key)!;
      const combinedQuantity = existing.quantity + estimate.quantity;
      const avgUnitRate = (existing.unitRate + estimate.unitRate) / 2; // Average the unit rates
      
      deduplicatedMap.set(key, {
        ...existing,
        quantity: combinedQuantity,
        unitRate: Math.round(avgUnitRate),
        totalCost: Math.round(combinedQuantity * avgUnitRate),
        id: existing.id // Keep the original ID
      });
      
      console.log(`Merged duplicate material: ${estimate.item} (${estimate.category})`);
    } else {
      deduplicatedMap.set(key, estimate);
    }
  });
  
  return Array.from(deduplicatedMap.values());
}

function calculateLaborEstimates(data: any): LaborEstimate[] {
  const estimates: LaborEstimate[] = [];
  // Fix: Use correct database field name
  const builtUpArea = data.built_up_area || 0;

  console.log('Labor calculation - Built-up Area:', builtUpArea);

  // Foundation Phase Labor
  const foundationSkilledWorkers = Math.ceil((builtUpArea / 800) * 1.2);
  const foundationDuration = Math.ceil(builtUpArea / 40);
  estimates.push({
    id: 'foundation-skilled',
    skillType: 'Foundation Skilled Workers',
    quantity: foundationSkilledWorkers,
    unit: 'nos',
    rate: 850,
    duration: foundationDuration,
    totalCost: Math.round(foundationSkilledWorkers * 850 * foundationDuration),
    isEditable: true,
    phase: 'Foundation'
  });

  estimates.push({
    id: 'foundation-unskilled',
    skillType: 'Foundation Helpers',
    quantity: Math.ceil(foundationSkilledWorkers * 1.5),
    unit: 'nos',
    rate: 520,
    duration: foundationDuration,
    totalCost: Math.round(Math.ceil(foundationSkilledWorkers * 1.5) * 520 * foundationDuration),
    isEditable: true,
    phase: 'Foundation'
  });

  // Superstructure Phase Labor
  const superstructureSkilledWorkers = Math.ceil((builtUpArea / 400) * 1.2);
  const superstructureDuration = Math.ceil(builtUpArea / 15);
  estimates.push({
    id: 'superstructure-skilled',
    skillType: 'Structural Skilled Workers',
    quantity: superstructureSkilledWorkers,
    unit: 'nos',
    rate: 900,
    duration: superstructureDuration,
    totalCost: Math.round(superstructureSkilledWorkers * 900 * superstructureDuration),
    isEditable: true,
    phase: 'Superstructure'
  });

  estimates.push({
    id: 'superstructure-unskilled',
    skillType: 'Structural Helpers',
    quantity: Math.ceil(superstructureSkilledWorkers * 1.8),
    unit: 'nos',
    rate: 550,
    duration: superstructureDuration,
    totalCost: Math.round(Math.ceil(superstructureSkilledWorkers * 1.8) * 550 * superstructureDuration),
    isEditable: true,
    phase: 'Superstructure'
  });

  // Finishing Phase Labor
  const finishingSkilledWorkers = Math.ceil((builtUpArea / 600) * 1.0);
  const finishingDuration = Math.ceil(builtUpArea / 25);
  estimates.push({
    id: 'finishing-skilled',
    skillType: 'Finishing Skilled Workers',
    quantity: finishingSkilledWorkers,
    unit: 'nos',
    rate: 750,
    duration: finishingDuration,
    totalCost: Math.round(finishingSkilledWorkers * 750 * finishingDuration),
    isEditable: true,
    phase: 'Finishing'
  });

  estimates.push({
    id: 'finishing-painters',
    skillType: 'Painters',
    quantity: Math.ceil(finishingSkilledWorkers * 0.8),
    unit: 'nos',
    rate: 680,
    duration: Math.ceil(finishingDuration * 0.6),
    totalCost: Math.round(Math.ceil(finishingSkilledWorkers * 0.8) * 680 * Math.ceil(finishingDuration * 0.6)),
    isEditable: true,
    phase: 'Finishing'
  });

  // MEP Work Phase Labor
  const mepWorkers = Math.ceil((builtUpArea / 1000) * 1.5);
  const mepDuration = Math.ceil(builtUpArea / 80);
  estimates.push({
    id: 'mep-electricians',
    skillType: 'Electricians',
    quantity: mepWorkers,
    unit: 'nos',
    rate: 1200,
    duration: mepDuration,
    totalCost: Math.round(mepWorkers * 1200 * mepDuration),
    isEditable: true,
    phase: 'MEP Work'
  });

  estimates.push({
    id: 'mep-plumbers',
    skillType: 'Plumbers',
    quantity: Math.ceil(mepWorkers * 0.8),
    unit: 'nos',
    rate: 1100,
    duration: mepDuration,
    totalCost: Math.round(Math.ceil(mepWorkers * 0.8) * 1100 * mepDuration),
    isEditable: true,
    phase: 'MEP Work'
  });

  // General Supervisors across all phases
  const totalWorkers = foundationSkilledWorkers + superstructureSkilledWorkers + finishingSkilledWorkers + mepWorkers;
  const supervisors = Math.ceil(totalWorkers / 12);
  const totalProjectDuration = Math.max(foundationDuration, superstructureDuration, finishingDuration, mepDuration);
  
  estimates.push({
    id: 'supervisors',
    skillType: 'Site Supervisors',
    quantity: supervisors,
    unit: 'nos',
    rate: 1400,
    duration: totalProjectDuration,
    totalCost: Math.round(supervisors * 1400 * totalProjectDuration),
    isEditable: true,
    phase: 'General'
  });

  // Project Manager
  estimates.push({
    id: 'project-manager',
    skillType: 'Project Manager',
    quantity: 1,
    unit: 'nos',
    rate: 2500,
    duration: totalProjectDuration,
    totalCost: Math.round(1 * 2500 * totalProjectDuration),
    isEditable: true,
    phase: 'General'
  });

  return estimates;
}

function calculateEquipmentEstimates(data: any): EquipmentEstimate[] {
  const estimates: EquipmentEstimate[] = [];
  // Fix: Use correct database field names
  const builtUpArea = data.built_up_area || 0;
  const numberOfFloors = data.number_of_floors || 1;

  console.log('Equipment calculation - Built-up Area:', builtUpArea, 'Floors:', numberOfFloors);

  // Basic equipment requirements
  const mixerDays = Math.ceil(builtUpArea / 100);
  estimates.push({
    id: 'mixer',
    equipment: 'Concrete Mixer',
    quantity: 1,
    duration: mixerDays,
    rate: 1200,
    totalCost: mixerDays * 1200,
    isEditable: true
  });

  // Crane for multi-story buildings
  if (numberOfFloors > 2) {
    const craneDays = Math.ceil(numberOfFloors * 5);
    estimates.push({
      id: 'crane',
      equipment: 'Tower Crane',
      quantity: 1,
      duration: craneDays,
      rate: 8000,
      totalCost: craneDays * 8000,
      isEditable: true
    });
  }

  // Scaffolding
  const scaffoldingDays = Math.ceil(builtUpArea / 50);
  estimates.push({
    id: 'scaffolding',
    equipment: 'Scaffolding System',
    quantity: 1,
    duration: scaffoldingDays,
    rate: 500,
    totalCost: scaffoldingDays * 500,
    isEditable: true
  });

  return estimates;
}

function calculateTimelineEstimate(data: any): TimelineEstimate {
  // Fix: Use correct database field names
  const builtUpArea = data.built_up_area || 0;
  const numberOfFloors = data.number_of_floors || 1;
  const constructionType = data.construction_type || 'RCC Frame Structure';
  
  console.log('Timeline calculation - Built-up Area:', builtUpArea, 'Floors:', numberOfFloors);
  
  // Base duration calculation: 1 day per 50 sqft
  const baseDuration = Math.ceil(builtUpArea / 50) * numberOfFloors;
  
  const phases = [
    { 
      phase: 'Foundation', 
      duration: Math.ceil(baseDuration * 0.15), 
      dependencies: [],
      percentageOfTotal: 15
    },
    { 
      phase: 'Superstructure', 
      duration: Math.ceil(baseDuration * 0.50), 
      dependencies: ['Foundation'],
      percentageOfTotal: 50
    },
    { 
      phase: 'Finishing', 
      duration: Math.ceil(baseDuration * 0.30), 
      dependencies: ['Superstructure'],
      percentageOfTotal: 30
    },
    { 
      phase: 'MEP Work', 
      duration: Math.ceil(baseDuration * 0.15), 
      dependencies: ['Superstructure'],
      percentageOfTotal: 15
    }
  ];

  const bufferTime = Math.ceil(baseDuration * 0.10); // 10% buffer

  return {
    totalDuration: baseDuration,
    phases,
    bufferTime
  };
}

function calculateSafetyEstimates(data: any): SafetyEstimate {
  // Fix: Use correct database field name
  const builtUpArea = data.built_up_area || 0;
  const totalWorkers = Math.ceil((builtUpArea / 500) * 2.7); // Estimated total workers

  const ppeRequirements = [
    {
      item: 'Safety Helmets',
      quantityPerWorker: 1,
      totalQuantity: totalWorkers,
      unitCost: 150,
      totalCost: totalWorkers * 150
    },
    {
      item: 'Safety Boots',
      quantityPerWorker: 1,
      totalQuantity: totalWorkers,
      unitCost: 800,
      totalCost: totalWorkers * 800
    },
    {
      item: 'Safety Harness',
      quantityPerWorker: 1,
      totalQuantity: Math.ceil(totalWorkers * 0.3),
      unitCost: 1200,
      totalCost: Math.ceil(totalWorkers * 0.3) * 1200
    }
  ];

  const trainingHours = totalWorkers * 8;
  const safetyEquipmentBudget = Math.ceil(builtUpArea * 5);
  const firstAidStations = Math.ceil(totalWorkers / 25);
  
  const totalSafetyCost = ppeRequirements.reduce((sum, item) => sum + item.totalCost, 0) + 
                         safetyEquipmentBudget + (firstAidStations * 5000);

  return {
    ppeRequirements,
    trainingHours,
    safetyEquipmentBudget,
    firstAidStations,
    totalSafetyCost
  };
}

function calculateQualityEstimates(data: any): QualityEstimate {
  // Fix: Use correct database field name
  const builtUpArea = data.built_up_area || 0;
  const concreteVolume = builtUpArea * 0.15; // Estimated concrete volume

  const testingSchedule = [
    {
      testType: 'Concrete Strength Tests',
      frequency: 'Every 5 cum',
      estimatedTests: Math.ceil(concreteVolume / 5),
      costPerTest: 500,
      totalCost: Math.ceil(concreteVolume / 5) * 500
    },
    {
      testType: 'Steel Quality Certification',
      frequency: 'Per lot',
      estimatedTests: Math.ceil((builtUpArea * 4) / 1000), // Per ton
      costPerTest: 1000,
      totalCost: Math.ceil((builtUpArea * 4) / 1000) * 1000
    },
    {
      testType: 'Masonry Tolerance Checks',
      frequency: 'Weekly',
      estimatedTests: Math.ceil(builtUpArea / 500), // Based on area
      costPerTest: 300,
      totalCost: Math.ceil(builtUpArea / 500) * 300
    }
  ];

  const totalQualityCost = testingSchedule.reduce((sum, item) => sum + item.totalCost, 0);

  return {
    testingSchedule,
    totalQualityCost
  };
}

function calculateCostEstimate(
  materials: MaterialEstimate[],
  labor: LaborEstimate[],
  equipment: EquipmentEstimate[],
  data: any
): CostEstimate {
  const materialCost = materials.reduce((sum, item) => sum + item.totalCost, 0);
  const laborCost = labor.reduce((sum, item) => sum + item.totalCost, 0);
  const equipmentCost = equipment.reduce((sum, item) => sum + item.totalCost, 0);
  
  const subtotal = materialCost + laborCost + equipmentCost;
  const overheadCost = Math.round(subtotal * 0.15); // 15% overhead
  const totalCost = subtotal + overheadCost;
  const contingency = Math.round(totalCost * 0.08); // 8% contingency (5-10% range)
  const finalCost = totalCost + contingency;

  return {
    materialCost,
    laborCost,
    equipmentCost,
    overheadCost,
    totalCost,
    contingency,
    finalCost
  };
}

function getProjectTypeFactor(projectType: string): number {
  const factors: { [key: string]: number } = {
    'residential': 1,
    'commercial': 2,
    'industrial': 3,
    'infrastructure': 4
  };
  return factors[projectType] || 1;
}
