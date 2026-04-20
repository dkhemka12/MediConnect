import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

/// Static data for UI display (can be replaced with backend data later)
const stats = [
  { label: "Upcoming Visits", value: "3" },
  { label: "Doctors Viewed", value: "12" },
  { label: "Saved Doctors", value: "5" },
  { label: "Completed Visits", value: "9" },
];

// Sample reminders for the patient (can be replaced with backend data later)
const reminders = [
  "Book your follow-up with Dr. Sarah Johnson",
  "Review your appointment for today at 10:00 AM",
  "Check available doctors in cardiology",
];

// Patient Dashboard component
const Dashboard = () => {
  const navigate = useNavigate();

  // Handlers for navigation to other pages
  const handleOpenDoctors = () => navigate("/patient/doctors");

  // Navigate to patient's appointments page
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

{/* This component serves as the main dashboard for patients in the MediConnect application. It provides an overview of upcoming visits, doctors viewed, saved doctors, and completed visits. 
 It also includes reminders for the patient and quick access buttons to find doctors and view appointments. 
 The UI is designed to be clean and user-friendly, with clear navigation paths to other parts of the application.
*/}
