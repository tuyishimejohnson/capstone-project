import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PredictionUploadPage } from "./components/dashboard/PredictionModel";
import { ActiveCasesModal } from "./components/dashboard/MalariaCases";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<PredictionUploadPage />} />
          <Route path="/active-cases" element={<ActiveCasesModal />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
