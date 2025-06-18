import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Trash2, Building2, Upload, Eye } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useMaterialTracking } from "@/hooks/useMaterialTracking";

interface MaterialReceivedTabProps {
  dateRange?: DateRange;
}

export default function MaterialReceivedTab({ dateRange }: MaterialReceivedTabProps) {
  const {
    materialReceipts,
    vendors,
    materialEstimates,
    isLoading,
    createMaterialReceipt,
    deleteMaterialReceipt,
    createVendor,
    uploadInvoice,
    isCreatingReceipt,
    isCreatingVendor,
    isUploadingInvoice,
  } = useMaterialTracking(dateRange);

  const [showAddForm, setShowAddForm] = useState(false);
  const [showVendorForm, setShowVendorForm] = useState(false);
  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    item: '',
    category: '',
    quantity: '',
    unit: '',
    po_number: '',
    vendor_name: '',
    unit_rate: '',
    total_cost: '',
  });

  const [vendorData, setVendorData] = useState({
    name: '',
    contact_number: '',
    email: '',
    address: '',
  });

  const handleItemSelect = (itemName: string) => {
    const selectedItem = materialEstimates.find(item => item.item === itemName);
    if (selectedItem) {
      setFormData({
        ...formData,
        item: selectedItem.item,
        category: selectedItem.category,
        unit: selectedItem.unit,
      });
    }
  };

  const handleQuantityChange = (quantity: string) => {
    setFormData(prev => {
      const newQuantity = parseFloat(quantity) || 0;
      const unitRate = parseFloat(prev.unit_rate) || 0;
      return {
        ...prev,
        quantity,
        total_cost: (newQuantity * unitRate).toString(),
      };
    });
  };

  const handleUnitRateChange = (unitRate: string) => {
    setFormData(prev => {
      const quantity = parseFloat(prev.quantity) || 0;
      const newUnitRate = parseFloat(unitRate) || 0;
      return {
        ...prev,
        unit_rate: unitRate,
        total_cost: (quantity * newUnitRate).toString(),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let invoiceImageUrl = '';
    if (invoiceFile) {
      try {
        invoiceImageUrl = await uploadInvoice(invoiceFile);
      } catch (error) {
        console.error('Failed to upload invoice:', error);
      }
    }

    createMaterialReceipt({
      item: formData.item,
      category: formData.category,
      quantity: parseFloat(formData.quantity),
      unit: formData.unit,
      po_number: formData.po_number || undefined,
      vendor_name: formData.vendor_name,
      unit_rate: parseFloat(formData.unit_rate),
      total_cost: parseFloat(formData.total_cost),
      invoice_image_url: invoiceImageUrl || undefined,
      receipt_date: new Date().toISOString().split('T')[0],
    });
    
    setFormData({
      item: '',
      category: '',
      quantity: '',
      unit: '',
      po_number: '',
      vendor_name: '',
      unit_rate: '',
      total_cost: '',
    });
    setInvoiceFile(null);
    setShowAddForm(false);
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVendor({
      name: vendorData.name,
      contact_number: vendorData.contact_number || undefined,
      email: vendorData.email || undefined,
      address: vendorData.address || undefined,
    });
    
    setVendorData({
      name: '',
      contact_number: '',
      email: '',
      address: '',
    });
    setShowVendorForm(false);
  };

  const handleDelete = (id: string) => {
    deleteMaterialReceipt(id);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInvoiceFile(file);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading material data...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Material Receipt Form */}
      {showAddForm && (
        <Card className="border-brand-orange/20">
          <CardHeader>
            <CardTitle className="text-lg">Record Material Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item">Item Name</Label>
                  <Select value={formData.item} onValueChange={handleItemSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select material from estimates" />
                    </SelectTrigger>
                    <SelectContent>
                      {materialEstimates.map((item, index) => (
                        <SelectItem key={index} value={item.item}>
                          {item.item} ({item.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    readOnly
                    placeholder="Auto-filled from selection"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    step="0.01"
                    value={formData.quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={formData.unit}
                    readOnly
                    placeholder="Auto-filled from selection"
                  />
                </div>
                <div>
                  <Label htmlFor="po_number">PO Number (Optional)</Label>
                  <Input
                    id="po_number"
                    value={formData.po_number}
                    onChange={(e) => setFormData({ ...formData, po_number: e.target.value })}
                    placeholder="Purchase Order Number"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor="vendor_name">Vendor</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowVendorForm(true)}
                    >
                      <Plus size={14} className="mr-1" />
                      Add Vendor
                    </Button>
                  </div>
                  <Select value={formData.vendor_name} onValueChange={(value) => setFormData({ ...formData, vendor_name: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      {vendors.map((vendor) => (
                        <SelectItem key={vendor.id} value={vendor.name}>
                          {vendor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="unit_rate">Unit Rate (₹)</Label>
                  <Input
                    id="unit_rate"
                    type="number"
                    step="0.01"
                    value={formData.unit_rate}
                    onChange={(e) => handleUnitRateChange(e.target.value)}
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="total_cost">Total Cost (₹)</Label>
                  <Input
                    id="total_cost"
                    type="number"
                    step="0.01"
                    value={formData.total_cost}
                    readOnly
                    placeholder="Auto-calculated"
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="invoice">Invoice Image (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="invoice"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                    {invoiceFile && (
                      <span className="text-sm text-green-600">
                        ✓ {invoiceFile.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="bg-brand-orange hover:bg-brand-orange/90"
                  disabled={isCreatingReceipt || isUploadingInvoice}
                >
                  {isCreatingReceipt || isUploadingInvoice ? "Recording..." : "Record Receipt"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Vendor Form */}
      {showVendorForm && (
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">Add New Vendor</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVendorSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="vendor_name">Vendor Name *</Label>
                  <Input
                    id="vendor_name"
                    value={vendorData.name}
                    onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
                    placeholder="Vendor company name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="contact_number">Contact Number</Label>
                  <Input
                    id="contact_number"
                    value={vendorData.contact_number}
                    onChange={(e) => setVendorData({ ...vendorData, contact_number: e.target.value })}
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={vendorData.email}
                    onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                    placeholder="vendor@company.com"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={vendorData.address}
                    onChange={(e) => setVendorData({ ...vendorData, address: e.target.value })}
                    placeholder="Complete address"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isCreatingVendor}
                >
                  {isCreatingVendor ? "Adding..." : "Add Vendor"}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowVendorForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!showAddForm && !showVendorForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          <Plus size={16} className="mr-2" />
          Record Material Receipt
        </Button>
      )}

      {/* Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>Material Receipt Records</CardTitle>
        </CardHeader>
        <CardContent>
          {materialReceipts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No material receipt records found for the selected date range.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Unit Rate</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {materialReceipts.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.receipt_date}</TableCell>
                    <TableCell className="font-medium">{record.item}</TableCell>
                    <TableCell>{record.category}</TableCell>
                    <TableCell>{record.quantity} {record.unit}</TableCell>
                    <TableCell>{record.vendor_name}</TableCell>
                    <TableCell>₹{record.unit_rate}</TableCell>
                    <TableCell className="font-semibold">₹{record.total_cost}</TableCell>
                    <TableCell>
                      {record.invoice_image_url ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(record.invoice_image_url, '_blank')}
                        >
                          <Eye size={14} />
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">No invoice</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(record.id!)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
