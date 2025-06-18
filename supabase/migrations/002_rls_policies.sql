
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
