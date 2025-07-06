// ========================================
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, Heart, Calendar, Activity } from "lucide-react";
import axios from "axios";

interface MaternalFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

interface FormData {
  id?: string;
  patientName: string;
  age: number;
  gender: string;
  patientId: string;
  address: string;
  contactNumber: string;
  notes: string;
  pregnancyStatus: "pregnant" | "postpartum";
  gestationWeeks: string;
  gravida: string;
  para: string;
  antenatalVisits: string;
  riskFactors: string[];
  complications: string[];
  vitals: {
    bloodPressure: string;
    weight: string;
    hemoglobin: string;
  };
  nextVisitDate: string;
  recordedBy: string;
}

const riskFactors = [
  "Age < 18 or > 35 years",
  "Previous cesarean section",
  "Previous pregnancy complications",
  "Multiple pregnancies (twins/triplets)",
  "High blood pressure",
  "Diabetes",
  "Anemia",
  "Previous miscarriage/stillbirth",
];

const complications = [
  "Bleeding",
  "High blood pressure",
  "Severe anemia",
  "Infection",
  "Premature labor",
  "Gestational diabetes",
  "Pre-eclampsia",
  "Placental problems",
];

export const MaternalForm: React.FC<
  MaternalFormProps & { patientData: any; defaultValues?: Partial<FormData> }
> = ({ onSubmit, isSaving, defaultValues = {}, patientData }) => {
  let savedData = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log("----------------------------..>", savedData);
  console.log(patientData.patientName);
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      patientName: "",
      age: 0,
      gender: "",
      patientId: "",
      address: "",
      contactNumber: "",
      notes: "",
      pregnancyStatus: "pregnant",
      gestationWeeks: "",
      gravida: "",
      para: "",
      antenatalVisits: "",
      riskFactors: [],
      complications: [],
      vitals: {
        bloodPressure: "",
        weight: "",
        hemoglobin: "",
      },
      nextVisitDate: "",
      recordedBy: "",
      ...defaultValues,
    },
  });

  const onSubmitForm = async (data: FormData) => {
    // You need to add these fields to your FormData interface and form defaultValues:
    // patientName, gender, patientId, address, contactNumber, notes

    const dataToSubmit = {
      ...data,
      patientName: patientData?.patientName,
      age: patientData?.age,
      gender: patientData?.gender,
      patientId: patientData?.patientId,
      address: patientData?.address,
      contactNumber: patientData?.contactNumber,
      notes: patientData?.notes,
      recordedBy: savedData.name,
      gestationWeeks: data.gestationWeeks
        ? parseInt(data.gestationWeeks)
        : undefined,
      gravida: parseInt(data.gravida),
      para: parseInt(data.para),
      antenatalVisits: parseInt(data.antenatalVisits),
      vitals: {
        bloodPressure: data.vitals.bloodPressure || undefined,
        weight: data.vitals.weight ? parseFloat(data.vitals.weight) : undefined,
        hemoglobin: data.vitals.hemoglobin
          ? parseFloat(data.vitals.hemoglobin)
          : undefined,
      },
    };

    console.log("Submitted data=====================>", dataToSubmit);

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/maternal`,
        dataToSubmit
      );
      onSubmit(dataToSubmit);
    } catch (error) {
      console.error("Failed to submit maternal data:", error);
      // Optionally, handle error UI here
    }
    onSubmit(dataToSubmit);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <Heart className="w-5 h-5 mr-2 text-pink-600" />
        Maternal Health Assessment
      </h3>

      {/* Pregnancy Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pregnancy Status *
        </label>
        <div className="flex space-x-4">
          <Controller
            name="pregnancyStatus"
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pregnant"
                  checked={field.value === "pregnant"}
                  onChange={() => field.onChange("pregnant")}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Currently Pregnant
                </span>
              </label>
            )}
          />
          <Controller
            name="pregnancyStatus"
            control={control}
            render={({ field }) => (
              <label className="flex items-center">
                <input
                  type="radio"
                  value="postpartum"
                  checked={field.value === "postpartum"}
                  onChange={() => field.onChange("postpartum")}
                  className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-700">Postpartum</span>
              </label>
            )}
          />
        </div>
      </div>

      {/* Pregnancy History */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4">
          Pregnancy History
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gravida (Total Pregnancies) *
            </label>
            <Controller
              name="gravida"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Number of pregnancies"
                  min="1"
                  max="20"
                  required
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Para (Live Births) *
            </label>
            <Controller
              name="para"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Number of live births"
                  min="0"
                  max="20"
                  required
                />
              )}
            />
          </div>

          {watch("pregnancyStatus") === "pregnant" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gestation (Weeks)
              </label>
              <Controller
                name="gestationWeeks"
                control={control}
                render={({ field }) => (
                  <input
                    type="number"
                    {...field}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="Weeks pregnant"
                    min="1"
                    max="42"
                  />
                )}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antenatal Visits *
            </label>
            <Controller
              name="antenatalVisits"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Number of ANC visits"
                  min="0"
                  max="20"
                  required
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Vital Signs */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <Activity className="w-4 h-4 mr-2" />
          Vital Signs
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Pressure
            </label>
            <Controller
              name="vitals.bloodPressure"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="e.g., 120/80"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <Controller
              name="vitals.weight"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  step="0.1"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Weight in kg"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hemoglobin (g/dL)
            </label>
            <Controller
              name="vitals.hemoglobin"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  step="0.1"
                  {...field}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Hemoglobin level"
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* Risk Factors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Risk Factors
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {riskFactors.map((factor) => (
            <Controller
              key={factor}
              name="riskFactors"
              control={control}
              render={({ field }) => (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value.includes(factor)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, factor]
                        : field.value.filter((f) => f !== factor);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{factor}</span>
                </label>
              )}
            />
          ))}
        </div>
      </div>

      {/* Complications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Complications
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {complications.map((complication) => (
            <Controller
              key={complication}
              name="complications"
              control={control}
              render={({ field }) => (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value.includes(complication)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, complication]
                        : field.value.filter((c) => c !== complication);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {complication}
                  </span>
                </label>
              )}
            />
          ))}
        </div>
      </div>

      {/* Next Visit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Next Visit Date
        </label>
        <Controller
          name="nextVisitDate"
          control={control}
          render={({ field }) => (
            <input
              type="date"
              {...field}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          )}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="button"
          onClick={handleSubmit(onSubmitForm)}
          disabled={isSaving}
          className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving Maternal Record...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Maternal Record
            </>
          )}
        </button>
      </div>
    </div>
  );
};
