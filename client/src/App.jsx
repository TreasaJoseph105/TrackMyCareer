import React from "react";
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
