import { useMalariaCases } from "../../../hooks/useMalariaCases";
import type { MalariaCase } from "../../../types/formTypes";
import { useNavigate, useParams } from "react-router-dom";

export const MalariaDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    malariaCases,
    loading,
  }: { malariaCases: MalariaCase[]; loading: boolean } = useMalariaCases();

  if (loading) {
    return <p className="text-teal-600 text-center items-center">Loading...</p>;
  }

  if (!malariaCases || malariaCases.length === 0) {
    return <p>No data available.</p>;
  }

  const detail = malariaCases.find((data) => data._id === id);

  if (!detail) {
    return <p>No record found for this item.</p>;
  }

  return (
    <>
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
          Malaria Case Details
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
                Symptoms:
              </span>
              <span>
                {detail.symptoms && detail.symptoms.length > 0 ? (
                  detail.symptoms.join(", ")
                ) : (
                  <span className="italic text-gray-400">None</span>
                )}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Test Type:
              </span>
              <span>{detail.testType}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Test Result:
              </span>
              <span>{detail.testResult}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Severity:
              </span>
              <span>{detail.severity}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Treatment Given:
              </span>
              <span>{detail.treatmentGiven}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Treatment Date:
              </span>
              <span>{detail.treatmentDate}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-semibold text-teal-600 w-40">
                Follow Up Date:
              </span>
              <span>{detail.followUpDate}</span>
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
            <hr className="my-4" />
          </li>
        </ul>
      </div>
    </>
  );
};
