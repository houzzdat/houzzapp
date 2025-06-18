import { supabase } from '@/integrations/supabase/client'
import { Database } from '@/integrations/supabase/types'
import { calculateProjectEstimates } from '@/utils/estimationAlgorithms'

type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']
type MaterialEstimate = Database['public']['Tables']['material_estimates']['Row']
type LaborEstimate = Database['public']['Tables']['labor_estimates']['Row']
type EquipmentEstimate = Database['public']['Tables']['equipment_estimates']['Row']
type Timeline = Database['public']['Tables']['project_timelines']['Row']

export class ProjectService {
  // Enhanced error logging wrapper
  private static async withErrorLogging<T>(operation: string, fn: () => Promise<T>): Promise<T> {
    try {
      console.log(`=== SUPABASE OPERATION: ${operation} ===`);
      
      // Check authentication before operations
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        console.error(`❌ No authenticated user for operation: ${operation}`);
        throw new Error('Authentication required');
      }
      
      console.log(`✅ Authenticated user: ${session.user.email}`);
      const result = await fn();
      console.log(`✅ SUCCESS: ${operation}`);
      return result;
    } catch (error) {
      console.error(`❌ ERROR in ${operation}:`, error);
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        supabaseError: error
      });
      throw error;
    }
  }

  // Project CRUD operations
  static async createProject(projectData: ProjectInsert) {
    return this.withErrorLogging('createProject', async () => {
      // Ensure we have the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('User must be authenticated to create projects');
      }

      const { data, error } = await supabase
        .from('projects')
        .insert(projectData)
        .select()
        .single()
      
      if (error) throw error
      return data
    });
  }

  static async getProjects() {
    return this.withErrorLogging('getProjects', async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    });
  }

  static async getProject(id: string) {
    return this.withErrorLogging('getProject', async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) throw error
      return data
    });
  }

  static async updateProject(id: string, updates: Partial<ProjectInsert>) {
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }

  // Generate estimates and save to database
  static async generateAndSaveEstimates(projectId: string, projectData: any) {
    return this.withErrorLogging('generateAndSaveEstimates', async () => {
      // Calculate estimates using existing algorithm
      const estimates = calculateProjectEstimates(projectData)
      
      // Save material estimates
      const materialEstimates = estimates.materials.map(item => ({
        project_id: projectId,
        category: this.mapMaterialCategory(item.category),
        item: item.item,
        quantity: item.quantity,
        unit: item.unit,
        unit_rate: item.unitRate
      }))

      const { error: materialError } = await supabase
        .from('material_estimates')
        .insert(materialEstimates)
      
      if (materialError) throw materialError

      // Save labor estimates - fix property names to match LaborEstimate interface
      const laborEstimates = estimates.labor.map(item => ({
        project_id: projectId,
        skill_type: this.mapSkillType(item.skillType),
        worker_count: item.quantity, // Fix: use quantity instead of workerCount
        daily_rate: item.rate,       // Fix: use rate instead of dailyRate
        duration_days: item.duration
      }))

      const { error: laborError } = await supabase
        .from('labor_estimates')
        .insert(laborEstimates)
      
      if (laborError) throw laborError

      // Save equipment estimates
      const equipmentEstimates = estimates.equipment.map(item => ({
        project_id: projectId,
        equipment: item.equipment,
        quantity: item.quantity,
        duration: item.duration,
        rate: item.rate
      }))

      const { error: equipmentError } = await supabase
        .from('equipment_estimates')
        .insert(equipmentEstimates)
      
      if (equipmentError) throw equipmentError

      // Save timeline phases
      const timelinePhases = estimates.timeline.phases.map(phase => ({
        project_id: projectId,
        phase: phase.phase,
        duration: phase.duration,
        dependencies: phase.dependencies,
        critical_path: false // This would be calculated in a more advanced implementation
      }))

      const { error: timelineError } = await supabase
        .from('project_timelines')
        .insert(timelinePhases)
      
      if (timelineError) throw timelineError

      // Save cost summary - fix property name to use available properties
      const costSummary = {
        project_id: projectId,
        material_cost: estimates.cost.materialCost,
        labor_cost: estimates.cost.laborCost,
        equipment_cost: estimates.cost.equipmentCost,
        overhead_cost: estimates.cost.overheadCost,
        profit_margin: 10 // Use default profit margin since CostEstimate doesn't have profit property
      }

      const { error: costError } = await supabase
        .from('cost_summaries')
        .insert(costSummary)
      
      if (costError) throw costError

      return estimates
    });
  }

  // Get all estimates for a project
  static async getProjectEstimates(projectId: string) {
    const [materials, labor, equipment, timeline, costSummary] = await Promise.all([
      supabase.from('material_estimates').select('*').eq('project_id', projectId),
      supabase.from('labor_estimates').select('*').eq('project_id', projectId),
      supabase.from('equipment_estimates').select('*').eq('project_id', projectId),
      supabase.from('project_timelines').select('*').eq('project_id', projectId),
      supabase.from('cost_summaries').select('*').eq('project_id', projectId).single()
    ])

    return {
      materials: materials.data || [],
      labor: labor.data || [],
      equipment: equipment.data || [],
      timeline: timeline.data || [],
      costSummary: costSummary.data
    }
  }

  // Update estimates
  static async updateMaterialEstimate(id: string, updates: Partial<MaterialEstimate>) {
    const { data, error } = await supabase
      .from('material_estimates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateLaborEstimate(id: string, updates: Partial<LaborEstimate>) {
    const { data, error } = await supabase
      .from('labor_estimates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  static async updateEquipmentEstimate(id: string, updates: Partial<EquipmentEstimate>) {
    const { data, error } = await supabase
      .from('equipment_estimates')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }

  // Helper methods to map between frontend and database enums
  private static mapMaterialCategory(category: string): Database['public']['Tables']['material_estimates']['Row']['category'] {
    const mapping: Record<string, any> = {
      'Concrete & Cement': 'concrete',
      'Steel & Reinforcement': 'steel',
      'Masonry': 'brick',
      'Electrical': 'electrical',
      'Plumbing': 'plumbing',
      'Finishing': 'finishing',
      'Aggregates': 'aggregate'
    }
    return mapping[category] || 'concrete'
  }

  private static mapSkillType(skillType: string): Database['public']['Tables']['labor_estimates']['Row']['skill_type'] {
    const mapping: Record<string, any> = {
      'Mason': 'mason',
      'Carpenter': 'carpenter',
      'Electrician': 'electrician',
      'Plumber': 'plumber',
      'Painter': 'painter',
      'Helper': 'helper',
      'Supervisor': 'supervisor',
      'Engineer': 'engineer'
    }
    return mapping[skillType] || 'helper'
  }

  // Safety checklist generation
  static async generateSafetyChecklist(projectId: string, projectType: string) {
    const safetyItems = this.getSafetyItemsByProjectType(projectType)
    
    const checklistItems = safetyItems.map(item => ({
      project_id: projectId,
      checklist_type: projectType,
      safety_item: item,
      is_completed: false
    }))

    const { data, error } = await supabase
      .from('safety_checklists')
      .insert(checklistItems)
      .select()
    
    if (error) throw error
    return data
  }

  private static getSafetyItemsByProjectType(projectType: string): string[] {
    const commonItems = [
      'Site fencing and security',
      'First aid kit availability',
      'Fire extinguisher placement',
      'Safety signage installation',
      'Personal protective equipment (PPE) for all workers',
      'Emergency contact numbers displayed'
    ]

    const typeSpecificItems: Record<string, string[]> = {
      'residential': [
        'Scaffold safety inspection',
        'Electrical safety measures',
        'Material storage safety'
      ],
      'commercial': [
        'Crane operation safety',
        'Fall protection systems',
        'Confined space safety',
        'Heavy machinery operation safety'
      ],
      'industrial': [
        'Chemical safety protocols',
        'Heavy equipment safety',
        'Ventilation safety',
        'Hazardous material handling'
      ],
      'infrastructure': [
        'Traffic management plan',
        'Public safety barriers',
        'Utility line safety',
        'Environmental protection measures'
      ]
    }

    return [...commonItems, ...(typeSpecificItems[projectType] || [])]
  }
}
