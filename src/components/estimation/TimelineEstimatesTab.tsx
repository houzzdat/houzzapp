
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TimelineEstimate } from "@/utils/estimationAlgorithms";
import { Calendar, Clock } from "lucide-react";
import GanttChartView from "./timeline/GanttChartView";
import PhaseDetailsSection from "./timeline/PhaseDetailsSection";
import TimelineAnalysis from "./timeline/TimelineAnalysis";

interface TimelineEstimatesTabProps {
  estimate: TimelineEstimate;
  onUpdate: (estimate: TimelineEstimate) => void;
}

export default function TimelineEstimatesTab({ estimate, onUpdate }: TimelineEstimatesTabProps) {
  const [editingPhase, setEditingPhase] = useState<string | null>(null);
  const [actualDates, setActualDates] = useState<{[key: string]: {start: string, end: string}}>({});
  const [currentProjectId, setCurrentProjectId] = useState<string>("");

  // Calculate project start date (today for demo)
  const projectStartDate = new Date();
  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  useEffect(() => {
    // Get current project ID from session storage
    const storedContext = sessionStorage.getItem('projectContext');
    if (storedContext) {
      const context = JSON.parse(storedContext);
      setCurrentProjectId(context.selectedProject || '');
      
      // Load synced timeline data
      const syncedTimeline = sessionStorage.getItem(`timeline_${context.selectedProject}`);
      if (syncedTimeline) {
        const parsedTimeline = JSON.parse(syncedTimeline);
        const syncedDates: {[key: string]: {start: string, end: string}} = {};
        parsedTimeline.forEach((phase: any) => {
          if (phase.actualStart && phase.actualEnd) {
            syncedDates[phase.phase] = {
              start: phase.actualStart,
              end: phase.actualEnd
            };
          }
        });
        setActualDates(syncedDates);
      }
    }
  }, []);

  // Listen for timeline updates from planning module
  useEffect(() => {
    const handleTimelineUpdate = (event: CustomEvent) => {
      const { projectId, timelineData } = event.detail;
      if (currentProjectId && projectId === currentProjectId) {
        const syncedDates: {[key: string]: {start: string, end: string}} = {};
        timelineData.forEach((phase: any) => {
          if (phase.actualStart && phase.actualEnd) {
            syncedDates[phase.phase] = {
              start: phase.actualStart,
              end: phase.actualEnd
            };
          }
        });
        setActualDates(syncedDates);
      }
    };

    window.addEventListener('timelineUpdated', handleTimelineUpdate as EventListener);
    return () => {
      window.removeEventListener('timelineUpdated', handleTimelineUpdate as EventListener);
    };
  }, [currentProjectId]);

  // Calculate planned dates for each phase
  const phasesWithDates = estimate.phases.map((phase, index) => {
    const plannedStart = new Date(projectStartDate);
    const prevPhasesTotalDuration = estimate.phases.slice(0, index).reduce((sum, p) => sum + p.duration, 0);
    plannedStart.setDate(plannedStart.getDate() + prevPhasesTotalDuration);
    
    const plannedEnd = new Date(plannedStart);
    plannedEnd.setDate(plannedEnd.getDate() + phase.duration - 1);

    const actualStart = actualDates[phase.phase]?.start || '';
    const actualEnd = actualDates[phase.phase]?.end || '';

    return {
      ...phase,
      plannedStart: formatDate(plannedStart),
      plannedEnd: formatDate(plannedEnd),
      actualStart,
      actualEnd,
    };
  });

  const handleEditPhase = (phaseName: string) => {
    setEditingPhase(phaseName);
  };

  const handleSaveActualDates = (phaseName: string, actualStart: string, actualEnd: string) => {
    const updatedDates = {
      ...actualDates,
      [phaseName]: { start: actualStart, end: actualEnd }
    };
    setActualDates(updatedDates);
    
    // Sync with planning module
    if (currentProjectId) {
      const timelineData = phasesWithDates.map(phase => ({
        id: phase.phase,
        phase: phase.phase,
        actualStart: phase.phase === phaseName ? actualStart : phase.actualStart,
        actualEnd: phase.phase === phaseName ? actualEnd : phase.actualEnd,
        plannedStart: phase.plannedStart,
        plannedEnd: phase.plannedEnd,
        duration: phase.duration,
        dependencies: phase.dependencies,
        progress_percentage: phase.phase === phaseName ? 100 : 0
      }));
      
      sessionStorage.setItem(`timeline_${currentProjectId}`, JSON.stringify(timelineData));
      
      // Dispatch event to notify planning module
      window.dispatchEvent(new CustomEvent('timelineUpdated', {
        detail: {
          projectId: currentProjectId,
          timelineData
        }
      }));
    }
    
    setEditingPhase(null);
  };

  const handleCancelEdit = () => {
    setEditingPhase(null);
  };

  const calculateProjections = () => {
    const completedPhases = phasesWithDates.filter(p => p.actualStart && p.actualEnd);
    if (completedPhases.length === 0) return null;

    const totalDeviation = completedPhases.reduce((sum, phase) => {
      const plannedDuration = phase.duration;
      const actualDuration = phase.actualStart && phase.actualEnd 
        ? Math.ceil((new Date(phase.actualEnd).getTime() - new Date(phase.actualStart).getTime()) / (1000 * 60 * 60 * 24)) + 1
        : plannedDuration;
      return sum + (actualDuration - plannedDuration);
    }, 0);

    const avgDeviationPerPhase = totalDeviation / completedPhases.length;
    return avgDeviationPerPhase;
  };

  const projectionDeviation = calculateProjections();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-brand-dark-blue flex items-center gap-2">
              <Calendar size={20} />
              Project Timeline & Gantt Chart
            </CardTitle>
            <Badge variant="secondary" className="text-base sm:text-lg px-3 py-1 w-fit flex items-center gap-2">
              <Clock size={16} />
              {estimate.totalDuration} Days
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {/* Gantt Chart */}
          <GanttChartView 
            phases={phasesWithDates}
            onEditPhase={handleEditPhase}
          />

          {/* Phase Details and Timeline Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PhaseDetailsSection
              phases={phasesWithDates}
              totalDuration={estimate.totalDuration}
              editingPhase={editingPhase}
              onSave={handleSaveActualDates}
              onCancel={handleCancelEdit}
            />
            
            <TimelineAnalysis
              phases={phasesWithDates}
              totalDuration={estimate.totalDuration}
              projectionDeviation={projectionDeviation}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
