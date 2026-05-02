import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyAppointments,
  updateAppointmentStatus,
} from "../../services/appointmentService";
import "./Appointments.css";

const Appointments = () => {
  const navigate = useNavigate();

  // Appointment list and loading state
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  // Error and action feedback messages
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyAppointments();
        setAppointments(data);
      } catch (err) {
        setError(err.message || "Could not load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Simple format functions (inline + shorter)
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Date unavailable";

  const formatStatus = (status) =>
    status ? status[0].toUpperCase() + status.slice(1) : "Pending";

  // Update appointment status (confirm, reject) and sync with backend
  const handleDecision = async (appointmentId, status) => {
    try {
      setActionError("");
      // Call backend to update status
      const updated = await updateAppointmentStatus(appointmentId, status);
      setAppointments((current) =>
        current.map((item) => (item.id === appointmentId ? updated : item)),
      );
    } catch (err) {
      setActionError(err.message || "Could not update appointment.");
    }
  };

  return (
    <div className="doctor-appointments-page">
      <div className="doctor-appointments-header">
        <div>
          <h2>Appointments</h2>
          <p>
            Review requests, accept patients, or reject appointments that do not
            fit your schedule.
          </p>
        </div>

        <button onClick={() => navigate("/doctor/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      {loading && <p className="doctor-appointments-empty">Loading...</p>}
      {error && !loading && (
        <p className="doctor-appointments-empty">{error}</p>
      )}
      {actionError && !loading && (
        <p className="doctor-appointments-empty">{actionError}</p>
      )}
      {!loading && !error && appointments.length === 0 && (
        <p className="doctor-appointments-empty">No appointments found.</p>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="doctor-appointments-list">
          {appointments.map((a) => (
            <div key={a.id} className="appointment-card">
              <div>
                <h3>{a.patientName || "Patient"}</h3>
                <p>{formatDate(a.date)}</p>
              </div>

              <div>
                <span>{a.time}</span>
                <strong>{formatStatus(a.status)}</strong>
                {a.status === "pending" ? (
                  <div className="appointment-actions">
                    <button
                      type="button"
                      onClick={() => handleDecision(a.id, "approved")}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDecision(a.id, "cancelled")}
                    >
                      Reject
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
