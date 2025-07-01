import React, { useState } from "react";
import { X, Funnel } from "lucide-react";

interface Booking {
  appointmentDate: string;
  chwId: string;
  userName: string;
  patientPhoneNumber: string;
  patientName: string;
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
    "Patient Name",
    "Phone",
    "Date",
    "District",
    "Sector",
    "Cell",
    "Village",
    "Status",
  ];

  const [filteredBookings, setFilteredBookings] = useState<Booking[] | null>(
    null
  );

  const getFilteredPatients = () => {
    const userDataString = localStorage.getItem("userData");
    const userData = userDataString ? JSON.parse(userDataString) : null;
    setFilteredBookings(
      bookings.filter(
        (booking) => userData && booking.userName === userData.name
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Patient Details</h2>
          <div className="flex gap-5">
            <button
              className="text-white flex border border-gray-300 rounded-xl px-2 py-1"
              onClick={() => getFilteredPatients()}
            >
              Filter your patients <Funnel className="" />
            </button>

            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <X />
            </button>
          </div>
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
              {(filteredBookings ?? bookings).map((booking, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== (filteredBookings ?? bookings).length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{booking.patientName}</div>
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
