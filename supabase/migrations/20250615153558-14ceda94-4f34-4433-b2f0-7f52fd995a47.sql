
-- Remove dummy/sample data from workers table
DELETE FROM public.workers WHERE name IN ('John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown', 'Rajesh Kumar');

-- Remove dummy attendance records that might be linked to these workers
DELETE FROM public.attendance_records WHERE worker_id NOT IN (SELECT id FROM public.workers);

-- Remove dummy payment records
DELETE FROM public.payment_records WHERE worker_id NOT IN (SELECT id FROM public.workers);
