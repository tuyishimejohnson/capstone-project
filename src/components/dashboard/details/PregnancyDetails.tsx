import { useMaternalData } from "../../../hooks/useMaternalData";
import type { Pregnancy } from "../../../types/formTypes";
import { useParams, useNavigate } from "react-router-dom";

export const PregnancyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    maternalData,
    loading,
  }: { maternalData: Pregnancy[]; loading: boolean } = useMaternalData();

  if (loading) {
    return <p className="text-teal-600 text-center items-center">Loading...</p>;
  }

  if (!maternalData || maternalData.length === 0) {
    return <p>No data available.</p>;
  }

  const detail = maternalData.find((maternal) => maternal._id === id);

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
        Pregnancy Details
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
              Pregnancy Status:
            </span>
            <span>{detail.pregnancyStatus}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Gestation Weeks:
            </span>
            <span>{detail.gestationWeeks}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Gravida:</span>
            <span>{detail.gravida}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Para:</span>
            <span>{detail.para}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Antenatal Visits:
            </span>
            <span>{detail.antenatalVisits}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Risk Factors:
            </span>
            <span>
              {detail.riskFactors && detail.riskFactors.length > 0 ? (
                detail.riskFactors.join(", ")
              ) : (
                <span className="italic text-gray-400">None</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">
              Complications:
            </span>
            <span>
              {detail.complications && detail.complications.length > 0 ? (
                detail.complications.join(", ")
              ) : (
                <span className="italic text-gray-400">None</span>
              )}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="font-semibold text-teal-600 w-40">Vitals:</span>
            <span>
              {detail.vitals ? (
                <pre className="bg-gray-50 rounded p-2 text-xs overflow-x-auto">
                  {JSON.stringify(detail.vitals, null, 2)}
                </pre>
              ) : (
                <span className="italic text-gray-400">No vitals recorded</span>
              )}
            </span>
          </div>
          <hr className="my-4" />
        </li>
      </ul>
    </div>
  );
};
