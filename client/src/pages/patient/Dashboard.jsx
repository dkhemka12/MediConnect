import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments } from "../../services/appointmentService";
import { getUserName } from "../../services/auth";
import { fetchDoctors } from "../../services/userService";
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
    year: "numeric",
  });
};

const formatStatus = (status) =>
  status ? status.charAt(0).toUpperCase() + status.slice(1) : "Pending";

const Dashboard = () => {
  const navigate = useNavigate();
  // Initialize dashboard stats with default values
  const [stats, setStats] = useState([
    { label: "Available Doctors", value: "0" },
    { label: "Upcoming Visits", value: "0" },
    { label: "Completed Visits", value: "0" },
    { label: "Cancelled Visits", value: "0" },
  ]);
  // Display recent appointments (limited to 3)
  const [recentAppointments, setRecentAppointments] = useState([]);
  // Loading and error state management
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Use Promise.all to fetch both doctors and appointments in parallel
        const [doctorList, appointmentList] = await Promise.all([
          fetchDoctors(),
          getMyAppointments(),
        ]);

        // Calculate appointment counts by status
        const upcomingCount = appointmentList.filter((item) =>
          ["pending", "confirmed"].includes(item.status),
        ).length;
        const completedCount = appointmentList.filter(
          (item) => item.status === "completed",
        ).length;
        const cancelledCount = appointmentList.filter(
          (item) => item.status === "cancelled",
        ).length;

        setStats([
          { label: "Available Doctors", value: String(doctorList.length) },
          { label: "Upcoming Visits", value: String(upcomingCount) },
          { label: "Completed Visits", value: String(completedCount) },
          { label: "Cancelled Visits", value: String(cancelledCount) },
        ]);
        setRecentAppointments(appointmentList.slice(0, 3));
      } catch (error) {
        setErrorMessage(error.message || "Could not load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const handleOpenDoctors = () => navigate("/patient/doctors");
  const handleOpenAppointments = () => navigate("/patient/my-appointments");

  return (
    <div className="patient-page">
      {/* Header */}
      <div className="patient-hero">
        <p className="patient-tag">Welcome back, {userName}</p>
        <p className="patient-tag">Patient Overview</p>
        <h2>Dashboard</h2>
        <p>
          Keep track of your doctors, appointments, and reminders in one place.
        </p>
        <div className="patient-actions">
          <button type="button" onClick={handleOpenDoctors}>
            Find Doctors
          </button>
          <button type="button" onClick={handleOpenAppointments}>
            My Appointments
          </button>
        </div>
      </div>

      {isLoading ? <p>Loading dashboard data...</p> : null}
      {!isLoading && errorMessage ? <p>{errorMessage}</p> : null}

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
          <h3>Recent Appointments</h3>
          {!isLoading && recentAppointments.length > 0 ? (
            <ul>
              {recentAppointments.map((item) => (
                <li key={item.id}>
                  {item.doctorName} on {toLabelDate(item.date)} at {item.time} -{" "}
                  {formatStatus(item.status)}
                </li>
              ))}
            </ul>
          ) : null}
          {!isLoading && recentAppointments.length === 0 ? (
            <p>No appointments booked yet.</p>
          ) : null}
        </section>

        <section className="patient-panel">
          <h3>Quick Book</h3>
          <p>
            Start by finding an active doctor and booking the next free slot.
          </p>
          <button
            type="button"
            className="patient-main-btn"
            onClick={handleOpenDoctors}
          >
            Browse Doctors
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
