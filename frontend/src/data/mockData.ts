import type { HealthMetric, Suggestion } from "../types";

export const healthMetrics: HealthMetric[] = [
  {
    id: "1",
    title: "Pregnant Women Under Care",
    value: 156,
    total: 200,
    percentage: 78,
    status: "good",
    trend: "up",
  },

  {
    id: "3",
    title: "Malaria Cases (This Month)",
    value: 42,
    total: 1200,
    percentage: 3.5,
    status: "warning",
    trend: "down",
  },
  {
    id: "4",
    title: "Children with Malnutrition",
    value: 18,
    total: 320,
    percentage: 90.6,
    status: "critical",
    trend: "up",
  },
  {
    id: "5",
    title: "Vaccination Coverage",
    value: 298,
    total: 320,
    percentage: 40.1,
    status: "good",
    trend: "up",
  },
];

export const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Increase Prenatal Visit Frequency",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio voluptatibus unde!",
    priority: "high",
    category: "maternal",
    icon: "Calendar",
  },
  {
    id: "2",
    title: "Distribute Bed Nets",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio voluptatibus unde!",
    priority: "medium",
    category: "malaria",
    icon: "Shield",
  },
  {
    id: "3",
    title: "Nutrition Education Program",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio voluptatibus unde!",
    priority: "high",
    category: "nutrition",
    icon: "BookOpen",
  },
  {
    id: "4",
    title: "Mobile Health Clinic",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio voluptatibus unde!",
    priority: "medium",
    category: "maternal",
    icon: "Truck",
  },
  {
    id: "5",
    title: "Malaria Testing Campaign",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores optio voluptatibus unde!",
    priority: "high",
    category: "malaria",
    icon: "TestTube",
  },
];
