import React from "react";
import { useNavigate } from "react-router-dom";
import "./Appointments.css";

// Sample appointment data (can be replaced with backend later)
const appointments = [
  { name: "Mr. Gupta", date: "Apr 19, 2026", time: "10:00 AM", status: "Pending" },
  { name: "Sara Khan", date: "Apr 19, 2026", time: "11:30 AM", status: "Confirmed" },
  { name: "John Mathew", date: "Apr 19, 2026", time: "2:00 PM", status: "Pending" },
  { name: "Nisha Verma", date: "Apr 20, 2026", time: "9:00 AM", status: "Confirmed" },
];

// Appointments component
const Appointments = () => {
   // Hook for navigation
  const navigate = useNavigate();

  // Function to navigate back to doctor dashboard
  const handleBackToDashboard = () => navigate("/doctor/dashboard");

  return (
    <div className="doctor-appointments-page">
      {/* Header */}
      <div className="doctor-appointments-header">
        {/* Title and description */}
        <div>
          <h2>Appointments</h2>
          <p>A simple list of upcoming patient visits.</p>
        </div>

         {/* Back button */}
        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {/* Appointments List */}
      <div className="doctor-appointments-list">

        {/* Loop through appointments array */}
        {appointments.map((appointment) => (

          // Each appointment card
          <article key={`${appointment.name}-${appointment.time}`} className="appointment-card">
            
            {/* Left section: patient name and date */}
            <div>
              <h3>{appointment.name}</h3>
              <p>{appointment.date}</p>
            </div>

            {/* Right section: time and status */}
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

{/*Appointments.jsx - A simple page for doctors to view their upcoming appointments in the MediConnect application. 
It displays a list of appointments with patient names, dates, times, and statuses. 
The useNavigate hook from react-router-dom is used to allow doctors to navigate back to their dashboard.
*/ }