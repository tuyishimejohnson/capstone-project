import React, { useState } from "react";
import { Save, TestTube, Thermometer, Calendar } from "lucide-react";

interface MalariaFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

const symptoms = [
  "Fever",
  "Chills",
  "Headache",
  "Nausea",
  "Vomiting",
  "Fatigue",
  "Body aches",
  "Diarrhea",
  "Sweating",
];

const complications = [
  "Severe anemia",
  "Cerebral malaria",
  "Respiratory distress",
  "Kidney failure",
  "Hypoglycemia",
  "Shock",
];

export const MalariaForm: React.FC<MalariaFormProps> = ({
  onSubmit,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    testResult: "pending" as "positive" | "negative" | "pending",
    testType: "rapid_diagnostic" as
      | "rapid_diagnostic"
      | "microscopy"
      | "clinical_diagnosis",
    severity: "mild" as "mild" | "moderate" | "severe",
    treatmentGiven: "",
    treatmentDate: new Date().toISOString().split("T")[0],
    followUpDate: "",
    complications: [] as string[],
  });

  const handleSymptomToggle = (symptom: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  };

  const handleComplicationToggle = (complication: string) => {
    setFormData((prev) => ({
      ...prev,
      complications: prev.complications.includes(complication)
        ? prev.complications.filter((c) => c !== complication)
        : [...prev.complications, complication],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <TestTube className="w-5 h-5 mr-2 text-blue-600" />
        Malaria Case Details
      </h3>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <Thermometer className="w-4 h-4 inline mr-2" />
          Symptoms Observed *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {symptoms.map((symptom) => (
            <label key={symptom} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.symptoms.includes(symptom)}
                onChange={() => handleSymptomToggle(symptom)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{symptom}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Test Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Type *
          </label>
          <select
            value={formData.testType}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                testType: e.target.value as any,
              }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="rapid_diagnostic">
              Rapid Diagnostic Test (RDT)
            </option>
            <option value="microscopy">Microscopy</option>
            <option value="clinical_diagnosis">Clinical Diagnosis</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Result *
          </label>
          <select
            value={formData.testResult}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                testResult: e.target.value as any,
              }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="pending">Pending</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
        </div>
      </div>

      {/* Severity */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Severity Level *
        </label>
        <div className="flex space-x-4">
          {["mild", "moderate", "severe"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="radio"
                name="severity"
                value={level}
                checked={formData.severity === level}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    severity: e.target.value as any,
                  }))
                }
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span
                className={`ml-2 text-sm capitalize ${
                  level === "severe"
                    ? "text-red-600 font-medium"
                    : level === "moderate"
                    ? "text-yellow-600 font-medium"
                    : "text-green-600 font-medium"
                }`}
              >
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treatment Given *
          </label>
          <textarea
            value={formData.treatmentGiven}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                treatmentGiven: e.target.value,
              }))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Describe treatment provided"
            rows={3}
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Treatment Date *
            </label>
            <input
              type="date"
              value={formData.treatmentDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  treatmentDate: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follow-up Date
            </label>
            <input
              type="date"
              value={formData.followUpDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  followUpDate: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Complications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Complications (if any)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {complications.map((complication) => (
            <label key={complication} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.complications.includes(complication)}
                onChange={() => handleComplicationToggle(complication)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="ml-2 text-sm text-gray-700">{complication}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={
            isSaving ||
            !formData.treatmentGiven ||
            formData.symptoms.length === 0
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving Malaria Case...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Malaria Case
            </>
          )}
        </button>
      </div>
    </form>
  );
};
