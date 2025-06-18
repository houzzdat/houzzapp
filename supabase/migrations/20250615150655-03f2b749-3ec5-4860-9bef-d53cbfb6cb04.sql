
-- Create financial_transactions table to track all payments and receipts
CREATE TABLE public.financial_transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  transaction_type VARCHAR NOT NULL CHECK (transaction_type IN ('payment_made', 'amount_received')),
  transaction_category VARCHAR NOT NULL CHECK (transaction_category IN ('operational_costs', 'payment_from_customers', 'loan_from_bank', 'other_expenses', 'material_procurement', 'labor_payment', 'equipment_rental')),
  party_name VARCHAR NOT NULL,
  pan_number VARCHAR,
  transaction_date DATE NOT NULL,
  payment_mode VARCHAR NOT NULL CHECK (payment_mode IN ('bank_transfer', 'upi', 'cash')),
  description TEXT,
  invoice_payment_id UUID REFERENCES public.invoice_payments(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE TRIGGER update_financial_transactions_updated_at
  BEFORE UPDATE ON public.financial_transactions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to automatically create financial transaction when invoice payment is made
CREATE OR REPLACE FUNCTION create_financial_transaction_for_invoice_payment()
RETURNS TRIGGER AS $$
DECLARE
  invoice_vendor_name VARCHAR;
  invoice_project_id UUID;
BEGIN
  -- Get vendor name and project info from invoice
  SELECT i.vendor_name, po.project_id INTO invoice_vendor_name, invoice_project_id
  FROM public.invoices i
  LEFT JOIN public.purchase_orders po ON i.po_id = po.id
  WHERE i.id = NEW.invoice_id;
  
  -- Insert financial transaction
  INSERT INTO public.financial_transactions (
    project_id,
    amount,
    transaction_type,
    transaction_category,
    party_name,
    transaction_date,
    payment_mode,
    description,
    invoice_payment_id
  ) VALUES (
    invoice_project_id,
    NEW.amount_paid,
    'payment_made',
    'material_procurement',
    COALESCE(invoice_vendor_name, 'Unknown Vendor'),
    NEW.payment_date,
    NEW.payment_mode,
    'Payment for invoice: ' || (SELECT invoice_number FROM public.invoices WHERE id = NEW.invoice_id),
    NEW.id
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically create financial transaction when invoice payment is made
CREATE TRIGGER create_financial_transaction_on_invoice_payment
  AFTER INSERT ON public.invoice_payments
  FOR EACH ROW
  EXECUTE FUNCTION create_financial_transaction_for_invoice_payment();
