import React, { useState } from "react";
import { X, Clock, Save, Calendar } from "lucide-react";
import type { DayAvailability, WeeklySchedule } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: WeeklySchedule) => void;
  currentSchedule: WeeklySchedule;
}

const daysOfWeek = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export const AvailabilityModal: React.FC<AvailabilityModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentSchedule,
}) => {
  const [schedule, setSchedule] = useState<WeeklySchedule>(currentSchedule);
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleDayToggle = (dayKey: string) => {
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        isAvailable: !prev[dayKey].isAvailable,
        startTime: prev[dayKey].isAvailable ? "" : "08:00",
        endTime: prev[dayKey].isAvailable ? "" : "17:00",
      },
    }));
  };

  const handleTimeChange = (
    dayKey: string,
    timeType: "startTime" | "endTime",
    value: Dayjs | null
  ) => {
    const timeString = value ? value.format("HH:mm") : "";
    setSchedule((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [timeType]: timeString,
      },
    }));
  };

  const getTimeValue = (
    dayKey: string,
    timeType: "startTime" | "endTime"
  ): Dayjs | null => {
    const timeString = schedule[dayKey]?.[timeType];
    if (!timeString) return null;
    return dayjs(`2023-01-01 ${timeString}`);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      onSave(schedule);
      setIsSaving(false);
      onClose();
    }, 1000);
  };

  const setQuickSchedule = (type: "weekdays" | "fullWeek" | "clear") => {
    const newSchedule = { ...schedule };

    daysOfWeek.forEach(({ key }) => {
      switch (type) {
        case "weekdays":
          newSchedule[key] = {
            day: key,
            isAvailable: !["saturday", "sunday"].includes(key),
            startTime: !["saturday", "sunday"].includes(key) ? "08:00" : "",
            endTime: !["saturday", "sunday"].includes(key) ? "17:00" : "",
          };
          break;
        case "fullWeek":
          newSchedule[key] = {
            day: key,
            isAvailable: true,
            startTime: "08:00",
            endTime: "17:00",
          };
          break;
        case "clear":
          newSchedule[key] = {
            day: key,
            isAvailable: false,
            startTime: "",
            endTime: "",
          };
          break;
      }
    });

    setSchedule(newSchedule);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                <h2 className="text-xl font-bold font-changed">
                  Set Your Availability
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-teal-100 mt-2">
              Configure your daily working hours for community visits
            </p>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[calc(90vh-200px)] overflow-y-auto">
            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Quick Setup
              </h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setQuickSchedule("weekdays")}
                  className="px-3 py-2 text-sm bg-teal-50 text-teal-700 rounded-lg hover:bg-teal-100 transition-colors"
                >
                  Weekdays Only
                </button>
                <button
                  onClick={() => setQuickSchedule("fullWeek")}
                  className="px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Full Week
                </button>
                <button
                  onClick={() => setQuickSchedule("clear")}
                  className="px-3 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Daily Schedule */}
            <div className="space-y-4">
              {daysOfWeek.map(({ key, label }) => (
                <div
                  key={key}
                  className="border border-gray-200 rounded-xl p-4 hover:border-teal-200 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={key}
                        checked={schedule[key]?.isAvailable || false}
                        onChange={() => handleDayToggle(key)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <label
                        htmlFor={key}
                        className="ml-3 text-sm font-medium text-gray-900"
                      >
                        {label}
                      </label>
                    </div>
                    {schedule[key]?.isAvailable && (
                      <div className="flex items-center text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">
                        <Clock className="w-3 h-3 mr-1" />
                        Available
                      </div>
                    )}
                  </div>

                  {schedule[key]?.isAvailable && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          Start Time
                        </label>
                        <TimePicker
                          value={getTimeValue(key, "startTime")}
                          onChange={(newValue) =>
                            handleTimeChange(key, "startTime", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              variant: "outlined",
                            },
                          }}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-2">
                          End Time
                        </label>
                        <TimePicker
                          value={getTimeValue(key, "endTime")}
                          onChange={(newValue) =>
                            handleTimeChange(key, "endTime", newValue)
                          }
                          slotProps={{
                            textField: {
                              size: "small",
                              fullWidth: true,
                              variant: "outlined",
                            },
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {Object.values(schedule).filter((day) => day.isAvailable).length}{" "}
              days selected
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Schedule
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
};
