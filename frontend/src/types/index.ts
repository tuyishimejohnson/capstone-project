/* export interface User {
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
 */

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

// Patient Data Collection Types
export interface PatientRecord {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: "male" | "female";
  contactNumber?: string;
  address: string;
  recordType: "malaria" | "nutrition" | "maternal";
  dateRecorded: string;
  recordedBy: string;
  status: "active" | "resolved" | "follow_up_needed";
  notes?: string;
}

export interface MalariaRecord extends PatientRecord {
  recordType: "malaria";
  symptoms: string[];
  testResult: "positive" | "negative" | "pending";
  testType: "rapid_diagnostic" | "microscopy" | "clinical_diagnosis";
  severity: "mild" | "moderate" | "severe";
  treatmentGiven: string;
  treatmentDate: string;
  followUpDate?: string;
  complications?: string[];
}

export interface NutritionRecord extends PatientRecord {
  recordType: "nutrition";
  childAge: number; // in months
  weight: number; // in kg
  height: number; // in cm
  muac: number; // Mid-Upper Arm Circumference in cm
  nutritionStatus: "normal" | "moderate_malnutrition" | "severe_malnutrition";
  feedingPractices: string[];
  interventionProvided: string[];
  caregiverEducation: boolean;
  referralMade: boolean;
  referralLocation?: string;
}

export interface MaternalRecord extends PatientRecord {
  recordType: "maternal";
  pregnancyStatus: "pregnant" | "postpartum";
  gestationWeeks?: number;
  gravida: number; // number of pregnancies
  para: number; // number of births
  lastMenstrualPeriod?: string;
  expectedDeliveryDate?: string;
  antenatalVisits: number;
  riskFactors: string[];
  complications?: string[];
  vitals: {
    bloodPressure?: string;
    weight?: number;
    hemoglobin?: number;
  };
  interventions: string[];
  nextVisitDate?: string;
}

export type PatientFormData = MalariaRecord | NutritionRecord | MaternalRecord;
