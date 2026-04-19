import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const stats = [
  { label: "Upcoming Visits", value: "3" },
  { label: "Doctors Viewed", value: "12" },
  { label: "Saved Doctors", value: "5" },
  { label: "Completed Visits", value: "9" },
];

const reminders = [
  "Book your follow-up with Dr. Sarah Johnson",
  "Review your appointment for today at 10:00 AM",
  "Check available doctors in cardiology",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const handleOpenDoctors = () => navigate("/patient/doctors");
  const handleOpenAppointments = () => navigate("/patient/my-appointments");

  return (
    <div className="patient-page">
      {/* Header */}
      <div className="patient-hero">
        <p className="patient-tag">Patient Overview</p>
        <h2>Dashboard</h2>
        <p>Keep track of your doctors, appointments, and reminders in one place.</p>
        <div className="patient-actions">
          <button type="button" onClick={handleOpenDoctors}>
            Find Doctors
          </button>
          <button type="button" onClick={handleOpenAppointments}>
            My Appointments
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="patient-stats">
        {stats.map((item) => (
          <div key={item.label} className="patient-stat-card">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="patient-grid">
        <section className="patient-panel">
          <h3>Reminders</h3>
          <ul>
            {reminders.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="patient-panel">
          <h3>Quick Book</h3>
          <p>Start by finding a doctor and booking the next free slot.</p>
          <button type="button" className="patient-main-btn" onClick={handleOpenDoctors}>
            Browse Doctors
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
