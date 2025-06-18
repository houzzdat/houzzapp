
-- Insert missing materials from the provided list
INSERT INTO material_master (name, category, unit, base_rate, calculation_formula, wastage_factor, description) VALUES
-- Structural Materials - Concrete (missing ones)
('Admixtures', 'concrete', 'kg', 25.0, 'cement_qty * 0.01', 0.02, 'Concrete admixtures'),
('Ready Mix Concrete', 'concrete', 'cum', 7500.0, 'volume_in_cum', 0.02, 'Ready mix concrete'),

-- Structural Materials - Steel (missing ones)
('Steel Plates', 'steel', 'kg', 75.0, 'as_per_drawing', 0.02, 'Steel plates'),
('Structural Steel Sections', 'steel', 'mt', 65000.0, 'as_per_drawing', 0.02, 'Structural steel sections'),

-- Masonry Materials (missing ones)
('Mortar', 'cement', 'cft', 180.0, 'wall_area * 0.02', 0.05, 'Masonry mortar'),

-- Roofing Materials (missing ones)
('Concrete Tiles', 'finishing', 'nos', 35.0, 'roof_area * 10', 0.10, 'Concrete roof tiles'),
('Metal Sheets', 'finishing', 'sqm', 280.0, 'roof_area * 1.1', 0.05, 'Metal roofing sheets'),
('Membrane Sheets', 'finishing', 'sqm', 350.0, 'roof_area * 1.1', 0.05, 'Membrane roofing sheets'),

-- Electrical Materials (missing ones)
('Electrical Cables', 'electrical', 'mtr', 45.0, 'length_per_point * points', 0.05, 'Electrical cables'),
('Conduits (PVC/Metal)', 'electrical', 'mtr', 25.0, 'cable_length * 1.2', 0.10, 'Electrical conduits'),
('Circuit Breakers', 'electrical', 'nos', 180.0, 'as_per_load', 0.02, 'Circuit breakers'),

-- Plumbing Materials (missing ones)
('Copper Pipes', 'plumbing', 'mtr', 180.0, 'length_per_point * points', 0.05, 'Copper water pipes'),
('Pipe Fittings', 'plumbing', 'nos', 25.0, 'as_per_design', 0.05, 'Pipe fittings'),

-- HVAC Materials (missing ones)
('Ductwork (GI/Aluminum)', 'electrical', 'sqm', 450.0, 'area_served', 0.05, 'HVAC ductwork'),
('Insulation', 'finishing', 'sqm', 120.0, 'duct_area * 1.1', 0.10, 'HVAC insulation'),
('HVAC Equipment', 'electrical', 'set', 75000.0, 'as_per_capacity', 0.02, 'HVAC equipment set'),

-- Finishing Materials - Wall (missing ones)
('Plaster of Paris', 'finishing', 'sqm', 45.0, 'wall_area', 0.05, 'Plaster of Paris'),
('Wall Putty', 'finishing', 'kg', 25.0, 'wall_area * 2', 0.05, 'Wall putty'),
('Cladding Materials', 'finishing', 'sqm', 850.0, 'wall_area', 0.05, 'Wall cladding materials'),

-- Doors & Windows (missing ones)
('Steel Doors', 'finishing', 'nos', 15000.0, 'as_per_schedule', 0.02, 'Steel doors'),
('uPVC Windows', 'finishing', 'sqm', 1200.0, 'opening_area', 0.05, 'uPVC windows'),

-- Waterproofing Materials (missing ones)
('Polyurethane Coating', 'finishing', 'sqm', 280.0, 'area * coverage_rate', 0.05, 'Polyurethane waterproofing coating'),
('Chemical Waterproofing', 'finishing', 'ltr', 150.0, 'area * coverage_rate', 0.05, 'Chemical waterproofing'),

-- Insulation Materials (missing ones)
('Thermal Insulation', 'finishing', 'sqm', 180.0, 'area * thickness', 0.05, 'Thermal insulation'),
('Acoustic Insulation', 'finishing', 'sqm', 220.0, 'area * thickness', 0.05, 'Acoustic insulation'),

-- Hardware & Fasteners (missing ones)
('Nuts & Bolts', 'steel', 'kg', 85.0, 'as_per_requirement', 0.10, 'Nuts and bolts'),
('Screws & Nails', 'steel', 'kg', 75.0, 'as_per_requirement', 0.10, 'Screws and nails'),

-- Paints & Coatings (missing ones)
('Primer', 'finishing', 'ltr', 120.0, 'paint_area / coverage', 0.10, 'Paint primer'),
('Exterior Paint', 'finishing', 'ltr', 180.0, 'paint_area / coverage', 0.10, 'Exterior paint');
