import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Today’s Appointments", value: "12" },
  { label: "Pending Requests", value: "4" },
  { label: "Patients Seen", value: "28" },
  { label: "Weekly Earnings", value: "₹1,240" },
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
        {/* Title */}
        <h2>Dashboard</h2>

        {/* Description */}
        <p>Keep track of your schedule, requests, and daily activity.</p>

        {/* Action button to view appointments */}
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

      {/* Main grid with schedule and actions */}
      <div className="doctor-grid">
        {/* Schedule Panel */}
        <section className="doctor-panel">
          <h3>Today&apos;s Schedule</h3>

          {/* Schedule list */}
          <div className="doctor-schedule">
            {schedule.map((appointment) => (
              // Individual schedule card
              <article
                key={`${appointment.name}-${appointment.time}`}
                className="schedule-card"
              >
                {/* Left: name and time */}
                <div>
                  <h4>{appointment.name}</h4>
                  <p>
                    {appointment.date} | {appointment.time}
                  </p>
                </div>

                {/* Right: status */}
                <span>{appointment.status}</span>
              </article>
            ))}
          </div>
        </section>

        {/* Quick Actions Panel */}
        <section className="doctor-panel">
          <h3>Quick Actions</h3>

          {/* Action buttons */}
          <div className="doctor-actions">
            {/* Navigate to appointments */}
            <button type="button" onClick={handleOpenAppointments}>
              Open Appointments
            </button>

            {/* Placeholder buttons */}
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
