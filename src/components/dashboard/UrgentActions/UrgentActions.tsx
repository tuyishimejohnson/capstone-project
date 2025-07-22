import React, { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import type { MalariaCase } from "../../../types/formTypes";
import type { Nutrition } from "../../../types/formTypes";
import { useMalariaCases } from "../../../hooks/useMalariaCases";
import { useNutritionData } from "../../../hooks/useNutritionData";
import axios from "axios";

interface UrgentActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  malariaCases: MalariaCase[];
  nutritionCases: Nutrition[];
}

export function useUrgentActions() {
  const { malariaCases } = useMalariaCases();
  const { nutritionData } = useNutritionData();
  const urgentMalaria = (malariaCases as MalariaCase[]).filter(
    (c) =>
      c.testResult &&
      c.testResult.toLowerCase() === "positive" &&
      c.severity.toLowerCase() === "severe"
  ).length;
  const urgentNutrition = (nutritionData as Nutrition[]).filter(
    (c) =>
      c.nutritionStatus &&
      c.nutritionStatus.toLowerCase() === "severe_malnutrition"
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
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    caseId: string | null;
    caseType: string | null;
  }>({ open: false, caseId: null, caseType: null });

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [isOpen, selectedType]);

  const handleDeleteClick = (caseId: string, caseType: string) => {
    setConfirmDelete({ open: true, caseId, caseType });
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDelete.caseId || !confirmDelete.caseType) return;
    try {
      const endpoint =
        confirmDelete.caseType === "malaria" ? "malaria" : "nutrition";
      // First, get the case by id
      const getRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/${endpoint}/${
          confirmDelete.caseId
        }`
      );
      if (!getRes.data || getRes.status !== 200) {
        alert(`${confirmDelete.caseType} case not found.`);
        setConfirmDelete({ open: false, caseId: null, caseType: null });
        return;
      }
      // If found, delete it
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/${endpoint}/${
          confirmDelete.caseId
        }`
      );
      // Refresh the page or update the list
      window.location.reload();
    } catch (error) {
      alert(`Failed to delete ${confirmDelete.caseType} case.`);
    } finally {
      setConfirmDelete({ open: false, caseId: null, caseType: null });
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, caseId: null, caseType: null });
  };

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
              <span className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
                Loading urgent actions...
              </span>
            </div>
          ) : (
            <div>
              {selectedType === "malaria"
                ? (() => {
                    const filteredCases = (cases as MalariaCase[]).filter(
                      (c) =>
                        c.testResult &&
                        c.testResult.toLowerCase() === "positive" &&
                        c.severity &&
                        c.severity.toLowerCase() === "severe" &&
                        c.recordedBy === userLogged.name
                    );
                    if (filteredCases.length === 0) {
                      return (
                        <div className="flex justify-center items-center h-32">
                          <span className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
                            No urgent malaria cases for you.
                          </span>
                        </div>
                      );
                    }
                    return filteredCases.map((c) => (
                      <div
                        key={c._id}
                        className="mb-4 border-gray-300 border-b pb-2 flex justify-between items-start"
                      >
                        <div>
                          <h2 className="text-xl font-medium text-teal-700">
                            Name: {c.patientName}
                          </h2>
                          <div>Age: {c.age}</div>
                          <div>Status: {c.testResult}</div>
                          <div>Severity: {c.severity}</div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={() => handleDeleteClick(c._id, "malaria")}
                          aria-label="Delete malaria case"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ));
                  })()
                : (() => {
                    const filteredCases = (cases as Nutrition[]).filter(
                      (c) =>
                        c.nutritionStatus &&
                        c.nutritionStatus.toLowerCase() ===
                          "severe_malnutrition" &&
                        c.recordedBy === userLogged.name
                    );
                    if (filteredCases.length === 0) {
                      return (
                        <div className="flex justify-center items-center h-32">
                          <span className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
                            No urgent nutrition cases for you.
                          </span>
                        </div>
                      );
                    }
                    return filteredCases.map((c) => (
                      <div
                        key={c._id}
                        className="mb-4 border-gray-300 border-b pb-2 flex justify-between items-start"
                      >
                        <div>
                          <h2 className="text-xl font-medium text-teal-700">
                            Name: {c.patientName}
                          </h2>
                          <div>Age: {c.age}</div>
                          <div>Nutrition status: {c.nutritionStatus}</div>
                          <div>Feeding Practices: {c.feedingPractices}</div>
                          <div>MUAC: {c.muac}</div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={() => handleDeleteClick(c._id, "nutrition")}
                          aria-label="Delete nutrition case"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ));
                  })()}
            </div>
          )}
        </div>
      </div>
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this {confirmDelete.caseType}{" "}
              case?
            </p>
            <div className="flex gap-4">
              <button
                className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
