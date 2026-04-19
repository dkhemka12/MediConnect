import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cancelAppointment, getMyAppointments } from "../../services/appointmentService";
import "./MyAppointments.css";

const APPOINTMENT_STATUSES = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

const toLabelDate = (isoDate) => {
  if (!isoDate) {
    return "Date unavailable";
  }

  const [year, month, day] = isoDate.split("-").map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }

  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const MyAppointments = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [appointmentList, setAppointmentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        // Service handles backend call first and fallback data when backend is unavailable.
        const list = await getMyAppointments();
        setAppointmentList(list);
      } catch (err) {
        setErrorMessage(err.message || "Could not load appointments.");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  const stats = {
    total: appointmentList.length,
    upcoming: appointmentList.filter((item) => ["Confirmed", "Pending"].includes(item.status)).length,
    completed: appointmentList.filter((item) => item.status === "Completed").length,
    cancelled: appointmentList.filter((item) => item.status === "Cancelled").length,
  };

  const visibleAppointments =
    selectedStatus === "All"
      ? appointmentList
      : appointmentList.filter((item) => item.status === selectedStatus);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      setAppointmentList((current) =>
        current.map((item) => {
          if (item.id !== appointmentId) {
            return item;
          }
          return { ...item, status: "Cancelled" };
        })
      );
    } catch (err) {
      setErrorMessage(err.message || "Could not cancel appointment.");
    }
  };

  const handleStatusChange = (status) => setSelectedStatus(status);
  const handleOpenDoctors = () => navigate("/patient/doctors");
  const handleOpenDashboard = () => navigate("/patient/dashboard");

  return (
    <div className="my-appointments-page">
      {/* Header */}
      <div className="my-appointments-hero">
        <p className="my-appointments-tag">Patient Care Planner</p>
        <h2>My Appointments</h2>
        <p>Track your upcoming visits and keep your schedule organized in one simple view.</p>

        <div className="my-appointments-actions">
          <button type="button" onClick={handleOpenDoctors}>
            Book New Appointment
          </button>
          <button type="button" onClick={handleOpenDashboard}>
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="my-appointments-stats">
        <article>
          <span>Total</span>
          <strong>{stats.total}</strong>
        </article>
        <article>
          <span>Upcoming</span>
          <strong>{stats.upcoming}</strong>
        </article>
        <article>
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </article>
        <article>
          <span>Cancelled</span>
          <strong>{stats.cancelled}</strong>
        </article>
      </div>

      {/* Filters */}
      <div className="filter-row" role="tablist" aria-label="Filter appointments by status">
        {APPOINTMENT_STATUSES.map((status) => (
          <button
            key={status}
            type="button"
            className={selectedStatus === status ? "active" : ""}
            onClick={() => handleStatusChange(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {isLoading ? <p className="my-appointments-info">Loading appointments...</p> : null}
      {!isLoading && errorMessage ? <p className="my-appointments-error">{errorMessage}</p> : null}

      {/* Appointments List */}
      {!isLoading && visibleAppointments.length > 0 ? (
        <section className="my-appointments-list">
          {visibleAppointments.map((appointment) => (
            <article key={appointment.id} className="my-appointment-card">
              <div className="appointment-main">
                <h3>{appointment.doctorName}</h3>
                <p>{appointment.specialty}</p>
                <p>{appointment.location}</p>
              </div>

              <div className="appointment-meta">
                <span>{toLabelDate(appointment.date)}</span>
                <span>{appointment.time}</span>
              </div>

              <div className="appointment-status-col">
                <span
                  className={`status-pill status-${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>

                {appointment.status === "Confirmed" || appointment.status === "Pending" ? (
                  <button type="button" onClick={() => handleCancelAppointment(appointment.id)}>
                    Cancel Appointment
                  </button>
                ) : null}
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {/* Empty State */}
      {!isLoading && visibleAppointments.length === 0 ? (
        <section className="my-appointments-empty">
          <h3>No appointments found</h3>
          <p>Try another status filter or book your next visit.</p>
          <button type="button" onClick={handleOpenDoctors}>
            Find Doctors
          </button>
        </section>
      ) : null}
    </div>
  );
};

export default MyAppointments;