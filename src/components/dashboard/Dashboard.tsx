import React, { useState } from "react";
import {
  LogOut,
  Bell,
  Users,
  Activity,
  TrendingUp,
  Heart,
  Clock,
  Plus,
  BotMessageSquare,
  Apple,
  Baby,
} from "lucide-react";
import { AvailabilityModal } from "./Availability/AvailabilityModal";
import { AvailabilityDisplay } from "./Availability/AvailabilityDisplay";
import type { User, WeeklySchedule } from "../../types";
import { PatientDetailsModal } from "./PatientDetail/PatientDetail";
import { useNavigate } from "react-router-dom";
import PatientDataForm from "../forms/PatientData";

import { ActiveCasesModal } from "./MalariaCases/MalariaCases";
import { NutritionCases } from "./NutritionCases/NutritionCases";
import { PregnancyModal } from "./PregnancyStatus";
import { defaultSchedule } from "../../data/defaultSchedule";
import { ActiveCases, useImprovingCasesCount } from "./ActiveCases/ActiveCases";
import { ImprovingCases } from "./ImprovingCases/ImprovingCases";

import { UrgentActions } from "./UrgentActions/UrgentActions";
import { useUserName } from "../../hooks/useUserName";
import { useBookings } from "../../hooks/useBookings";
import { useMalariaCases } from "../../hooks/useMalariaCases";
import { useMaternalData } from "../../hooks/useMaternalData";
import { useNutritionData } from "../../hooks/useNutritionData";
import { useUrgentActions } from "./UrgentActions/UrgentActions";
import { PredictionUploadPage } from "./PredictionModel";
import { FooterPrivacy } from "../footer/FooterPrivacy";
import { DisplayPinAndNames } from "./DisplayCodes";

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [schedule, setSchedule] = useState<WeeklySchedule>(defaultSchedule);
  const [patientDetail, setPatientDetail] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activeCases, setActiveCases] = useState(false);

  const [prediction, setPrediction] = useState(false);
  const [nutritionCase, setNutritionCase] = useState(false);
  const [maternalCase, setMaternalCase] = useState(false);
  const [displayActiveCases, setDisplayActiveCases] = useState(false);
  const [improving, setImproving] = useState(false);
  const [urgentActions, setUrgentActions] = useState(false);
  const [viewPins, setViewPins] = useState(false);

  const navigate = useNavigate();

  // Use custom hooks
  const { userName, loading: loadingUser } = useUserName();
  const { bookings, loading: loadingBookings } = useBookings();
  const { malariaCases, loading: loadingMalaria } = useMalariaCases();
  const { maternalData, loading: loadingMaternal } = useMaternalData();
  const { nutritionData, loading: loadingNutrition } = useNutritionData();

  const handleScheduleSave = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule);
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
  const userDataResults = JSON.parse(localStorage.getItem("userData") || "{}");

  // Use improving cases count from ActiveCases hook
  const improvingTotal = useImprovingCasesCount();
  const urgentTotal = useUrgentActions(userName);

  // Show loading indicator until all data is loaded
  if (
    loadingUser ||
    loadingBookings ||
    loadingMalaria ||
    loadingMaternal ||
    loadingNutrition
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-teal-600 font-semibold">
          Loading dashboard...
        </div>
      </div>
    );
  }

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

            <div className="flex justify-center items-center space-x-4">
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

                {/* Logout Button with Custom Dialog */}
                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                {showLogoutDialog && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-[rgba(0,0,0,0.5)]">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                      <h2 className="text-lg font-semibold mb-2">Logout</h2>
                      <p className="mb-4">Are you sure you want to logout?</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                          onClick={() => setShowLogoutDialog(false)}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
                          onClick={() => {
                            setTimeout(() => {
                              localStorage.clear();
                              setShowLogoutDialog(false);
                              navigate("/");
                              onLogout();
                            }, 1000);
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {" "}
                Welcome back
                {` ${userName.split(" ")[0]}`}
              </h2>

              {userDataResults.role === "admin" && (
                <button
                  className="bg-teal-100 px-4 py-2 border border-teal-300 hover:translate-x-0.5 transform cursor-pointer rounded-md text-gray-500"
                  onClick={() => setViewPins(true)}
                >
                  View CHW PIN
                </button>
              )}
            </div>

            <p className="text-gray-600">
              Here is an overview of your availability customization and
              recommended actions.
            </p>
          </div>

          <div className="gap-7 border-gray-200 flex items-center justify-center">
            <button
              className="flex items-center px-4 py-2 shadow-sm text-gray-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-200 border border-gray-300"
              onClick={() => setPrediction(true)}
            >
              <span className="text-teal-600 hover:text-white flex items-center justify-center">
                <BotMessageSquare className="w-6 h-6 " />
                Ask Assistant
              </span>
            </button>
            {/* Add Patient Data Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:border hover:border-gray-300 hover:bg-transparent hover:text-gray-400 transition-all duration-200 shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Add Patient</span>
            </button>
          </div>
        </div>

        {/* Availability Display */}
        {
          <AvailabilityDisplay
            onEditClick={() => setIsAvailabilityModalOpen(true)}
          />
        }

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            onClick={() => setPatientDetail(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="w-6 h-6 text-teal-600" />
              </div>
              <p className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </p>
              </p>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            onClick={() => setDisplayActiveCases(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Cases
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {malariaCases.length + maternalData.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            onClick={() => setImproving(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Improving</p>
                <p className="text-2xl font-bold text-gray-900">
                  {improvingTotal}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            onClick={() => setUrgentActions(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Urgent Actions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {urgentTotal}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Health Metrics Overview
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-50 text-center px-8 py-14 border border-teal-400 shadow-sm rounded-md">
            {/* Pregnant Women Under Care */}
            <div
              className="flex flex-col items-center justify-center border border-teal-600 rounded-2xl shadow-md hover:scale-105 transition-transform bg-teal-900/10 p-6 cursor-pointer text-teal-600"
              onClick={() => setMaternalCase(true)}
            >
              <Baby className="w-12 h-12 mb-3 text-teal-500" />
              <h2 className="mb-2">Pregnant Women Under Care</h2>
              <span className="text-4xl font-extrabold">
                {maternalData.length}
              </span>
            </div>

            {/* Malaria Cases */}
            <div
              className="flex flex-col items-center justify-center border border-teal-600 rounded-2xl shadow-md hover:scale-105 transition-transform bg-teal-900/10 p-6 cursor-pointer text-teal-600"
              onClick={() => setActiveCases(true)}
            >
              <Activity className="w-12 h-12 mb-3 text-teal-500" />
              <h2 className="mb-2">Malaria Cases</h2>
              <span className="text-4xl font-extrabold">
                {malariaCases.length}
              </span>
            </div>

            {/* Children Nutrition */}
            <div
              className="flex flex-col items-center justify-center border border-teal-600 rounded-2xl shadow-md hover:scale-105 transition-transform bg-teal-900/10 p-6 cursor-pointer text-teal-600"
              onClick={() => setNutritionCase(true)}
            >
              <Apple className="w-12 h-12 mb-3 text-teal-500" />
              <h2 className="mb-2">Children Nutrition</h2>
              <span className="text-4xl font-extrabold">
                {nutritionData.length}
              </span>
            </div>
          </div>
        </div>
      </main>
      {/* Availability Component */}
      {
        <AvailabilityModal
          isOpen={isAvailabilityModalOpen}
          onClose={() => setIsAvailabilityModalOpen(false)}
          onSave={handleScheduleSave}
          currentSchedule={schedule}
        />
      }

      <PatientDetailsModal
        isOpen={patientDetail}
        onClose={() => setPatientDetail(false)}
        bookings={bookings}
      />
      <ActiveCasesModal
        isOpen={activeCases}
        onClose={() => {
          setActiveCases(false);
        }}
        activeCases={malariaCases}
      />
      <NutritionCases
        isOpen={nutritionCase}
        onClose={() => setNutritionCase(false)}
        nutritionCase={nutritionData}
      />

      <PregnancyModal
        isOpen={maternalCase}
        onClose={() => setMaternalCase(false)}
        pregnancyStatus={maternalData}
      />
      {/* Patient data form Component */}
      <PatientDataForm
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        currentUser={userName}
        onSave={() => {
          setShowForm(false);
        }}
      />

      <ActiveCases
        isOpen={displayActiveCases}
        onClose={() => setDisplayActiveCases(false)}
        malariaCases={malariaCases}
        pregnancyCases={maternalData}
      />

      <ImprovingCases
        isOpen={improving}
        onClose={() => setImproving(false)}
        malariaCases={malariaCases}
        pregnancyCases={maternalData}
      />

      <UrgentActions
        isOpen={urgentActions}
        onClose={() => setUrgentActions(false)}
        malariaCases={malariaCases}
        nutritionCases={nutritionData}
      />
      <PredictionUploadPage
        show={prediction}
        onClose={() => setPrediction(false)}
      />

      <DisplayPinAndNames show={viewPins} onClose={() => setViewPins(false)} />

      <FooterPrivacy />
    </div>
  );
};
