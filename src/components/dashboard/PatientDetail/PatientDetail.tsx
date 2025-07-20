import React, { useState, useEffect } from "react";
import { X, Funnel, Trash2 } from "lucide-react";
import axios from "axios";

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
  const [filteredBookings, setFilteredBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState<{ open: boolean; index: number | null; isFiltered: boolean }>({ open: false, index: null, isFiltered: false });

  // Get logged-in user's name once
  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;


  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleDeleteClick = (index: number, isFiltered: boolean) => {
    setConfirmDelete({ open: true, index, isFiltered });
  };

  const handleDeleteConfirm = async () => {
    if (confirmDelete.index === null) return;
    const isFiltered = confirmDelete.isFiltered;
    const bookingsList = isFiltered && filteredBookings ? filteredBookings : (filteredBookings || bookings);
    const booking = bookingsList[confirmDelete.index];
    try {
      // First, get the appointment by id
      const getRes = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/appointments/${booking._id}`);
      if (!getRes.data || getRes.status !== 200) {
        alert("Appointment not found.");
        setConfirmDelete({ open: false, index: null, isFiltered: false });
        return;
      }
      // If found, delete it
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/appointments/${booking._id}`);
      if (isFiltered && filteredBookings) {
        setFilteredBookings(filteredBookings.filter((_, i) => i !== confirmDelete.index));
      } else {
        setFilteredBookings((filteredBookings || bookings).filter((_, i) => i !== confirmDelete.index));
      }
    } catch (error) {
      alert("Failed to delete booking.");
    } finally {
      setConfirmDelete({ open: false, index: null, isFiltered: false });
    }
  };

  const handleDeleteCancel = () => {
    setConfirmDelete({ open: false, index: null, isFiltered: false });
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
              className="text-teal-700 flex shadow-md shadow-gray-500 bg-teal-200 rounded-md px-2 py-1"
              onClick={() => getFilteredPatients()}
            >
              Your patients <Funnel className="" />
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
          {loading ? (
            <div className="flex items-center justify-center h-32 text-teal-600 font-semibold text-lg">
              Loading patient details...
            </div>
          ) : bookings.length === 0 ? (
            <p className="text-gray-500">No patient bookings available.</p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                {headers.map((header, i) => (
                  <div key={i} className={i === headers.length - 1 ? "p-2 w-8" : "flex-1 p-2"}>
                    {header}
                  </div>
                ))}
              </div>
              {/* Data Rows */}
              {filteredBookings !== null ? (
                filteredBookings.length === 0 ? (
                  <div className="text-gray-500 p-4 text-center">
                    No patients booked you
                  </div>
                ) : (
                  filteredBookings.map((booking, index) => (
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
                        {booking.userName === userData.name && (
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeleteClick(index, true)}
                            aria-label="Delete patient"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )
              ) : (
                bookings.map((booking, index) => (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index !== bookings.length - 1
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
                      {booking.userName === userData.name && (
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteClick(index, false)}
                          aria-label="Delete patient"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      {confirmDelete.open && (
        <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded shadow-lg flex flex-col items-center">
            <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this patient?</p>
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
