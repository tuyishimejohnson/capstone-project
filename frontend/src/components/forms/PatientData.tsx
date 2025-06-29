import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save, User, Calendar, MapPin, Phone, X } from "lucide-react";
import { MalariaForm } from "./MalariaForm";
import { NutritionForm } from "./NutritionForm";
import { MaternalForm } from "./MaternalForm";
import type { PatientFormData } from "../../types";
import { validatePatientForm } from "../../utils/patientValidation";

interface PatientDataFormProps {
  // onSave: (data: PatientFormData) => void;
  isOpen: boolean;
  onClose: () => void;
  currentUser: string;
}

export const PatientDataForm: React.FC<PatientDataFormProps> = ({
  // onSave,
  isOpen,
  onClose,
  currentUser,
}) => {
  const [formType, setFormType] = useState<
    "malaria" | "nutrition" | "maternal"
  >("malaria");
  const [basicInfo, setBasicInfo] = useState({
    patientName: "",
    age: "",
    gender: "female" as "male" | "female",
    contactNumber: "",
    address: "",
    notes: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleBasicInfoChange = (field: string, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFormTypeChange = (type: "malaria" | "nutrition" | "maternal") => {
    setFormType(type);
    setErrors({});
  };

  const handleSubmit = async (specificData: any) => {
    const basicValidation = validatePatientForm(basicInfo);

    if (Object.keys(basicValidation).length > 0) {
      setErrors(basicValidation);
      return;
    }

    setIsSaving(true);

    const baseRecord = {
      id: `${formType}_${Date.now()}`,
      patientId: `PAT_${Date.now()}`,
      patientName: basicInfo.patientName,
      age: parseInt(basicInfo.age),
      gender: basicInfo.gender,
      contactNumber: basicInfo.contactNumber || undefined,
      address: basicInfo.address,
      recordType: formType,
      dateRecorded: new Date().toISOString(),
      recordedBy: currentUser,
      status: "active" as const,
      notes: basicInfo.notes || undefined,
      ...specificData,
    };

    setTimeout(() => {
      //onSave(baseRecord as PatientFormData);
      setIsSaving(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="max-w-4xl mx-auto my-8 bg-white shadow-2xl max-h-[90vh] flex flex-col rounded-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex">
              <User className="w-6 h-6 mr-3" />
              <h2 className="text-xl font-bold">Patient Data Collection</h2>
            </div>

            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              <X />
            </button>
          </div>
          <p className="text-teal-100 mt-2">
            Record patient information and health status
          </p>
        </div>

        {/* Form Type Selection */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-2">
            <button
              onClick={() => handleFormTypeChange("malaria")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formType === "malaria"
                  ? "bg-blue-100 text-blue-700 border border-blue-200"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              🦟 Malaria Case
            </button>
            <button
              onClick={() => handleFormTypeChange("nutrition")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formType === "nutrition"
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              🍎 Child Nutrition
            </button>
            <button
              onClick={() => handleFormTypeChange("maternal")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                formType === "maternal"
                  ? "bg-pink-100 text-pink-700 border border-pink-200"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              🤱 Maternal Health
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 w-full">
          {/* Basic Patient Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Basic Patient Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Patient Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={basicInfo.patientName}
                    onChange={(e) =>
                      handleBasicInfoChange("patientName", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.patientName
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter patient's full name"
                  />
                </div>
                {errors.patientName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.patientName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={basicInfo.age}
                    onChange={(e) =>
                      handleBasicInfoChange("age", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                      errors.age
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Age in years"
                    min="0"
                    max="120"
                  />
                </div>
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </label>
                <select
                  value={basicInfo.gender}
                  onChange={(e) =>
                    handleBasicInfoChange("gender", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    value={basicInfo.contactNumber}
                    onChange={(e) =>
                      handleBasicInfoChange("contactNumber", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Phone number (optional)"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    value={basicInfo.address}
                    onChange={(e) =>
                      handleBasicInfoChange("address", e.target.value)
                    }
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none ${
                      errors.address
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Patient's address"
                    rows={2}
                  />
                </div>
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  value={basicInfo.notes}
                  onChange={(e) =>
                    handleBasicInfoChange("notes", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  placeholder="Any additional observations or notes"
                  rows={2}
                />
              </div>
            </div>
          </div>

          {/* Specific Form Based on Type */}
          <div className="border-t pt-6 w-full min-w-0">
            {formType === "malaria" && (
              <MalariaForm onSubmit={handleSubmit} isSaving={isSaving} />
            )}
            {formType === "nutrition" && (
              <NutritionForm onSubmit={handleSubmit} isSaving={isSaving} />
            )}
            {formType === "maternal" && (
              <MaternalForm onSubmit={handleSubmit} isSaving={isSaving} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDataForm;
