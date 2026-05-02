import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments } from "../../services/appointmentService";
import { getUserName } from "../../services/auth";
import { fetchUsers } from "../../services/userService";
import "./Dashboard.css";

/* =======================
   Static Data (for UI demo)
   ======================= */
// Dashboard stats displayed in cards
const stats = [
  { label: "Total Doctors", value: "24" },
  { label: "Total Patients", value: "186" },
  { label: "Total Revenue", value: "₹12,450" },
  { label: "Pending Requests", value: "8" },
]; // Recent activity feed
const recentItems = [
  "3 new doctors joined this week",
  "18 new patient accounts created",
  "Revenue increased by 12% this month",
  "8 appointment requests waiting for review",
]; // Real-time system metrics
const systemStats = [
  { label: "Appointments Today", value: "42" },
  { label: "Active Doctors", value: "19" },
  { label: "New Signups", value: "11" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  // Navigate to user management page
  const handleOpenUsers = () => navigate("/admin/users");

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <div className="admin-header">
          <p className="admin-tag">Welcome back, {userName}</p>
          <p className="admin-tag">Admin Overview</p>
          <h2>Dashboard</h2>
          <p>
            A live snapshot of doctors, patients, appointments, and system
            activity.
          </p>
        </div>

        <div className="admin-hero-actions">
          <button type="button" onClick={handleOpenUsers}>
            Manage Users
          </button>
        </div>
      </div>

      {isLoading ? <p>Loading admin data...</p> : null}
      {!isLoading && errorMessage ? <p>{errorMessage}</p> : null}

      <div className="admin-stats">
        {dashboardStats.map((item) => (
          <div key={item.label} className="admin-stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="admin-grid">
        <section className="admin-panel">
          <h3>Recent Activity</h3>
          <ul>
            {recentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

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
