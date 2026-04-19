import React from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

const appointments = [
  { name: "Mr. Gupta", date: "Apr 19, 2026", time: "10:00 AM", status: "Pending" },
  { name: "Sara Khan", date: "Apr 19, 2026", time: "11:30 AM", status: "Confirmed" },
  { name: "John Mathew", date: "Apr 19, 2026", time: "2:00 PM", status: "Pending" },
  { name: "Nisha Verma", date: "Apr 20, 2026", time: "9:00 AM", status: "Confirmed" },
];

const Appointments = () => {
  const navigate = useNavigate();
  const handleBackToDashboard = () => navigate("/doctor/dashboard");

  return (
    <div className="doctor-appointments-page">
      {/* Header */}
      <div className="doctor-appointments-header">
        <div>
          <h2>Appointments</h2>
          <p>A simple list of upcoming patient visits.</p>
        </div>

        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {/* Appointments List */}
      <div className="doctor-appointments-list">
        {appointments.map((appointment) => (
          <article key={`${appointment.name}-${appointment.time}`} className="appointment-card">
            <div>
              <h3>{appointment.name}</h3>
              <p>{appointment.date}</p>
            </div>
            <div>
              <span>{appointment.time}</span>
              <strong>{appointment.status}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Appointments;