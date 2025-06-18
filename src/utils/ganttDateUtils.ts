
export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const calculateProjectTimeline = (phases: any[]) => {
  console.log('Original phases data:', phases);
  
  const enhancedPhases = phases.map((phase) => ({
    ...phase,
    actualStart: phase.actualStart || '',
    actualEnd: phase.actualEnd || '',
  }));

  // Find the earliest start date and latest end date from all phases
  const validPlannedDates = enhancedPhases
    .filter(p => p.plannedStart && p.plannedEnd)
    .map(p => ({
      start: new Date(p.plannedStart!),
      end: new Date(p.plannedEnd!),
      phase: p.phase
    }));

  console.log('Valid planned dates:', validPlannedDates);

  if (validPlannedDates.length === 0) {
    const today = new Date();
    return { enhancedPhases, projectStartDate: today };
  }

  const projectStartDate = new Date(Math.min(...validPlannedDates.map(d => d.start.getTime())));
  console.log('Project start date:', formatDate(projectStartDate));

  return { enhancedPhases, projectStartDate };
};

export const generateGanttTimeline = (enhancedPhases: any[]) => {
  const validPhases = enhancedPhases.filter(p => p.plannedStart && p.plannedEnd);
  
  if (validPhases.length === 0) {
    const today = new Date();
    return { timeline: [today], minDate: today, maxDate: today, totalDays: 1 };
  }
  
  // Get all dates including actual dates
  const allDates = [];
  
  validPhases.forEach(p => {
    allDates.push(new Date(p.plannedStart!));
    allDates.push(new Date(p.plannedEnd!));
    if (p.actualStart) allDates.push(new Date(p.actualStart));
    if (p.actualEnd) allDates.push(new Date(p.actualEnd));
  });
  
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())));
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())));
  
  console.log('Timeline range:', formatDate(minDate), 'to', formatDate(maxDate));
  
  // Calculate total days in the project timeline
  const totalDays = Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Generate timeline array
  const timeline = [];
  for (let i = 0; i < totalDays; i++) {
    const date = new Date(minDate);
    date.setDate(date.getDate() + i);
    timeline.push(date);
  }
  
  console.log('Total timeline days:', totalDays);
  
  return { timeline, minDate, maxDate, totalDays };
};

export const getBarPosition = (startDate: string, endDate: string, minDate: Date, totalDays: number) => {
  if (!startDate || !endDate) {
    console.log('Missing dates for bar position calculation');
    return { left: 0, width: 0 };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Calculate days from project start (minDate)
  const startOffset = Math.floor((start.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  const endOffset = Math.floor((end.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24));
  const duration = endOffset - startOffset + 1;
  
  // Convert to percentage of total timeline
  const left = Math.max(0, (startOffset / totalDays) * 100);
  const width = Math.min(100 - left, (duration / totalDays) * 100);
  
  console.log(`Bar position for ${startDate} to ${endDate}:`, {
    startOffset,
    endOffset,
    duration,
    left: `${left}%`,
    width: `${width}%`,
    totalDays
  });
  
  return { left, width };
};

export const calculateProjections = (enhancedPhases: any[]) => {
  const completedPhases = enhancedPhases.filter(p => p.actualStart && p.actualEnd);
  if (completedPhases.length === 0) return null;

  const totalDeviation = completedPhases.reduce((sum, phase) => {
    if (!phase.plannedStart || !phase.plannedEnd) return sum;
    
    const plannedStart = new Date(phase.plannedStart);
    const plannedEnd = new Date(phase.plannedEnd);
    const plannedDuration = Math.ceil((plannedEnd.getTime() - plannedStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    const actualStart = new Date(phase.actualStart!);
    const actualEnd = new Date(phase.actualEnd!);
    const actualDuration = Math.ceil((actualEnd.getTime() - actualStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    return sum + (actualDuration - plannedDuration);
  }, 0);

  const avgDeviationPerPhase = totalDeviation / completedPhases.length;
  return avgDeviationPerPhase;
};
