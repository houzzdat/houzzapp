
-- Create table for material usage records
CREATE TABLE public.material_usage (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    used_for TEXT NOT NULL,
    given_to VARCHAR(255) NOT NULL,
    usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for material receipt records
CREATE TABLE public.material_receipts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit VARCHAR(50) NOT NULL,
    po_number VARCHAR(100),
    vendor_name VARCHAR(255) NOT NULL,
    unit_rate DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(12,2) NOT NULL,
    invoice_image_url TEXT,
    receipt_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create table for vendors
CREATE TABLE public.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    contact_number VARCHAR(15),
    email VARCHAR(255),
    address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.material_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow all operations on material_usage" ON public.material_usage FOR ALL USING (true);
CREATE POLICY "Allow all operations on material_receipts" ON public.material_receipts FOR ALL USING (true);
CREATE POLICY "Allow all operations on vendors" ON public.vendors FOR ALL USING (true);

-- Create indexes
CREATE INDEX idx_material_usage_usage_date ON public.material_usage(usage_date);
CREATE INDEX idx_material_usage_item ON public.material_usage(item);
CREATE INDEX idx_material_receipts_receipt_date ON public.material_receipts(receipt_date);
CREATE INDEX idx_material_receipts_item ON public.material_receipts(item);
CREATE INDEX idx_vendors_name ON public.vendors(name);

-- Create triggers for updated_at
CREATE TRIGGER update_material_usage_updated_at BEFORE UPDATE ON public.material_usage FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_material_receipts_updated_at BEFORE UPDATE ON public.material_receipts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON public.vendors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for invoice images
INSERT INTO storage.buckets (id, name, public) VALUES ('invoice-images', 'invoice-images', true);

-- Create storage policy for invoice images
CREATE POLICY "Allow public access to invoice images" ON storage.objects FOR ALL USING (bucket_id = 'invoice-images');
