import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, TestTube, Thermometer, Calendar } from "lucide-react";
import axios from "axios";

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

type FormValues = {
  symptoms: string[];
  testResult: "positive" | "negative" | "pending";
  testType: "rapid_diagnostic" | "microscopy" | "clinical_diagnosis";
  severity: "mild" | "moderate" | "severe";
  treatmentGiven: string;
  treatmentDate: string;
  followUpDate: string;
  complications: string[];
};

export const MalariaForm: React.FC<MalariaFormProps> = ({
  onSubmit,
  isSaving,
}) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      symptoms: [],
      testResult: "pending",
      testType: "rapid_diagnostic",
      severity: "mild",
      treatmentGiven: "",
      treatmentDate: new Date().toISOString().split("T")[0],
      followUpDate: "",
      complications: [],
    },
  });

  const watchedSymptoms = watch("symptoms");
  const watchedTreatmentGiven = watch("treatmentGiven");

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log("Submitted data=====================>", data);

        try {
          await axios.post("http://localhost:8000/api/malaria", data);
          onSubmit(data);
        } catch (error) {
          console.error("Failed to submit nutrition data:", error);
        }
        onSubmit(data);
      })}
      className="space-y-6"
    >
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
        <Controller
          name="symptoms"
          control={control}
          rules={{ required: true, validate: (v) => v.length > 0 }}
          render={({ field }) => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {symptoms.map((symptom) => (
                <label key={symptom} className="flex items-center">
                  <input
                    type="checkbox"
                    value={symptom}
                    checked={field.value?.includes(symptom)}
                    onChange={(e) => {
                      const selected = field.value || [];
                      if (e.target.checked) {
                        field.onChange([...selected, symptom]);
                      } else {
                        field.onChange(selected.filter((s) => s !== symptom));
                      }
                    }}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{symptom}</span>
                </label>
              ))}
            </div>
          )}
        />
        {errors.symptoms && (
          <span className="text-xs text-red-600">
            Select at least one symptom.
          </span>
        )}
      </div>

      {/* Test Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Type *
          </label>
          <select
            {...register("testType", { required: "Test type is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="rapid_diagnostic">
              Rapid Diagnostic Test (RDT)
            </option>
            <option value="microscopy">Microscopy</option>
            <option value="clinical_diagnosis">Clinical Diagnosis</option>
          </select>
          {errors.testType && (
            <span className="text-xs text-red-600">
              {errors.testType.message}
            </span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Test Result *
          </label>
          <select
            {...register("testResult", { required: "Test result is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="positive">Positive</option>
            <option value="negative">Negative</option>
          </select>
          {errors.testResult && (
            <span className="text-xs text-red-600">
              {errors.testResult.message}
            </span>
          )}
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
                value={level}
                {...register("severity", { required: true })}
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
        {errors.severity && (
          <span className="text-xs text-red-600">
            Please select severity level.
          </span>
        )}
      </div>

      {/* Treatment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treatment Given *
          </label>
          <textarea
            {...register("treatmentGiven", { required: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Describe treatment provided"
          />
          {errors.treatmentGiven && (
            <span className="text-xs text-red-600">
              This field is required.
            </span>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Treatment Date *
            </label>
            <input
              type="date"
              {...register("treatmentDate", { required: true })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {errors.treatmentDate && (
              <span className="text-xs text-red-600">Required field.</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follow-up Date
            </label>
            <input
              type="date"
              {...register("followUpDate")}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Complications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Complications (if any)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {complications.map((complication) => (
            <label key={complication} className="flex items-center">
              <input
                type="checkbox"
                value={complication}
                {...register("complications")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{complication}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={
            isSaving ||
            !watchedTreatmentGiven ||
            !watchedSymptoms ||
            watchedSymptoms.length === 0
          }
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
