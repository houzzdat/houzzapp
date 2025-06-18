
export const getPhaseColor = (phase: string): string => {
  const colors: Record<string, string> = {
    'Foundation': 'bg-blue-100 border-blue-300 text-blue-800',
    'Superstructure': 'bg-green-100 border-green-300 text-green-800',
    'Finishing': 'bg-orange-100 border-orange-300 text-orange-800',
    'MEP Work': 'bg-purple-100 border-purple-300 text-purple-800',
    'General': 'bg-gray-100 border-gray-300 text-gray-800'
  };
  return colors[phase] || colors['General'];
};

export const sortPhases = (phases: string[]): string[] => {
  const phaseOrder = ['Foundation', 'Superstructure', 'Finishing', 'MEP Work', 'General'];
  return phases.sort((a, b) => phaseOrder.indexOf(a) - phaseOrder.indexOf(b));
};

export const groupEstimatesByPhase = <T extends { phase?: string }>(estimates: T[]): Record<string, T[]> => {
  return estimates.reduce((acc, estimate) => {
    const phase = estimate.phase || 'General';
    if (!acc[phase]) {
      acc[phase] = [];
    }
    acc[phase].push(estimate);
    return acc;
  }, {} as Record<string, T[]>);
};
