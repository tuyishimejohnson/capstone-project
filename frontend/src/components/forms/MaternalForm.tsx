// import React, { useState } from "react";
// import { Save, Heart, Calendar, Activity } from "lucide-react";

// interface MaternalFormProps {
//   onSubmit: (data: any) => void;
//   isSaving: boolean;
// }

// const riskFactors = [
//   "Age < 18 or > 35 years",
//   "Previous cesarean section",
//   "Previous pregnancy complications",
//   "Multiple pregnancies (twins/triplets)",
//   "High blood pressure",
//   "Diabetes",
//   "Anemia",
//   "Previous miscarriage/stillbirth",
// ];

// const complications = [
//   "Bleeding",
//   "High blood pressure",
//   "Severe anemia",
//   "Infection",
//   "Premature labor",
//   "Gestational diabetes",
//   "Pre-eclampsia",
//   "Placental problems",
// ];

// const interventions = [
//   "Iron/folic acid supplementation",
//   "Tetanus vaccination",
//   "Malaria prevention (IPTp)",
//   "Nutritional counseling",
//   "Birth preparedness counseling",
//   "Family planning counseling",
//   "HIV testing and counseling",
//   "Referral to facility",
// ];

// export const MaternalForm: React.FC<MaternalFormProps> = ({
//   onSubmit,
//   isSaving,
// }) => {
//   const [formData, setFormData] = useState({
//     pregnancyStatus: "pregnant" as "pregnant" | "postpartum",
//     gestationWeeks: "",
//     gravida: "",
//     para: "",
//     lastMenstrualPeriod: "",
//     expectedDeliveryDate: "",
//     antenatalVisits: "",
//     riskFactors: [] as string[],
//     complications: [] as string[],
//     vitals: {
//       bloodPressure: "",
//       weight: "",
//       hemoglobin: "",
//     },
//     interventions: [] as string[],
//     nextVisitDate: "",
//   });

//   const handleRiskFactorToggle = (factor: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       riskFactors: prev.riskFactors.includes(factor)
//         ? prev.riskFactors.filter((f) => f !== factor)
//         : [...prev.riskFactors, factor],
//     }));
//   };

//   const handleComplicationToggle = (complication: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       complications: prev.complications.includes(complication)
//         ? prev.complications.filter((c) => c !== complication)
//         : [...prev.complications, complication],
//     }));
//   };

//   const handleInterventionToggle = (intervention: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       interventions: prev.interventions.includes(intervention)
//         ? prev.interventions.filter((i) => i !== intervention)
//         : [...prev.interventions, intervention],
//     }));
//   };

//   const calculateEDD = (lmpDate: string) => {
//     if (!lmpDate) return "";
//     const lmp = new Date(lmpDate);
//     const edd = new Date(lmp);
//     edd.setDate(edd.getDate() + 280); // 40 weeks
//     return edd.toISOString().split("T")[0];
//   };

//   const handleLMPChange = (date: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       lastMenstrualPeriod: date,
//       expectedDeliveryDate: calculateEDD(date),
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const submitData = {
//       ...formData,
//       gestationWeeks: formData.gestationWeeks
//         ? parseInt(formData.gestationWeeks)
//         : undefined,
//       gravida: parseInt(formData.gravida),
//       para: parseInt(formData.para),
//       antenatalVisits: parseInt(formData.antenatalVisits),
//       vitals: {
//         bloodPressure: formData.vitals.bloodPressure || undefined,
//         weight: formData.vitals.weight
//           ? parseFloat(formData.vitals.weight)
//           : undefined,
//         hemoglobin: formData.vitals.hemoglobin
//           ? parseFloat(formData.vitals.hemoglobin)
//           : undefined,
//       },
//     };
//     onSubmit(submitData);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//         <Heart className="w-5 h-5 mr-2 text-pink-600" />
//         Maternal Health Assessment
//       </h3>

//       {/* Pregnancy Status */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Pregnancy Status *
//         </label>
//         <div className="flex space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="pregnancyStatus"
//               value="pregnant"
//               checked={formData.pregnancyStatus === "pregnant"}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   pregnancyStatus: e.target.value as any,
//                 }))
//               }
//               className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="ml-2 text-sm text-gray-700">
//               Currently Pregnant
//             </span>
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="pregnancyStatus"
//               value="postpartum"
//               checked={formData.pregnancyStatus === "postpartum"}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   pregnancyStatus: e.target.value as any,
//                 }))
//               }
//               className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="ml-2 text-sm text-gray-700">Postpartum</span>
//           </label>
//         </div>
//       </div>

//       {/* Pregnancy History */}
//       <div>
//         <h4 className="text-md font-medium text-gray-800 mb-4">
//           Pregnancy History
//         </h4>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Gravida (Total Pregnancies) *
//             </label>
//             <input
//               type="number"
//               value={formData.gravida}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, gravida: e.target.value }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="Number of pregnancies"
//               min="1"
//               max="20"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Para (Live Births) *
//             </label>
//             <input
//               type="number"
//               value={formData.para}
//               onChange={(e) =>
//                 setFormData((prev) => ({ ...prev, para: e.target.value }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="Number of live births"
//               min="0"
//               max="20"
//               required
//             />
//           </div>

//           {formData.pregnancyStatus === "pregnant" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Gestation (Weeks)
//               </label>
//               <input
//                 type="number"
//                 value={formData.gestationWeeks}
//                 onChange={(e) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     gestationWeeks: e.target.value,
//                   }))
//                 }
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//                 placeholder="Weeks pregnant"
//                 min="1"
//                 max="42"
//               />
//             </div>
//           )}

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Antenatal Visits *
//             </label>
//             <input
//               type="number"
//               value={formData.antenatalVisits}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   antenatalVisits: e.target.value,
//                 }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="Number of ANC visits"
//               min="0"
//               max="20"
//               required
//             />
//           </div>
//         </div>
//       </div>

//       {/* Vital Signs */}
//       <div>
//         <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
//           <Activity className="w-4 h-4 mr-2" />
//           Vital Signs
//         </h4>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Blood Pressure
//             </label>
//             <input
//               type="text"
//               value={formData.vitals.bloodPressure}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   vitals: { ...prev.vitals, bloodPressure: e.target.value },
//                 }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="e.g., 120/80"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Weight (kg)
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               value={formData.vitals.weight}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   vitals: { ...prev.vitals, weight: e.target.value },
//                 }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="Weight in kg"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Hemoglobin (g/dL)
//             </label>
//             <input
//               type="number"
//               step="0.1"
//               value={formData.vitals.hemoglobin}
//               onChange={(e) =>
//                 setFormData((prev) => ({
//                   ...prev,
//                   vitals: { ...prev.vitals, hemoglobin: e.target.value },
//                 }))
//               }
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//               placeholder="Hemoglobin level"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Risk Factors */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-3">
//           Risk Factors
//         </label>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//           {riskFactors.map((factor) => (
//             <label key={factor} className="flex items-center">
//               <input
//                 type="checkbox"
//                 checked={formData.riskFactors.includes(factor)}
//                 onChange={() => handleRiskFactorToggle(factor)}
//                 className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
//               />
//               <span className="ml-2 text-sm text-gray-700">{factor}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Next Visit */}
//       <div>
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Next Visit Date
//         </label>
//         <input
//           type="date"
//           value={formData.nextVisitDate}
//           onChange={(e) =>
//             setFormData((prev) => ({ ...prev, nextVisitDate: e.target.value }))
//           }
//           className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
//         />
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-end pt-6 border-t">
//         <button
//           type="submit"
//           disabled={
//             isSaving ||
//             !formData.gravida ||
//             !formData.para ||
//             !formData.antenatalVisits
//           }
//           className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
//         >
//           {isSaving ? (
//             <>
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//               Saving Maternal Record...
//             </>
//           ) : (
//             <>
//               <Save className="w-4 h-4 mr-2" />
//               Save Maternal Record
//             </>
//           )}
//         </button>
//       </div>
//     </form>
//   );
// };

// ========================================
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Save, Heart, Calendar, Activity } from "lucide-react";

interface MaternalFormProps {
  onSubmit: (data: any) => void;
  isSaving: boolean;
}

interface FormData {
  pregnancyStatus: "pregnant" | "postpartum";
  gestationWeeks: string;
  gravida: string;
  para: string;
  lastMenstrualPeriod: string;
  expectedDeliveryDate: string;
  antenatalVisits: string;
  riskFactors: string[];
  complications: string[];
  vitals: {
    bloodPressure: string;
    weight: string;
    hemoglobin: string;
  };
  interventions: string[];
  nextVisitDate: string;
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
  const { control, handleSubmit, setValue, watch } = useForm<FormData>({
    defaultValues: {
      pregnancyStatus: "pregnant",
      gestationWeeks: "",
      gravida: "",
      para: "",
      lastMenstrualPeriod: "",
      expectedDeliveryDate: "",
      antenatalVisits: "",
      riskFactors: [],
      complications: [],
      vitals: {
        bloodPressure: "",
        weight: "",
        hemoglobin: "",
      },
      interventions: [],
      nextVisitDate: "",
    },
  });

  const lastMenstrualPeriod = watch("lastMenstrualPeriod");

  const calculateEDD = (lmpDate: string) => {
    if (!lmpDate) return "";
    const lmp = new Date(lmpDate);
    const edd = new Date(lmp);
    edd.setDate(edd.getDate() + 280); // 40 weeks
    return edd.toISOString().split("T")[0];
  };

  React.useEffect(() => {
    if (lastMenstrualPeriod) {
      setValue("expectedDeliveryDate", calculateEDD(lastMenstrualPeriod));
    }
  }, [lastMenstrualPeriod, setValue]);

  const onSubmitForm = (data: FormData) => {
    const submitData = {
      ...data,
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
    console.log("==============>>>>", submitData);
    onSubmit(submitData);
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

      {/* Dates */}
      <div>
        <h4 className="text-md font-medium text-gray-800 mb-4 flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          Important Dates
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Menstrual Period
            </label>
            <Controller
              name="lastMenstrualPeriod"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expected Delivery Date
            </label>
            <Controller
              name="expectedDeliveryDate"
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
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

      {/* Interventions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Interventions
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {interventions.map((intervention) => (
            <Controller
              key={intervention}
              name="interventions"
              control={control}
              render={({ field }) => (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={field.value.includes(intervention)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...field.value, intervention]
                        : field.value.filter((i) => i !== intervention);
                      field.onChange(newValue);
                    }}
                    className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    {intervention}
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
