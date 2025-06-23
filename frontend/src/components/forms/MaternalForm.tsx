import React, { useState } from "react";
import { Save, Heart, Calendar, Activity } from "lucide-react";

interface MaternalFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
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

const interventions = [
  "Iron/folic acid supplementation",
  "Tetanus vaccination",
  "Malaria prevention (IPTp)",
  "Nutritional counseling",
  "Birth preparedness counseling",
  "Family planning counseling",
  "HIV testing and counseling",
  "Referral to facility",
];

export const MaternalForm: React.FC<MaternalFormProps> = ({
  onSubmit,
  isSaving,
}) => {
  const [formData, setFormData] = useState({
    pregnancyStatus: "pregnant" as "pregnant" | "postpartum",
    gestationWeeks: "",
    gravida: "",
    para: "",
    lastMenstrualPeriod: "",
    expectedDeliveryDate: "",
    antenatalVisits: "",
    riskFactors: [] as string[],
    complications: [] as string[],
    vitals: {
      bloodPressure: "",
      weight: "",
      hemoglobin: "",
    },
    interventions: [] as string[],
    nextVisitDate: "",
  });

  const handleRiskFactorToggle = (factor: string) => {
    setFormData((prev) => ({
      ...prev,
      riskFactors: prev.riskFactors.includes(factor)
        ? prev.riskFactors.filter((f) => f !== factor)
        : [...prev.riskFactors, factor],
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

  const handleInterventionToggle = (intervention: string) => {
    setFormData((prev) => ({
      ...prev,
      interventions: prev.interventions.includes(intervention)
        ? prev.interventions.filter((i) => i !== intervention)
        : [...prev.interventions, intervention],
    }));
  };

  const calculateEDD = (lmpDate: string) => {
    if (!lmpDate) return "";
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280); // 40 weeks
    return edd.toISOString().split("T")[0];
  };

  const handleLMPChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      lastMenstrualPeriod: date,
      expectedDeliveryDate: calculateEDD(date),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      gestationWeeks: formData.gestationWeeks
        ? parseInt(formData.gestationWeeks)
        : undefined,
      gravida: parseInt(formData.gravida),
      para: parseInt(formData.para),
      antenatalVisits: parseInt(formData.antenatalVisits),
      vitals: {
        bloodPressure: formData.vitals.bloodPressure || undefined,
        weight: formData.vitals.weight
          ? parseFloat(formData.vitals.weight)
          : undefined,
        hemoglobin: formData.vitals.hemoglobin
          ? parseFloat(formData.vitals.hemoglobin)
          : undefined,
      },
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="flex items-center">
            <input
              type="radio"
              name="pregnancyStatus"
              value="pregnant"
              checked={formData.pregnancyStatus === "pregnant"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pregnancyStatus: e.target.value as any,
                }))
              }
              className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
            />
            <span className="ml-2 text-sm text-gray-700">
              Currently Pregnant
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="pregnancyStatus"
              value="postpartum"
              checked={formData.pregnancyStatus === "postpartum"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pregnancyStatus: e.target.value as any,
                }))
              }
              className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
            />
            <span className="ml-2 text-sm text-gray-700">Postpartum</span>
          </label>
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
            <input
              type="number"
              value={formData.gravida}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gravida: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Number of pregnancies"
              min="1"
              max="20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Para (Live Births) *
            </label>
            <input
              type="number"
              value={formData.para}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, para: e.target.value }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Number of live births"
              min="0"
              max="20"
              required
            />
          </div>

          {formData.pregnancyStatus === "pregnant" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gestation (Weeks)
              </label>
              <input
                type="number"
                value={formData.gestationWeeks}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    gestationWeeks: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Weeks pregnant"
                min="1"
                max="42"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Antenatal Visits *
            </label>
            <input
              type="number"
              value={formData.antenatalVisits}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  antenatalVisits: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Number of ANC visits"
              min="0"
              max="20"
              required
            />
          </div>
        </div>
      </div>

      {/* Dates */}
      {formData.pregnancyStatus === "pregnant" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Last Menstrual Period
            </label>
            <input
              type="date"
              value={formData.lastMenstrualPeriod}
              onChange={(e) => handleLMPChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Delivery Date
            </label>
            <input
              type="date"
              value={formData.expectedDeliveryDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expectedDeliveryDate: e.target.value,
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50"
              readOnly
            />
          </div>
        </div>
      )}

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
            <input
              type="text"
              value={formData.vitals.bloodPressure}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vitals: { ...prev.vitals, bloodPressure: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="e.g., 120/80"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.vitals.weight}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vitals: { ...prev.vitals, weight: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Weight in kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hemoglobin (g/dL)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.vitals.hemoglobin}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  vitals: { ...prev.vitals, hemoglobin: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="Hemoglobin level"
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
            <label key={factor} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.riskFactors.includes(factor)}
                onChange={() => handleRiskFactorToggle(factor)}
                className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              />
              <span className="ml-2 text-sm text-gray-700">{factor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Complications */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Current Complications
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
                checked={formData.interventions.includes(intervention)}
                onChange={() => handleInterventionToggle(intervention)}
                className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="ml-2 text-sm text-gray-700">{intervention}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Next Visit */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Next Visit Date
        </label>
        <input
          type="date"
          value={formData.nextVisitDate}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nextVisitDate: e.target.value }))
          }
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end pt-6 border-t">
        <button
          type="submit"
          disabled={
            isSaving ||
            !formData.gravida ||
            !formData.para ||
            !formData.antenatalVisits
          }
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
    </form>
  );
};
