// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Profile from "./pages/Profile.jsx";
import Login from "./pages/Login.jsx";
import Tracker from "./pages/Tracker.jsx";
import ATCSScore from "./pages/ATCSScore.jsx";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/atcs" element={<ATCSScore />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
