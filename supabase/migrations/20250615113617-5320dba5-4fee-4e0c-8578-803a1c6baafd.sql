
-- Create purchase_orders table
CREATE TABLE public.purchase_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  po_number VARCHAR NOT NULL UNIQUE,
  project_id UUID,
  vendor_id UUID REFERENCES public.vendors(id),
  vendor_name VARCHAR NOT NULL,
  vendor_address TEXT,
  vendor_gst VARCHAR,
  item_name VARCHAR NOT NULL,
  brand VARCHAR,
  quantity NUMERIC NOT NULL,
  unit VARCHAR NOT NULL,
  unit_rate NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  cgst_rate NUMERIC DEFAULT 9.0,
  sgst_rate NUMERIC DEFAULT 9.0,
  cgst_amount NUMERIC,
  sgst_amount NUMERIC,
  total_with_tax NUMERIC,
  expected_delivery_date DATE,
  delivery_address TEXT NOT NULL,
  payment_terms TEXT,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number VARCHAR NOT NULL,
  po_id UUID REFERENCES public.purchase_orders(id),
  po_number VARCHAR,
  vendor_name VARCHAR NOT NULL,
  invoice_date DATE NOT NULL,
  received_date DATE DEFAULT CURRENT_DATE,
  invoice_amount NUMERIC NOT NULL,
  tax_amount NUMERIC,
  total_amount NUMERIC NOT NULL,
  invoice_image_url TEXT,
  status VARCHAR DEFAULT 'received',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add GST and contact fields to vendors table
ALTER TABLE public.vendors 
ADD COLUMN IF NOT EXISTS gst_number VARCHAR,
ADD COLUMN IF NOT EXISTS pan_number VARCHAR;

-- Create sequence for PO numbering
CREATE SEQUENCE IF NOT EXISTS po_sequence START 1;

-- Create function to generate PO number
CREATE OR REPLACE FUNCTION generate_po_number()
RETURNS TEXT AS $$
DECLARE
  next_num INTEGER;
BEGIN
  SELECT nextval('po_sequence') INTO next_num;
  RETURN 'PO-PRJX' || LPAD(next_num::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE TRIGGER update_purchase_orders_updated_at
  BEFORE UPDATE ON public.purchase_orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE TRIGGER update_invoices_updated_at
  BEFORE UPDATE ON public.invoices
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
