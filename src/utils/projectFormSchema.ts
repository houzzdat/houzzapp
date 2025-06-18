
import { z } from "zod";

const projectTypes = [
  "Residential",
  "Commercial",
  "Industrial",
  "Infrastructure"
];

export const formSchema = z.object({
  // Project Information
  projectName: z.string().min(2, { message: "Project name must be at least 2 characters." }),
  projectType: z.string().refine(value => projectTypes.includes(value), { message: "Invalid project type." }),
  projectDescription: z.string().optional(),
  expectedStartDate: z.string().min(1, { message: "Expected start date is required." }),
  targetCompletionDate: z.string().min(1, { message: "Target completion date is required." }),
  
  // Site Information
  siteAddress: z.string().min(1, { message: "Site address is required." }),
  plotDimensions: z.number().min(1, { message: "Plot dimensions must be greater than 0." }),
  soilType: z.string().min(1, { message: "Soil type is required." }),
  siteAccessibility: z.string().min(1, { message: "Site accessibility is required." }),
  existingInfrastructure: z.array(z.string()).optional(),
  // New Site Condition fields
  soilBearingCapacity: z.number().min(100).max(500, { message: "Soil bearing capacity must be between 100-500 kN/m²" }),
  waterTableLevel: z.number().min(0).optional(),
  siteAccess: z.string().min(1, { message: "Site access is required." }),
  existingUtilities: z.array(z.string()).optional(),
  climateZone: z.string().min(1, { message: "Climate zone is required." }),
  seismicZone: z.string().min(1, { message: "Seismic zone is required." }),
  
  // Building Specifications
  builtUpArea: z.number().min(1, { message: "Built-up area must be greater than 0." }),
  numberOfFloors: z.number().min(1, { message: "Number of floors must be at least 1." }),
  floorHeight: z.number().min(1, { message: "Floor height must be at least 1." }),
  constructionType: z.string().min(2, { message: "Construction type must be at least 2 characters." }),
  architecturalStyle: z.string().optional(),
  // New Building Specification fields
  externalWallThickness: z.number().min(150).max(400, { message: "External wall thickness must be between 150-400mm" }),
  internalWallThickness: z.number().min(75).max(230, { message: "Internal wall thickness must be between 75-230mm" }),
  floorToFloorHeight: z.number().min(2400).max(4500, { message: "Floor to floor height must be between 2400-4500mm" }),
  
  // Structural Details
  foundationType: z.string().min(2, { message: "Foundation type must be at least 2 characters." }),
  structuralSystem: z.string().min(1, { message: "Structural system is required." }),
  roofType: z.string().min(1, { message: "Roof type is required." }),
  wallThickness: z.number().min(1, { message: "Wall thickness must be at least 1 inch." }),
  columnSpecifications: z.string().min(2, { message: "Column specifications must be at least 2 characters." }),
  // New Structural fields
  structuralGradeConcrete: z.string().min(1, { message: "Structural grade concrete is required." }),
  steelGrade: z.string().min(1, { message: "Steel grade is required." }),
  
  // Client Requirements
  budgetRange: z.number().min(1, { message: "Budget range is required." }),
  qualityStandards: z.string().min(1, { message: "Quality standards are required." }),
  specialRequirements: z.string().optional(),
  sustainabilityGoals: z.array(z.string()).optional(),
  endUsePurpose: z.string().min(1, { message: "End use purpose is required." }),
  
  // Regulatory Information
  localBuildingCode: z.string().min(1, { message: "Local building code is required." }),
  permitStatus: z.string().min(1, { message: "Permit status is required." }),
  environmentalClearance: z.boolean().optional(),
  fireSafetyRequirements: z.array(z.string()).min(1, { message: "At least one fire safety requirement must be selected." }),
  accessibilityCompliance: z.boolean(),
  // New Safety & Compliance fields
  fireNOCRequired: z.boolean(),
  seismicDesignRequired: z.boolean(),
  accessibilityFeatures: z.boolean().optional(),
  siteSafetyLevel: z.string().min(1, { message: "Site safety level is required." }),
  
  // Resource Constraints
  workforceAvailability: z.string().optional(),
  equipmentRequirements: z.array(z.string()).optional(),
  materialPreferences: z.string().optional(),
  timelineConstraints: z.number().optional(),
  budgetConstraints: z.number().optional(),
  
  // New MEP Systems fields
  totalElectricalLoad: z.number().min(0, { message: "Total electrical load must be greater than 0." }),
  numberOfLightPoints: z.number().min(0),
  numberOfPowerPoints: z.number().min(0),
  acType: z.string().optional(),
  totalACTonnage: z.number().min(0).optional(),
  numberOfBathrooms: z.number().min(0, { message: "Number of bathrooms is required." }),
  numberOfKitchens: z.number().min(0, { message: "Number of kitchens is required." }),
  waterTankCapacity: z.number().min(500, { message: "Water tank capacity must be at least 500 liters." }),
  fireSafetyRequired: z.boolean(),
  
  // New Material Standards fields
  constructionQualityGrade: z.string().min(1, { message: "Construction quality grade is required." }),
  brickType: z.string().min(1, { message: "Brick type is required." }),
  cementType: z.string().min(1, { message: "Cement type is required." }),
  tileQuality: z.string().optional(),
  paintType: z.string().optional(),
  windowMaterial: z.string().min(1, { message: "Window material is required." }),
  sanitaryWareQuality: z.string().optional(),
  
  // New Quality Control fields
  concreteTestingFrequency: z.string().min(1, { message: "Concrete testing frequency is required." }),
  steelTestingRequired: z.boolean(),
  thirdPartyInspection: z.boolean().optional(),
  qualityAssuranceLevel: z.string().min(1, { message: "Quality assurance level is required." }),
  
  // New Regional Factors fields
  projectLocationState: z.string().min(1, { message: "Project location state is required." }),
  projectLocationCity: z.string().min(1, { message: "Project location city is required." }),
  distanceFromSupplierHub: z.number().min(0).optional(),
  localLaborAvailability: z.string().optional(),
  monsoonImpact: z.string().min(1, { message: "Monsoon impact is required." }),
  
  // New Integration fields
  bimIntegrationRequired: z.boolean().optional(),
  erpIntegration: z.boolean().optional(),
  realTimePricingRequired: z.boolean().optional(),
  automatedProcurement: z.boolean().optional(),
  
  // New Procurement fields
  preferredSuppliers: z.array(z.string()).optional(),
  bulkPurchasePreference: z.boolean().optional(),
  deliveryTimeline: z.string().min(1, { message: "Delivery timeline is required." }),
  paymentTermsPreference: z.string().optional(),
  
  // New Environmental fields
  greenBuildingCertification: z.string().optional(),
  sustainableMaterialsPreference: z.boolean().optional(),
  carbonFootprintTracking: z.boolean().optional(),
  wasteManagementPlan: z.boolean().optional(),
});

export type ProjectFormValues = z.infer<typeof formSchema>;
export { projectTypes };
