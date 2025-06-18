
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Upload, FileText, CheckCircle, AlertTriangle, Truck } from "lucide-react";

const SAMPLE_RECEIPTS = [
  { id: 1, poNumber: "PO-00125", material: "Cement", quantityOrdered: 500, quantityReceived: 500, supplier: "Shree Cement", status: "Quality Check", date: "2024-06-14", invoiceUploaded: true },
  { id: 2, poNumber: "PO-00126", material: "Steel Rods", quantityOrdered: 50, quantityReceived: 48, supplier: "SteelX India", status: "Pending Receipt", date: "2024-06-13", invoiceUploaded: false },
  { id: 3, poNumber: "PO-00127", material: "Bricks", quantityOrdered: 10000, quantityReceived: 10000, supplier: "UltraBricks", status: "Completed", date: "2024-06-12", invoiceUploaded: true },
];

interface MaterialReceiptProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MaterialReceipt({ isOpen, onClose }: MaterialReceiptProps) {
  const [showNewReceipt, setShowNewReceipt] = useState(false);
  const [receipts, setReceipts] = useState(SAMPLE_RECEIPTS);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Quality Check": return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <Truck className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-700";
      case "Quality Check": return "bg-yellow-100 text-yellow-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Material Receipt Workflow
            <Button 
              onClick={() => setShowNewReceipt(true)}
              className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Record Receipt
            </Button>
          </DialogTitle>
        </DialogHeader>

        {showNewReceipt && (
          <Card className="mb-6 border-brand-orange/20">
            <CardHeader>
              <CardTitle className="text-lg">Record Material Receipt</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="poNumber">PO Number</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select PO" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PO-00125">PO-00125 - Cement</SelectItem>
                      <SelectItem value="PO-00126">PO-00126 - Steel Rods</SelectItem>
                      <SelectItem value="PO-00127">PO-00127 - Bricks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="receivedQuantity">Quantity Received</Label>
                  <Input id="receivedQuantity" type="number" placeholder="Actual quantity received" className="rounded-xl" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input id="deliveryDate" type="date" className="rounded-xl" />
                </div>
                <div>
                  <Label htmlFor="vehicleNumber">Vehicle Number</Label>
                  <Input id="vehicleNumber" placeholder="Vehicle registration number" className="rounded-xl" />
                </div>
              </div>

              <div>
                <Label htmlFor="qualityNotes">Quality Inspection Notes</Label>
                <Textarea id="qualityNotes" placeholder="Quality check observations, damages, etc." className="rounded-xl" />
              </div>

              <div className="space-y-3">
                <Label htmlFor="invoiceUpload">Upload Invoice/Bill/Delivery Challan</Label>
                <div className="border-2 border-dashed border-brand-orange/30 rounded-xl p-6">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-brand-orange/50 mb-4" />
                    <input
                      type="file"
                      id="invoiceUpload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="invoiceUpload"
                      className="cursor-pointer text-brand-orange hover:text-brand-orange/80 font-medium"
                    >
                      Click to upload or drag and drop
                    </label>
                    <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG up to 10MB each</p>
                  </div>
                  {selectedFiles && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Selected Files:</h4>
                      {Array.from(selectedFiles).map((file, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <FileText className="w-4 h-4" />
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="qualityStatus">Quality Status</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Quality check result" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="partial">Partial Acceptance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="storageLocation">Storage Location</Label>
                  <Input id="storageLocation" placeholder="Where materials are stored" className="rounded-xl" />
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 rounded-xl">
                  Record Receipt
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowNewReceipt(false)}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Material Receipts</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead>PO Number</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Ordered/Received</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {receipts.map((receipt) => (
                  <TableRow key={receipt.id}>
                    <TableCell className="font-medium">{receipt.poNumber}</TableCell>
                    <TableCell>{receipt.material}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{receipt.quantityOrdered} ordered</div>
                        <div className="text-brand-gray">{receipt.quantityReceived} received</div>
                      </div>
                    </TableCell>
                    <TableCell>{receipt.supplier}</TableCell>
                    <TableCell>{receipt.date}</TableCell>
                    <TableCell>
                      {receipt.invoiceUploaded ? (
                        <Badge className="bg-green-100 text-green-700">
                          <FileText className="w-3 h-3 mr-1" />
                          Uploaded
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(receipt.status)}
                        <Badge className={getStatusColor(receipt.status)}>
                          {receipt.status}
                        </Badge>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
