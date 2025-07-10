import React, { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";
import type { MalariaCase } from "../../../types/formTypes";
import type { Pregnancy } from "../../../types/formTypes";
import axios from "axios";

interface ImprovingCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  malariaCases: MalariaCase[];
  pregnancyCases: Pregnancy[];
}

export const ImprovingCases: React.FC<ImprovingCasesModalProps> = ({
  isOpen,
  onClose,
  malariaCases,
  pregnancyCases,
}) => {
  const [selectedType, setSelectedType] = useState<"malaria" | "pregnancy">(
    "malaria"
  );
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; caseId: string | null; caseType: string | null }>({ open: false, caseId: null, caseType: null });

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
      const endpoint = confirmDelete.caseType === "malaria" ? "malaria" : "maternal";
      // First, get the case by id
      const getRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/${endpoint}/${confirmDelete.caseId}`);
      if (!getRes.data || getRes.status !== 200) {
        alert(`${confirmDelete.caseType} case not found.`);
        setConfirmDelete({ open: false, caseId: null, caseType: null });
        return;
      }
      // If found, delete it
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/${endpoint}/${confirmDelete.caseId}`);
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

  const cases = selectedType === "malaria" ? malariaCases : pregnancyCases;
  let userLogged = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between mb-0 px-6 rounded-t-lg py-3"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Improving Cases</h2>
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
                  selectedType === "pregnancy" ? "bg-teal-700" : ""
                }`}
                onClick={() => setSelectedType("pregnancy")}
              >
                Maternal Case
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
              <span className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">Loading improving cases...</span>
            </div>
          ) : cases.length === 0 ? (
            <div>No active cases.</div>
          ) : (
            <div>
              {selectedType === "malaria"
                ? (cases as MalariaCase[])
                    .filter(
                      (c) => c.testResult.toLowerCase() === "negative" /* &&
                        c.recordedBy === userLogged.name */
                    )
                    .map((c) => (
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
                    ))
                : (cases as Pregnancy[])
                    .filter(
                      (c) =>
                        c.pregnancyStatus.toLowerCase() === "postpartum" /* &&
                        c.recordedBy === userLogged.name */
                    )
                    .map((c) => (
                      <div
                        key={c._id}
                        className="mb-4 border-gray-300 border-b pb-2 flex justify-between items-start"
                      >
                        <div>
                          <h2 className="text-xl font-medium text-teal-700">
                            Name: {c.patientName}
                          </h2>
                          <div>Age: {c.age}</div>
                          <div>Pregnancy Status: {c.pregnancyStatus}</div>
                          <div>Gestation Weeks: {c.gestationWeeks}</div>
                          <div>Antenatal visits: {c.antenatalVisits}</div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 ml-4"
                          onClick={() => handleDeleteClick(c._id, "maternal")}
                          aria-label="Delete maternal case"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    ))}
            </div>
          )}
        </div>
        {confirmDelete.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
              <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this {confirmDelete.caseType} case?</p>
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
    </div>
  );
};
