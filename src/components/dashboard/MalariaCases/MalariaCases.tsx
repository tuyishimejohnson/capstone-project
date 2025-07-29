import { X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader } from "../../loader/loader";

interface MalariaCase {
  _id: string;
  patientName: string;
  age: string;
  gender: string;
  address: string;
  contactNumber: string;
  notes: string;
  symptoms: string[];
  testResult: string;
  testType: string;
  severity: string;
  treatmentGiven: string;
  treatmentDate: string;
  followUpDate: string;
  complications: string[];
  recordedBy: string;
}

interface ActiveCasesModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCases: MalariaCase[];
}

export const ActiveCasesModal: React.FC<ActiveCasesModalProps> = ({
  isOpen,
  onClose,
  activeCases,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const filteredMalariaCases = activeCases.filter(
    (malariaCase) => malariaCase.recordedBy === userData.name
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Malaria Cases</h2>
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
              <Loader />
            </div>
          ) : filteredMalariaCases.length === 0 ? (
            <p className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
              No active malaria cases available.
            </p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                <div className="flex-1 p-2">Patient Name</div>
                <div className="flex-1 p-2">Contact Number</div>
                <div className="flex-1 p-2">Age</div>
                <div className="flex-1 p-2">Gender</div>
                <div className="flex-1 p-2">Address</div>
                <div className="flex-1 p-2">Test Result</div>
                <div className="flex-1 p-2">Severity</div>
                <div className="flex-1 p-2">Treatment Given</div>
                <div className="flex-1 p-2">Collected by</div>
                <div className="p-2 w-8"></div>
              </div>
              {/* Data Rows */}
              {filteredMalariaCases.map(
                (malariaCase: MalariaCase, index: number) => (
                  <Link
                    key={malariaCase._id}
                    to={`/malaria-details/${malariaCase._id}`}
                    className={`flex items-center ${
                      index !== activeCases.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    } hover:bg-gray-50`}
                  >
                    <div className="flex-1 p-2">{malariaCase.patientName}</div>
                    <div className="flex-1 p-2">
                      {malariaCase.contactNumber}
                    </div>
                    <div className="flex-1 p-2">{malariaCase.age}</div>
                    <div className="flex-1 p-2">{malariaCase.gender}</div>
                    <div className="flex-1 p-2">{malariaCase.address}</div>
                    <div className="flex-1 p-2">{malariaCase.testResult}</div>
                    <div className="flex-1 p-2">{malariaCase.severity}</div>
                    <div className="flex-1 p-2">
                      {malariaCase.treatmentGiven}
                    </div>
                    <div className="flex-1 p-2">{malariaCase.recordedBy}</div>
                    <div className="p-2 w-8 flex items-center justify-center"></div>
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
