
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Worker = Database['public']['Tables']['workers']['Row'];
type AttendanceRecord = Database['public']['Tables']['attendance_records']['Row'];
type PaymentRecord = Database['public']['Tables']['payment_records']['Row'];
type WorkerStats = Database['public']['Views']['worker_stats']['Row'];

export const LaborService = {
  // Get all worker stats
  async getWorkerStats(): Promise<WorkerStats[]> {
    const { data, error } = await supabase
      .from('worker_stats')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching worker stats:', error);
      throw error;
    }

    return data || [];
  },

  // Get individual worker by ID
  async getWorkerById(workerId: string): Promise<Worker | null> {
    const { data, error } = await supabase
      .from('workers')
      .select('*')
      .eq('id', workerId)
      .single();

    if (error) {
      console.error('Error fetching worker:', error);
      throw error;
    }

    return data;
  },

  // Get attendance records for a worker or date range
  async getAttendanceRecords(
    workerId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AttendanceRecord[]> {
    let query = supabase
      .from('attendance_records')
      .select('*');

    if (workerId) {
      query = query.eq('worker_id', workerId);
    }

    if (startDate) {
      query = query.gte('date', startDate.toISOString().split('T')[0]);
    }

    if (endDate) {
      query = query.lte('date', endDate.toISOString().split('T')[0]);
    }

    query = query.order('date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching attendance records:', error);
      throw error;
    }

    return data || [];
  },

  // Get payment records for a worker
  async getPaymentRecords(workerId?: string): Promise<PaymentRecord[]> {
    let query = supabase
      .from('payment_records')
      .select('*');

    if (workerId) {
      query = query.eq('worker_id', workerId);
    }

    query = query.order('payment_date', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching payment records:', error);
      throw error;
    }

    return data || [];
  },

  // Update attendance for a worker
  async updateAttendance(
    workerId: string,
    date: Date,
    status: 'absent' | 'half-day' | 'full-day'
  ): Promise<void> {
    const dateString = date.toISOString().split('T')[0];

    const { error } = await supabase
      .from('attendance_records')
      .upsert({
        worker_id: workerId,
        date: dateString,
        status: status,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'worker_id,date'
      });

    if (error) {
      console.error('Error updating attendance:', error);
      throw error;
    }
  },

  // Create a new worker
  async createWorker(workerData: Omit<Worker, 'id' | 'created_at' | 'updated_at'>): Promise<Worker> {
    const { data, error } = await supabase
      .from('workers')
      .insert(workerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating worker:', error);
      throw error;
    }

    return data;
  },

  // Update worker
  async updateWorker(workerId: string, updates: Partial<Worker>): Promise<Worker> {
    const { data, error } = await supabase
      .from('workers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', workerId)
      .select()
      .single();

    if (error) {
      console.error('Error updating worker:', error);
      throw error;
    }

    return data;
  },

  // Delete worker
  async deleteWorker(workerId: string): Promise<void> {
    const { error } = await supabase
      .from('workers')
      .delete()
      .eq('id', workerId);

    if (error) {
      console.error('Error deleting worker:', error);
      throw error;
    }
  }
};
