import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import { PrivacyPolicy } from "./privacy/PrivacyPolicy";
import { Ethics } from "./privacy/Ethics";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
