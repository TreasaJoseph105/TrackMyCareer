// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./pages/Profile.jsx";
import Tracker from "./pages/Tracker.jsx";
import ATSScore from "./pages/ATSScore.jsx";
import JobSuggestion from "./pages/JobSuggestion.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/jobsuggestion" element={<JobSuggestion />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/ats" element={<ATSScore />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
