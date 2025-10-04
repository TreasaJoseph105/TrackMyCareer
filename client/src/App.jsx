import React from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes.jsx";
import Sidebar from "./components/Sidebar.jsx";

function Layout() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login"; // 👈 hide sidebar on login page

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar - hidden on login */}
      {!hideSidebar && (
        <div className="w-[300px] fixed top-0 left-0 h-screen">
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className={`flex-1 ${!hideSidebar ? "ml-[300px]" : ""} p-6 text-[#FFD700]`}>
        <AppRoutes />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}
