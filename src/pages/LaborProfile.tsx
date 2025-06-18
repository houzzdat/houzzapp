
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { LaborService } from "@/services/laborService";
import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "@/components/labor/profile/ProfileHeader";
import PersonalDetailsCard from "@/components/labor/profile/PersonalDetailsCard";
import WorkSummaryCard from "@/components/labor/profile/WorkSummaryCard";
import PaymentSummaryCards from "@/components/labor/profile/PaymentSummaryCards";
import AttendanceHistoryCard from "@/components/labor/profile/AttendanceHistoryCard";
import PaymentHistoryCard from "@/components/labor/profile/PaymentHistoryCard";

export default function LaborProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch worker details
  const { data: worker, isLoading: isLoadingWorker } = useQuery({
    queryKey: ['worker', id],
    queryFn: () => LaborService.getWorkerById(id!),
    enabled: !!id,
  });

  // Fetch attendance records for this worker
  const { data: attendanceRecords = [] } = useQuery({
    queryKey: ['attendance-records', id],
    queryFn: () => LaborService.getAttendanceRecords(id),
    enabled: !!id,
  });

  // Fetch payment records for this worker
  const { data: paymentRecords = [] } = useQuery({
    queryKey: ['payment-records', id],
    queryFn: () => LaborService.getPaymentRecords(id),
    enabled: !!id,
  });

  if (isLoadingWorker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <User className="mx-auto mb-4 h-12 w-12 text-brand-orange" />
          <p className="text-brand-gray">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!worker) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <User className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <p className="text-red-600 mb-4">Worker not found</p>
          <Button onClick={() => navigate('/labor-management')}>
            Back to Labor Management
          </Button>
        </div>
      </div>
    );
  }

  // Calculate earnings based on attendance
  const presentDays = attendanceRecords.filter(record => record.status === 'full-day').length;
  const halfDays = attendanceRecords.filter(record => record.status === 'half-day').length;
  const totalWorkingDays = presentDays + (halfDays * 0.5);
  const totalEarned = totalWorkingDays * (worker.rate_per_day || 0);
  const totalPaid = paymentRecords.reduce((sum, payment) => sum + Number(payment.amount), 0);
  const pendingPayment = totalEarned - totalPaid;
  const attendanceRate = attendanceRecords.length > 0 ? (totalWorkingDays / attendanceRecords.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <ProfileHeader workerName={worker.name} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-1">
            <PersonalDetailsCard worker={worker} />
            <WorkSummaryCard 
              worker={worker}
              totalWorkingDays={totalWorkingDays}
              attendanceRate={attendanceRate}
            />
          </div>

          {/* Activity and Payments */}
          <div className="lg:col-span-2 space-y-6">
            <PaymentSummaryCards
              totalEarned={totalEarned}
              totalPaid={totalPaid}
              pendingPayment={pendingPayment}
            />

            <AttendanceHistoryCard attendanceRecords={attendanceRecords} />
            <PaymentHistoryCard paymentRecords={paymentRecords} />
          </div>
        </div>
      </div>
    </div>
  );
}
