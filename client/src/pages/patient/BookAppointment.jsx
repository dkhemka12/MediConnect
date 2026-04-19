import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAppointment } from "../../services/appointmentService";
import "./BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { id: doctorIdParam } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmitAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Please select both date and time.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    try {
      // Backend shape can evolve, but keep doctorId/date/time stable for integration.
      await createAppointment({
        doctorId: Number(doctorIdParam),
        date: selectedDate,
        time: selectedTime,
      });
      navigate("/patient/my-appointments");
    } catch (err) {
      setErrorMessage(err.message || "Could not book appointment.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDateChange = (event) => setSelectedDate(event.target.value);
  const handleTimeChange = (event) => setSelectedTime(event.target.value);
  const handleCancelBooking = () => navigate("/patient/doctors");

  return (
    <div className="booking-page">
      <div className="booking-card">
        {/* Header */}
        <p className="booking-tag">Book Appointment</p>
        <h2>Choose a time</h2>
        <p>Booking with Doctor ID: {doctorIdParam}</p>

        {/* Booking Form */}
        <div className="booking-form">
          <label>
            <span>Date</span>
            <input type="date" value={selectedDate} onChange={handleDateChange} />
          </label>

          <label>
            <span>Time</span>
            <input type="time" value={selectedTime} onChange={handleTimeChange} />
          </label>
        </div>

        {errorMessage ? <p className="booking-error">{errorMessage}</p> : null}

        {/* Actions */}
        <div className="booking-actions">
          <button className="booking-primary" onClick={handleSubmitAppointment} disabled={isSaving}>
            {isSaving ? "Booking..." : "Confirm Appointment"}
          </button>
          <button className="booking-secondary" onClick={handleCancelBooking}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
