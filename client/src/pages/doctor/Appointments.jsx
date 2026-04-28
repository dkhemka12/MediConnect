import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyAppointments } from "../../services/appointmentService";
import "./Appointments.css";

const Appointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="doctor-appointments-page">
      <div className="doctor-appointments-header">
        <div>
          <h2>Appointments</h2>
          <p>A simple list of upcoming patient visits.</p>
        </div>

        <button onClick={() => navigate("/doctor/dashboard")}>
          Back to Dashboard
        </button>
      </div>

      {loading && <p className="doctor-appointments-empty">Loading...</p>}
      {error && !loading && <p className="doctor-appointments-empty">{error}</p>}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;