import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  LogOut,
  Bell,
  Users,
  Activity,
  TrendingUp,
  Clock,
  Plus,
  BotMessageSquare,
  Apple,
  Baby,
  HeartPulse,
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
  const { t, i18n } = useTranslation();
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
      return { text: t("notSet"), color: "text-red-600 bg-red-50" };
    if (availableDays.length <= 2)
      return { text: t("limited"), color: "text-yellow-600 bg-yellow-50" };
    return { text: t("availableStatus"), color: "text-green-600 bg-green-50" };
  };

  const availabilityStatus = getAvailabilityStatus();
  const userDataResults = JSON.parse(localStorage.getItem("userData") || "{}");

  // Use improving cases count from ActiveCases hook
  const improvingTotal = useImprovingCasesCount();
  const urgentTotal = useUrgentActions();

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
          {t("loadingDashboard")}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sm:fixed sm:right-0 sm:left-0 sm:top-0 sm:z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 py-3 sm:py-0 gap-3 sm:gap-0">
            {/* Logo and Title */}
            <div className="flex items-center w-full sm:w-auto justify-center sm:justify-start">
              <HeartPulse className="w-8 h-8 text-teal-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900 whitespace-nowrap">
                {t("appTitle")}
              </h1>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto gap-3 sm:gap-4 justify-center sm:justify-end">
              {/* Language Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => i18n.changeLanguage("en")}
                  className={`px-2 py-1 text-xs rounded ${
                    i18n.language === "en"
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => i18n.changeLanguage("rw")}
                  className={`px-2 py-1 text-xs rounded ${
                    i18n.language === "rw"
                      ? "bg-teal-100 text-teal-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  RW
                </button>
              </div>

              {/* Availability Button */}

              <button
                onClick={() => setIsAvailabilityModalOpen(true)}
                className="hidden md:flex items-center px-3 py-2 bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-all duration-200 border border-teal-200 w-full sm:w-auto justify-center"
              >
                <Clock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">{t("availability")}</span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${availabilityStatus.color}`}
                >
                  {availabilityStatus.text}
                </span>
              </button>

              {/* User Info and Logout */}
              <div className="flex items-center space-x-3 w-full sm:w-auto justify-center sm:justify-end">
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
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[80px] sm:max-w-none">
                      {userName || t("user")}
                    </p>
                    <p className="text-xs text-gray-500 capitalize"></p>
                  </div>
                </div>

                {/* Logout Button with Custom Dialog */}
                <button
                  onClick={() => setShowLogoutDialog(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title={t("logout")}
                >
                  <LogOut className="w-5 h-5" />
                </button>
                {showLogoutDialog && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-[rgba(0,0,0,0.5)]">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                      <h2 className="text-lg font-semibold mb-2">
                        {t("logout")}
                      </h2>
                      <p className="mb-4">{t("logoutConfirm")}</p>
                      <div className="flex justify-end space-x-2">
                        <button
                          className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
                          onClick={() => setShowLogoutDialog(false)}
                        >
                          {t("cancel")}
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
                          {t("logout")}
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
        <div className="mb-8 flex flex-col md:flex-row md:justify-between gap-6 md:gap-0">
          <div className="w-full md:w-auto">
            <div className="flex flex-col justify-between lg:justify-normal sm:flex-row gap-3 sm:gap-5 lg:items-start sm:items-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
                {t("welcomeBackUser")}
                {` ${userName.split(" ")[0]}`}
              </h2>

              {userDataResults.role === "admin" && (
                <button
                  className="bg-teal-100 px-4 py-2 border border-teal-300 hover:translate-x-0.5 transform cursor-pointer rounded-md text-gray-500 mt-2 sm:mt-0"
                  onClick={() => setViewPins(true)}
                >
                  View CHW PIN
                </button>
              )}
            </div>

            <p className="text-gray-600 mt-2 sm:mt-0">
              {t("scheduleDescription")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-7 border-gray-200 items-center justify-center w-full md:w-auto">
            <button
              className="flex items-center px-4 py-2 shadow-sm text-gray-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-200 border border-gray-300 w-full sm:w-auto"
              onClick={() => setPrediction(true)}
            >
              <span className="text-teal-600 hover:text-white flex items-center justify-center">
                <BotMessageSquare className="w-6 h-6 mr-2" />
                {t("askAssistant")}
              </span>
            </button>
            {/* Add Patient Data Button */}
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:border hover:border-gray-300 hover:bg-transparent hover:text-gray-400 transition-all duration-200 shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">{t("addPatient")}</span>
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
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer"
            onClick={() => setPatientDetail(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-teal-100 rounded-lg">
                <Users className="w-6 h-6 text-teal-600" />
              </div>

              <div className="flex flex-col ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t("totalRegistered")}
                </p>

                <p className="text-2xl font-bold text-gray-900">
                  {bookings.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer"
            onClick={() => setDisplayActiveCases(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t("activeCases")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {malariaCases.length + maternalData.length}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer"
            onClick={() => setImproving(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t("improving")}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {improvingTotal}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer"
            onClick={() => setUrgentActions(true)}
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {t("urgentActions")}
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
            {t("healthMetricsOverview")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-50 text-center px-8 py-14 border border-teal-400 shadow-sm rounded-md">
            {/* Pregnant Women Under Care */}
            <div
              className="flex flex-col items-center justify-center border border-teal-600 rounded-2xl shadow-md hover:scale-105 transition-transform bg-teal-900/10 p-6 cursor-pointer text-teal-600"
              onClick={() => setMaternalCase(true)}
            >
              <Baby className="w-12 h-12 mb-3 text-teal-500" />
              <h2 className="mb-2">{t("pregnantWomenUnderCare")}</h2>
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
              <h2 className="mb-2">{t("malariaCases")}</h2>
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
              <h2 className="mb-2">{t("childrenNutrition")}</h2>
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
