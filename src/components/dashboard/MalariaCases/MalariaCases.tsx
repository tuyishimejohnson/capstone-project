import { X, Trash2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
  // const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; caseId: string | null }>({ open: false, caseId: null });

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // const handleDeleteClick = (caseId: string) => {
  //   setConfirmDelete({ open: true, caseId });
  // };

  // const handleDeleteConfirm = async () => {
  //   if (!confirmDelete.caseId) return;
  //   try {
  //     // First, get the malaria case by id
  //     const getRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/malaria/${confirmDelete.caseId}`);
  //     if (!getRes.data || getRes.status !== 200) {
  //       alert("Malaria case not found.");
  //       setConfirmDelete({ open: false, caseId: null });
  //       return;
  //     }
  //     // If found, delete it
  //     await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/malaria/${confirmDelete.caseId}`);
  //     // Refresh the page or update the list
  //     window.location.reload();
  //   } catch (error) {
  //     alert("Failed to delete malaria case.");
  //   } finally {
  //     setConfirmDelete({ open: false, caseId: null });
  //   }
  // };

  // const handleDeleteCancel = () => {
  //   setConfirmDelete({ open: false, caseId: null });
  // };

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
              Loading malaria cases...
            </div>
          ) : activeCases.length === 0 ? (
            <p className="text-gray-500 text-center">
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
              {activeCases.map((malariaCase: MalariaCase, index: number) => (
                <div
                  key={malariaCase._id}
                  className={`flex items-center ${
                    index !== activeCases.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{malariaCase.patientName}</div>
                  <div className="flex-1 p-2">{malariaCase.contactNumber}</div>
                  <div className="flex-1 p-2">{malariaCase.age}</div>
                  <div className="flex-1 p-2">{malariaCase.gender}</div>
                  <div className="flex-1 p-2">{malariaCase.address}</div>
                  <div className="flex-1 p-2">{malariaCase.testResult}</div>
                  <div className="flex-1 p-2">{malariaCase.severity}</div>
                  <div className="flex-1 p-2">{malariaCase.treatmentGiven}</div>
                  <div className="flex-1 p-2">{malariaCase.recordedBy}</div>
                  <div className="p-2 w-8 flex items-center justify-center">
                    {/* <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(malariaCase._id)}
                      aria-label="Delete malaria case"
                    >
                      <Trash2 size={18} />
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* {confirmDelete.open && (
          <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
              <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this malaria case?</p>
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
        )} */}
      </div>
    </div>
  );
};
