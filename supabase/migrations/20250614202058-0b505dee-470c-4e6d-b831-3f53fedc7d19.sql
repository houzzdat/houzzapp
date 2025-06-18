
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE project_type AS ENUM ('residential', 'commercial', 'industrial', 'infrastructure');
CREATE TYPE project_status AS ENUM ('planning', 'active', 'on_hold', 'completed', 'cancelled');
CREATE TYPE skill_type AS ENUM ('mason', 'carpenter', 'electrician', 'plumber', 'painter', 'helper', 'supervisor', 'engineer');
CREATE TYPE material_category AS ENUM ('concrete', 'steel', 'brick', 'cement', 'sand', 'aggregate', 'electrical', 'plumbing', 'finishing');

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type project_type NOT NULL,
    status project_status DEFAULT 'planning',
    description TEXT,
    client_name VARCHAR(255),
    start_date DATE,
    target_completion DATE,
    actual_completion DATE,
    budget_range DECIMAL(15,2),
    built_up_area DECIMAL(10,2),
    number_of_floors INTEGER,
    floor_height DECIMAL(5,2),
    location TEXT,
    site_address TEXT,
    plot_dimensions TEXT,
    soil_type VARCHAR(100),
    construction_type VARCHAR(100),
    foundation_type VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Material Estimates table
CREATE TABLE material_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    category material_category NOT NULL,
    item VARCHAR(255) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    unit_rate DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(15,2) GENERATED ALWAYS AS (quantity * unit_rate) STORED,
    supplier_name VARCHAR(255),
    supplier_contact VARCHAR(100),
    estimated_delivery_date DATE,
    actual_delivery_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Labor Estimates table
CREATE TABLE labor_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    skill_type skill_type NOT NULL,
    worker_count INTEGER NOT NULL,
    daily_rate DECIMAL(8,2) NOT NULL,
    duration_days INTEGER NOT NULL,
    total_cost DECIMAL(15,2) GENERATED ALWAYS AS (worker_count * daily_rate * duration_days) STORED,
    supervisor_required BOOLEAN DEFAULT FALSE,
    overtime_rate DECIMAL(8,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Equipment Estimates table
CREATE TABLE equipment_estimates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    equipment VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    duration INTEGER NOT NULL, -- in days
    rate DECIMAL(10,2) NOT NULL, -- per day
    total_cost DECIMAL(15,2) GENERATED ALWAYS AS (quantity * duration * rate) STORED,
    supplier_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline/Phases table
CREATE TABLE project_timelines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    phase VARCHAR(255) NOT NULL,
    duration INTEGER NOT NULL, -- in days
    start_date DATE,
    end_date DATE,
    dependencies TEXT[], -- array of phase names
    critical_path BOOLEAN DEFAULT FALSE,
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Safety Checklist table
CREATE TABLE safety_checklists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    checklist_type VARCHAR(100) NOT NULL,
    safety_item VARCHAR(500) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    completion_date DATE,
    inspector_name VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quality Control table
CREATE TABLE quality_controls (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    test_type VARCHAR(100) NOT NULL,
    parameters JSONB,
    results JSONB,
    pass_fail BOOLEAN,
    test_date DATE DEFAULT CURRENT_DATE,
    inspector_name VARCHAR(255),
    remarks TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cost Summary table
CREATE TABLE cost_summaries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    material_cost DECIMAL(15,2) DEFAULT 0,
    labor_cost DECIMAL(15,2) DEFAULT 0,
    equipment_cost DECIMAL(15,2) DEFAULT 0,
    overhead_cost DECIMAL(15,2) DEFAULT 0,
    profit_margin DECIMAL(5,2) DEFAULT 0,
    total_cost DECIMAL(15,2) GENERATED ALWAYS AS (material_cost + labor_cost + equipment_cost + overhead_cost + (material_cost + labor_cost + equipment_cost + overhead_cost) * profit_margin / 100) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_material_estimates_project_id ON material_estimates(project_id);
CREATE INDEX idx_labor_estimates_project_id ON labor_estimates(project_id);
CREATE INDEX idx_equipment_estimates_project_id ON equipment_estimates(project_id);
CREATE INDEX idx_project_timelines_project_id ON project_timelines(project_id);
CREATE INDEX idx_safety_checklists_project_id ON safety_checklists(project_id);
CREATE INDEX idx_quality_controls_project_id ON quality_controls(project_id);
CREATE INDEX idx_cost_summaries_project_id ON cost_summaries(project_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_material_estimates_updated_at BEFORE UPDATE ON material_estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_labor_estimates_updated_at BEFORE UPDATE ON labor_estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_estimates_updated_at BEFORE UPDATE ON equipment_estimates FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_project_timelines_updated_at BEFORE UPDATE ON project_timelines FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_safety_checklists_updated_at BEFORE UPDATE ON safety_checklists FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_quality_controls_updated_at BEFORE UPDATE ON quality_controls FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cost_summaries_updated_at BEFORE UPDATE ON cost_summaries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE labor_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment_estimates ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_timelines ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_checklists ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_controls ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_summaries ENABLE ROW LEVEL SECURITY;

-- For now, allow all authenticated users to access all data
-- In production, you would want more granular policies based on user roles

-- Projects policies
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

-- Material estimates policies
CREATE POLICY "Users can view material estimates" ON material_estimates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert material estimates" ON material_estimates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update material estimates" ON material_estimates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete material estimates" ON material_estimates FOR DELETE USING (auth.role() = 'authenticated');

-- Labor estimates policies
CREATE POLICY "Users can view labor estimates" ON labor_estimates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert labor estimates" ON labor_estimates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update labor estimates" ON labor_estimates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete labor estimates" ON labor_estimates FOR DELETE USING (auth.role() = 'authenticated');

-- Equipment estimates policies
CREATE POLICY "Users can view equipment estimates" ON equipment_estimates FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert equipment estimates" ON equipment_estimates FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update equipment estimates" ON equipment_estimates FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete equipment estimates" ON equipment_estimates FOR DELETE USING (auth.role() = 'authenticated');

-- Timeline policies
CREATE POLICY "Users can view timelines" ON project_timelines FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert timelines" ON project_timelines FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update timelines" ON project_timelines FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete timelines" ON project_timelines FOR DELETE USING (auth.role() = 'authenticated');

-- Safety checklist policies
CREATE POLICY "Users can view safety checklists" ON safety_checklists FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert safety checklists" ON safety_checklists FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update safety checklists" ON safety_checklists FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete safety checklists" ON safety_checklists FOR DELETE USING (auth.role() = 'authenticated');

-- Quality control policies
CREATE POLICY "Users can view quality controls" ON quality_controls FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert quality controls" ON quality_controls FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update quality controls" ON quality_controls FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete quality controls" ON quality_controls FOR DELETE USING (auth.role() = 'authenticated');

-- Cost summary policies
CREATE POLICY "Users can view cost summaries" ON cost_summaries FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert cost summaries" ON cost_summaries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update cost summaries" ON cost_summaries FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete cost summaries" ON cost_summaries FOR DELETE USING (auth.role() = 'authenticated');
