import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Clock, Calendar, CheckCircle2, XCircle } from "lucide-react";
import RegisteredCHW from "../RegisteredCHW";
import { daysOfWeek } from "./days/daysOfWeek";
import type { AvailabilityDisplayProps } from "./types/availability";
import type { WeeklySchedule } from "./types/availability";
import type { AvailabilityItem } from "./types/availability";

const formatTime = (time: string) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const AvailabilityDisplay: React.FC<AvailabilityDisplayProps> = ({
  onEditClick,
}) => {
  const { t } = useTranslation();
  const [schedule, setSchedule] = useState<WeeklySchedule>({});
  const [showRegistered, setShowRegistered] = useState(false);

  const loadScheduleFromStorage = () => {
    const rawData = localStorage.getItem("availabilities");
    let parsed: AvailabilityItem[] = [];

    try {
      parsed = rawData ? JSON.parse(rawData) : [];
    } catch (e) {
      console.error("Failed to parse localStorage availability data", e);
    }

    const formatted: WeeklySchedule = {};

    daysOfWeek.forEach(({ key }) => {
      const match = parsed.find((item) => item.day === key);
      if (match) {
        formatted[key] = {
          isAvailable: true,
          startTime: match.availableFrom,
          endTime: match.availableTo,
        };
      } else {
        formatted[key] = {
          isAvailable: false,
          startTime: "",
          endTime: "",
        };
      }
    });

    setSchedule(formatted);
  };

  useEffect(() => {
    // Load initial data
    loadScheduleFromStorage();

    // Listen for custom event when localStorage is updated
    const handleAvailabilityUpdate = () => {
      console.log("Availability update event received, reloading schedule...");
      loadScheduleFromStorage();
    };

    window.addEventListener("availabilityUpdated", handleAvailabilityUpdate);

    return () => {
      window.removeEventListener(
        "availabilityUpdated",
        handleAvailabilityUpdate
      );
    };
  }, []);

  const availableDays = Object.values(schedule).filter(
    (day) => day.isAvailable
  );

  const totalHours = availableDays.reduce((total, day) => {
    if (!day.startTime || !day.endTime) return total;
    const start = new Date(`2000-01-01T${day.startTime}:00`);
    const end = new Date(`2000-01-01T${day.endTime}:00`);
    return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        {/* Left: Icon + Title + Subtitle */}
        <div className="flex items-center flex-1 min-w-0">
          <div className="p-2 bg-teal-100 rounded-lg flex-shrink-0">
            <Calendar className="w-6 h-6 text-teal-600" />
          </div>
          <div className="ml-3 sm:ml-4 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
              {t("myWeeklyAvailability")}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              {availableDays.length} {t("daysAvailable")} •{" "}
              {totalHours.toFixed(1)} {t("hoursPerWeek")}
            </p>
          </div>
        </div>
        {/* Right: Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2 sm:mt-0">
          <button
            className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto"
            onClick={() => setShowRegistered(true)}
          >
            {t("viewRegisteredChw")}
          </button>
          <button
            onClick={onEditClick}
            className="shadow-md text-gray-600 border border-gray-300 hover:translate-x-0.5 transition-all duration-200 hover:transform px-4 sm:px-5 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto"
          >
            {t("editSchedule")}
          </button>
        </div>
      </div>

      {/* Weekly Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        {daysOfWeek.map(({ key, label, short }) => {
          const daySchedule = schedule[key];
          const isAvailable = daySchedule?.isAvailable;

          return (
            <div
              key={key}
              className={`p-4 rounded-lg border-2 ${
                isAvailable
                  ? "border-green-200 bg-green-50 hover:border-green-300"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900 text-sm lg:text-xs">
                  <span className="hidden lg:block">{short}</span>
                  <span className="lg:hidden">{label}</span>
                </h4>
                {isAvailable ? (
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
              </div>

              {isAvailable && daySchedule.startTime && daySchedule.endTime ? (
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="font-medium">{t("available")}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatTime(daySchedule.startTime)}
                  </div>
                  <div className="text-xs text-gray-500">{t("to")}</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatTime(daySchedule.endTime)}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 mt-2">
                  {t("notAvailable")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-teal-600">
              {availableDays.length}
            </div>
            <div className="text-sm text-gray-600">{t("daysAvailable")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalHours.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">{t("hoursPerWeek")}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {availableDays.length > 0
                ? (totalHours / availableDays.length).toFixed(1)
                : "0"}
            </div>
            <div className="text-sm text-gray-600">{t("avgHoursPerDay")}</div>
          </div>
        </div>
      </div>

      {/* Next Available */}
      {availableDays.length > 0 && (
        <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
          <div className="flex items-center">
            <div className="p-1 bg-teal-100 rounded">
              <Clock className="w-4 h-4 text-teal-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-teal-900">
                {t("nextAvailable")}{" "}
                {(() => {
                  const today = new Date().getDay();
                  const dayKeys = [
                    "sunday",
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                  ];

                  for (let i = 0; i < 7; i++) {
                    const dayIndex = (today + i) % 7;
                    const dayKey = dayKeys[dayIndex];
                    const scheduleItem = schedule[dayKey];

                    if (scheduleItem?.isAvailable && scheduleItem.startTime) {
                      const label = daysOfWeek.find(
                        (d) => d.key === dayKey
                      )?.label;
                      const timeLabel = formatTime(scheduleItem.startTime);
                      return i === 0
                        ? `Today at ${timeLabel}`
                        : `${label} at ${timeLabel}`;
                    }
                  }
                  return "No upcoming availability";
                })()}
              </p>
            </div>
          </div>
        </div>
      )}
      <RegisteredCHW
        show={showRegistered}
        onClose={() => setShowRegistered(false)}
      />
    </div>
  );
};
