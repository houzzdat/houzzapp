
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface GanttPhase {
  phase: string;
  duration: number;
  plannedStart: string;
  plannedEnd: string;
  actualStart: string;
  actualEnd: string;
}

interface GanttChartViewProps {
  phases: GanttPhase[];
  onEditPhase: (phaseName: string) => void;
}

export default function GanttChartView({ phases, onEditPhase }: GanttChartViewProps) {
  const isMobile = useIsMobile();
  
  const generateGanttTimeline = () => {
    const allDates = [
      ...phases.map(p => new Date(p.plannedStart)),
      ...phases.map(p => new Date(p.plannedEnd)),
      ...phases.filter(p => p.actualStart).map(p => new Date(p.actualStart)),
      ...phases.filter(p => p.actualEnd).map(p => new Date(p.actualEnd))
    ];
    
    const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
    const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return { minDate, totalDays };
  };

  const { minDate, totalDays } = generateGanttTimeline();

  const getBarPosition = (startDate: string, endDate: string) => {
    if (!startDate || !endDate) return { left: 0, width: 0 };
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startOffset = Math.ceil((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return {
      left: (startOffset / totalDays) * 100,
      width: (duration / totalDays) * 100
    };
  };

  const calculateActualDays = (actualStart: string, actualEnd: string) => {
    const startDate = new Date(actualStart);
    const endDate = new Date(actualEnd);
    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const generateDateHeader = () => {
    // Adjust interval based on screen size and project length
    const baseInterval = totalDays > 90 ? 30 : 15;
    const interval = isMobile ? Math.max(baseInterval, 7) : baseInterval;
    const headerDates = [];
    
    for (let i = 0; i < totalDays; i += interval) {
      const date = new Date(minDate);
      date.setDate(date.getDate() + i);
      headerDates.push({
        date,
        position: (i / totalDays) * 100
      });
    }
    
    if (headerDates[headerDates.length - 1]?.position < 95) {
      const endDate = new Date(minDate);
      endDate.setDate(endDate.getDate() + totalDays - 1);
      headerDates.push({
        date: endDate,
        position: 100
      });
    }
    
    return headerDates;
  };

  const dateHeaders = generateDateHeader();
  
  // Calculate minimum chart width based on content
  const minChartWidth = Math.max(600, totalDays * (isMobile ? 4 : 8));
  const phaseNameWidth = isMobile ? 120 : 200;

  return (
    <div className="mb-8">
      <h3 className="font-semibold text-lg mb-4">Gantt Chart View</h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-fit" style={{ minWidth: `${phaseNameWidth + minChartWidth}px` }}>
          {/* Date Header */}
          <div className="mb-4">
            <div className="flex text-xs text-gray-600 mb-2">
              <div className="flex-shrink-0" style={{ width: `${phaseNameWidth}px` }}></div>
              <div className="relative" style={{ width: `${minChartWidth}px`, minHeight: isMobile ? '40px' : '60px' }}>
                {dateHeaders.map((header, idx) => (
                  <div 
                    key={idx} 
                    className="absolute text-center z-10" 
                    style={{ 
                      left: `${header.position}%`,
                      transform: 'translateX(-50%)',
                      top: '0',
                      width: isMobile ? '50px' : '80px'
                    }}
                  >
                    <div className={`font-semibold ${isMobile ? 'text-xs' : 'text-xs'}`}>
                      {header.date.getDate()}
                    </div>
                    <div className={`${isMobile ? 'text-xs' : 'text-xs'}`}>
                      {header.date.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    {!isMobile && (
                      <div className="text-xs text-gray-500">
                        {header.date.getFullYear()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Phase Bars */}
          <div className="space-y-3">
            {phases.map((phase) => (
              <div key={phase.phase} className="flex items-center">
                <div className="flex-shrink-0 pr-2" style={{ width: `${phaseNameWidth}px` }}>
                  <div className="flex items-center justify-between min-w-0">
                    <span className={`font-medium text-brand-dark-blue truncate flex-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {phase.phase}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditPhase(phase.phase)}
                      className={`flex-shrink-0 ml-1 ${isMobile ? 'p-1 h-5 w-5' : 'p-1 h-6 w-6'}`}
                    >
                      <Edit size={isMobile ? 10 : 12} />
                    </Button>
                  </div>
                </div>
                
                <div 
                  className={`relative bg-gray-100 rounded border ${isMobile ? 'h-10' : 'h-12'}`}
                  style={{ width: `${minChartWidth}px` }}
                >
                  {/* Planned Timeline Bar */}
                  <div
                    className={`absolute top-1 bg-blue-400 rounded text-white text-xs flex items-center justify-center ${isMobile ? 'h-3' : 'h-4'}`}
                    style={{
                      left: `${getBarPosition(phase.plannedStart, phase.plannedEnd).left}%`,
                      width: `${getBarPosition(phase.plannedStart, phase.plannedEnd).width}%`,
                      minWidth: isMobile ? '40px' : '60px'
                    }}
                  >
                    <span className="truncate px-1 text-xs font-medium">
                      {isMobile ? `${phase.duration}d` : `${phase.duration} days planned`}
                    </span>
                  </div>
                  
                  {/* Actual Timeline Bar */}
                  {phase.actualStart && phase.actualEnd && (
                    <div
                      className={`absolute bottom-1 bg-green-500 rounded text-white text-xs flex items-center justify-center ${isMobile ? 'h-3' : 'h-4'}`}
                      style={{
                        left: `${getBarPosition(phase.actualStart, phase.actualEnd).left}%`,
                        width: `${getBarPosition(phase.actualStart, phase.actualEnd).width}%`,
                        minWidth: isMobile ? '40px' : '60px'
                      }}
                    >
                      <span className="truncate px-1 text-xs font-medium">
                        {isMobile ? 'Actual' : `${calculateActualDays(phase.actualStart, phase.actualEnd)} days actual`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
