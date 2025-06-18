
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, ShoppingCart, Bell, TrendingDown } from "lucide-react";

const SAMPLE_LOW_STOCK = [
  { id: 1, material: "Steel Rods", currentStock: 42, minStock: 50, unit: "tons", lastUsed: "2024-06-13", usageRate: "5 tons/week", supplier: "SteelX India", reorderSuggestion: 25 },
  { id: 2, material: "Screws", currentStock: 85, minStock: 100, unit: "boxes", lastUsed: "2024-06-14", usageRate: "15 boxes/week", supplier: "Hardware Plus", reorderSuggestion: 50 },
  { id: 3, material: "Wire", currentStock: 12, minStock: 20, unit: "rolls", lastUsed: "2024-06-12", usageRate: "3 rolls/week", supplier: "Electric Supply Co", reorderSuggestion: 15 },
];

interface LowStockAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LowStockAlert({ isOpen, onClose }: LowStockAlertProps) {
  const [alerts, setAlerts] = useState(SAMPLE_LOW_STOCK);

  const getUrgencyLevel = (current: number, min: number) => {
    const ratio = current / min;
    if (ratio < 0.5) return { level: "Critical", color: "bg-red-100 text-red-700", icon: "🔴" };
    if (ratio < 0.8) return { level: "High", color: "bg-orange-100 text-orange-700", icon: "🟡" };
    return { level: "Medium", color: "bg-yellow-100 text-yellow-700", icon: "🟠" };
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-brand-orange" />
            Low Stock Alert System
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <AlertTriangle size={16} />
                Critical Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alerts.filter(item => getUrgencyLevel(item.currentStock, item.minStock).level === "Critical").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingDown size={16} />
                High Priority
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {alerts.filter(item => getUrgencyLevel(item.currentStock, item.minStock).level === "High").length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-brand-medium-blue text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Bell size={16} />
                Total Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>Material</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min Stock</TableHead>
                  <TableHead>Usage Rate</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Urgency</TableHead>
                  <TableHead>Suggestion</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((item) => {
                  const urgency = getUrgencyLevel(item.currentStock, item.minStock);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.material}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-red-600">{item.currentStock}</span>
                          <span className="text-brand-gray">{item.unit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-brand-gray">{item.minStock} {item.unit}</span>
                      </TableCell>
                      <TableCell className="text-sm text-brand-gray">{item.usageRate}</TableCell>
                      <TableCell className="text-sm">{item.supplier}</TableCell>
                      <TableCell>
                        <Badge className={urgency.color}>
                          {urgency.icon} {urgency.level}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">Reorder {item.reorderSuggestion} {item.unit}</div>
                          <div className="text-brand-gray">~2 weeks supply</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Alert Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Notification Preferences</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Email alerts for critical items</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Daily low stock summary</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>SMS alerts for urgent items</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Auto-Reorder Settings</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Auto-create PO for trusted suppliers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Suggest reorder quantities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked />
                    <span>Consider seasonal demand</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
