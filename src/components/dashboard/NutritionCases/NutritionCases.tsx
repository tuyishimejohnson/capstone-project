import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Nutrition } from "../../../types/formTypes";
import { useParams, Link } from "react-router-dom";

interface ActiveCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  nutritionCase: Nutrition[];
}

export const NutritionCases: React.FC<ActiveCasesModalProps> = ({
  isOpen,
  onClose,
  nutritionCase,
}) => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  const userNutrition = nutritionCase.filter(
    (pregnancy) => pregnancy.recordedBy === userData.name
  );

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">
            Child Nutrition Cases
          </h2>
          <div className="flex gap-5">
            {/* Add filter or other action buttons here if needed */}
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <X />
            </button>
          </div>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
              Loading nutrition cases...
            </div>
          ) : userNutrition.length === 0 ? (
            <p className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
              No active cases available.
            </p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                <div className="flex-1 p-2">Names</div>
                <div className="flex-1 p-2">Age</div>
                <div className="flex-1 p-2">Gender</div>
                <div className="flex-1 p-2">Address</div>
                <div className="flex-1 p-2">Weight</div>
                <div className="flex-1 p-2">Height</div>
                <div className="flex-1 p-2">Nutrition status</div>
                <div className="flex-1 p-2">Notes</div>
                <div className="flex-1 p-2">Collected by</div>
              </div>
              {/* Data Rows */}

              {userNutrition.map((nutrition: Nutrition, index: number) => (
                <Link
                  key={nutrition._id}
                  to={`/nutrition-details/${nutrition._id}`}
                  className={`flex items-center ${
                    index !== nutritionCase.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{nutrition.patientName}</div>
                  <div className="flex-1 p-2">{nutrition.age}</div>
                  <div className="flex-1 p-2">{nutrition.gender}</div>
                  <div className="flex-1 p-2">{nutrition.address}</div>
                  <div className="flex-1 p-2">{nutrition.weight}</div>
                  <div className="flex-1 p-2">{nutrition.height}</div>
                  <div className="flex-1 p-2">{nutrition.nutritionStatus}</div>
                  <div className="flex-1 p-2">{nutrition.notes}</div>
                  <div className="flex-1 p-2">{nutrition.recordedBy}</div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
