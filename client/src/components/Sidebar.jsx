// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // optional styling

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Job Suggestions", path: "/jobsuggestions" },
    { name: "Application Tracker", path: "/tracker" },
    { name: "ATS Score + Resume Upload", path: "/ats" },
  ];

  return (
    <div className="sidebar">
      <h2>TrackMyCareer</h2>
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}
