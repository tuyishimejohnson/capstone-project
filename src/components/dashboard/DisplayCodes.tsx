import React from "react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface DisplayPinAndNamesProps {
  show: boolean;
  onClose: () => void;
}

export const DisplayPinAndNames: React.FC<DisplayPinAndNamesProps> = ({ show, onClose }) => {
  

  interface User {
    name: string;
    phone: string;
    pin:string;
  }

  const [showUsers, setShowUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/users`
        );
        setShowUsers(response.data);
      } catch (error) {
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    getAllUsers();
  }, []);

  const userDataString = localStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
      <div className="bg-white w-full mx-20 rounded-lg shadow-lg overflow-y-auto max-h-[80vh]">
        <div
          className="flex justify-between items-center mb-0 px-6 py-4 rounded-t-lg"
          style={{ backgroundColor: "#0d9488" }}
        >
          <h2 className="text-xl font-semibold text-white">CHWs PIN</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200"
            aria-label="Close dialog"
          >
            <X />
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <span className="flex items-center justify-center text-teal-600 font-semibold text-lg">Loading CHWs...</span>
            </div>
          ) : showUsers.length === 0 ? (
            <p className="text-gray-500">No CHW available.</p>
          ) : (
            <div>
              {/* Header Row */}
              <div className="flex font-semibold bg-gray-100">
                <div className="flex-1 p-2">Name</div>
                <div className="flex-1 p-2">Phone</div>
                <div className="flex-1 p-2">PIN</div>
              </div>
              {/* Data Rows */}
              {showUsers.map((user, index) => {
                const isCurrentUser =
                  userData &&
                  userData.name === user.name &&
                  userData.phone === user.phone;
                return (
                  <div
                    key={index}
                    className={`flex items-center ${
                      index !== showUsers.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    } hover:bg-gray-50`}
                  >
                    <div className="flex-1 p-2">
                      {user.name}
                      {isCurrentUser && (
                        <span className="text-teal-600">(You)</span>
                      )}
                    </div>
                    <div className="flex-1 p-2">{user.phone}</div>
                    <div className="flex-1 p-2">{user.pin}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
