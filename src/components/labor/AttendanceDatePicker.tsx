
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CalendarIcon, Check, X, ChevronDown } from "lucide-react";
import { format } from "date-fns";

interface AttendanceDatePickerProps {
  workerId: string;
  workerName: string;
  currentAttendance: 'absent' | 'half-day' | 'full-day' | null;
  isUpdating: boolean;
  onAttendanceChange: (workerId: string, date: Date, attendanceType: 'absent' | 'half-day' | 'full-day') => void;
}

export default function AttendanceDatePicker({
  workerId,
  workerName,
  currentAttendance,
  isUpdating,
  onAttendanceChange,
}: AttendanceDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getAttendanceDisplay = (attendance: 'absent' | 'half-day' | 'full-day' | null) => {
    switch (attendance) {
      case 'full-day':
        return { text: 'Full Day', color: 'bg-green-500 hover:bg-green-600 text-white' };
      case 'half-day':
        return { text: 'Half Day', color: 'bg-yellow-500 hover:bg-yellow-600 text-white' };
      case 'absent':
      case null:
      default:
        return { text: 'Absent', color: 'border-gray-300 hover:bg-gray-50' };
    }
  };

  const handleAttendanceChange = (attendanceType: 'absent' | 'half-day' | 'full-day') => {
    onAttendanceChange(workerId, selectedDate, attendanceType);
  };

  const attendanceDisplay = getAttendanceDisplay(currentAttendance);

  return (
    <div className="flex items-center gap-2">
      {/* Date Picker */}
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="text-xs px-2 py-1 h-8"
            size="sm"
          >
            <CalendarIcon className="h-3 w-3 mr-1" />
            {format(selectedDate, "MMM dd")}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                setSelectedDate(date);
                setIsCalendarOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Attendance Options */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant={currentAttendance === 'absent' || !currentAttendance ? "outline" : "default"}
            className={`${attendanceDisplay.color} text-xs px-2 py-1 h-8`}
            disabled={isUpdating}
          >
            {attendanceDisplay.text}
            <ChevronDown size={12} className="ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => handleAttendanceChange('full-day')}>
            <Check size={12} className="mr-2 text-green-600" />
            Full Day
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAttendanceChange('half-day')}>
            <Check size={12} className="mr-2 text-yellow-600" />
            Half Day
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAttendanceChange('absent')}>
            <X size={12} className="mr-2 text-red-600" />
            Absent
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
