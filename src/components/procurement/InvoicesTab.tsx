
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit } from "lucide-react";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";
import CreateInvoiceDialog from "./CreateInvoiceDialog";
import EditInvoiceDialog from "./EditInvoiceDialog";
import PaymentDialog from "./PaymentDialog";
import { Invoice } from "@/services/purchaseOrderService";

export default function InvoicesTab() {
  const { invoices, isLoading, createPayment, isCreatingPayment } = usePurchaseOrders();
  const [showCreateInvoice, setShowCreateInvoice] = useState(false);
  const [showEditInvoice, setShowEditInvoice] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const getPaymentStatus = (invoice: Invoice) => {
    const outstanding = invoice.outstanding_amount || 0;
    const total = invoice.total_amount;
    
    if (outstanding === 0) return 'paid';
    if (outstanding === total) return 'not_paid';
    if (invoice.due_date && new Date(invoice.due_date) < new Date()) return 'overdue';
    return 'not_paid';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Paid</Badge>;
      case 'overdue':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Overdue</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">Not Paid</Badge>;
    }
  };

  const handlePaymentClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentDialog(true);
  };

  const handleEditClick = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowEditInvoice(true);
  };

  const handlePaymentSubmit = (paymentData: any) => {
    createPayment(paymentData);
    setShowPaymentDialog(false);
    setSelectedInvoice(null);
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading invoices...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Invoices Received</h3>
        <Button 
          onClick={() => setShowCreateInvoice(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus size={16} className="mr-2" />
          Add Invoice
        </Button>
      </div>
      
      {invoices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No invoices found.
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Invoice Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Outstanding</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => {
                const paymentStatus = getPaymentStatus(invoice);
                return (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
                    <TableCell>{invoice.vendor_name}</TableCell>
                    <TableCell>
                      {new Date(invoice.invoice_date).toLocaleDateString('en-IN')}
                    </TableCell>
                    <TableCell>
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-IN') : '-'}
                    </TableCell>
                    <TableCell>₹{invoice.total_amount.toLocaleString()}</TableCell>
                    <TableCell>₹{(invoice.outstanding_amount || 0).toLocaleString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePaymentClick(invoice)}
                        disabled={paymentStatus === 'paid'}
                        className="p-0"
                      >
                        {getStatusBadge(paymentStatus)}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditClick(invoice)}
                        className="p-1 h-8 w-8"
                      >
                        <Edit size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      <CreateInvoiceDialog
        open={showCreateInvoice}
        onOpenChange={setShowCreateInvoice}
      />

      <EditInvoiceDialog
        open={showEditInvoice}
        onOpenChange={setShowEditInvoice}
        invoice={selectedInvoice}
      />

      <PaymentDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        invoice={selectedInvoice}
        onSubmit={handlePaymentSubmit}
        isSubmitting={isCreatingPayment}
      />
    </div>
  );
}
