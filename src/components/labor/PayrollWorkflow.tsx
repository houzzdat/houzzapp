
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DollarSign, FileCheck, Upload, Download } from "lucide-react";

const PAYROLL_APPROVALS = [
  { id: 1, period: "June 2024 - Week 2", workers: 25, totalAmount: 125000, status: "Pending", submittedBy: "HR Manager" },
  { id: 2, period: "June 2024 - Week 1", workers: 23, totalAmount: 118000, status: "Approved", submittedBy: "HR Manager" },
  { id: 3, period: "May 2024 - Week 4", workers: 27, totalAmount: 135000, status: "Paid", submittedBy: "HR Manager" }
];

const BONUS_REQUESTS = [
  { id: 1, worker: "John Doe", amount: 5000, reason: "Excellent performance", requestedBy: "Site Manager", status: "Pending" },
  { id: 2, worker: "David Brown", amount: 3000, reason: "Safety leadership", requestedBy: "Safety Officer", status: "Approved" },
  { id: 3, worker: "Sarah Wilson", amount: 2500, reason: "Quality work", requestedBy: "Quality Manager", status: "Paid" }
];

export default function PayrollWorkflow() {
  const [newBonusRequest, setNewBonusRequest] = useState({
    worker: "",
    amount: "",
    reason: ""
  });

  return (
    <div className="space-y-6">
      {/* Payroll Approvals */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <FileCheck className="text-brand-orange" size={20} />
              Payroll Approvals
            </CardTitle>
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
              <Upload size={16} className="mr-2" />
              Submit Payroll
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {PAYROLL_APPROVALS.map((payroll) => (
              <div key={payroll.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{payroll.period}</div>
                  <div className="text-sm text-brand-gray">{payroll.workers} workers • ₹{payroll.totalAmount.toLocaleString()}</div>
                  <div className="text-xs text-brand-gray">Submitted by {payroll.submittedBy}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={payroll.status === "Paid" ? "default" : payroll.status === "Approved" ? "secondary" : "outline"}
                    className={
                      payroll.status === "Paid" 
                        ? "bg-green-100 text-green-700 hover:bg-green-100" 
                        : payroll.status === "Approved"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    }
                  >
                    {payroll.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Download size={14} className="mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bonus Requests */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <DollarSign className="text-brand-orange" size={20} />
              Bonus Requests
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
                  Request Bonus
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Request Worker Bonus</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Worker Name</Label>
                    <Input 
                      value={newBonusRequest.worker}
                      onChange={(e) => setNewBonusRequest({...newBonusRequest, worker: e.target.value})}
                      placeholder="Enter worker name"
                    />
                  </div>
                  <div>
                    <Label>Bonus Amount (₹)</Label>
                    <Input 
                      type="number"
                      value={newBonusRequest.amount}
                      onChange={(e) => setNewBonusRequest({...newBonusRequest, amount: e.target.value})}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div>
                    <Label>Reason for Bonus</Label>
                    <Input 
                      value={newBonusRequest.reason}
                      onChange={(e) => setNewBonusRequest({...newBonusRequest, reason: e.target.value})}
                      placeholder="Performance, achievement, etc."
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
            {BONUS_REQUESTS.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{request.worker}</div>
                  <div className="text-sm text-brand-gray">₹{request.amount.toLocaleString()} • {request.reason}</div>
                  <div className="text-xs text-brand-gray">Requested by {request.requestedBy}</div>
                </div>
                <Badge 
                  variant={request.status === "Paid" ? "default" : request.status === "Approved" ? "secondary" : "outline"}
                  className={
                    request.status === "Paid" 
                      ? "bg-green-100 text-green-700 hover:bg-green-100" 
                      : request.status === "Approved"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                  }
                >
                  {request.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
