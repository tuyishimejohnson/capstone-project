import React from "react";
import { X } from "lucide-react";

interface Booking {
  appointmentDate: string;
  chwId: string;
  chwName: string;
  patientPhoneNumber: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
  status: string;
  createdAt: string;
}

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
}

export const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  isOpen,
  onClose,
  bookings,
}) => {
  if (!isOpen) return null;

  const headers = [
    "CHW Name",
    "Phone",
    "Date",
    "District",
    "Sector",
    "Cell",
    "Village",
    "Status",
  ];

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Patient Details</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X />
          </button>
        </div>

        <div className="p-6">
          {bookings.length === 0 ? (
            <p className="text-gray-500">No patient bookings available.</p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                {headers.map((header) => (
                  <div key={header} className="flex-1 p-2">
                    {header}
                  </div>
                ))}
              </div>
              {/* Data Rows */}
              {bookings.map((booking, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== bookings.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{booking.chwName}</div>
                  <div className="flex-1 p-2">{booking.patientPhoneNumber}</div>
                  <div className="flex-1 p-2">
                    {new Date(booking.appointmentDate).toLocaleString()}
                  </div>
                  <div className="flex-1 p-2">{booking.district}</div>
                  <div className="flex-1 p-2">{booking.sector}</div>
                  <div className="flex-1 p-2">{booking.cell}</div>
                  <div className="flex-1 p-2">{booking.village}</div>
                  <div className="flex-1 p-2 capitalize">{booking.status}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
