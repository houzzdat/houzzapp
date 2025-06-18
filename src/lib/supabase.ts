import { supabase } from "@/integrations/supabase/client";

// Re-export the supabase client and types for backward compatibility
export { supabase };

// Database types
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          name: string
          type: 'residential' | 'commercial' | 'industrial' | 'infrastructure'
          status: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          description: string | null
          client_name: string | null
          start_date: string | null
          target_completion: string | null
          actual_completion: string | null
          budget_range: number | null
          built_up_area: number | null
          number_of_floors: number | null
          floor_height: number | null
          location: string | null
          site_address: string | null
          plot_dimensions: string | null
          soil_type: string | null
          construction_type: string | null
          foundation_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'residential' | 'commercial' | 'industrial' | 'infrastructure'
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          description?: string | null
          client_name?: string | null
          start_date?: string | null
          target_completion?: string | null
          actual_completion?: string | null
          budget_range?: number | null
          built_up_area?: number | null
          number_of_floors?: number | null
          floor_height?: number | null
          location?: string | null
          site_address?: string | null
          plot_dimensions?: string | null
          soil_type?: string | null
          construction_type?: string | null
          foundation_type?: string | null
        }
        Update: {
          id?: string
          name?: string
          type?: 'residential' | 'commercial' | 'industrial' | 'infrastructure'
          status?: 'planning' | 'active' | 'on_hold' | 'completed' | 'cancelled'
          description?: string | null
          client_name?: string | null
          start_date?: string | null
          target_completion?: string | null
          actual_completion?: string | null
          budget_range?: number | null
          built_up_area?: number | null
          number_of_floors?: number | null
          floor_height?: number | null
          location?: string | null
          site_address?: string | null
          plot_dimensions?: string | null
          soil_type?: string | null
          construction_type?: string | null
          foundation_type?: string | null
        }
      }
      material_estimates: {
        Row: {
          id: string
          project_id: string
          category: 'concrete' | 'steel' | 'brick' | 'cement' | 'sand' | 'aggregate' | 'electrical' | 'plumbing' | 'finishing'
          item: string
          quantity: number
          unit: string
          unit_rate: number
          total_cost: number
          supplier_name: string | null
          supplier_contact: string | null
          estimated_delivery_date: string | null
          actual_delivery_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          category: 'concrete' | 'steel' | 'brick' | 'cement' | 'sand' | 'aggregate' | 'electrical' | 'plumbing' | 'finishing'
          item: string
          quantity: number
          unit: string
          unit_rate: number
          supplier_name?: string | null
          supplier_contact?: string | null
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          category?: 'concrete' | 'steel' | 'brick' | 'cement' | 'sand' | 'aggregate' | 'electrical' | 'plumbing' | 'finishing'
          item?: string
          quantity?: number
          unit?: string
          unit_rate?: number
          supplier_name?: string | null
          supplier_contact?: string | null
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
        }
      }
      labor_estimates: {
        Row: {
          id: string
          project_id: string
          skill_type: 'mason' | 'carpenter' | 'electrician' | 'plumber' | 'painter' | 'helper' | 'supervisor' | 'engineer'
          worker_count: number
          daily_rate: number
          duration_days: number
          total_cost: number
          supervisor_required: boolean
          overtime_rate: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          skill_type: 'mason' | 'carpenter' | 'electrician' | 'plumber' | 'painter' | 'helper' | 'supervisor' | 'engineer'
          worker_count: number
          daily_rate: number
          duration_days: number
          supervisor_required?: boolean
          overtime_rate?: number | null
        }
        Update: {
          id?: string
          project_id?: string
          skill_type?: 'mason' | 'carpenter' | 'electrician' | 'plumber' | 'painter' | 'helper' | 'supervisor' | 'engineer'
          worker_count?: number
          daily_rate?: number
          duration_days?: number
          supervisor_required?: boolean
          overtime_rate?: number | null
        }
      }
      equipment_estimates: {
        Row: {
          id: string
          project_id: string
          equipment: string
          quantity: number
          duration: number
          rate: number
          total_cost: number
          supplier_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          equipment: string
          quantity: number
          duration: number
          rate: number
          supplier_name?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          equipment?: string
          quantity?: number
          duration?: number
          rate?: number
          supplier_name?: string | null
        }
      }
      project_timelines: {
        Row: {
          id: string
          project_id: string
          phase: string
          duration: number
          start_date: string | null
          end_date: string | null
          dependencies: string[]
          critical_path: boolean
          progress_percentage: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          phase: string
          duration: number
          start_date?: string | null
          end_date?: string | null
          dependencies?: string[]
          critical_path?: boolean
          progress_percentage?: number
        }
        Update: {
          id?: string
          project_id?: string
          phase?: string
          duration?: number
          start_date?: string | null
          end_date?: string | null
          dependencies?: string[]
          critical_path?: boolean
          progress_percentage?: number
        }
      }
      safety_checklists: {
        Row: {
          id: string
          project_id: string
          checklist_type: string
          safety_item: string
          is_completed: boolean
          completion_date: string | null
          inspector_name: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          checklist_type: string
          safety_item: string
          is_completed?: boolean
          completion_date?: string | null
          inspector_name?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          checklist_type?: string
          safety_item?: string
          is_completed?: boolean
          completion_date?: string | null
          inspector_name?: string | null
          notes?: string | null
        }
      }
      quality_controls: {
        Row: {
          id: string
          project_id: string
          test_type: string
          parameters: any
          results: any
          pass_fail: boolean | null
          test_date: string
          inspector_name: string | null
          remarks: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          test_type: string
          parameters?: any
          results?: any
          pass_fail?: boolean | null
          test_date?: string
          inspector_name?: string | null
          remarks?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          test_type?: string
          parameters?: any
          results?: any
          pass_fail?: boolean | null
          test_date?: string
          inspector_name?: string | null
          remarks?: string | null
        }
      }
      cost_summaries: {
        Row: {
          id: string
          project_id: string
          material_cost: number
          labor_cost: number
          equipment_cost: number
          overhead_cost: number
          profit_margin: number
          total_cost: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          material_cost?: number
          labor_cost?: number
          equipment_cost?: number
          overhead_cost?: number
          profit_margin?: number
        }
        Update: {
          id?: string
          project_id?: string
          material_cost?: number
          labor_cost?: number
          equipment_cost?: number
          overhead_cost?: number
          profit_margin?: number
        }
      }
    }
  }
}
