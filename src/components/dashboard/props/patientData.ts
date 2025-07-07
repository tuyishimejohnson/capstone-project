import type { MalariaCase, Pregnancy } from "../types/formTypes";

export const getImprovingMalariaCases = (cases: MalariaCase[]) =>
  cases.filter((c) => c.testResult.toLowerCase() === "negative").length;

export const getImprovingPregnancyCases = (cases: Pregnancy[]) =>
  cases.filter((c) => c.pregnancyStatus.toLowerCase() === "postpartum").length;
