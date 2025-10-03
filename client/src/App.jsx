<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import Sidebar from './components/Sidebar.jsx';

export default function App() {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <AppRoutes />
                </div>
            </div>
        </Router>
    );
=======
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Profile from "./pages/Profile";
import Tracker from "./pages/Tracker";
import ATSScore from "./pages/ATSScore";
import ResumeUpload from "./pages/ResumeUpload";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ marginLeft: "240px", padding: "20px", width: "100%" }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/ats-score" element={<ATSScore />} />
            <Route path="/resume-upload" element={<ResumeUpload />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
>>>>>>> dd948183518c9721d720fc574aa5a155e2bd64bb
}

export default App;
