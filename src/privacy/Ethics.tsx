import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const Ethics = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-gray-100 min-h-screen px-6 md:px-20 py-10">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-full bg-white hover:bg-white/30 transition"
        >
          <ArrowLeft className="text-teal-600 w-6 h-6" />
        </button>
        <h2 className="text-4xl font-bold text-teal-600 tracking-wide">
          {t("ethics")}
        </h2>
      </div>

      {/* Content */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-6 md:p-10 leading-relaxed space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Section 1 */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-700 mb-2">
            Commitment to Integrity and Confidentiality
          </h3>
          <p className="text-gray-700 text-lg">
            Community Health Workers (CHWs) are dedicated to maintaining the
            highest standards of integrity and confidentiality when handling
            patient data. All information collected through the CHW Portal is
            used solely to provide quality healthcare services and to monitor
            community health trends. CHWs must ensure that personal details and
            medical information are kept private and accessed only by authorized
            personnel for healthcare purposes.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-700 mb-2">
            Respect, Fairness, and Compassion
          </h3>
          <p className="text-gray-700 text-lg">
            CHWs are committed to treating all patients with respect, fairness,
            and compassion, regardless of their background, health status, or
            personal circumstances. They strive to create a supportive
            environment that fosters trust and encourages open communication.
            Likewise, patients are encouraged to provide accurate information
            and actively engage in their healthcare journey to ensure the best
            possible outcomes.
          </p>
        </div>

        {/* Section 3 */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-700 mb-2">
            Accountability and Community Well-being
          </h3>
          <p className="text-gray-700 text-lg">
            Both CHWs and patients share the responsibility of promoting
            community health and well-being. CHWs are accountable for their
            actions and decisions, ensuring that all recommendations and advice
            align with medical best practices and ethical standards. Patients,
            on the other hand, are encouraged to follow guidance and contribute
            to maintaining a healthy community by participating honestly and
            responsibly.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
