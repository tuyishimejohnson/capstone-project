import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PrivacyPolicy } from "./privacy/PrivacyPolicy";
import { Ethics } from "./privacy/Ethics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PregnancyDetails } from "./components/dashboard/details/PregnancyDetails";
import { NutritionDetails } from "./components/dashboard/details/NutritionDetails";
import { MalariaDetails } from "./components/dashboard/details/MalariaDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/pregnancy-details/:id" element={<PregnancyDetails />} />
          <Route path="/nutrition-details/:id" element={<NutritionDetails />} />
          <Route path="/malaria-details/:id" element={<MalariaDetails />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
