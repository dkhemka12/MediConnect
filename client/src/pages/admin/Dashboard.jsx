import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments } from "../../services/appointmentService";
import { getUserName } from "../../services/auth";
import { fetchUsers } from "../../services/userService";
import "./Dashboard.css";

const formatDate = (value) => {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = getUserName() || "Admin";
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userList, appointmentList] = await Promise.all([
          fetchUsers(),
          getMyAppointments(),
        ]);

        setUsers(userList);
        setAppointments(appointmentList);
      } catch (error) {
        setErrorMessage(error.message || "Could not load admin data.");
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const dashboardStats = useMemo(() => {
    const doctors = users.filter((user) => user.role === "doctor");
    const patients = users.filter((user) => user.role === "patient");
    const pendingAppointments = appointments.filter(
      (item) => item.status === "pending",
    );

    return [
      { label: "Total Doctors", value: String(doctors.length) },
      { label: "Total Patients", value: String(patients.length) },
      { label: "Total Appointments", value: String(appointments.length) },
      { label: "Pending Requests", value: String(pendingAppointments.length) },
    ];
  }, [appointments, users]);

  const recentItems = useMemo(() => {
    const recentUsers = [...users]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2)
      .map((user) => `${user.name} joined as ${user.role}`);

    const recentAppointments = [...appointments]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2)
      .map(
        (appointment) =>
          `${appointment.patientName || "A patient"} booked ${appointment.doctorName || "a doctor"} on ${formatDate(appointment.date)}`,
      );

    const items = [...recentUsers, ...recentAppointments];

    return items.length > 0 ? items.slice(0, 4) : ["No recent activity yet."];
  }, [appointments, users]);

  const systemStats = useMemo(() => {
    const activeDoctors = users.filter(
      (user) => user.role === "doctor" && user.isActive,
    ).length;
    const todayKey = new Date().toISOString().slice(0, 10);
    const appointmentsToday = appointments.filter((item) => item.date === todayKey).length;
    const recentSignups = users.filter((user) => {
      const createdAt = new Date(user.createdAt);
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      return !Number.isNaN(createdAt.getTime()) && createdAt >= sevenDaysAgo;
    }).length;

    return [
      { label: "Appointments Today", value: String(appointmentsToday) },
      { label: "Active Doctors", value: String(activeDoctors) },
      { label: "New Signups", value: String(recentSignups) },
    ];
  }, [appointments, users]);

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
