import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Tracker from "./pages/Tracker.jsx";
import ATSScore from "./pages/ATSScore.jsx";
import JobSuggestion from "./pages/JobSuggestion.jsx";
import ResumeUpload from "./pages/ResumeUpload.jsx";
import Login from "./pages/Login.jsx"; // 👈 Add your Login page

// ✅ PrivateRoute wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  const userId = "123"; // Replace later with real auth data

  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/tracker"
        element={
          <PrivateRoute>
            <Tracker userId={userId} />
          </PrivateRoute>
        }
      />
      <Route
        path="/ats"
        element={
          <PrivateRoute>
            <ATSScore userId={userId} />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobsuggestion"
        element={
          <PrivateRoute>
            <JobSuggestion userId={userId} />
          </PrivateRoute>
        }
      />
      <Route
        path="/resume"
        element={
          <PrivateRoute>
            <ResumeUpload userId={userId} />
          </PrivateRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
