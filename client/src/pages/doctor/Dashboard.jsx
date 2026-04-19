import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Today’s Appointments", value: "12" },
  { label: "Pending Requests", value: "4" },
  { label: "Patients Seen", value: "28" },
  { label: "Weekly Earnings", value: "$1,240" },
];

const schedule = [
  { name: "Mr. Gupta", time: "10:00 AM", date: "Apr 19", status: "Pending" },
  { name: "Sara Khan", time: "11:30 AM", date: "Apr 19", status: "Confirmed" },
  { name: "John Mathew", time: "2:00 PM", date: "Apr 19", status: "Pending" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleOpenAppointments = () => navigate("/doctor/appointments");

  return (
    <div className="doctor-page">
      {/* Header */}
      <div className="doctor-hero">
        <h2>Dashboard</h2>
        <p>Keep track of your schedule, requests, and daily activity.</p>
        <button type="button" onClick={handleOpenAppointments}>
          View Appointments
        </button>
      </div>

      {/* Stats */}
      <div className="doctor-stats">
        {stats.map((item) => (
          <div key={item.label} className="doctor-stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="doctor-grid">
        <section className="doctor-panel">
          <h3>Today’s Schedule</h3>
          <div className="doctor-schedule">
            {schedule.map((item) => (
              <article key={`${item.name}-${item.time}`} className="schedule-card">
                <div>
                  <h4>{item.name}</h4>
                  <p>
                    {item.date} • {item.time}
                  </p>
                </div>
                <span>{item.status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="doctor-panel">
          <h3>Quick Actions</h3>
          <div className="doctor-actions">
            <button type="button" onClick={handleOpenAppointments}>
              Open Appointments
            </button>
            <button type="button">Update Availability</button>
            <button type="button">View Patients</button>
            <button type="button">Messages</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;