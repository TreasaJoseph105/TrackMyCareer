import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import Sidebar from "./components/Sidebar.jsx";

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login"; // 👈 hide sidebar on login page

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar - hidden on login */}
      {!hideSidebar && (
        <div className="w-[300px] fixed top-0 left-0 h-screen">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${!hideSidebar ? "ml-[300px]" : ""} p-6 text-[#FFD700]`}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import JobSuggestion from "./pages/JobSuggestion";
import Tracker from "./pages/Tracker";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/jobs" element={<JobSuggestion />} />
            <Route path="/tracker" element={<Tracker />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
>>>>>>> 41cbdac13983c2b956376753827286bc671ebbdb
