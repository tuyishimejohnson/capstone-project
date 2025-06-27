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

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Patient Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>
        </div>

        {bookings.length === 0 ? (
          <p className="text-gray-500">No patient bookings available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">CHW Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">District</th>
                <th className="border p-2">Sector</th>
                <th className="border p-2">Cell</th>
                <th className="border p-2">Village</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{booking.chwName}</td>
                  <td className="border p-2">{booking.patientPhoneNumber}</td>
                  <td className="border p-2">
                    {new Date(booking.appointmentDate).toLocaleString()}
                  </td>
                  <td className="border p-2">{booking.district}</td>
                  <td className="border p-2">{booking.sector}</td>
                  <td className="border p-2">{booking.cell}</td>
                  <td className="border p-2">{booking.village}</td>
                  <td className="border p-2 capitalize">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
