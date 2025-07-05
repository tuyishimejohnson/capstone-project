import React, { useEffect, useState } from "react";
import { Clock, Calendar, CheckCircle2, XCircle } from "lucide-react";
import RegisteredCHW from "./RegisteredCHW";

interface AvailabilityItem {
  userId: string;
  day: string;
  availableFrom: string;
  availableTo: string;
}

interface DaySchedule {
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

interface WeeklySchedule {
  [key: string]: DaySchedule;
}

interface AvailabilityDisplayProps {
  onEditClick: () => void;
}

const daysOfWeek = [
  { key: "monday", label: "Monday", short: "Mon" },
  { key: "tuesday", label: "Tuesday", short: "Tue" },
  { key: "wednesday", label: "Wednesday", short: "Wed" },
  { key: "thursday", label: "Thursday", short: "Thu" },
  { key: "friday", label: "Friday", short: "Fri" },
  { key: "saturday", label: "Saturday", short: "Sat" },
  { key: "sunday", label: "Sunday", short: "Sun" },
];

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
  const [schedule, setSchedule] = useState<WeeklySchedule>({});
  const [showRegistered, setShowRegistered] = useState(false);

  useEffect(() => {
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Calendar className="w-6 h-6 text-teal-600" />
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-900">
              My Weekly Availability
            </h3>
            <p className="text-sm text-gray-600">
              {availableDays.length} days • {totalHours.toFixed(1)} hours per
              week
            </p>
          </div>
        </div>
        <button
          className="px-4 py-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg text-sm font-medium"
          onClick={() => setShowRegistered(true)}
        >
          View registered CHW
        </button>

        <button
          onClick={onEditClick}
          className="shadow-md text-gray-600 border border-gray-300 hover:translate-x-0.5 transition-all duration-200 hover:transform px-5 py-2 rounded-md"
        >
          Edit Schedule
        </button>
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
                    <span className="font-medium">Available</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatTime(daySchedule.startTime)}
                  </div>
                  <div className="text-xs text-gray-500">to</div>
                  <div className="text-sm font-semibold text-gray-900">
                    {formatTime(daySchedule.endTime)}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-gray-500 mt-2">Not Available</div>
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
            <div className="text-sm text-gray-600">Days Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {totalHours.toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">Hours per Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {availableDays.length > 0
                ? (totalHours / availableDays.length).toFixed(1)
                : "0"}
            </div>
            <div className="text-sm text-gray-600">Avg Hours per Day</div>
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
                Next Available:{" "}
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
