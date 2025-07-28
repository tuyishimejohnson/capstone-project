import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-teal-500 via-teal-400 to-teal-300 min-h-screen px-6 md:px-20 py-10">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
        >
          <ArrowLeft className="text-white w-6 h-6" />
        </button>
        <h2 className="text-4xl font-bold text-white tracking-wide">
          {t("privacyPolicy")}
        </h2>
      </div>

      {/* Content Cards */}
      <div className="space-y-6">
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-700 leading-relaxed text-lg">
            The <strong>CHW Portal</strong> is a platform designed to assist
            Community Health Workers (CHWs) in monitoring patients' health
            status and managing appointment schedules. We take your privacy
            seriously and are committed to protecting the personal information
            we collect. The data gathered, which may include your name, phone
            number, and specific health details such as maternal, nutritional,
            or malaria-related information, is used solely to provide a clear
            overview of community health at the village level. All information
            is kept confidential and is accessible only to authorized CHWs, who
            use it exclusively for delivering relevant healthcare support and
            advice.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-teal-600 mb-2">CHW Role</h3>
          <p className="text-gray-700 leading-relaxed">
            CHWs are responsible for maintaining the confidentiality of patient
            data and ensuring that it is only used for healthcare purposes. They
            use the collected information to track health trends, schedule
            appointments, and offer timely support while adhering to privacy and
            data protection standards. We ensure that no personal information is
            shared with unauthorized parties, and all data accessible to CHWs is
            limited to what is necessary for effective patient care.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Our goal is to maintain trust and strengthen the relationship
            between patients and CHWs while safeguarding privacy and promoting
            community well-being.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-xl font-semibold text-teal-600 mb-2">
            USSD Appointment Booking
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Patients can book appointments using USSD on feature phones, making
            the service accessible to those without smartphones or internet
            access. When booking via USSD, patients will be asked to provide
            their full name, district, sector, cell, and village. This
            information is collected solely for the purpose of identifying
            patients and scheduling appointments efficiently. All data submitted
            through USSD is handled with the same level of confidentiality and
            security as information collected through the portal, and is only
            accessible to authorized CHWs for healthcare support.
          </p>
          <p className="text-gray-700 leading-relaxed mt-2">
            Using the USSD system is completely free of charge. Patients will
            not be charged any fees for booking appointments via USSD, and the
            service does not deduct any money from your phone or account. This
            ensures that everyone can access healthcare support without concern
            for financial costs or unauthorized charges.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
