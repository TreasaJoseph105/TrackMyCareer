import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './pages/Profile.jsx';
import Tracker from './pages/Tracker.jsx';
import ATSScore from './pages/ATSScore.jsx';
import JobSuggestion from './pages/JobSuggestion.jsx';
import ResumeUpload from './pages/ResumeUpload.jsx';

export default function AppRoutes() {
    const userId = "123"; // Replace with real auth if needed

    return (
        <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/tracker" element={<Tracker userId={userId} />} />
            <Route path="/ats" element={<ATSScore userId={userId} />} />
            <Route path="/jobsuggestion" element={<JobSuggestion userId={userId} />} />
            <Route path="/resume" element={<ResumeUpload userId={userId} />} />
        </Routes>
    );
}
