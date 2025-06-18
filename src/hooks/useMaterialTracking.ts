
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { materialTrackingService, MaterialUsage, MaterialReceipt, Vendor } from "@/services/materialTrackingService";
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

export const useMaterialTracking = (dateRange?: DateRange) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Format dates for API calls
  const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined;
  const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined;

  // Material Usage queries
  const { data: materialUsage = [], isLoading: isLoadingUsage } = useQuery({
    queryKey: ['material-usage', startDate, endDate],
    queryFn: () => materialTrackingService.getMaterialUsageByDateRange(startDate, endDate),
  });

  const { data: materialReceipts = [], isLoading: isLoadingReceipts } = useQuery({
    queryKey: ['material-receipts', startDate, endDate],
    queryFn: () => materialTrackingService.getMaterialReceiptsByDateRange(startDate, endDate),
  });

  const { data: vendors = [], isLoading: isLoadingVendors } = useQuery({
    queryKey: ['vendors'],
    queryFn: () => materialTrackingService.getVendors(),
  });

  // Get material estimates from sessionStorage (from project estimation screen)
  const materialEstimates = materialTrackingService.getMaterialEstimates();

  // Mutations
  const createUsageMutation = useMutation({
    mutationFn: (usage: Omit<MaterialUsage, 'id'>) => 
      materialTrackingService.createMaterialUsage(usage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-usage'] });
      toast({
        title: "Success",
        description: "Material usage recorded successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating material usage:', error);
      toast({
        title: "Error",
        description: "Failed to record material usage",
        variant: "destructive",
      });
    },
  });

  const deleteUsageMutation = useMutation({
    mutationFn: (id: string) => materialTrackingService.deleteMaterialUsage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-usage'] });
      toast({
        title: "Success",
        description: "Material usage deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting material usage:', error);
      toast({
        title: "Error",
        description: "Failed to delete material usage",
        variant: "destructive",
      });
    },
  });

  const createReceiptMutation = useMutation({
    mutationFn: (receipt: Omit<MaterialReceipt, 'id'>) => 
      materialTrackingService.createMaterialReceipt(receipt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-receipts'] });
      toast({
        title: "Success",
        description: "Material receipt recorded successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating material receipt:', error);
      toast({
        title: "Error",
        description: "Failed to record material receipt",
        variant: "destructive",
      });
    },
  });

  const deleteReceiptMutation = useMutation({
    mutationFn: (id: string) => materialTrackingService.deleteMaterialReceipt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-receipts'] });
      toast({
        title: "Success",
        description: "Material receipt deleted successfully",
      });
    },
    onError: (error) => {
      console.error('Error deleting material receipt:', error);
      toast({
        title: "Error",
        description: "Failed to delete material receipt",
        variant: "destructive",
      });
    },
  });

  const createVendorMutation = useMutation({
    mutationFn: (vendor: Omit<Vendor, 'id'>) => 
      materialTrackingService.createVendor(vendor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: "Success",
        description: "Vendor added successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating vendor:', error);
      toast({
        title: "Error",
        description: "Failed to add vendor",
        variant: "destructive",
      });
    },
  });

  const uploadInvoiceMutation = useMutation({
    mutationFn: (file: File) => materialTrackingService.uploadInvoiceImage(file),
    onError: (error) => {
      console.error('Error uploading invoice:', error);
      toast({
        title: "Error",
        description: "Failed to upload invoice image",
        variant: "destructive",
      });
    },
  });

  return {
    materialUsage,
    materialReceipts,
    vendors,
    materialEstimates,
    isLoading: isLoadingUsage || isLoadingReceipts || isLoadingVendors,
    createMaterialUsage: createUsageMutation.mutate,
    deleteMaterialUsage: deleteUsageMutation.mutate,
    createMaterialReceipt: createReceiptMutation.mutate,
    deleteMaterialReceipt: deleteReceiptMutation.mutate,
    createVendor: createVendorMutation.mutate,
    uploadInvoice: uploadInvoiceMutation.mutateAsync,
    isCreatingUsage: createUsageMutation.isPending,
    isCreatingReceipt: createReceiptMutation.isPending,
    isCreatingVendor: createVendorMutation.isPending,
    isUploadingInvoice: uploadInvoiceMutation.isPending,
  };
};
