
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Clock, CheckCircle, XCircle } from "lucide-react";

const LEAVE_REQUESTS = [
  { id: 1, worker: "John Doe", type: "Sick Leave", startDate: "2024-06-16", endDate: "2024-06-17", status: "Pending", reason: "Fever" },
  { id: 2, worker: "Jane Smith", type: "Casual Leave", startDate: "2024-06-18", endDate: "2024-06-18", status: "Approved", reason: "Personal work" },
  { id: 3, worker: "Mike Johnson", type: "Emergency Leave", startDate: "2024-06-15", endDate: "2024-06-15", status: "Rejected", reason: "Family emergency" }
];

const OVERTIME_REQUESTS = [
  { id: 1, worker: "David Brown", date: "2024-06-14", hours: 3, reason: "Foundation work completion", status: "Pending" },
  { id: 2, worker: "Sarah Wilson", date: "2024-06-13", hours: 2, reason: "Door installation", status: "Approved" },
  { id: 3, worker: "John Doe", date: "2024-06-12", hours: 4, reason: "Emergency repair", status: "Approved" }
];

export default function AttendanceWorkflow() {
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    worker: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  return (
    <div className="space-y-6">
      {/* Leave Requests */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
              <Clock className="text-brand-orange" size={20} />
              Leave Requests
            </CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-xl" size="sm">
                  <UserPlus size={16} className="mr-2" />
                  New Request
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Submit Leave Request</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Worker Name</Label>
                    <Input 
                      value={newLeaveRequest.worker}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, worker: e.target.value})}
                      placeholder="Enter worker name"
                    />
                  </div>
                  <div>
                    <Label>Leave Type</Label>
                    <Input 
                      value={newLeaveRequest.type}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, type: e.target.value})}
                      placeholder="Sick Leave, Casual Leave, etc."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Input 
                        type="date"
                        value={newLeaveRequest.startDate}
                        onChange={(e) => setNewLeaveRequest({...newLeaveRequest, startDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input 
                        type="date"
                        value={newLeaveRequest.endDate}
                        onChange={(e) => setNewLeaveRequest({...newLeaveRequest, endDate: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Reason</Label>
                    <Input 
                      value={newLeaveRequest.reason}
                      onChange={(e) => setNewLeaveRequest({...newLeaveRequest, reason: e.target.value})}
                      placeholder="Reason for leave"
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
            {LEAVE_REQUESTS.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{request.worker}</div>
                  <div className="text-sm text-brand-gray">{request.type} • {request.startDate} to {request.endDate}</div>
                  <div className="text-xs text-brand-gray">{request.reason}</div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={request.status === "Approved" ? "default" : request.status === "Rejected" ? "destructive" : "secondary"}
                    className={
                      request.status === "Approved" 
                        ? "bg-green-100 text-green-700 hover:bg-green-100" 
                        : request.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                        : ""
                    }
                  >
                    {request.status}
                  </Badge>
                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                        <CheckCircle size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        <XCircle size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Overtime Requests */}
      <Card className="shadow-lg border-0 rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-brand-dark-blue flex items-center gap-2">
            <Clock className="text-brand-orange" size={20} />
            Overtime Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {OVERTIME_REQUESTS.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div className="flex-1">
                  <div className="font-medium text-brand-dark-blue">{request.worker}</div>
                  <div className="text-sm text-brand-gray">{request.hours} hours on {request.date}</div>
                  <div className="text-xs text-brand-gray">{request.reason}</div>
                </div>
                <div className="flex items-center gap-3">
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
                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-300">
                        <CheckCircle size={14} />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                        <XCircle size={14} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
