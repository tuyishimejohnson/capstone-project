import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-teal-500 h-screen px-30">
        <div className="flex justify-center items-center gap-10">
          <button onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="cursor-pointer" />
          </button>
          <h2 className="text-3xl py-10">Privacy Notice</h2>
        </div>
        <p>
          The CHW Portal is a platform designed to assist Community Health
          Workers (CHWs) in monitoring patients' health status and managing
          appointment schedules. We take your privacy seriously and are
          committed to protecting the personal information we collect. The data
          gathered, which may include your name, phone number, and specific
          health details such as maternal, nutritional, or malaria-related
          information, is used solely to provide a clear overview of community
          health at the village level. All information is kept confidential and
          is accessible only to authorized CHWs, who use it exclusively for
          delivering relevant healthcare support and advice.{" "}
        </p>

        <p>
          Patient Role: Patients using the portal provide accurate health
          information to enable CHWs to offer the most appropriate advice,
          treatment recommendations, and follow-ups. Patients have control over
          their own appointment bookings and can request updates or corrections
          to their information.
        </p>

        <p>
          CHW Role: CHWs are responsible for maintaining the confidentiality of
          patient data and ensuring that it is only used for healthcare
          purposes. They use the collected information to track health trends,
          schedule appointments, and offer timely support while adhering to
          privacy and data protection standards. We ensure that no personal
          information is shared with unauthorized parties, and all data
          accessible to CHWs is limited to what is necessary for effective
          patient care. Our goal is to maintain trust and strengthen the
          relationship between patients and CHWs while safeguarding privacy and
          promoting community well-being. We do not share personal data with
          unauthorized third parties, and all reports or data views provided to
          CHWs are limited to the information necessary for effective patient
          care. Our aim is to maintain trust and foster a positive relationship
          between patients and CHWs, ensuring that your privacy and well-being
          remain our top priorities.
        </p>
      </div>
    </>
  );
};
