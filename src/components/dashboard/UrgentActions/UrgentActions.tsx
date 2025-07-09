import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { MalariaCase } from "../../../types/formTypes";
import type { Nutrition } from "../../../types/formTypes";
import { useMalariaCases } from '../../../hooks/useMalariaCases';
import { useNutritionData } from '../../../hooks/useNutritionData';

interface UrgentActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  malariaCases: MalariaCase[];
  nutritionCases: Nutrition[];
}

export function useUrgentActions(userName: string) {
  const { malariaCases } = useMalariaCases();
  const { nutritionData } = useNutritionData();
  const urgentMalaria = (malariaCases as MalariaCase[]).filter(
    (c) => c.testResult && c.testResult.toLowerCase() === "positive" && c.severity.toLowerCase() === "severe"
  ).length;
  const urgentNutrition = (nutritionData as Nutrition[]).filter(
    (c) => c.nutritionStatus && c.nutritionStatus.toLowerCase() === "severe_malnutrition"
  ).length;
  return urgentMalaria + urgentNutrition;
}

export const UrgentActions: React.FC<UrgentActionsModalProps> = ({
  isOpen,
  onClose,
  malariaCases,
  nutritionCases,
}) => {
  const [selectedType, setSelectedType] = useState<"malaria" | "nutrition">(
    "malaria"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [isOpen, selectedType]);

  if (!isOpen) return null;

  const cases = Array.isArray(
    selectedType === "malaria" ? malariaCases : nutritionCases
  )
    ? selectedType === "malaria"
      ? malariaCases
      : nutritionCases
    : [];

  let userLogged = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between mb-0 px-6 rounded-t-lg py-3"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Urgent Actions</h2>
          <div className="flex gap-2">
            <div className="text-white flex gap-1">
              <button
                className={`px-7 ${
                  selectedType === "malaria" ? "bg-teal-700 " : ""
                }`}
                onClick={() => setSelectedType("malaria")}
              >
                Malaria
              </button>
              <button
                className={`px-7 ${
                  selectedType === "nutrition" ? "bg-teal-700" : ""
                }`}
                onClick={() => setSelectedType("nutrition")}
              >
                Nutrition
              </button>
            </div>
            <button
              className="text-white hover:text-gray-200"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <span className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">Loading urgent actions...</span>
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center">No urgent actions.</div>
          ) : (
            <div>
              {selectedType === "malaria"
                ? (cases as MalariaCase[])
                    .filter(
                      (c) =>
                        c.severity.toLowerCase() === "severe" 
                    )
                    .map((c) => (
                      <div
                        key={c._id}
                        className="mb-4 border-gray-300 border-b pb-2"
                      >
                        <div>
                          <h2 className="text-xl font-medium text-teal-700">
                            Name: {c.patientName}
                          </h2>
                        </div>
                        <div>Age: {c.age}</div>
                        <div>Status: {c.testResult}</div>
                        <div>Severity: {c.severity}</div>
                      </div>
                    ))
                : (cases as Nutrition[])
                    .filter(
                      (c) =>
                        c.nutritionStatus.toLowerCase() ===
                          "severe_malnutrition"
                    )
                    .map((c) => (
                      <div
                        key={c._id}
                        className="mb-4 border-gray-300 border-b pb-2"
                      >
                        <div>
                          <h2 className="text-xl font-medium text-teal-700">
                            Name: {c.patientName}
                          </h2>
                        </div>
                        <div>Age: {c.age}</div>
                        <div>Nutrition status: {c.nutritionStatus}</div>
                        <div>Feeding Practices: {c.feedingPractices}</div>
                        <div>MUAC: {c.muac}</div>
                      </div>
                    ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
