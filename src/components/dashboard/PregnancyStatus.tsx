import { X } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Pregnancy {
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

interface PregnancyModalProps {
  isOpen: boolean;
  onClose: () => void;
  pregnancyStatus: Pregnancy[];
}

export const PregnancyModal: React.FC<PregnancyModalProps> = ({
  isOpen,
  onClose,
  pregnancyStatus,
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Maternal Cases</h2>
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
              Loading maternal cases...
            </div>
          ) : pregnancyStatus.length === 0 ? (
            <p className="text-gray-500 text-center">
              No active cases available.
            </p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                <div className="flex-1 p-2">Patient Name</div>
                <div className="flex-1 p-2">Contact Number</div>
                <div className="flex-1 p-2">Age</div>
                <div className="flex-1 p-2">Address</div>
                <div className="flex-1 p-2">Status</div>
                <div className="flex-1 p-2">Antenatal Visits</div>
                <div className="flex-1 p-2">Next Visit</div>
                <div className="flex-1 p-2">Collected by</div>
              </div>
              {/* Data Rows */}
              {pregnancyStatus.map((pregnancy: Pregnancy, index: number) => (
                <div
                  key={pregnancy._id}
                  className={`flex items-center ${
                    index !== pregnancyStatus.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{pregnancy.patientName}</div>
                  <div className="flex-1 p-2">{pregnancy.contactNumber}</div>
                  <div className="flex-1 p-2">{pregnancy.age}</div>
                  <div className="flex-1 p-2">{pregnancy.address}</div>
                  <div className="flex-1 p-2">{pregnancy.pregnancyStatus}</div>
                  <div className="flex-1 p-2">{pregnancy.antenatalVisits}</div>
                  <div className="flex-1 p-2">{pregnancy.nextVisitDate}</div>
                  <div className="flex-1 p-2">{pregnancy.recordedBy}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
