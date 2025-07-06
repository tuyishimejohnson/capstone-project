import type { WeeklySchedule } from "../types";

export const defaultSchedule: WeeklySchedule = {
  monday: {
    day: "monday",
    isAvailable: false,
    startTime: "05:00",
    endTime: "17:00",
  },
  tuesday: {
    day: "tuesday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  wednesday: {
    day: "wednesday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  thursday: {
    day: "thursday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  friday: {
    day: "friday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  saturday: { day: "saturday", isAvailable: false, startTime: "", endTime: "" },
  sunday: { day: "sunday", isAvailable: false, startTime: "", endTime: "" },
};
