export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "health_worker";
}

export interface HealthMetric {
  id: string;
  title: string;
  value: number;
  total: number;
  percentage: number;
  status: "critical" | "warning" | "good";
  trend: "up" | "down" | "stable";
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "maternal" | "malaria" | "nutrition";
  icon: string;
}

export interface FormErrors {
  [key: string]: string;
}

export interface DayAvailability {
  day: string;
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

export interface WeeklySchedule {
  [key: string]: DayAvailability;
}
