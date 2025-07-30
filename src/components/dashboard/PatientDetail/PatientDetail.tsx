import axios from "axios";
import { Trash2, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Loader } from "../../loader/loader";

interface Booking {
  _id: string;
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
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<{
    open: boolean;
    index: number | null;
  }>({ open: false, index: null });

  const userData = useMemo(() => {
  const userDataString = localStorage.getItem("userData");
  return userDataString ? JSON.parse(userDataString) : null;
}, []);


  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Filter bookings automatically for current user
      const filtered = bookings.filter(
        (booking) => userData && booking.userName === userData.name
      );
      setFilteredBookings(filtered);

      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, bookings, userData]);

  const handleDeleteClick = (index: number) => {
    setConfirmDelete({ open: true, index });
  };

  const handleDeleteConfirm = async () => {
    if (confirmDelete.index === null) return;
    const booking = filteredBookings[confirmDelete.index];

    try {
      // Get the appointment by id
      const getRes = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/${booking._id}`
      );
      if (!getRes.data || getRes.status !== 200) {
        alert("Appointment not found.");
        setConfirmDelete({ open: false, index: null });
        return;
      }
      // If found, delete it
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/appointments/${booking._id}`
      );
      setFilteredBookings(
        filteredBookings.filter((_, i) => i !== confirmDelete.index)
      );
    } catch (error) {
      alert("Failed to delete booking.");
    } finally {
      setConfirmDelete({ open: false, index: null });
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, index: null });
  };

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
    "",
  ];

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">Patient Details</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200"
          >
            <X />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
              <Loader />
            </div>
          ) : filteredBookings.length === 0 ? (
            <p className="text-gray-500 text-center">No patients booked you.</p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                {headers.map((header, i) => (
                  <div
                    key={i}
                    className={
                      i === headers.length - 1 ? "p-2 w-8" : "flex-1 p-2"
                    }
                  >
                    {header}
                  </div>
                ))}
              </div>
              {/* Data Rows */}
              {filteredBookings.map((booking, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index !== filteredBookings.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  } hover:bg-gray-50`}
                >
                  <div className="flex-1 p-2">{booking.patientName}</div>
                  <div className="flex-1 p-2">
                    {booking.patientPhoneNumber}
                  </div>
                  <div className="flex-1 p-2">
                    {new Date(booking.appointmentDate).toLocaleString()}
                  </div>
                  <div className="flex-1 p-2">{booking.district}</div>
                  <div className="flex-1 p-2">{booking.sector}</div>
                  <div className="flex-1 p-2">{booking.cell}</div>
                  <div className="flex-1 p-2">{booking.village}</div>
                  <div className="flex-1 p-2 capitalize">
                    {booking.status}
                  </div>
                  <div className="p-2 w-8 flex items-center justify-center">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteClick(index)}
                      aria-label="Delete patient"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold">
              Are you sure you want to delete this patient?
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
