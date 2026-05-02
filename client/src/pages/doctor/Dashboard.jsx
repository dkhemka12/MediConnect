import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments } from "../../services/appointmentService";
import { getUserName } from "../../services/auth";
import "./Dashboard.css";

const toLabelDate = (isoDate) => {
  if (!isoDate) {
    return "Date unavailable";
  }

  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }

  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = getUserName() || "Doctor";
  // Initialize stats with default values for display
  const [stats, setStats] = useState([
    { label: "Today’s Appointments", value: "0" },
    { label: "Pending Requests", value: "0" },
    { label: "Accepted Patients", value: "0" },
    { label: "Total Patients", value: "0" },
  ]);
  // Display today's and recent appointments
  const [schedule, setSchedule] = useState([]);
  // Loading and error state management
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const appointmentList = await getMyAppointments();
        // Filter appointments for today only
        const todayKey = new Date().toISOString().slice(0, 10);
        const todaysAppointments = appointmentList.filter(
          (item) => item.date === todayKey,
        );
        const pendingCount = appointmentList.filter(
          (item) => item.status === "pending",
        ).length;
        const acceptedCount = appointmentList.filter(
          (item) => item.status === "confirmed",
        ).length;
        const uniquePatients = new Set(
          appointmentList.map((item) => item.patientName).filter(Boolean),
        ).size;

        setStats([
          {
            label: "Today’s Appointments",
            value: String(todaysAppointments.length),
          },
          { label: "Pending Requests", value: String(pendingCount) },
          { label: "Accepted Patients", value: String(acceptedCount) },
          { label: "Total Patients", value: String(uniquePatients) },
        ]);
        setSchedule(appointmentList.slice(0, 3));
      } catch (error) {
        setErrorMessage(error.message || "Could not load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleOpenAppointments = () => navigate("/doctor/appointments");

  return (
    <div className="doctor-page">
      {/* Header */}
      <div className="doctor-hero">
        {/* Title */}
        <p className="doctor-tag">Welcome back, {userName}</p>
        <h2>Dashboard</h2>

        {/* Description */}
        <p>Keep track of your schedule, requests, and daily activity.</p>

        {/* Action button to view appointments */}
        <button type="button" onClick={handleOpenAppointments}>
          View Appointments
        </button>
      </div>

      {isLoading ? <p>Loading dashboard data...</p> : null}
      {!isLoading && errorMessage ? <p>{errorMessage}</p> : null}

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

          <div className="doctor-schedule">
            {schedule.map((appointment) => (
              <article key={appointment.id} className="schedule-card">
                <div>
                  <h4>{appointment.patientName}</h4>
                  <p>
                    {toLabelDate(appointment.date)} | {appointment.time}
                  </p>
                </div>

                <span>{formatStatus(appointment.status)}</span>
              </article>
            ))}
            {!isLoading && schedule.length === 0 ? (
              <p>No appointments yet.</p>
            ) : null}
          </div>
        </section>

        {/* Quick Actions Panel */}
        <section className="doctor-panel">
          <h3>Quick Actions</h3>

          {/* Action buttons */}
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
