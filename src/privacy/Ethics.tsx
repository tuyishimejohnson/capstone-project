import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const Ethics = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="mx-44">
        <div className="flex justify-center items-center gap-10 bg-teal-300">
          <button
            className="cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft />
          </button>
          <h2 className="flex justify-center items-center gap-10 py-10 text-3xl">
            Code of Ethics
          </h2>
        </div>

        <p>
          Commitment to Integrity and Confidentiality: Community Health Workers
          (CHWs) are dedicated to maintaining the highest standards of integrity
          and confidentiality when handling patient data. All information
          collected through the CHW Portal is used solely to provide quality
          healthcare services and to monitor community health trends. CHWs must
          ensure that personal details and medical information are kept private
          and accessed only by authorized personnel for healthcare purposes.
          Respect, Fairness, and Compassion: CHWs are committed to treating all
          patients with respect, fairness, and compassion, regardless of their
          background, health status, or personal circumstances. They strive to
          create a supportive environment that fosters trust and encourages open
          communication. Likewise, patients are encouraged to provide accurate
          information and actively engage in their healthcare journey to ensure
          the best possible outcomes. Accountability and Community Well-being:
          Both CHWs and patients share the responsibility of promoting community
          health and well-being. CHWs are accountable for their actions and
          decisions, ensuring that all recommendations and advice align with
          medical best practices and ethical standards. Patients, on the other
          hand, are encouraged to follow guidance and contribute to maintaining
          a healthy community by participating honestly and responsibly.
        </p>
      </div>
    </>
  );
};
