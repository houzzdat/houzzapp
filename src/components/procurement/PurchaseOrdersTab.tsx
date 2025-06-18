
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye } from "lucide-react";
import { usePurchaseOrders } from "@/hooks/usePurchaseOrders";

export default function PurchaseOrdersTab() {
  const { purchaseOrders, isLoading, generatePOPDF } = usePurchaseOrders();

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading purchase orders...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Purchase Orders</h3>
      
      {purchaseOrders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No purchase orders found.
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">{po.po_number}</TableCell>
                  <TableCell>{po.vendor_name}</TableCell>
                  <TableCell>{po.item_name}</TableCell>
                  <TableCell>{po.quantity} {po.unit}</TableCell>
                  <TableCell>₹{po.total_with_tax.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={po.status === 'pending' ? 'secondary' : 'default'}>
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(po.created_at || '').toLocaleDateString('en-IN')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => generatePOPDF(po)}
                      >
                        <Download size={14} className="mr-1" />
                        PDF
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
