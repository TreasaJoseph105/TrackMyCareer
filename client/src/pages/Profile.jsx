// pages/Profile.jsx
import React, { useState } from "react";

export default function Profile() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [links, setLinks] = useState({
    github: "",
    linkedin: "",
    portfolio: "",
  });

  const [jobPref, setJobPref] = useState({
    role: "",
    industry: "",
    location: "",
    salary: "",
    type: "Full-time",
  });

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleLinksChange = (e) => {
    setLinks({ ...links, [e.target.name]: e.target.value });
  };

  const handleJobPrefChange = (e) => {
    setJobPref({ ...jobPref, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Personal Info</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={personalInfo.name}
        onChange={handlePersonalChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={personalInfo.email}
        onChange={handlePersonalChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone (optional)"
        value={personalInfo.phone}
        onChange={handlePersonalChange}
      />

      <h2>Links</h2>
      <input
        type="text"
        name="github"
        placeholder="GitHub"
        value={links.github}
        onChange={handleLinksChange}
      />
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn"
        value={links.linkedin}
        onChange={handleLinksChange}
      />
      <input
        type="text"
        name="portfolio"
        placeholder="Portfolio"
        value={links.portfolio}
        onChange={handleLinksChange}
      />

      <h2>Job Preference</h2>
      <input
        type="text"
        name="role"
        placeholder="Role"
        value={jobPref.role}
        onChange={handleJobPrefChange}
      />
      <input
        type="text"
        name="industry"
        placeholder="Industry"
        value={jobPref.industry}
        onChange={handleJobPrefChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={jobPref.location}
        onChange={handleJobPrefChange}
      />
      <input
        type="text"
        name="salary"
        placeholder="Salary"
        value={jobPref.salary}
        onChange={handleJobPrefChange}
      />
      <select
        name="type"
        value={jobPref.type}
        onChange={handleJobPrefChange}
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>
    </div>
  );
}
