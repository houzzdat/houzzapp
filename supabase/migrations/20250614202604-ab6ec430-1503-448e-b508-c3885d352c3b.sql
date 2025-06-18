
-- Add new columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS site_accessibility VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS existing_infrastructure TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS architectural_style VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS structural_system VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS roof_type VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS wall_thickness DECIMAL(5,2);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS column_specifications TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS quality_standards VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS special_requirements TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS sustainability_goals TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS end_use_purpose VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS local_building_code TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS permit_status VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS environmental_clearance BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS fire_safety_requirements TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS accessibility_compliance BOOLEAN DEFAULT FALSE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS workforce_availability VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS equipment_requirements TEXT[];
ALTER TABLE projects ADD COLUMN IF NOT EXISTS material_preferences TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS timeline_constraints INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_constraints DECIMAL(15,2);

-- Update plot_dimensions to be numeric (convert existing text to numeric if needed)
ALTER TABLE projects ALTER COLUMN plot_dimensions TYPE DECIMAL(10,2) USING CASE 
  WHEN plot_dimensions ~ '^[0-9]+(\.[0-9]+)?$' THEN plot_dimensions::DECIMAL(10,2)
  ELSE NULL
END;
