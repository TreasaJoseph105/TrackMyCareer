// components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css"; // optional styling

export default function Sidebar() {
  const menuItems = [
    { name: "Login", path: "/login" },
    { name: "Profile", path: "/profile" },
    { name: "Tracker", path: "/tracker" },
    { name: "ATCS Score + Resume Upload", path: "/atcs" },
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
