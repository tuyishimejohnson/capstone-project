import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, Scale, Ruler, Activity } from "lucide-react";
import axios from "axios";

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

type NutritionFormFields = {
  childAge: string;
  weight: string;
  height: string;
  muac: string;
  nutritionStatus: "normal" | "moderate_malnutrition" | "severe_malnutrition";
  feedingPractices: string[];
  interventionProvided: string[];
  caregiverEducation: boolean;
  referralMade: boolean;
  referralLocation: string;
};

export const NutritionForm: React.FC<NutritionFormProps> = ({
  onSubmit,
  isSaving,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<NutritionFormFields>({
    defaultValues: {
      childAge: "",
      weight: "",
      height: "",
      muac: "",
      nutritionStatus: "normal",
      feedingPractices: [],
      interventionProvided: [],
      caregiverEducation: false,
      referralMade: false,
      referralLocation: "",
    },
  });

  const childAge = watch("childAge");
  const weight = watch("weight");
  const height = watch("height");
  const muac = watch("muac");
  const referralMade = watch("referralMade");

  // Nutrition status calculation
  React.useEffect(() => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const m = parseFloat(muac);
    const a = parseInt(childAge);

    let status: NutritionFormFields["nutritionStatus"] = "normal";
    if (!isNaN(w) && !isNaN(h) && !isNaN(m) && !isNaN(a)) {
      if (m < 11.5) status = "severe_malnutrition";
      else if (m < 12.5) status = "moderate_malnutrition";
      else status = "normal";
    }
    setValue("nutritionStatus", status, { shouldValidate: false });
  }, [weight, height, muac, childAge, setValue]);

  const nutritionStatus = watch("nutritionStatus");

  const onFormSubmit = async (data: NutritionFormFields) => {
    const parsedData = {
      ...data,
      childAge: parseInt(data.childAge),
      weight: parseFloat(data.weight),
      height: parseFloat(data.height),
      muac: parseFloat(data.muac),
    };

    try {
      await axios.post("http://localhost:8000/api/nutrition", parsedData);
      onSubmit(parsedData);
    } catch (error) {
      console.error("Failed to submit nutrition data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
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
              {...register("childAge", { required: true, min: 0, max: 60 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Age in months"
              min="0"
              max="60"
            />
            {errors.childAge && (
              <span className="text-xs text-red-600">Required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Scale className="w-4 h-4 inline mr-1" />
              Weight (kg) *
            </label>
            <input
              type="number"
              step="0.1"
              {...register("weight", { required: true, min: 0, max: 50 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Weight in kg"
              min="0"
              max="50"
            />
            {errors.weight && (
              <span className="text-xs text-red-600">Required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Ruler className="w-4 h-4 inline mr-1" />
              Height (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              {...register("height", { required: true, min: 0, max: 150 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Height in cm"
              min="0"
              max="150"
            />
            {errors.height && (
              <span className="text-xs text-red-600">Required</span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              MUAC (cm) *
            </label>
            <input
              type="number"
              step="0.1"
              {...register("muac", { required: true, min: 0, max: 30 })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="MUAC in cm"
              min="0"
              max="30"
            />
            {errors.muac && (
              <span className="text-xs text-red-600">Required</span>
            )}
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
            nutritionStatus === "severe_malnutrition"
              ? "border-red-200 bg-red-50"
              : nutritionStatus === "moderate_malnutrition"
              ? "border-yellow-200 bg-yellow-50"
              : "border-green-200 bg-green-50"
          }`}
        >
          <div className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full mr-3 ${
                nutritionStatus === "severe_malnutrition"
                  ? "bg-red-500"
                  : nutritionStatus === "moderate_malnutrition"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            />
            <span
              className={`font-medium ${
                nutritionStatus === "severe_malnutrition"
                  ? "text-red-800"
                  : nutritionStatus === "moderate_malnutrition"
                  ? "text-yellow-800"
                  : "text-green-800"
              }`}
            >
              {nutritionStatus === "severe_malnutrition"
                ? "Severe Malnutrition"
                : nutritionStatus === "moderate_malnutrition"
                ? "Moderate Malnutrition"
                : "Normal Nutrition Status"}
            </span>
          </div>
          {muac && (
            <p className="text-sm text-gray-600 mt-2">
              MUAC: {muac}cm
              {parseFloat(muac) < 11.5
                ? " (Severe)"
                : parseFloat(muac) < 12.5
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
          <Controller
            control={control}
            name="feedingPractices"
            render={({ field }) => (
              <>
                {feedingPractices.map((practice) => (
                  <label key={practice} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value.includes(practice)}
                      onChange={() => {
                        if (field.value.includes(practice)) {
                          field.onChange(
                            field.value.filter((p: string) => p !== practice)
                          );
                        } else {
                          field.onChange([...field.value, practice]);
                        }
                      }}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {practice}
                    </span>
                  </label>
                ))}
              </>
            )}
          />
        </div>
      </div>

      {/* Interventions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Interventions Provided
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Controller
            control={control}
            name="interventionProvided"
            render={({ field }) => (
              <>
                {interventions.map((intervention) => (
                  <label key={intervention} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={field.value.includes(intervention)}
                      onChange={() => {
                        if (field.value.includes(intervention)) {
                          field.onChange(
                            field.value.filter(
                              (i: string) => i !== intervention
                            )
                          );
                        } else {
                          field.onChange([...field.value, intervention]);
                        }
                      }}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {intervention}
                    </span>
                  </label>
                ))}
              </>
            )}
          />
        </div>
      </div>

      {/* Additional Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("caregiverEducation")}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Caregiver education provided
            </span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              {...register("referralMade")}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="ml-2 text-sm font-medium text-gray-700">
              Referral made
            </span>
          </label>
        </div>

        {referralMade && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Referral Location
            </label>
            <input
              type="text"
              {...register("referralLocation")}
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
          disabled={isSaving || !childAge || !weight || !height || !muac}
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
