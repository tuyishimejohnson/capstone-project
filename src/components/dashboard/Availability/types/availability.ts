export interface AvailabilityItem {
  userId: string;
  day: string;
  availableFrom: string;
  availableTo: string;
}

export interface DaySchedule {
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export interface WeeklySchedule {
  [key: string]: DaySchedule;
}

export interface AvailabilityDisplayProps {
  onEditClick: () => void;
}
