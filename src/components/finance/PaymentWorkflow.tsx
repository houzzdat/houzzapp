
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, FileCheck, Upload, Download } from "lucide-react";

const PAYMENT_APPROVALS = [
  { id: 1, vendor: "Kalpana Steels", amount: 120000, description: "Steel beams delivery", requestedBy: "Procurement", status: "Pending", dueDate: "2024-06-16" },
  { id: 2, vendor: "SafeGuard PPE", amount: 45000, description: "Safety equipment", requestedBy: "Safety Officer", status: "Approved", dueDate: "2024-06-15" },
  { id: 3, vendor: "Concrete Supplier", amount: 85000, description: "Ready mix concrete", requestedBy: "Site Manager", status: "Paid", dueDate: "2024-06-14" }
];

const INVOICE_PROCESSING = [
  { id: 1, vendor: "ABC Construction", invoiceNo: "INV-2024-001", amount: 95000, receivedDate: "2024-06-14", status: "Under Review", approver: "Finance Manager" },
  { id: 2, vendor: "Electrical Works", invoiceNo: "INV-2024-002", amount: 67000, receivedDate: "2024-06-13", status: "Approved", approver: "Project Manager" },
  { id: 3, vendor: "Plumbing Services", invoiceNo: "INV-2024-003", amount: 34000, receivedDate: "2024-06-12", status: "Rejected", approver: "Finance Manager" }
];

export default function PaymentWorkflow() {
  const [newPaymentRequest, setNewPaymentRequest] = useState({
    vendor: "",
    amount: "",
    description: "",
    dueDate: ""
  });

  return (
    <div className="space-y-6">
      {/* Payment Approvals */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <CreditCard className="text-brand-orange" size={20} />
              Payment Approvals
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
                  Request Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Payment Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Vendor Name</Label>
                    <Input 
                      value={newPaymentRequest.vendor}
                      onChange={(e) => setNewPaymentRequest({...newPaymentRequest, vendor: e.target.value})}
                      placeholder="Enter vendor name"
                    />
                  </div>
                  <div>
                    <Label>Amount (₹)</Label>
                    <Input 
                      type="number"
                      value={newPaymentRequest.amount}
                      onChange={(e) => setNewPaymentRequest({...newPaymentRequest, amount: e.target.value})}
                      placeholder="Enter payment amount"
                    />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input 
                      value={newPaymentRequest.description}
                      onChange={(e) => setNewPaymentRequest({...newPaymentRequest, description: e.target.value})}
                      placeholder="What is this payment for?"
                    />
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <Input 
                      type="date"
                      value={newPaymentRequest.dueDate}
                      onChange={(e) => setNewPaymentRequest({...newPaymentRequest, dueDate: e.target.value})}
                    />
                  </div>
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    Submit Request
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {PAYMENT_APPROVALS.map((payment) => (
              <div key={payment.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-brand-dark-blue">{payment.vendor}</div>
                    <div className="text-sm text-brand-gray">₹{payment.amount.toLocaleString()} • {payment.description}</div>
                    <div className="text-xs text-brand-gray">Requested by {payment.requestedBy} • Due: {payment.dueDate}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={payment.status === "Paid" ? "default" : payment.status === "Approved" ? "secondary" : "outline"}
                      className={
                        payment.status === "Paid" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : payment.status === "Approved"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {payment.status}
                    </Badge>
                    {payment.status === "Approved" && (
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                        Process Payment
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Processing */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <FileCheck className="text-brand-orange" size={20} />
              Invoice Processing
            </CardTitle>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
              <Upload size={16} className="mr-2" />
              Upload Invoice
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {INVOICE_PROCESSING.map((invoice) => (
              <div key={invoice.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-brand-dark-blue">{invoice.vendor}</div>
                    <div className="text-sm text-brand-gray">Invoice #{invoice.invoiceNo} • ₹{invoice.amount.toLocaleString()}</div>
                    <div className="text-xs text-brand-gray">Received: {invoice.receivedDate} • Approver: {invoice.approver}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={invoice.status === "Approved" ? "default" : invoice.status === "Rejected" ? "destructive" : "secondary"}
                      className={
                        invoice.status === "Approved" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : invoice.status === "Rejected"
                          ? ""
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {invoice.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      <Download size={14} className="mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
