// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // optional styling

export default function Sidebar() {
  const menuItems = [
    { name: "Job Suggestions", path: "/jobsuggestion" },
    { name: "Profile", path: "/profile" },
    { name: "Tracker", path: "/tracker" },
    { name: "ATS Score + Resume Upload", path: "/ats" },
  ];

  return (
    <div className="sidebar">
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
