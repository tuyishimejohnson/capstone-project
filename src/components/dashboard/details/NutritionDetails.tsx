import { useNutritionData } from "../../../hooks/useNutritionData";
import type { Nutrition } from "../../../types/formTypes";
import { useParams, useNavigate } from "react-router-dom";

export const NutritionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    nutritionData,
    loading,
  }: { nutritionData: Nutrition[]; loading: boolean } = useNutritionData();

  if (loading) {
    return <p className="text-teal-600 text-center items-center">Loading...</p>;
  }

  if (!nutritionData || nutritionData.length === 0) {
    return <p>No data available.</p>;
  }

  const detail = nutritionData.find((nutrition) => nutrition._id === id);

  if (!detail) {
    return <p>No record found for this item.</p>;
  }

  return (
    <div
      className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6"
      style={{ borderTop: "6px solid #0d9488" }}
    >
      <button
        className="mb-4 text-teal-600 hover:underline flex items-center"
        onClick={() => navigate(-1)}
        type="button"
      >
        &larr; Back
      </button>
      <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
        Nutrition Details
      </h2>
      <ul className="space-y-3">
        <li className="flex flex-col gap-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Name:</span>
            <span>{detail.patientName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Age:</span>
            <span>{detail.age}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Gender:</span>
            <span>{detail.gender}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Address:</span>
            <span>{detail.address}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Contact Number:
            </span>
            <span>{detail.contactNumber}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Recorded By:
            </span>
            <span>{detail.recordedBy}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Notes:</span>
            <span>{detail.notes}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Nutrition Status:
            </span>
            <span>{detail.nutritionStatus}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Dietary Intake:
            </span>
            <span>
              {detail.feedingPractices && detail.feedingPractices.length > 0 ? (
                detail.feedingPractices.join(", ")
              ) : (
                <span className="italic text-gray-400">None</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Intervention Provided:
            </span>
            <span>
              {detail.interventionProvided &&
              detail.interventionProvided.length > 0 ? (
                detail.interventionProvided.join(", ")
              ) : (
                <span className="italic text-gray-400">None</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Caregiver Education:
            </span>
            <span>{detail.caregiverEducation ? "Yes" : "No"}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Referral Made:
            </span>
            <span>
              {detail.referralMade ? `Yes (${detail.referralLocation})` : "No"}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Child Age:</span>
            <span>
              {detail.childAge || (
                <span className="italic text-gray-400">N/A</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Weight:</span>
            <span>
              {detail.weight || (
                <span className="italic text-gray-400">N/A</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Height:</span>
            <span>
              {detail.height || (
                <span className="italic text-gray-400">N/A</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">MUAC:</span>
            <span>
              {detail.muac || <span className="italic text-gray-400">N/A</span>}
            </span>
          </div>
          <hr className="my-4" />
        </li>
      </ul>
    </div>
  );
};
