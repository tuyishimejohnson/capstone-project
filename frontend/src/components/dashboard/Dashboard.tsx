import React, { useState } from "react";
import {
  LogOut,
  Bell,
  Search,
  Users,
  Activity,
  TrendingUp,
  Heart,
  Clock,
} from "lucide-react";
import { MetricCard } from "./MetricCard";
import { SuggestionCard } from "./SuggestionCard";
//import { AvailabilityModal } from "./AvailabilityModal";
//import { AvailabilityDisplay } from "./AvailabilityDisplay";
import { healthMetrics, suggestions } from "../../data/mockData";
import type { User, WeeklySchedule } from "../../types";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const defaultSchedule: WeeklySchedule = {
  monday: {
    day: "monday",
    isAvailable: true,
    startTime: "08:00",
    endTime: "17:00",
  },
  tuesday: {
    day: "tuesday",
    isAvailable: true,
    startTime: "08:00",
    endTime: "17:00",
  },
  wednesday: {
    day: "wednesday",
    isAvailable: true,
    startTime: "08:00",
    endTime: "17:00",
  },
  thursday: {
    day: "thursday",
    isAvailable: true,
    startTime: "08:00",
    endTime: "17:00",
  },
  friday: {
    day: "friday",
    isAvailable: true,
    startTime: "08:00",
    endTime: "17:00",
  },
  saturday: { day: "saturday", isAvailable: false, startTime: "", endTime: "" },
  sunday: { day: "sunday", isAvailable: false, startTime: "", endTime: "" },
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
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
                      {/* {user.name.charAt(0).toUpperCase()} */}
                    </span>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">
                      {/* {user.name} */}
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {/* Welcome back, {user.name} */} Welcomee!!!!!!!!
          </h2>
          <p className="text-gray-600">
            Here's an overview of your community's health metrics and
            recommended actions.
          </p>
        </div>

        {/* Availability Display */}
        {/* <AvailabilityDisplay
          schedule={schedule}
          onEditClick={() => setIsAvailabilityModalOpen(true)}
        /> */}

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
                <p className="text-2xl font-bold text-gray-900">1,247</p>
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
      {/* <AvailabilityModal
        isOpen={isAvailabilityModalOpen}
        onClose={() => setIsAvailabilityModalOpen(false)}
        onSave={handleScheduleSave}
        currentSchedule={schedule}
      /> */}
    </div>
  );
};
