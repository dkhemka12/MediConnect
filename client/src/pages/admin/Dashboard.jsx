import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/* =======================
   Static Data (for UI)
   ======================= */

const stats = [
  { label: "Total Doctors", value: "24" },
  { label: "Total Patients", value: "186" },
  { label: "Total Revenue", value: "₹12,450" },
  { label: "Pending Requests", value: "8" },
];

const recentItems = [
  "3 new doctors joined this week",
  "18 new patient accounts created",
  "Revenue increased by 12% this month",
  "8 appointment requests waiting for review",
];

const systemStats = [
  { label: "Appointments Today", value: "42" },
  { label: "Active Doctors", value: "19" },
  { label: "New Signups", value: "11" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleOpenUsers = () => navigate("/admin/users");

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-hero">
        {/* Title and description */}
        <div className="admin-header">
          <p className="admin-tag">Admin Overview</p>
          <h2>Dashboard</h2>
          <p>
            A simple snapshot of doctors, patients, revenue, and system
            activity.
          </p>
        </div>

        {/* Action button */}
        <div className="admin-hero-actions">
          <button type="button" onClick={handleOpenUsers}>
            Manage Users
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        {stats.map((item) => (
          <div key={item.label} className="admin-stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="admin-grid">
        <section className="admin-panel">
          <h3>Recent Activity</h3>
          <ul>
            {recentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {/* System status with mini stats */}
        <section className="admin-panel">
          <h3>System Status</h3>
          <div className="admin-mini-stats">
            {systemStats.map((item) => (
              <div key={item.label} className="admin-mini-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /*
    Dashboard.jsx - The main dashboard page for the admin panel of the MediConnect application. 
    It provides an overview of key metrics such as total doctors, patients, revenue, and pending requests. 
    The dashboard also includes sections for recent activity and system status, giving admins a quick snapshot of the platform's performance and user engagement.
*/
}
