
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LaborService } from '@/services/laborService';
import { Database } from '@/integrations/supabase/types';
import { DateRange } from 'react-day-picker';

type WorkerStats = Database['public']['Views']['worker_stats']['Row'];
type AttendanceStatus = 'absent' | 'half-day' | 'full-day';

export const useLaborData = (dateRange?: DateRange) => {
  const queryClient = useQueryClient();

  // Get worker stats
  const { data: workerStats = [], isLoading, error } = useQuery({
    queryKey: ['worker-stats'],
    queryFn: LaborService.getWorkerStats,
  });

  // Get labor estimates to calculate total planned mandays
  const { data: laborEstimates = [] } = useQuery({
    queryKey: ['labor-estimates'],
    queryFn: async () => {
      // This would typically fetch from your labor estimates service
      // For now, we'll return empty array as the service doesn't exist yet
      return [];
    },
  });

  // Get attendance records for date range calculations
  const { data: attendanceRecords = [] } = useQuery({
    queryKey: ['attendance-records', dateRange?.from, dateRange?.to],
    queryFn: () => LaborService.getAttendanceRecords(
      undefined,
      dateRange?.from,
      dateRange?.to
    ),
    enabled: !!dateRange?.from && !!dateRange?.to,
  });

  // Update attendance mutation
  const updateAttendanceMutation = useMutation({
    mutationFn: ({ workerId, date, status }: { 
      workerId: string; 
      date: Date; 
      status: AttendanceStatus 
    }) => LaborService.updateAttendance(workerId, date, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-stats'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-records'] });
    },
  });

  // Calculate days present for each worker based on date range
  const calculateDaysPresent = (workerId: string): number => {
    if (!dateRange?.from || !dateRange?.to) {
      const worker = workerStats.find(w => w.id === workerId);
      return worker?.days_present || 0;
    }

    const workerAttendance = attendanceRecords.filter(record => record.worker_id === workerId);
    return workerAttendance.reduce((count, record) => {
      if (record.status === 'full-day') return count + 1;
      if (record.status === 'half-day') return count + 0.5;
      return count;
    }, 0);
  };

  // Dashboard metrics
  const totalWorkers = workerStats.length;
  const presentWorkers = workerStats.filter(w => w.today_attendance === 'full-day').length;
  const absentWorkers = workerStats.filter(w => w.today_attendance === 'absent').length;
  const halfDayWorkers = workerStats.filter(w => w.today_attendance === 'half-day').length;
  
  // Calculate mandays used as sum of days worked by all workers (days_present)
  const totalMandaysUsed = workerStats.reduce((sum, worker) => sum + (worker.days_present || 0), 0);
  
  // Calculate total estimated mandays from labor estimates (quantity * duration for each estimate)
  const totalMandaysFromEstimates = laborEstimates.reduce((sum: number, estimate: any) => {
    return sum + ((estimate.quantity || 0) * (estimate.duration || 0));
  }, 0);
  
  // Use estimated mandays from labor estimates if available, otherwise fall back to worker-specific mandays
  const totalMandaysPlanned = totalMandaysFromEstimates > 0 
    ? totalMandaysFromEstimates 
    : workerStats.reduce((sum, worker) => sum + (worker.total_mandays || 0), 0);
  
  // Calculate total labor cost as sum of total earned (days_present * rate_per_day) for all workers
  const totalLaborCost = workerStats.reduce((sum, worker) => {
    const daysPresent = worker.days_present || 0;
    const ratePerDay = worker.rate_per_day || 0;
    const totalEarned = daysPresent * ratePerDay;
    return sum + totalEarned;
  }, 0);

  return {
    workerStats,
    isLoading,
    error,
    updateAttendance: updateAttendanceMutation.mutate,
    isUpdatingAttendance: updateAttendanceMutation.isPending,
    calculateDaysPresent,
    // Dashboard metrics
    totalWorkers,
    presentWorkers,
    absentWorkers,
    halfDayWorkers,
    totalMandaysUsed,
    totalMandaysPlanned,
    remainingMandays: totalMandaysPlanned - totalMandaysUsed,
    totalLaborCost,
  };
};
