import React, { useState } from "react";
import { Save, Scale, Ruler, Activity } from "lucide-react";

interface NutritionFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

const feedingPractices = [
  "Exclusive breastfeeding (0-6 months)",
  "Continued breastfeeding",
  "Complementary feeding started",
  "Adequate meal frequency",
  "Diverse diet",
  "Fortified foods given",
];

const interventions = [
  "Nutritional counseling",
  "Therapeutic feeding",
  "Micronutrient supplementation",
  "Deworming",
  "Growth monitoring",
  "Referral to nutrition program",
];

export const NutritionForm: React.FC<NutritionFormProps> = ({
  onSubmit,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    childAge: "",
    weight: "",
    height: "",
    muac: "",
    nutritionStatus: "normal" as
      | "normal"
      | "moderate_malnutrition"
      | "severe_malnutrition",
    feedingPractices: [] as string[],
    interventionProvided: [] as string[],
    caregiverEducation: false,
    referralMade: false,
    referralLocation: "",
  });

  const handleFeedingPracticeToggle = (practice: string) => {
    setFormData((prev) => ({
      ...prev,
      feedingPractices: prev.feedingPractices.includes(practice)
        ? prev.feedingPractices.filter((p) => p !== practice)
        : [...prev.feedingPractices, practice],
    }));
  };

  const handleInterventionToggle = (intervention: string) => {
    setFormData((prev) => ({
      ...prev,
      interventionProvided: prev.interventionProvided.includes(intervention)
        ? prev.interventionProvided.filter((i) => i !== intervention)
        : [...prev.interventionProvided, intervention],
    }));
  };

  const calculateNutritionStatus = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const muac = parseFloat(formData.muac);
    const age = parseInt(formData.childAge);

    if (!weight || !height || !muac || !age) return "normal";

    // Simplified nutrition status calculation
    if (muac < 11.5) return "severe_malnutrition";
    if (muac < 12.5) return "moderate_malnutrition";
    return "normal";
  };

  React.useEffect(() => {
    if (
      formData.weight &&
      formData.height &&
      formData.muac &&
      formData.childAge
    ) {
      const status = calculateNutritionStatus();
      setFormData((prev) => ({ ...prev, nutritionStatus: status }));
    }
  }, [formData.weight, formData.height, formData.muac, formData.childAge]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      childAge: parseInt(formData.childAge),
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      muac: parseFloat(formData.muac),
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-green-600" />
        Child Nutrition Assessment
      </h3>

      {/* Anthropometric Measurements */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4">
          Anthropometric Measurements
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Child Age (months) *
            </label>
            <input
              type="number"
              value={formData.childAge}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, childAge: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Age in months"
              min="0"
              max="60"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Scale className="w-4 h-4 inline mr-1" />
              Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, weight: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Weight in kg"
              min="0"
              max="50"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Ruler className="w-4 h-4 inline mr-1" />
              Height (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.height}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, height: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Height in cm"
              min="0"
              max="150"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MUAC (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.muac}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, muac: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Mid-Upper Arm Circumference"
              min="0"
              max="30"
              required
            />
          </div>
        </div>
      </div>

      {/* Nutrition Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nutrition Status
        </label>
        <div
          className={`p-4 rounded-lg border-2 ${
            formData.nutritionStatus === "severe_malnutrition"
              ? "border-red-200 bg-red-50"
              : formData.nutritionStatus === "moderate_malnutrition"
              ? "border-yellow-200 bg-yellow-50"
              : "border-green-200 bg-green-50"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                formData.nutritionStatus === "severe_malnutrition"
                  ? "bg-red-500"
                  : formData.nutritionStatus === "moderate_malnutrition"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />
            <span
              className={`font-medium ${
                formData.nutritionStatus === "severe_malnutrition"
                  ? "text-red-800"
                  : formData.nutritionStatus === "moderate_malnutrition"
                  ? "text-yellow-800"
                  : "text-green-800"
              }`}
            >
              {formData.nutritionStatus === "severe_malnutrition"
                ? "Severe Malnutrition"
                : formData.nutritionStatus === "moderate_malnutrition"
                ? "Moderate Malnutrition"
                : "Normal Nutrition Status"}
            </span>
          </div>
          {formData.muac && (
            <p className="text-sm text-gray-600 mt-2">
              MUAC: {formData.muac}cm
              {parseFloat(formData.muac) < 11.5
                ? " (Severe)"
                : parseFloat(formData.muac) < 12.5
                ? " (Moderate)"
                : " (Normal)"}
            </p>
          )}
        </div>
      </div>

      {/* Feeding Practices */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Current Feeding Practices
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {feedingPractices.map((practice) => (
            <label key={practice} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.feedingPractices.includes(practice)}
                onChange={() => handleFeedingPracticeToggle(practice)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{practice}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Interventions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Interventions Provided
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {interventions.map((intervention) => (
            <label key={intervention} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.interventionProvided.includes(intervention)}
                onChange={() => handleInterventionToggle(intervention)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="ml-2 text-sm text-gray-700">{intervention}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.caregiverEducation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  caregiverEducation: e.target.checked,
                }))
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Caregiver education provided
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.referralMade}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  referralMade: e.target.checked,
                }))
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Referral made
            </span>
          </label>
        </div>

        {formData.referralMade && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral Location
            </label>
            <input
              type="text"
              value={formData.referralLocation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  referralLocation: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Where was the patient referred?"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={
            isSaving ||
            !formData.childAge ||
            !formData.weight ||
            !formData.height ||
            !formData.muac
          }
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving Nutrition Record...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Nutrition Record
            </>
          )}
        </button>
      </div>
    </form>
  );
};
