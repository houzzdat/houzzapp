export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      attendance_records: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["attendance_status"]
          updated_at: string | null
          worker_id: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          updated_at?: string | null
          worker_id?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["attendance_status"]
          updated_at?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "worker_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_summaries: {
        Row: {
          created_at: string | null
          equipment_cost: number | null
          id: string
          labor_cost: number | null
          material_cost: number | null
          overhead_cost: number | null
          profit_margin: number | null
          project_id: string | null
          total_cost: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          equipment_cost?: number | null
          id?: string
          labor_cost?: number | null
          material_cost?: number | null
          overhead_cost?: number | null
          profit_margin?: number | null
          project_id?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          equipment_cost?: number | null
          id?: string
          labor_cost?: number | null
          material_cost?: number | null
          overhead_cost?: number | null
          profit_margin?: number | null
          project_id?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_summaries_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment_estimates: {
        Row: {
          created_at: string | null
          duration: number
          equipment: string
          id: string
          project_id: string | null
          quantity: number
          rate: number
          supplier_name: string | null
          total_cost: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration: number
          equipment: string
          id?: string
          project_id?: string | null
          quantity: number
          rate: number
          supplier_name?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: number
          equipment?: string
          id?: string
          project_id?: string | null
          quantity?: number
          rate?: number
          supplier_name?: string | null
          total_cost?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipment_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_transactions: {
        Row: {
          amount: number
          created_at: string | null
          description: string | null
          id: string
          invoice_payment_id: string | null
          pan_number: string | null
          party_name: string
          payment_mode: string
          project_id: string | null
          transaction_category: string
          transaction_date: string
          transaction_type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          description?: string | null
          id?: string
          invoice_payment_id?: string | null
          pan_number?: string | null
          party_name: string
          payment_mode: string
          project_id?: string | null
          transaction_category: string
          transaction_date: string
          transaction_type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          description?: string | null
          id?: string
          invoice_payment_id?: string | null
          pan_number?: string | null
          party_name?: string
          payment_mode?: string
          project_id?: string | null
          transaction_category?: string
          transaction_date?: string
          transaction_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_transactions_invoice_payment_id_fkey"
            columns: ["invoice_payment_id"]
            isOneToOne: false
            referencedRelation: "invoice_payments"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_payments: {
        Row: {
          amount_paid: number
          balance_remaining: number
          confirmation_image_url: string | null
          created_at: string | null
          id: string
          invoice_id: string | null
          notes: string | null
          payment_date: string
          payment_mode: string
          reference_number: string | null
          updated_at: string | null
        }
        Insert: {
          amount_paid: number
          balance_remaining?: number
          confirmation_image_url?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date: string
          payment_mode: string
          reference_number?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_paid?: number
          balance_remaining?: number
          confirmation_image_url?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          notes?: string | null
          payment_date?: string
          payment_mode?: string
          reference_number?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          created_at: string | null
          due_date: string | null
          id: string
          invoice_amount: number
          invoice_date: string
          invoice_image_url: string | null
          invoice_number: string
          notes: string | null
          outstanding_amount: number | null
          po_id: string | null
          po_number: string | null
          received_date: string | null
          status: string | null
          tax_amount: number | null
          total_amount: number
          updated_at: string | null
          vendor_name: string
        }
        Insert: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_amount: number
          invoice_date: string
          invoice_image_url?: string | null
          invoice_number: string
          notes?: string | null
          outstanding_amount?: number | null
          po_id?: string | null
          po_number?: string | null
          received_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount: number
          updated_at?: string | null
          vendor_name: string
        }
        Update: {
          created_at?: string | null
          due_date?: string | null
          id?: string
          invoice_amount?: number
          invoice_date?: string
          invoice_image_url?: string | null
          invoice_number?: string
          notes?: string | null
          outstanding_amount?: number | null
          po_id?: string | null
          po_number?: string | null
          received_date?: string | null
          status?: string | null
          tax_amount?: number | null
          total_amount?: number
          updated_at?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_po_id_fkey"
            columns: ["po_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      labor_estimates: {
        Row: {
          created_at: string | null
          daily_rate: number
          duration_days: number
          id: string
          overtime_rate: number | null
          project_id: string | null
          skill_type: Database["public"]["Enums"]["skill_type"]
          supervisor_required: boolean | null
          total_cost: number | null
          updated_at: string | null
          worker_count: number
        }
        Insert: {
          created_at?: string | null
          daily_rate: number
          duration_days: number
          id?: string
          overtime_rate?: number | null
          project_id?: string | null
          skill_type: Database["public"]["Enums"]["skill_type"]
          supervisor_required?: boolean | null
          total_cost?: number | null
          updated_at?: string | null
          worker_count: number
        }
        Update: {
          created_at?: string | null
          daily_rate?: number
          duration_days?: number
          id?: string
          overtime_rate?: number | null
          project_id?: string | null
          skill_type?: Database["public"]["Enums"]["skill_type"]
          supervisor_required?: boolean | null
          total_cost?: number | null
          updated_at?: string | null
          worker_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "labor_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      material_calculations: {
        Row: {
          base_rate: number
          built_up_area: number
          calculated_quantity: number
          calculation_notes: string | null
          created_at: string | null
          final_quantity: number
          id: string
          material_id: string | null
          project_id: string | null
          quality_multiplier: number | null
          regional_rate: number | null
          total_cost: number
          updated_at: string | null
          wastage_quantity: number | null
        }
        Insert: {
          base_rate: number
          built_up_area: number
          calculated_quantity: number
          calculation_notes?: string | null
          created_at?: string | null
          final_quantity: number
          id?: string
          material_id?: string | null
          project_id?: string | null
          quality_multiplier?: number | null
          regional_rate?: number | null
          total_cost: number
          updated_at?: string | null
          wastage_quantity?: number | null
        }
        Update: {
          base_rate?: number
          built_up_area?: number
          calculated_quantity?: number
          calculation_notes?: string | null
          created_at?: string | null
          final_quantity?: number
          id?: string
          material_id?: string | null
          project_id?: string | null
          quality_multiplier?: number | null
          regional_rate?: number | null
          total_cost?: number
          updated_at?: string | null
          wastage_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "material_calculations_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material_master"
            referencedColumns: ["id"]
          },
        ]
      }
      material_estimates: {
        Row: {
          actual_delivery_date: string | null
          category: Database["public"]["Enums"]["material_category"]
          created_at: string | null
          estimated_delivery_date: string | null
          id: string
          item: string
          project_id: string | null
          quantity: number
          supplier_contact: string | null
          supplier_name: string | null
          total_cost: number | null
          unit: string
          unit_rate: number
          updated_at: string | null
        }
        Insert: {
          actual_delivery_date?: string | null
          category: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          estimated_delivery_date?: string | null
          id?: string
          item: string
          project_id?: string | null
          quantity: number
          supplier_contact?: string | null
          supplier_name?: string | null
          total_cost?: number | null
          unit: string
          unit_rate: number
          updated_at?: string | null
        }
        Update: {
          actual_delivery_date?: string | null
          category?: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          estimated_delivery_date?: string | null
          id?: string
          item?: string
          project_id?: string | null
          quantity?: number
          supplier_contact?: string | null
          supplier_name?: string | null
          total_cost?: number | null
          unit?: string
          unit_rate?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      material_master: {
        Row: {
          base_rate: number
          calculation_formula: string | null
          category: Database["public"]["Enums"]["material_category"]
          created_at: string | null
          description: string | null
          id: string
          name: string
          unit: string
          updated_at: string | null
          wastage_factor: number | null
        }
        Insert: {
          base_rate: number
          calculation_formula?: string | null
          category: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          unit: string
          updated_at?: string | null
          wastage_factor?: number | null
        }
        Update: {
          base_rate?: number
          calculation_formula?: string | null
          category?: Database["public"]["Enums"]["material_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          unit?: string
          updated_at?: string | null
          wastage_factor?: number | null
        }
        Relationships: []
      }
      material_receipts: {
        Row: {
          category: string
          created_at: string | null
          id: string
          invoice_image_url: string | null
          item: string
          po_number: string | null
          quantity: number
          receipt_date: string
          total_cost: number
          unit: string
          unit_rate: number
          updated_at: string | null
          vendor_name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
          invoice_image_url?: string | null
          item: string
          po_number?: string | null
          quantity: number
          receipt_date?: string
          total_cost: number
          unit: string
          unit_rate: number
          updated_at?: string | null
          vendor_name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
          invoice_image_url?: string | null
          item?: string
          po_number?: string | null
          quantity?: number
          receipt_date?: string
          total_cost?: number
          unit?: string
          unit_rate?: number
          updated_at?: string | null
          vendor_name?: string
        }
        Relationships: []
      }
      material_usage: {
        Row: {
          category: string
          created_at: string | null
          given_to: string
          id: string
          item: string
          quantity: number
          unit: string
          updated_at: string | null
          usage_date: string
          used_for: string
        }
        Insert: {
          category: string
          created_at?: string | null
          given_to: string
          id?: string
          item: string
          quantity: number
          unit: string
          updated_at?: string | null
          usage_date?: string
          used_for: string
        }
        Update: {
          category?: string
          created_at?: string | null
          given_to?: string
          id?: string
          item?: string
          quantity?: number
          unit?: string
          updated_at?: string | null
          usage_date?: string
          used_for?: string
        }
        Relationships: []
      }
      payment_records: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          notes: string | null
          payment_date: string
          payment_method: string | null
          updated_at: string | null
          worker_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date: string
          payment_method?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          notes?: string | null
          payment_date?: string
          payment_method?: string | null
          updated_at?: string | null
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payment_records_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "worker_stats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payment_records_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      project_timelines: {
        Row: {
          created_at: string | null
          critical_path: boolean | null
          dependencies: string[] | null
          duration: number
          end_date: string | null
          id: string
          phase: string
          progress_percentage: number | null
          project_id: string | null
          start_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          critical_path?: boolean | null
          dependencies?: string[] | null
          duration: number
          end_date?: string | null
          id?: string
          phase: string
          progress_percentage?: number | null
          project_id?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          critical_path?: boolean | null
          dependencies?: string[] | null
          duration?: number
          end_date?: string | null
          id?: string
          phase?: string
          progress_percentage?: number | null
          project_id?: string | null
          start_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_timelines_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          accessibility_compliance: boolean | null
          actual_completion: string | null
          architectural_style: string | null
          budget_constraints: number | null
          budget_range: number | null
          built_up_area: number | null
          client_name: string | null
          column_specifications: string | null
          construction_type: string | null
          created_at: string | null
          description: string | null
          end_use_purpose: string | null
          environmental_clearance: boolean | null
          equipment_requirements: string[] | null
          existing_infrastructure: string[] | null
          fire_safety_requirements: string[] | null
          floor_height: number | null
          foundation_type: string | null
          id: string
          local_building_code: string | null
          location: string | null
          material_preferences: string | null
          name: string
          number_of_floors: number | null
          permit_status: string | null
          plot_dimensions: number | null
          quality_standards: string | null
          roof_type: string | null
          site_accessibility: string | null
          site_address: string | null
          soil_type: string | null
          special_requirements: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["project_status"] | null
          structural_system: string | null
          sustainability_goals: string[] | null
          target_completion: string | null
          timeline_constraints: number | null
          type: Database["public"]["Enums"]["project_type"]
          updated_at: string | null
          wall_thickness: number | null
          workforce_availability: string | null
        }
        Insert: {
          accessibility_compliance?: boolean | null
          actual_completion?: string | null
          architectural_style?: string | null
          budget_constraints?: number | null
          budget_range?: number | null
          built_up_area?: number | null
          client_name?: string | null
          column_specifications?: string | null
          construction_type?: string | null
          created_at?: string | null
          description?: string | null
          end_use_purpose?: string | null
          environmental_clearance?: boolean | null
          equipment_requirements?: string[] | null
          existing_infrastructure?: string[] | null
          fire_safety_requirements?: string[] | null
          floor_height?: number | null
          foundation_type?: string | null
          id?: string
          local_building_code?: string | null
          location?: string | null
          material_preferences?: string | null
          name: string
          number_of_floors?: number | null
          permit_status?: string | null
          plot_dimensions?: number | null
          quality_standards?: string | null
          roof_type?: string | null
          site_accessibility?: string | null
          site_address?: string | null
          soil_type?: string | null
          special_requirements?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          structural_system?: string | null
          sustainability_goals?: string[] | null
          target_completion?: string | null
          timeline_constraints?: number | null
          type: Database["public"]["Enums"]["project_type"]
          updated_at?: string | null
          wall_thickness?: number | null
          workforce_availability?: string | null
        }
        Update: {
          accessibility_compliance?: boolean | null
          actual_completion?: string | null
          architectural_style?: string | null
          budget_constraints?: number | null
          budget_range?: number | null
          built_up_area?: number | null
          client_name?: string | null
          column_specifications?: string | null
          construction_type?: string | null
          created_at?: string | null
          description?: string | null
          end_use_purpose?: string | null
          environmental_clearance?: boolean | null
          equipment_requirements?: string[] | null
          existing_infrastructure?: string[] | null
          fire_safety_requirements?: string[] | null
          floor_height?: number | null
          foundation_type?: string | null
          id?: string
          local_building_code?: string | null
          location?: string | null
          material_preferences?: string | null
          name?: string
          number_of_floors?: number | null
          permit_status?: string | null
          plot_dimensions?: number | null
          quality_standards?: string | null
          roof_type?: string | null
          site_accessibility?: string | null
          site_address?: string | null
          soil_type?: string | null
          special_requirements?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["project_status"] | null
          structural_system?: string | null
          sustainability_goals?: string[] | null
          target_completion?: string | null
          timeline_constraints?: number | null
          type?: Database["public"]["Enums"]["project_type"]
          updated_at?: string | null
          wall_thickness?: number | null
          workforce_availability?: string | null
        }
        Relationships: []
      }
      purchase_orders: {
        Row: {
          brand: string | null
          cgst_amount: number | null
          cgst_rate: number | null
          created_at: string | null
          delivery_address: string
          expected_delivery_date: string | null
          id: string
          item_name: string
          payment_terms: string | null
          po_number: string
          project_id: string | null
          quantity: number
          sgst_amount: number | null
          sgst_rate: number | null
          status: string | null
          total_amount: number
          total_with_tax: number | null
          unit: string
          unit_rate: number
          updated_at: string | null
          vendor_address: string | null
          vendor_gst: string | null
          vendor_id: string | null
          vendor_name: string
        }
        Insert: {
          brand?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          delivery_address: string
          expected_delivery_date?: string | null
          id?: string
          item_name: string
          payment_terms?: string | null
          po_number: string
          project_id?: string | null
          quantity: number
          sgst_amount?: number | null
          sgst_rate?: number | null
          status?: string | null
          total_amount: number
          total_with_tax?: number | null
          unit: string
          unit_rate: number
          updated_at?: string | null
          vendor_address?: string | null
          vendor_gst?: string | null
          vendor_id?: string | null
          vendor_name: string
        }
        Update: {
          brand?: string | null
          cgst_amount?: number | null
          cgst_rate?: number | null
          created_at?: string | null
          delivery_address?: string
          expected_delivery_date?: string | null
          id?: string
          item_name?: string
          payment_terms?: string | null
          po_number?: string
          project_id?: string | null
          quantity?: number
          sgst_amount?: number | null
          sgst_rate?: number | null
          status?: string | null
          total_amount?: number
          total_with_tax?: number | null
          unit?: string
          unit_rate?: number
          updated_at?: string | null
          vendor_address?: string | null
          vendor_gst?: string | null
          vendor_id?: string | null
          vendor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_controls: {
        Row: {
          created_at: string | null
          id: string
          inspector_name: string | null
          parameters: Json | null
          pass_fail: boolean | null
          project_id: string | null
          remarks: string | null
          results: Json | null
          test_date: string | null
          test_type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inspector_name?: string | null
          parameters?: Json | null
          pass_fail?: boolean | null
          project_id?: string | null
          remarks?: string | null
          results?: Json | null
          test_date?: string | null
          test_type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inspector_name?: string | null
          parameters?: Json | null
          pass_fail?: boolean | null
          project_id?: string | null
          remarks?: string | null
          results?: Json | null
          test_date?: string | null
          test_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_controls_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      quality_multipliers: {
        Row: {
          created_at: string | null
          id: string
          material_id: string | null
          multiplier: number
          quality_grade: Database["public"]["Enums"]["quality_grade"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          multiplier: number
          quality_grade: Database["public"]["Enums"]["quality_grade"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          material_id?: string | null
          multiplier?: number
          quality_grade?: Database["public"]["Enums"]["quality_grade"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quality_multipliers_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material_master"
            referencedColumns: ["id"]
          },
        ]
      }
      regional_rates: {
        Row: {
          city: string | null
          created_at: string | null
          effective_date: string | null
          id: string
          material_id: string | null
          rate_multiplier: number | null
          state: string
          updated_at: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string | null
          effective_date?: string | null
          id?: string
          material_id?: string | null
          rate_multiplier?: number | null
          state: string
          updated_at?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string | null
          effective_date?: string | null
          id?: string
          material_id?: string | null
          rate_multiplier?: number | null
          state?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "regional_rates_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "material_master"
            referencedColumns: ["id"]
          },
        ]
      }
      safety_checklists: {
        Row: {
          checklist_type: string
          completion_date: string | null
          created_at: string | null
          id: string
          inspector_name: string | null
          is_completed: boolean | null
          notes: string | null
          project_id: string | null
          safety_item: string
          updated_at: string | null
        }
        Insert: {
          checklist_type: string
          completion_date?: string | null
          created_at?: string | null
          id?: string
          inspector_name?: string | null
          is_completed?: boolean | null
          notes?: string | null
          project_id?: string | null
          safety_item: string
          updated_at?: string | null
        }
        Update: {
          checklist_type?: string
          completion_date?: string | null
          created_at?: string | null
          id?: string
          inspector_name?: string | null
          is_completed?: boolean | null
          notes?: string | null
          project_id?: string | null
          safety_item?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "safety_checklists_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          contact_number: string | null
          created_at: string | null
          email: string | null
          gst_number: string | null
          id: string
          name: string
          pan_number: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string | null
          gst_number?: string | null
          id?: string
          name: string
          pan_number?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          contact_number?: string | null
          created_at?: string | null
          email?: string | null
          gst_number?: string | null
          id?: string
          name?: string
          pan_number?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      workers: {
        Row: {
          aadhar_image_url: string | null
          aadhar_number: string | null
          address: string | null
          category: Database["public"]["Enums"]["labor_category"]
          created_at: string | null
          id: string
          is_active: boolean | null
          mandays_used: number | null
          name: string
          payment_made: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          phase: string | null
          phone_number: string | null
          profile_image_url: string | null
          rate_per_day: number
          total_mandays: number | null
          total_payment: number | null
          updated_at: string | null
        }
        Insert: {
          aadhar_image_url?: string | null
          aadhar_number?: string | null
          address?: string | null
          category: Database["public"]["Enums"]["labor_category"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mandays_used?: number | null
          name: string
          payment_made?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phase?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          rate_per_day: number
          total_mandays?: number | null
          total_payment?: number | null
          updated_at?: string | null
        }
        Update: {
          aadhar_image_url?: string | null
          aadhar_number?: string | null
          address?: string | null
          category?: Database["public"]["Enums"]["labor_category"]
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          mandays_used?: number | null
          name?: string
          payment_made?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          phase?: string | null
          phone_number?: string | null
          profile_image_url?: string | null
          rate_per_day?: number
          total_mandays?: number | null
          total_payment?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      worker_stats: {
        Row: {
          category: Database["public"]["Enums"]["labor_category"] | null
          days_present: number | null
          id: string | null
          mandays_used: number | null
          name: string | null
          payment_made: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          phase: string | null
          rate_per_day: number | null
          today_attendance:
            | Database["public"]["Enums"]["attendance_status"]
            | null
          total_attendance_days: number | null
          total_mandays: number | null
          total_payment: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      generate_po_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      attendance_status: "absent" | "half-day" | "full-day"
      labor_category:
        | "mason"
        | "electrician"
        | "carpenter"
        | "plumber"
        | "painter"
        | "helper"
        | "supervisor"
        | "engineer"
      material_category:
        | "concrete"
        | "steel"
        | "brick"
        | "cement"
        | "sand"
        | "aggregate"
        | "electrical"
        | "plumbing"
        | "finishing"
      payment_status: "pending" | "partial" | "completed"
      project_status:
        | "planning"
        | "active"
        | "on_hold"
        | "completed"
        | "cancelled"
      project_type:
        | "residential"
        | "commercial"
        | "industrial"
        | "infrastructure"
      quality_grade: "economy" | "standard" | "premium" | "luxury"
      skill_type:
        | "mason"
        | "carpenter"
        | "electrician"
        | "plumber"
        | "painter"
        | "helper"
        | "supervisor"
        | "engineer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      attendance_status: ["absent", "half-day", "full-day"],
      labor_category: [
        "mason",
        "electrician",
        "carpenter",
        "plumber",
        "painter",
        "helper",
        "supervisor",
        "engineer",
      ],
      material_category: [
        "concrete",
        "steel",
        "brick",
        "cement",
        "sand",
        "aggregate",
        "electrical",
        "plumbing",
        "finishing",
      ],
      payment_status: ["pending", "partial", "completed"],
      project_status: [
        "planning",
        "active",
        "on_hold",
        "completed",
        "cancelled",
      ],
      project_type: [
        "residential",
        "commercial",
        "industrial",
        "infrastructure",
      ],
      quality_grade: ["economy", "standard", "premium", "luxury"],
      skill_type: [
        "mason",
        "carpenter",
        "electrician",
        "plumber",
        "painter",
        "helper",
        "supervisor",
        "engineer",
      ],
    },
  },
} as const
