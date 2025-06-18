
-- Create enum types for labor management
CREATE TYPE attendance_status AS ENUM ('absent', 'half-day', 'full-day');
CREATE TYPE labor_category AS ENUM ('mason', 'electrician', 'carpenter', 'plumber', 'painter', 'helper', 'supervisor', 'engineer');
CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'completed');

-- Create workers table
CREATE TABLE public.workers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    aadhar_number VARCHAR(20) UNIQUE,
    phone_number VARCHAR(15),
    address TEXT,
    category labor_category NOT NULL,
    phase VARCHAR(100),
    rate_per_day DECIMAL(8,2) NOT NULL,
    total_mandays INTEGER DEFAULT 0,
    mandays_used INTEGER DEFAULT 0,
    total_payment DECIMAL(12,2) DEFAULT 0,
    payment_made DECIMAL(12,2) DEFAULT 0,
    payment_status payment_status DEFAULT 'pending',
    profile_image_url TEXT,
    aadhar_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create attendance records table
CREATE TABLE public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    status attendance_status NOT NULL DEFAULT 'absent',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(worker_id, date)
);

-- Create payment records table
CREATE TABLE public.payment_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    worker_id UUID REFERENCES public.workers(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_method VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allowing public access for now, can be restricted later with auth)
CREATE POLICY "Allow all operations on workers" ON public.workers FOR ALL USING (true);
CREATE POLICY "Allow all operations on attendance_records" ON public.attendance_records FOR ALL USING (true);
CREATE POLICY "Allow all operations on payment_records" ON public.payment_records FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX idx_workers_category ON public.workers(category);
CREATE INDEX idx_workers_is_active ON public.workers(is_active);
CREATE INDEX idx_attendance_records_worker_id ON public.attendance_records(worker_id);
CREATE INDEX idx_attendance_records_date ON public.attendance_records(date);
CREATE INDEX idx_payment_records_worker_id ON public.payment_records(worker_id);
CREATE INDEX idx_payment_records_payment_date ON public.payment_records(payment_date);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_workers_updated_at BEFORE UPDATE ON public.workers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_attendance_records_updated_at BEFORE UPDATE ON public.attendance_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payment_records_updated_at BEFORE UPDATE ON public.payment_records FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a view for worker statistics
CREATE OR REPLACE VIEW public.worker_stats AS
SELECT 
    w.id,
    w.name,
    w.category,
    w.phase,
    w.rate_per_day,
    w.total_mandays,
    w.mandays_used,
    w.total_payment,
    w.payment_made,
    w.payment_status,
    COALESCE(attendance_stats.days_present, 0) as days_present,
    COALESCE(attendance_stats.total_attendance_days, 0) as total_attendance_days,
    COALESCE(latest_attendance.status, 'absent') as today_attendance
FROM public.workers w
LEFT JOIN (
    SELECT 
        worker_id,
        COUNT(*) as total_attendance_days,
        SUM(CASE 
            WHEN status = 'full-day' THEN 1
            WHEN status = 'half-day' THEN 0.5
            ELSE 0
        END) as days_present
    FROM public.attendance_records
    GROUP BY worker_id
) attendance_stats ON w.id = attendance_stats.worker_id
LEFT JOIN (
    SELECT DISTINCT ON (worker_id) 
        worker_id, 
        status
    FROM public.attendance_records
    WHERE date = CURRENT_DATE
    ORDER BY worker_id, created_at DESC
) latest_attendance ON w.id = latest_attendance.worker_id
WHERE w.is_active = true;
