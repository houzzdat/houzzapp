
interface GanttTimelineHeaderProps {
  timeline: Date[];
  totalDays: number;
}

export default function GanttTimelineHeader({ timeline, totalDays }: GanttTimelineHeaderProps) {
  return (
    <div className="flex text-xs text-gray-600 mb-2 min-w-max">
      <div className="w-64 flex-shrink-0"></div>
      <div className="flex-1 flex relative" style={{ minWidth: `${Math.max(800, totalDays * 8)}px` }}>
        {timeline.map((date, idx) => {
          // Show dates every 7 days or for important dates
          const shouldShow = idx % 7 === 0 || idx === 0 || idx === timeline.length - 1;
          if (!shouldShow) {
            return <div key={idx} className="flex-1" style={{ minWidth: '8px' }}></div>;
          }
          
          return (
            <div key={idx} className="flex-1 text-center px-1" style={{ minWidth: '8px' }}>
              <div className="font-semibold text-xs">{date.getDate()}</div>
              <div className="text-xs">{date.toLocaleDateString('en-US', { month: 'short' })}</div>
              <div className="text-xs text-gray-500">{date.getFullYear()}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
