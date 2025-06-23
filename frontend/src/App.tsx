import React, { useState } from "react";
import { LoginForm } from "./components/auth/LoginForm";
import { SignupForm } from "./components/auth/SignupForm";
import { Dashboard } from "./components/dashboard/Dashboard";
import type { User } from "./types";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PatientDataForm } from "./components/forms/PatientData";

type AuthView = "login" | "signup";

function App() {
  //const [currentView, setCurrentView] = useState<AuthView>("login");
  //const [user, setUser] = useState<User | null>(null);

  /* const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would be an API call
    const mockUser: User = {
      id: "1",
      name: "Johnson Tuyishime",
      email: email,
      role: "health_worker",
    };
    setUser(mockUser);
  }; */

  /* const handleSignup = (name: string, email: string, password: string) => {
    // Mock registration - in real app, this would be an API call
    const mockUser: User = {
      id: "2",
      name: name,
      email: email,
      role: "health_worker",
    };
    setUser(mockUser);
  };
 */
  /* const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  }; */

  /* if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  } */

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<PatientDataForm />} />
        </Routes>
      </Router>

      {/* {currentView === "login" ? (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setCurrentView("signup")}
        />
      ) : (
        <SignupForm
          onSignup={handleSignup}
          onSwitchToLogin={() => setCurrentView("login")}
        />
      )} */}
    </>
  );
}

export default App;
