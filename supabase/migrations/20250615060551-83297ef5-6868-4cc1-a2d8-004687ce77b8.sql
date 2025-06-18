
-- First, let's clear existing material data and insert the new comprehensive list
TRUNCATE TABLE material_master CASCADE;
TRUNCATE TABLE quality_multipliers CASCADE;
TRUNCATE TABLE regional_rates CASCADE;

-- Insert the comprehensive material data from your list
INSERT INTO material_master (name, category, unit, base_rate, calculation_formula, wastage_factor, description) VALUES
-- Foundation Materials
('Excavation', 'aggregate', 'cum', 120.0, 'built_area * 0.3', 0.05, 'Site excavation work'),
('PCC (Plain Cement Concrete)', 'concrete', 'cum', 4500.0, 'built_area * 0.15', 0.02, 'Plain Cement Concrete'),
('Foundation Concrete M20', 'concrete', 'cum', 6000.0, 'built_area * 0.12', 0.03, 'Foundation concrete M20 grade'),
('Damp Proof Course', 'finishing', 'sqm', 250.0, 'built_area * 1.0', 0.05, 'Damp proof course membrane'),

-- Structural - Concrete
('OPC Cement 43 Grade', 'cement', 'bag', 340.0, 'built_area * 0.4', 0.02, 'Ordinary Portland Cement 43 grade'),
('OPC Cement 53 Grade', 'cement', 'bag', 380.0, 'built_area * 0.4', 0.02, 'Ordinary Portland Cement 53 grade'),
('River Sand', 'sand', 'cum', 35.0, 'built_area * 0.6', 0.08, 'Natural river sand'),
('Manufactured Sand', 'sand', 'cum', 32.0, 'built_area * 0.6', 0.08, 'Manufactured sand (M-Sand)'),
('20mm Aggregate', 'aggregate', 'cum', 42.0, 'built_area * 0.45', 0.05, '20mm stone aggregate'),
('12mm Aggregate', 'aggregate', 'cum', 45.0, 'built_area * 0.25', 0.05, '12mm stone aggregate'),
('Concrete Admixtures', 'concrete', 'kg', 25.0, 'built_area * 2', 0.05, 'Concrete admixtures and additives'),
('Curing Compound', 'concrete', 'ltr', 180.0, 'built_area * 0.12', 0.10, 'Concrete curing compound'),

-- Structural - Steel
('TMT Bars 8mm', 'steel', 'kg', 65.0, 'built_area * 1.5', 0.05, 'TMT steel reinforcement bars 8mm'),
('TMT Bars 10mm', 'steel', 'kg', 63.0, 'built_area * 1.8', 0.05, 'TMT steel reinforcement bars 10mm'),
('TMT Bars 12mm', 'steel', 'kg', 61.0, 'built_area * 2.2', 0.05, 'TMT steel reinforcement bars 12mm'),
('TMT Bars 16mm', 'steel', 'kg', 59.0, 'built_area * 2.8', 0.05, 'TMT steel reinforcement bars 16mm'),
('Binding Wire', 'steel', 'kg', 75.0, 'built_area * 0.15', 0.10, 'Steel binding wire'),
('Welding Electrodes', 'steel', 'kg', 85.0, 'built_area * 0.08', 0.05, 'Welding electrodes'),

-- Masonry Materials
('Common Burnt Clay Bricks', 'brick', 'nos', 4.5, 'built_area * 8.2', 0.05, 'Standard red clay bricks'),
('Engineering Bricks', 'brick', 'nos', 8.0, 'built_area * 8.2', 0.05, 'High strength engineering bricks'),
('Fly Ash Bricks', 'brick', 'nos', 6.0, 'built_area * 8.2', 0.05, 'Fly ash bricks'),
('AAC Blocks', 'brick', 'nos', 45.0, 'built_area * 3.2', 0.03, 'Autoclaved Aerated Concrete blocks'),
('Concrete Hollow Blocks', 'brick', 'nos', 35.0, 'built_area * 4.5', 0.05, 'Hollow concrete blocks'),
('Natural Stone', 'brick', 'cft', 80.0, 'built_area * 1.5', 0.08, 'Natural stone masonry'),
('Cement Mortar 1:6', 'cement', 'cum', 45.0, 'built_area * 0.3', 0.05, 'Cement mortar mix 1:6'),

-- Roofing Materials
('Mangalore Tiles', 'finishing', 'nos', 25.0, 'built_area * 4.5', 0.12, 'Traditional Mangalore roof tiles'),
('AC Sheets', 'finishing', 'sqm', 180.0, 'built_area * 1.1', 0.08, 'Asbestos cement roofing sheets'),
('Color Coated Sheets', 'finishing', 'sqm', 220.0, 'built_area * 1.1', 0.05, 'Color coated metal roofing sheets'),
('PPGI Sheets', 'finishing', 'sqm', 250.0, 'built_area * 1.1', 0.05, 'Pre-painted galvanized iron sheets'),
('Membrane Waterproofing', 'finishing', 'sqm', 350.0, 'built_area * 1.0', 0.15, 'Waterproofing membrane for roofs'),
('Ridge Tiles', 'finishing', 'nos', 15.0, 'built_area * 0.8', 0.10, 'Ridge tiles for roof edges'),
('Gutters & Downpipes', 'finishing', 'mtr', 120.0, 'built_area * 0.4', 0.08, 'Rain water gutters and downpipes'),

-- Electrical Materials
('PVC Insulated Copper Wire', 'electrical', 'mtr', 28.0, 'built_area * 12', 0.10, 'PVC insulated copper electrical wire'),
('XLPE Cables', 'electrical', 'mtr', 85.0, 'built_area * 6', 0.08, 'XLPE insulated power cables'),
('PVC Conduits', 'electrical', 'mtr', 12.0, 'built_area * 15', 0.15, 'PVC electrical conduits'),
('GI Conduits', 'electrical', 'mtr', 45.0, 'built_area * 8', 0.10, 'Galvanized iron electrical conduits'),
('Modular Switches', 'electrical', 'nos', 180.0, 'built_area * 1.2', 0.10, 'Modular electrical switches'),
('Power Sockets', 'electrical', 'nos', 95.0, 'built_area * 0.8', 0.10, 'Electrical power outlets'),
('MCB Single Pole', 'electrical', 'nos', 150.0, 'built_area * 0.8', 0.05, 'Single pole MCB'),
('MCB Triple Pole', 'electrical', 'nos', 220.0, 'built_area * 0.3', 0.05, 'Triple pole MCB'),
('Distribution Board', 'electrical', 'nos', 2500.0, 'built_area * 0.08', 0.05, 'Main electrical distribution board'),
('Ceiling Fans', 'electrical', 'nos', 2800.0, 'built_area * 0.15', 0.02, 'Ceiling fans'),

-- Plumbing Materials
('CPVC Pipes', 'plumbing', 'mtr', 45.0, 'built_area * 4', 0.12, 'CPVC water supply pipes'),
('PVC Pipes', 'plumbing', 'mtr', 35.0, 'built_area * 3', 0.10, 'PVC drainage pipes'),
('PPR Pipes', 'plumbing', 'mtr', 65.0, 'built_area * 3.5', 0.12, 'PPR water supply pipes'),
('GI Pipes', 'plumbing', 'mtr', 85.0, 'built_area * 2', 0.08, 'Galvanized iron pipes'),
('Pipe Fittings CPVC', 'plumbing', 'nos', 15.0, 'built_area * 2.5', 0.15, 'CPVC pipe fittings'),
('Stop Cocks', 'plumbing', 'nos', 350.0, 'built_area * 0.3', 0.05, 'Water stop cocks and valves'),
('Water Tank Plastic', 'plumbing', 'nos', 8500.0, 'built_area * 0.02', 0.02, 'Plastic water storage tank'),
('Sanitary Fixtures', 'plumbing', 'set', 2500.0, 'built_area * 0.08', 0.05, 'Complete sanitary fixtures set'),

-- HVAC Materials
('Split AC Units', 'electrical', 'nos', 35000.0, 'built_area * 0.08', 0.02, 'Split air conditioning units'),
('Ductable AC', 'electrical', 'nos', 55000.0, 'built_area * 0.03', 0.02, 'Ductable air conditioning system'),
('Exhaust Fans', 'electrical', 'nos', 2500.0, 'built_area * 0.12', 0.05, 'Exhaust fans'),
('Fresh Air Units', 'electrical', 'nos', 45000.0, 'built_area * 0.02', 0.02, 'Fresh air handling units'),
('Duct Insulation', 'finishing', 'sqm', 180.0, 'built_area * 0.5', 0.08, 'HVAC duct insulation'),
('Grilles & Diffusers', 'electrical', 'nos', 850.0, 'built_area * 0.25', 0.05, 'Air grilles and diffusers'),

-- Flooring Materials
('Vitrified Tiles 600x600', 'finishing', 'sqm', 450.0, 'built_area * 0.85', 0.08, 'Vitrified floor tiles 600x600mm'),
('Ceramic Tiles', 'finishing', 'sqm', 180.0, 'built_area * 0.85', 0.10, 'Ceramic floor tiles'),
('Granite Flooring', 'finishing', 'sqm', 1200.0, 'built_area * 0.85', 0.05, 'Granite floor tiles'),
('Marble Flooring', 'finishing', 'sqm', 1800.0, 'built_area * 0.85', 0.05, 'Natural marble flooring'),
('Wooden Flooring', 'finishing', 'sqm', 2500.0, 'built_area * 0.85', 0.08, 'Engineered wood flooring'),
('Vinyl Flooring', 'finishing', 'sqm', 280.0, 'built_area * 0.85', 0.05, 'Vinyl floor covering'),
('Tile Adhesive', 'finishing', 'kg', 125.0, 'built_area * 1.5', 0.10, 'Tile fixing adhesive'),
('Tile Grout', 'finishing', 'kg', 45.0, 'built_area * 0.8', 0.15, 'Tile grouting material'),

-- Wall Finishes
('Cement Plaster', 'finishing', 'sqm', 28.0, 'built_area * 2.5', 0.10, 'Cement plastering work'),
('Gypsum Plaster', 'finishing', 'sqm', 35.0, 'built_area * 2.5', 0.08, 'Gypsum plastering work'),
('Texture Paint', 'finishing', 'ltr', 180.0, 'built_area * 0.3', 0.12, 'Textured wall paint'),
('Wallpaper', 'finishing', 'sqm', 85.0, 'built_area * 1.5', 0.10, 'Decorative wallpaper'),
('Wall Tiles', 'finishing', 'sqm', 280.0, 'built_area * 0.5', 0.10, 'Ceramic wall tiles'),
('Stone Cladding', 'finishing', 'sqm', 850.0, 'built_area * 0.2', 0.08, 'Natural stone wall cladding'),
('Wood Paneling', 'finishing', 'sqm', 1200.0, 'built_area * 0.3', 0.08, 'Wooden wall paneling'),

-- Ceiling Materials
('Gypsum Board', 'finishing', 'sqm', 125.0, 'built_area * 0.4', 0.12, 'Gypsum plasterboard'),
('Mineral Fiber Tiles', 'finishing', 'sqm', 180.0, 'built_area * 0.8', 0.10, 'Mineral fiber ceiling tiles'),
('POP Molding', 'finishing', 'mtr', 85.0, 'built_area * 2', 0.15, 'Plaster of Paris molding'),
('False Ceiling Grid', 'finishing', 'sqm', 450.0, 'built_area * 0.8', 0.10, 'False ceiling grid system'),

-- Doors
('Wooden Panel Doors', 'finishing', 'nos', 8500.0, 'built_area * 0.12', 0.05, 'Wooden panel doors'),
('Flush Doors', 'finishing', 'nos', 6500.0, 'built_area * 0.12', 0.05, 'Flush door shutters'),
('Steel Security Doors', 'finishing', 'nos', 12000.0, 'built_area * 0.05', 0.02, 'Steel security doors'),
('Sliding Doors', 'finishing', 'nos', 15000.0, 'built_area * 0.03', 0.02, 'Sliding door systems'),
('Door Frames Wooden', 'finishing', 'nos', 2500.0, 'built_area * 0.12', 0.05, 'Wooden door frames'),
('Door Hardware', 'finishing', 'set', 850.0, 'built_area * 0.12', 0.05, 'Door locks and hardware'),

-- Windows
('Aluminum Windows', 'finishing', 'sqm', 850.0, 'built_area * 0.15', 0.08, 'Aluminum window frames'),
('uPVC Windows', 'finishing', 'sqm', 950.0, 'built_area * 0.15', 0.08, 'uPVC window frames'),
('Steel Windows', 'finishing', 'sqm', 650.0, 'built_area * 0.15', 0.08, 'Steel window frames'),
('Window Grilles', 'finishing', 'sqm', 280.0, 'built_area * 0.15', 0.10, 'Window security grilles'),
('Glazing & Glass', 'finishing', 'sqm', 450.0, 'built_area * 0.15', 0.12, 'Window glass and glazing'),

-- Waterproofing
('Bituminous Membrane', 'finishing', 'sqm', 180.0, 'built_area * 1.0', 0.15, 'Bituminous waterproofing membrane'),
('APP Membrane', 'finishing', 'sqm', 220.0, 'built_area * 1.0', 0.12, 'APP modified bitumen membrane'),
('Liquid Waterproofing', 'finishing', 'ltr', 85.0, 'built_area * 0.3', 0.12, 'Liquid waterproofing coating'),
('Crystalline Waterproofing', 'finishing', 'kg', 125.0, 'built_area * 0.5', 0.08, 'Crystalline waterproofing compound'),
('Injection Grouting', 'finishing', 'kg', 350.0, 'built_area * 0.1', 0.05, 'Injection grouting materials'),
('Expansion Joints', 'finishing', 'mtr', 450.0, 'built_area * 0.8', 0.10, 'Expansion joint materials'),

-- Insulation
('Glass Wool', 'finishing', 'sqm', 85.0, 'built_area * 0.3', 0.08, 'Glass wool insulation'),
('Rock Wool', 'finishing', 'sqm', 95.0, 'built_area * 0.3', 0.08, 'Rock wool insulation'),
('EPS Boards', 'finishing', 'sqm', 125.0, 'built_area * 0.3', 0.10, 'Expanded polystyrene boards'),
('Reflective Insulation', 'finishing', 'sqm', 180.0, 'built_area * 0.3', 0.08, 'Reflective thermal insulation'),

-- Hardware & Fasteners
('SS Bolts & Nuts', 'steel', 'kg', 120.0, 'built_area * 0.3', 0.10, 'Stainless steel bolts and nuts'),
('MS Angles', 'steel', 'kg', 65.0, 'built_area * 0.5', 0.05, 'Mild steel angle sections'),
('Channel Sections', 'steel', 'kg', 85.0, 'built_area * 0.3', 0.05, 'Steel channel sections'),
('Expansion Bolts', 'steel', 'nos', 25.0, 'built_area * 2', 0.10, 'Concrete expansion bolts'),
('Construction Chemicals', 'finishing', 'kg', 180.0, 'built_area * 0.8', 0.12, 'Construction chemical additives'),
('Sealants', 'finishing', 'kg', 125.0, 'built_area * 0.15', 0.08, 'Construction sealants'),

-- Paints & Coatings
('Wall Primer', 'finishing', 'ltr', 85.0, 'built_area * 0.25', 0.10, 'Wall primer paint'),
('Exterior Emulsion', 'finishing', 'ltr', 125.0, 'built_area * 0.15', 0.12, 'Exterior emulsion paint'),
('Interior Emulsion', 'finishing', 'ltr', 115.0, 'built_area * 0.35', 0.12, 'Interior emulsion paint'),
('Enamel Paint', 'finishing', 'ltr', 180.0, 'built_area * 0.08', 0.10, 'Enamel paint'),
('Wood Polish', 'finishing', 'ltr', 350.0, 'built_area * 0.05', 0.08, 'Wood polish and stain'),
('Anti-Rust Paint', 'finishing', 'ltr', 220.0, 'built_area * 0.05', 0.10, 'Anti-rust primer paint'),

-- Safety Materials
('Fire Extinguishers', 'electrical', 'nos', 2500.0, 'built_area * 0.02', 0.02, 'Fire extinguishers'),
('Smoke Detectors', 'electrical', 'nos', 1200.0, 'built_area * 0.05', 0.02, 'Smoke detection systems'),
('Emergency Lighting', 'electrical', 'nos', 850.0, 'built_area * 0.08', 0.05, 'Emergency lighting systems'),

-- Landscaping
('Topsoil', 'aggregate', 'cum', 45.0, 'built_area * 0.1', 0.15, 'Garden topsoil'),
('Plants & Saplings', 'finishing', 'nos', 150.0, 'built_area * 0.02', 0.20, 'Garden plants and saplings'),
('Irrigation System', 'plumbing', 'set', 25000.0, 'built_area * 0.005', 0.10, 'Garden irrigation system');

-- Insert quality grade multipliers
INSERT INTO quality_multipliers (material_id, quality_grade, multiplier) 
SELECT id, 'economy', 0.8 FROM material_master WHERE category IN ('brick', 'finishing');

INSERT INTO quality_multipliers (material_id, quality_grade, multiplier) 
SELECT id, 'standard', 1.0 FROM material_master;

INSERT INTO quality_multipliers (material_id, quality_grade, multiplier) 
SELECT id, 'premium', 1.3 FROM material_master WHERE category IN ('finishing', 'electrical', 'plumbing');

INSERT INTO quality_multipliers (material_id, quality_grade, multiplier) 
SELECT id, 'luxury', 1.8 FROM material_master WHERE category IN ('finishing');

-- Insert regional rate variations for major cities
INSERT INTO regional_rates (material_id, state, city, rate_multiplier) 
SELECT id, 'Karnataka', 'Bangalore', 1.0 FROM material_master;

INSERT INTO regional_rates (material_id, state, city, rate_multiplier) 
SELECT id, 'Maharashtra', 'Mumbai', 1.25 FROM material_master WHERE category IN ('steel', 'cement', 'concrete');

INSERT INTO regional_rates (material_id, state, city, rate_multiplier) 
SELECT id, 'Delhi', 'New Delhi', 1.15 FROM material_master WHERE category IN ('steel', 'cement', 'concrete');

INSERT INTO regional_rates (material_id, state, city, rate_multiplier) 
SELECT id, 'Tamil Nadu', 'Chennai', 1.05 FROM material_master;

INSERT INTO regional_rates (material_id, state, city, rate_multiplier) 
SELECT id, 'Gujarat', 'Ahmedabad', 0.95 FROM material_master WHERE category IN ('brick', 'sand', 'aggregate');
