import React, { useState } from "react";
import { LoginForm } from "./components/auth/LoginForm";
//import { SignupForm } from './components/auth/SignupForm';
//import { Dashboard } from "./components/dashboard/Dashboard";
import type { User } from "./types";

type AuthView = "login" | "signup";

function App() {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication - in real app, this would be an API call
    const mockUser: User = {
      id: "1",
      name: "Sarah Johnson",
      email: email,
      role: "health_worker",
    };
    setUser(mockUser);
  };

  const handleSignup = (name: string, email: string, password: string) => {
    // Mock registration - in real app, this would be an API call
    const mockUser: User = {
      id: "2",
      name: name,
      email: email,
      role: "health_worker",
    };
    setUser(mockUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("login");
  };

  if (user) {
    return null;
    {
      /* <Dashboard user={user} onLogout={handleLogout} /> */
    }
  }

  return (
    <>
      {
        currentView === "login" ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView("signup")}
          />
        ) : null

        // (
        //   <SignupForm
        //     onSignup={handleSignup}
        //     onSwitchToLogin={() => setCurrentView("login")}
        //   />
        // )
      }
    </>
  );
}

export default App;
