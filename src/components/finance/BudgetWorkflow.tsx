
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";

const BUDGET_REQUESTS = [
  { id: 1, category: "Additional Steel", amount: 50000, requestedBy: "Site Manager", reason: "Design changes require extra reinforcement", status: "Pending", priority: "High" },
  { id: 2, category: "Emergency Repairs", amount: 25000, requestedBy: "Maintenance Team", reason: "Concrete mixer breakdown", status: "Approved", priority: "Critical" },
  { id: 3, category: "Safety Equipment", amount: 15000, requestedBy: "Safety Officer", reason: "Additional PPE for new workers", status: "Under Review", priority: "Medium" }
];

const BUDGET_ALERTS = [
  { id: 1, category: "Labor Wages", budgeted: 300000, spent: 285000, percentage: 95, status: "Warning" },
  { id: 2, category: "Cement", budgeted: 80000, spent: 85000, percentage: 106, status: "Over Budget" },
  { id: 3, category: "Steel Purchase", budgeted: 120000, spent: 75000, percentage: 63, status: "On Track" }
];

export default function BudgetWorkflow() {
  const [newBudgetRequest, setNewBudgetRequest] = useState({
    category: "",
    amount: "",
    reason: ""
  });

  return (
    <div className="space-y-6">
      {/* Budget Requests */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <TrendingUp className="text-brand-orange" size={20} />
              Budget Requests
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
                  Request Budget
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Budget Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Category</Label>
                    <Input 
                      value={newBudgetRequest.category}
                      onChange={(e) => setNewBudgetRequest({...newBudgetRequest, category: e.target.value})}
                      placeholder="Materials, Labor, Equipment, etc."
                    />
                  </div>
                  <div>
                    <Label>Amount (₹)</Label>
                    <Input 
                      type="number"
                      value={newBudgetRequest.amount}
                      onChange={(e) => setNewBudgetRequest({...newBudgetRequest, amount: e.target.value})}
                      placeholder="Enter amount needed"
                    />
                  </div>
                  <div>
                    <Label>Justification</Label>
                    <Input 
                      value={newBudgetRequest.reason}
                      onChange={(e) => setNewBudgetRequest({...newBudgetRequest, reason: e.target.value})}
                      placeholder="Why is this budget needed?"
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
            {BUDGET_REQUESTS.map((request) => (
              <div key={request.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium text-brand-dark-blue">{request.category}</div>
                    <div className="text-sm text-brand-gray">₹{request.amount.toLocaleString()} • Requested by {request.requestedBy}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline"
                      className={
                        request.priority === "Critical"
                          ? "border-red-300 text-red-700 bg-red-50"
                          : request.priority === "High"
                          ? "border-orange-300 text-orange-700 bg-orange-50"
                          : "border-yellow-300 text-yellow-700 bg-yellow-50"
                      }
                    >
                      {request.priority}
                    </Badge>
                    <Badge 
                      variant={request.status === "Approved" ? "default" : "secondary"}
                      className={
                        request.status === "Approved" 
                          ? "bg-green-100 text-green-700 hover:bg-green-100" 
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-brand-gray">{request.reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Alerts */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
            <AlertCircle className="text-red-500" size={20} />
            Budget Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {BUDGET_ALERTS.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium text-brand-dark-blue">{alert.category}</div>
                  <div className="flex items-center gap-2">
                    {alert.status === "Over Budget" ? (
                      <AlertCircle className="text-red-500" size={16} />
                    ) : alert.status === "Warning" ? (
                      <Clock className="text-yellow-500" size={16} />
                    ) : (
                      <CheckCircle className="text-green-500" size={16} />
                    )}
                    <Badge 
                      variant="outline"
                      className={
                        alert.status === "Over Budget"
                          ? "border-red-300 text-red-700 bg-red-50"
                          : alert.status === "Warning"
                          ? "border-yellow-300 text-yellow-700 bg-yellow-50"
                          : "border-green-300 text-green-700 bg-green-50"
                      }
                    >
                      {alert.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-gray">Budgeted: ₹{alert.budgeted.toLocaleString()}</span>
                    <span className="text-brand-gray">Spent: ₹{alert.spent.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        alert.percentage > 100 ? 'bg-red-500' : alert.percentage > 90 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(alert.percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm font-medium text-brand-dark-blue">
                    {alert.percentage}% utilized
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
