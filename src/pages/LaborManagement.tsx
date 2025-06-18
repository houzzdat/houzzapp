
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, CreditCard } from "lucide-react";
import DateRangeSelector from "@/components/shared/DateRangeSelector";
import LaborDashboardCards from "@/components/labor/LaborDashboardCards";
import LaborTable from "@/components/labor/LaborTable";
import LaborPaymentDialog from "@/components/labor/LaborPaymentDialog";
import { useLaborData } from "@/hooks/useLaborData";
import { laborPaymentService } from "@/services/laborPaymentService";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function LaborManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const {
    workerStats,
    isLoading,
    error,
    updateAttendance,
    isUpdatingAttendance,
    calculateDaysPresent,
    totalWorkers,
    totalMandaysUsed,
    remainingMandays,
    totalLaborCost,
  } = useLaborData(dateRange);

  const recordPaymentMutation = useMutation({
    mutationFn: laborPaymentService.recordPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['worker-stats'] });
      queryClient.invalidateQueries({ queryKey: ['financial-transactions'] });
      setShowPaymentDialog(false);
      toast({
        title: "Payment Recorded",
        description: "Labor payment has been recorded successfully.",
      });
    },
    onError: (error) => {
      console.error('Error recording payment:', error);
      toast({
        title: "Error",
        description: "Failed to record payment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAttendanceChange = (workerId: string, date: Date, attendanceType: 'absent' | 'half-day' | 'full-day') => {
    updateAttendance(
      { workerId, date, status: attendanceType },
      {
        onSuccess: () => {
          toast({
            title: "Attendance Updated",
            description: `Worker attendance marked as ${attendanceType.replace('-', ' ')} for ${date.toLocaleDateString()}.`,
          });
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: "Failed to update attendance. Please try again.",
            variant: "destructive",
          });
          console.error("Error updating attendance:", error);
        },
      }
    );
  };

  const handleViewProfile = (workerId: string) => {
    navigate(`/labor-profile/${workerId}`);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Data</h2>
            <p className="text-gray-600">Failed to load labor data. Please try again.</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/project-estimation')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Project Estimates
          </Button>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-brand-dark-blue mb-2">
                Labor Management Dashboard
              </h1>
              <p className="text-brand-gray">
                Manage workforce, attendance, and payments
              </p>
            </div>
            <DateRangeSelector 
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          </div>
        </div>

        {/* Dashboard Cards */}
        <LaborDashboardCards
          totalWorkers={totalWorkers}
          totalMandaysUsed={totalMandaysUsed}
          remainingMandays={remainingMandays}
          totalLaborCost={totalLaborCost}
        />

        {/* Active Labor Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-brand-dark-blue">Active Labor</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowPaymentDialog(true)}
                  variant="outline"
                  className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                >
                  <CreditCard size={16} className="mr-2" />
                  Record Labor Payment
                </Button>
                <Button
                  onClick={() => navigate('/add-labor')}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Labor
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <LaborTable
              workerStats={workerStats}
              isLoading={isLoading}
              isUpdatingAttendance={isUpdatingAttendance}
              calculateDaysPresent={calculateDaysPresent}
              handleAttendanceChange={handleAttendanceChange}
              handleViewProfile={handleViewProfile}
            />
          </CardContent>
        </Card>

        <LaborPaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          onSubmit={recordPaymentMutation.mutate}
          isSubmitting={recordPaymentMutation.isPending}
        />
      </div>
    </div>
  );
}
