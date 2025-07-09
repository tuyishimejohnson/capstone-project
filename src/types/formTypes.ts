export interface MalariaCase {
  _id: string;
  patientName: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  notes: string;
  symptoms: string[];
  testResult: string;
  testType: string;
  severity: string;
  treatmentGiven: string;
  treatmentDate: string;
  followUpDate: string;
  complications: string[];
  recordedBy: string;
}

export interface Pregnancy {
  _id: string;
  patientName: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  notes: string;
  pregnancyStatus: string;
  gestationWeeks: number;
  gravida: number;
  para: number;
  antenatalVisits: number;
  riskFactors: string[];
  complications: string[];
  vitals: Record<string, any>;
  nextVisitDate: string;
  recordedBy: string;
}

export interface Nutrition {
  _id: string;
  patientName: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  childAge: string;
  weight: string;
  height: string;
  muac: string;
  nutritionStatus: string;
  feedingPractices: string[];
  interventionProvided: string[];
  caregiverEducation: boolean;
  referralMade: boolean;
  referralLocation: string;
  notes: string;
  recordedBy: string;
}
