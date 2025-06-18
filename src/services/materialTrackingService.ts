
import { supabase } from "@/integrations/supabase/client";

export interface MaterialUsage {
  id?: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  used_for: string;
  given_to: string;
  usage_date: string;
}

export interface MaterialReceipt {
  id?: string;
  item: string;
  category: string;
  quantity: number;
  unit: string;
  po_number?: string;
  vendor_name: string;
  unit_rate: number;
  total_cost: number;
  invoice_image_url?: string;
  receipt_date: string;
}

export interface Vendor {
  id?: string;
  name: string;
  contact_number?: string;
  email?: string;
  address?: string;
}

export interface MaterialEstimateItem {
  item: string;
  category: string;
  unit: string;
}

export const materialTrackingService = {
  // Material Usage
  async getMaterialUsage(date?: string) {
    let query = supabase
      .from('material_usage')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (date) {
      query = query.eq('usage_date', date);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getMaterialUsageByDateRange(startDate?: string, endDate?: string) {
    let query = supabase
      .from('material_usage')
      .select('*')
      .order('usage_date', { ascending: false });
    
    if (startDate && endDate) {
      query = query.gte('usage_date', startDate).lte('usage_date', endDate);
    } else if (startDate) {
      query = query.gte('usage_date', startDate);
    } else if (endDate) {
      query = query.lte('usage_date', endDate);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createMaterialUsage(usage: Omit<MaterialUsage, 'id'>) {
    const { data, error } = await supabase
      .from('material_usage')
      .insert(usage)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMaterialUsage(id: string) {
    const { error } = await supabase
      .from('material_usage')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Material Receipts
  async getMaterialReceipts(date?: string) {
    let query = supabase
      .from('material_receipts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (date) {
      query = query.eq('receipt_date', date);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getMaterialReceiptsByDateRange(startDate?: string, endDate?: string) {
    let query = supabase
      .from('material_receipts')
      .select('*')
      .order('receipt_date', { ascending: false });
    
    if (startDate && endDate) {
      query = query.gte('receipt_date', startDate).lte('receipt_date', endDate);
    } else if (startDate) {
      query = query.gte('receipt_date', startDate);
    } else if (endDate) {
      query = query.lte('receipt_date', endDate);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async createMaterialReceipt(receipt: Omit<MaterialReceipt, 'id'>) {
    const { data, error } = await supabase
      .from('material_receipts')
      .insert(receipt)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMaterialReceipt(id: string) {
    const { error } = await supabase
      .from('material_receipts')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Vendors
  async getVendors() {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data;
  },

  async createVendor(vendor: Omit<Vendor, 'id'>) {
    const { data, error } = await supabase
      .from('vendors')
      .insert(vendor)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Material Estimates - Get from sessionStorage (from project estimation)
  getMaterialEstimates(): MaterialEstimateItem[] {
    try {
      const storedEstimates = sessionStorage.getItem('materialEstimates');
      if (storedEstimates) {
        const estimates = JSON.parse(storedEstimates);
        // Transform the estimates to the format we need for dropdowns
        return estimates.map((estimate: any) => ({
          item: estimate.item,
          category: estimate.category,
          unit: estimate.unit
        }));
      }
      return [];
    } catch (error) {
      console.error('Error loading material estimates from sessionStorage:', error);
      return [];
    }
  },

  // File Upload
  async uploadInvoiceImage(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from('invoice-images')
      .upload(fileName, file);
    
    if (error) throw error;
    
    const { data: urlData } = supabase.storage
      .from('invoice-images')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  }
};
