import React, { useState, useEffect } from "react";
import {
  LogOut,
  Bell,
  Search,
  Users,
  Activity,
  TrendingUp,
  Heart,
  Clock,
  X,
  Mail,
  Phone,
  MapPin,
  FileText,
  Upload,
} from "lucide-react";
import { MetricCard } from "./MetricCard";
import { SuggestionCard } from "./SuggestionCard";
import { AvailabilityModal } from "./AvailabilityModal";
import { AvailabilityDisplay } from "./AvailabilityDisplay";
import { healthMetrics, suggestions } from "../../data/mockData";
import type { User, WeeklySchedule } from "../../types";
import axios from "axios";

// Mock CHW data

// Prediction Upload Modal
const PredictionUploadModal = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically upload the file and make predictions
      console.log("Uploading file:", selectedFile.name);
      alert(
        `File "${selectedFile.name}" uploaded successfully! Predictions will be processed.`
      );
      setSelectedFile(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Upload File for Predictions
            </h3>
            <p className="text-gray-600 mt-1">
              Upload a file to generate recommendations
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? "border-teal-500 bg-teal-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />

          {selectedFile ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <FileText className="w-5 h-5 text-teal-600" />
                <span className="text-sm font-medium text-gray-900">
                  {selectedFile.name}
                </span>
              </div>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-600">Drag and drop your file here, or</p>
              <label className="inline-block">
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  accept=".csv,.xlsx,.xls,.json,.txt"
                />
                <span className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors">
                  Browse Files
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: CSV, Excel, JSON, TXT
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedFile
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Upload & Predict
          </button>
        </div>
      </div>
    </div>
  );
};

// export const Dashboard = ({ user = {}, onLogout = () => {} }) => {
//   const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
//   const [isCHWModalOpen, setIsCHWModalOpen] = useState(false);
//   const [isPredictionModalOpen, setIsPredictionModalOpen] = useState(false);
//   const [schedule, setSchedule] = useState(defaultSchedule);
//   const [userName, setUserName] = useState("");

//   const criticalMetrics = healthMetrics.filter((m) => m.status === "critical");
//   const warningMetrics = healthMetrics.filter((m) => m.status === "warning");
//   const goodMetrics = healthMetrics.filter((m) => m.status === "good");
//   const highPrioritySuggestions = suggestions.filter(
//     (s) => s.priority === "high"
//   );

//   const handleScheduleSave = (newSchedule) => {
//     setSchedule(newSchedule);
//     console.log("Schedule saved:", newSchedule);
//   };

//   const getAvailabilityStatus = () => {
//     const availableDays = Object.values(schedule).filter(
//       (day) => day.isAvailable
//     );
//     if (availableDays.length === 0)
//       return { text: "Not Set", color: "text-red-600 bg-red-50" };
//     if (availableDays.length <= 2)
//       return { text: "Limited", color: "text-yellow-600 bg-yellow-50" };
//     return { text: "Available", color: "text-green-600 bg-green-50" };
//   };

//   const availabilityStatus = getAvailabilityStatus();

//   useEffect(() => {
//     const getUserName = async () => {
//       const response = localStorage.getItem("name");
//       if (response) {
//         setUserName(response);
//       }
//     };
//     getUserName();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b border-gray-200 fixed right-0 left-0 top-0">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             <div className="flex items-center">
//               <div className="flex items-center">
//                 <Heart className="w-8 h-8 text-teal-600" />
//                 <h1 className="ml-2 text-xl font-bold text-gray-900">
//                   CHW Portal
//                 </h1>
//               </div>
//             </div>

//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
//                 />
//               </div>

//               <button
//                 onClick={() => setIsAvailabilityModalOpen(true)}
//                 className="flex items-center px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-all duration-200 border border-teal-200"
//               >
//                 <Clock className="w-4 h-4 mr-2" />
//                 <span className="text-sm font-medium">Availability</span>
//                 <span
//                   className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${availabilityStatus.color}`}
//                 >
//                   {availabilityStatus.text}
//                 </span>
//               </button>

//               <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
//                 <Bell className="w-5 h-5" />
//                 <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//               </button>

//               <div className="flex items-center space-x-3">
//                 <div className="flex items-center">
//                   <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
//                     <span className="text-sm font-medium text-teal-600">
//                       {userName
//                         .split(" ")
//                         .map((name) => name[0])
//                         .join("")
//                         .toUpperCase()}
//                     </span>
//                   </div>
//                   <div className="ml-2">
//                     <p className="text-sm font-medium text-gray-900">
//                       {userName || "user"}
//                     </p>
//                     <p className="text-xs text-gray-500 capitalize">
//                       Community Health Worker
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={onLogout}
//                   className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
//                   title="Logout"
//                 >
//                   <LogOut className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
//         {/* Welcome Section */}
//         <div className="mb-8 flex justify-between items-start">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-2">
//               Welcome back{userName && `, ${userName}`}
//             </h2>
//             <p className="text-gray-600">
//               Here is an overview of your availability customization and
//               recommended actions.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsPredictionModalOpen(true)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
//             >
//               Predict Recommendations
//             </button>
//             <button
//               onClick={() => setIsCHWModalOpen(true)}
//               className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
//             >
//               View Registered CHW
//             </button>
//           </div>
//         </div>

//         {/* Availability Display */}
//         <AvailabilityDisplay
//           schedule={schedule}
//           onEditClick={() => setIsAvailabilityModalOpen(true)}
//         />

//         {/* Quick Stats */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-teal-100 rounded-lg">
//                 <Users className="w-6 h-6 text-teal-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Patients
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">500</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Activity className="w-6 h-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">
//                   Active Cases
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {criticalMetrics.length + warningMetrics.length}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <TrendingUp className="w-6 h-6 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Improving</p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {goodMetrics.length}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <Bell className="w-6 h-6 text-red-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">
//                   Urgent Actions
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">
//                   {highPrioritySuggestions.length}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Health Metrics */}
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold text-gray-900 mb-6">
//             Health Metrics Overview
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {healthMetrics.map((metric) => (
//               <MetricCard key={metric.id} metric={metric} />
//             ))}
//           </div>
//         </div>

//         {/* Recommended Actions */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-900 mb-6">
//             Recommended Actions
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {suggestions.map((suggestion) => (
//               <SuggestionCard key={suggestion.id} suggestion={suggestion} />
//             ))}
//           </div>
//         </div>
//       </main>

//       {/* Modals */}
//       <AvailabilityModal
//         isOpen={isAvailabilityModalOpen}
//         onClose={() => setIsAvailabilityModalOpen(false)}
//         onSave={handleScheduleSave}
//         currentSchedule={schedule}
//       />

//       <CHWUsersModal
//         isOpen={isCHWModalOpen}
//         onClose={() => setIsCHWModalOpen(false)}
//       />

//       <PredictionUploadModal
//         isOpen={isPredictionModalOpen}
//         onClose={() => setIsPredictionModalOpen(false)}
//       />
//     </div>
//   );
// };

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const defaultSchedule: WeeklySchedule = {
  monday: {
    day: "monday",
    isAvailable: false,
    startTime: "05:00",
    endTime: "17:00",
  },
  tuesday: {
    day: "tuesday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  wednesday: {
    day: "wednesday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  thursday: {
    day: "thursday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  friday: {
    day: "friday",
    isAvailable: false,
    startTime: "08:00",
    endTime: "17:00",
  },
  saturday: { day: "saturday", isAvailable: false, startTime: "", endTime: "" },
  sunday: { day: "sunday", isAvailable: false, startTime: "", endTime: "" },
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [isCHWModalOpen, setIsCHWModalOpen] = useState(false);
  const [prediction, setPrediction] = useState(false);
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);
  const [userName, setUserName] = useState("");

  const criticalMetrics = healthMetrics.filter(
    (m: any) => m.status === "critical"
  );
  const warningMetrics = healthMetrics.filter(
    (m: any) => m.status === "warning"
  );
  const goodMetrics = healthMetrics.filter((m: any) => m.status === "good");
  const highPrioritySuggestions = suggestions.filter(
    (s: any) => s.priority === "high"
  );

  const handleScheduleSave = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
    // Here you would typically save to your backend
    console.log("Schedule saved:", newSchedule);
  };

  const getAvailabilityStatus = () => {
    const availableDays = Object.values(schedule).filter(
      (day) => day.isAvailable
    );
    if (availableDays.length === 0)
      return { text: "Not Set", color: "text-red-600 bg-red-50" };
    if (availableDays.length <= 2)
      return { text: "Limited", color: "text-yellow-600 bg-yellow-50" };
    return { text: "Available", color: "text-green-600 bg-green-50" };
  };

  const availabilityStatus = getAvailabilityStatus();

  useEffect(() => {
    const getUserName = async () => {
      const response = localStorage.getItem("name"); // Replace with your API endpoint
      if (response) {
        setUserName(response);
      }
    };
    getUserName();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 fixed right-0 left-0 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Heart className="w-8 h-8 text-teal-600" />
                <h1 className="ml-2 text-xl font-bold text-gray-900">
                  CHW Portal
                </h1>
              </div>
            </div>

            <div className="bg-amber-300"> </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Availability Button */}
              <button
                onClick={() => setIsAvailabilityModalOpen(true)}
                className="flex items-center px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-all duration-200 border border-teal-200"
              >
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Availability</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${availabilityStatus.color}`}
                >
                  {availabilityStatus.text}
                </span>
              </button>

              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-teal-600">
                      {userName
                        .split(" ")
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">
                      {userName || "user"}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {/* {user.role.replace("_", " ")} */}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-12">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {" "}
              Welcome back
              {` ${userName}`}
            </h2>
            <p className="text-gray-600">
              Here is an overview of your availability customization and
              recommended actions.
            </p>
          </div>

          <div className="border gap-7 border-gray-200 flex items-center justify-center">
            <button
              onClick={() => setPrediction(true)}
              className="bg-blue-300 p-3 rounded-2xl"
            >
              Predict Recommendations
              <button
                onClick={() => setIsCHWModalOpen(true)}
                className="bg-gray-400 px-4 py-3 rounded-2xl"
              >
                View registered CHW
              </button>
            </button>
          </div>
        </div>

        {/* Availability Display */}
        {
          <AvailabilityDisplay
            schedule={schedule}
            onEditClick={() => setIsAvailabilityModalOpen(true)}
          />
        }

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">500</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Cases
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {criticalMetrics.length + warningMetrics.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Improving</p>
                <p className="text-2xl font-bold text-gray-900">
                  {goodMetrics.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Urgent Actions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {highPrioritySuggestions.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Health Metrics Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {healthMetrics.map((metric) => (
              <MetricCard key={metric.id} metric={metric} />
            ))}
          </div>
        </div>

        {/* Recommended Actions */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Recommended Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestions.map((suggestion) => (
              <SuggestionCard key={suggestion.id} suggestion={suggestion} />
            ))}
          </div>
        </div>
      </main>
      {/* Availability Modal */}
      {
        <AvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          onSave={handleScheduleSave}
          currentSchedule={schedule}
        />
      }

      {/* CHW Users Modal */}
      {
        <CHWUsersModal
          isOpen={isCHWModalOpen}
          onClose={() => setIsCHWModalOpen(false)}
        />
      }
      {
        <PredictionUploadModal
          isOpen={prediction}
          onClose={() => setPrediction(false)}
        />
      }
    </div>
  );
};
