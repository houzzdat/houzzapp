
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { purchaseOrderService, PurchaseOrder, Invoice } from "@/services/purchaseOrderService";
import { invoicePaymentService, InvoicePayment } from "@/services/invoicePaymentService";
import { useToast } from "@/hooks/use-toast";

export const usePurchaseOrders = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Purchase Orders
  const { data: purchaseOrders = [], isLoading: isLoadingPOs } = useQuery({
    queryKey: ['purchase-orders'],
    queryFn: () => purchaseOrderService.getPurchaseOrders(),
  });

  const { data: invoices = [], isLoading: isLoadingInvoices } = useQuery({
    queryKey: ['invoices'],
    queryFn: () => purchaseOrderService.getInvoices(),
  });

  const createPOMutation = useMutation({
    mutationFn: (po: Omit<PurchaseOrder, 'id' | 'po_number' | 'created_at'>) => 
      purchaseOrderService.createPurchaseOrder(po),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchase-orders'] });
      toast({
        title: "Success",
        description: "Purchase order created successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating PO:', error);
      toast({
        title: "Error",
        description: "Failed to create purchase order",
        variant: "destructive",
      });
    },
  });

  const createInvoiceMutation = useMutation({
    mutationFn: (invoice: Omit<Invoice, 'id' | 'created_at'>) => 
      purchaseOrderService.createInvoice(invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice recorded successfully",
      });
    },
    onError: (error) => {
      console.error('Error creating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to record invoice",
        variant: "destructive",
      });
    },
  });

  const updateInvoiceMutation = useMutation({
    mutationFn: ({ id, invoice }: { id: string; invoice: Partial<Invoice> }) =>
      purchaseOrderService.updateInvoice(id, invoice),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Success",
        description: "Invoice updated successfully",
      });
    },
    onError: (error) => {
      console.error('Error updating invoice:', error);
      toast({
        title: "Error",
        description: "Failed to update invoice",
        variant: "destructive",
      });
    },
  });

  const createPaymentMutation = useMutation({
    mutationFn: (payment: Omit<InvoicePayment, 'id' | 'created_at'>) =>
      invoicePaymentService.createPayment(payment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['invoice-payments'] });
      toast({
        title: "Success",
        description: "Payment recorded successfully",
      });
    },
    onError: (error) => {
      console.error('Error recording payment:', error);
      toast({
        title: "Error",
        description: "Failed to record payment",
        variant: "destructive",
      });
    },
  });

  return {
    purchaseOrders,
    invoices,
    isLoading: isLoadingPOs || isLoadingInvoices,
    createPurchaseOrder: createPOMutation.mutate,
    createInvoice: createInvoiceMutation.mutate,
    updateInvoice: (id: string, invoice: Partial<Invoice>) => updateInvoiceMutation.mutate({ id, invoice }),
    createPayment: createPaymentMutation.mutate,
    isCreatingPO: createPOMutation.isPending,
    isCreatingInvoice: createInvoiceMutation.isPending,
    isUpdatingInvoice: updateInvoiceMutation.isPending,
    isCreatingPayment: createPaymentMutation.isPending,
    generatePOPDF: purchaseOrderService.generatePOPDF,
  };
};
