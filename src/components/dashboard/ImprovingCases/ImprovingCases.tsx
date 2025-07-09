import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { MalariaCase } from "../../../types/formTypes";
import type { Pregnancy } from "../../../types/formTypes";

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
                : (cases as Pregnancy[])
                    .filter(
                      (c) =>
                        c.pregnancyStatus.toLowerCase() === "postpartum" /* &&
                        c.recordedBy === userLogged.name */
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
                        <div>Pregnancy Status: {c.pregnancyStatus}</div>
                        <div>Gestation Weeks: {c.gestationWeeks}</div>
                        <div>Antenatal visits: {c.antenatalVisits}</div>
                      </div>
                    ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
