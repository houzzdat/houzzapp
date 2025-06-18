import { supabase } from "@/integrations/supabase/client";
import jsPDF from "jspdf";
import "jspdf-autotable";

export interface PurchaseOrder {
  id?: string;
  po_number: string;
  project_id?: string;
  vendor_id?: string;
  vendor_name: string;
  vendor_address?: string;
  vendor_gst?: string;
  item_name: string;
  brand?: string;
  quantity: number;
  unit: string;
  unit_rate: number;
  total_amount: number;
  cgst_rate: number;
  sgst_rate: number;
  cgst_amount: number;
  sgst_amount: number;
  total_with_tax: number;
  expected_delivery_date?: string;
  delivery_address: string;
  payment_terms?: string;
  status: string;
  created_at?: string;
}

export interface Invoice {
  id?: string;
  invoice_number: string;
  po_id?: string;
  po_number?: string;
  vendor_name: string;
  invoice_date: string;
  due_date?: string;
  received_date?: string;
  invoice_amount: number;
  tax_amount?: number;
  total_amount: number;
  outstanding_amount?: number;
  invoice_image_url?: string;
  status: string;
  notes?: string;
  created_at?: string;
}

export const purchaseOrderService = {
  // Generate PO Number
  async generatePONumber(): Promise<string> {
    const { data, error } = await supabase.rpc('generate_po_number');
    if (error) throw error;
    return data;
  },

  // Create Purchase Order
  async createPurchaseOrder(po: Omit<PurchaseOrder, 'id' | 'po_number' | 'created_at'>): Promise<PurchaseOrder> {
    const poNumber = await this.generatePONumber();
    
    const { data, error } = await supabase
      .from('purchase_orders')
      .insert({
        ...po,
        po_number: poNumber,
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get Purchase Orders
  async getPurchaseOrders(): Promise<PurchaseOrder[]> {
    const { data, error } = await supabase
      .from('purchase_orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Create Invoice
  async createInvoice(invoice: Omit<Invoice, 'id' | 'created_at'>): Promise<Invoice> {
    // Set outstanding_amount to total_amount for new invoices
    const invoiceData = {
      ...invoice,
      outstanding_amount: invoice.total_amount
    };

    const { data, error } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Update Invoice
  async updateInvoice(id: string, invoice: Partial<Invoice>): Promise<Invoice> {
    const { data, error } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get Invoices
  async getInvoices(): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Generate PDF for PO
  generatePOPDF(po: PurchaseOrder): void {
    const pdf = new jsPDF();
    
    // Header
    pdf.setFontSize(20);
    pdf.text('PURCHASE ORDER', 105, 30, { align: 'center' });
    
    // PO Details
    pdf.setFontSize(12);
    pdf.text(`PO Number: ${po.po_number}`, 20, 50);
    pdf.text(`Date: ${new Date(po.created_at || new Date()).toLocaleDateString('en-IN')}`, 150, 50);
    
    // Vendor Details
    pdf.setFontSize(14);
    pdf.text('Vendor Details:', 20, 70);
    pdf.setFontSize(12);
    pdf.text(`Name: ${po.vendor_name}`, 20, 85);
    if (po.vendor_address) pdf.text(`Address: ${po.vendor_address}`, 20, 100);
    if (po.vendor_gst) pdf.text(`GSTIN: ${po.vendor_gst}`, 20, 115);
    
    // Item Details Table
    const tableData = [
      ['Item', 'Brand', 'Quantity', 'Unit', 'Rate', 'Amount'],
      [po.item_name, po.brand || '-', po.quantity.toString(), po.unit, `₹${po.unit_rate}`, `₹${po.total_amount}`]
    ];
    
    (pdf as any).autoTable({
      head: [tableData[0]],
      body: [tableData[1]],
      startY: 135,
      theme: 'grid',
    });
    
    // Tax Calculation
    const finalY = (pdf as any).lastAutoTable.finalY + 20;
    pdf.text(`Subtotal: ₹${po.total_amount}`, 130, finalY);
    pdf.text(`CGST (${po.cgst_rate}%): ₹${po.cgst_amount}`, 130, finalY + 15);
    pdf.text(`SGST (${po.sgst_rate}%): ₹${po.sgst_amount}`, 130, finalY + 30);
    pdf.setFontSize(14);
    pdf.text(`Total: ₹${po.total_with_tax}`, 130, finalY + 50);
    
    // Terms
    pdf.setFontSize(12);
    pdf.text('Terms & Conditions:', 20, finalY + 20);
    if (po.payment_terms) pdf.text(`Payment Terms: ${po.payment_terms}`, 20, finalY + 35);
    if (po.expected_delivery_date) pdf.text(`Expected Delivery: ${new Date(po.expected_delivery_date).toLocaleDateString('en-IN')}`, 20, finalY + 50);
    pdf.text(`Delivery Address: ${po.delivery_address}`, 20, finalY + 65);
    
    // Download
    pdf.save(`${po.po_number}.pdf`);
  }
};
