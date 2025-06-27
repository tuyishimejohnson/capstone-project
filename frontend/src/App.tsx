import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PatientDataForm } from "./components/forms/PatientData";
import { PredictionUploadPage } from "./components/dashboard/PredictionModel";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<PatientDataForm />} />
          <Route path="/predict" element={<PredictionUploadPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
