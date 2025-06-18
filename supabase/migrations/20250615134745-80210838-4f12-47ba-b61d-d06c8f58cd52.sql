
-- Add due_date column to invoices table
ALTER TABLE public.invoices 
ADD COLUMN due_date DATE,
ADD COLUMN outstanding_amount NUMERIC DEFAULT 0;

-- Update existing invoices to set outstanding_amount equal to total_amount
UPDATE public.invoices 
SET outstanding_amount = total_amount 
WHERE outstanding_amount IS NULL OR outstanding_amount = 0;

-- Create invoice_payments table to track payments
CREATE TABLE public.invoice_payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  payment_date DATE NOT NULL,
  amount_paid NUMERIC NOT NULL CHECK (amount_paid > 0),
  balance_remaining NUMERIC NOT NULL DEFAULT 0,
  payment_mode VARCHAR NOT NULL CHECK (payment_mode IN ('cash', 'bank_transfer')),
  reference_number VARCHAR,
  confirmation_image_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trigger to update updated_at timestamp for invoice_payments
CREATE OR REPLACE TRIGGER update_invoice_payments_updated_at
  BEFORE UPDATE ON public.invoice_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update invoice outstanding amount and status after payment
CREATE OR REPLACE FUNCTION update_invoice_after_payment()
RETURNS TRIGGER AS $$
BEGIN
  -- Update outstanding amount for the invoice
  UPDATE public.invoices 
  SET outstanding_amount = total_amount - (
    SELECT COALESCE(SUM(amount_paid), 0) 
    FROM public.invoice_payments 
    WHERE invoice_id = NEW.invoice_id
  )
  WHERE id = NEW.invoice_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update outstanding amount after payment insert/update/delete
CREATE TRIGGER update_invoice_outstanding_after_payment
  AFTER INSERT OR UPDATE OR DELETE ON public.invoice_payments
  FOR EACH ROW
  EXECUTE FUNCTION update_invoice_after_payment();
