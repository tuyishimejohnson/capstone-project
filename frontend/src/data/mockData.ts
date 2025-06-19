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
    id: "2",
    title: "High-Risk Pregnancies",
    value: 24,
    total: 156,
    percentage: 15.4,
    status: "warning",
    trend: "stable",
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
    percentage: 5.6,
    status: "critical",
    trend: "up",
  },
  {
    id: "5",
    title: "Vaccination Coverage",
    value: 298,
    total: 320,
    percentage: 93.1,
    status: "good",
    trend: "up",
  },
  {
    id: "6",
    title: "Maternal Deaths (YTD)",
    value: 2,
    total: 156,
    percentage: 1.3,
    status: "critical",
    trend: "stable",
  },
];

export const suggestions: Suggestion[] = [
  {
    id: "1",
    title: "Increase Prenatal Visit Frequency",
    description:
      "Schedule additional check-ups for high-risk pregnancies to monitor complications early.",
    priority: "high",
    category: "maternal",
    icon: "Calendar",
  },
  {
    id: "2",
    title: "Distribute Bed Nets",
    description:
      "Target households in high-malaria areas with insecticide-treated nets.",
    priority: "medium",
    category: "malaria",
    icon: "Shield",
  },
  {
    id: "3",
    title: "Nutrition Education Program",
    description:
      "Launch community workshops on child nutrition and feeding practices.",
    priority: "high",
    category: "nutrition",
    icon: "BookOpen",
  },
  {
    id: "4",
    title: "Mobile Health Clinic",
    description:
      "Deploy mobile units to remote areas with limited healthcare access.",
    priority: "medium",
    category: "maternal",
    icon: "Truck",
  },
  {
    id: "5",
    title: "Malaria Testing Campaign",
    description:
      "Conduct community-wide rapid diagnostic testing in affected areas.",
    priority: "high",
    category: "malaria",
    icon: "TestTube",
  },
];
