import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAppointment } from "../../services/appointmentService";
import "./BookAppointment.css";

// BookAppointment component
const BookAppointment = () => {
  const navigate = useNavigate();

  // Get doctor ID from URL params
  const { id: doctorIdParam } = useParams();

  // State for selected date
  const [selectedDate, setSelectedDate] = useState("");

  // State for selected time
  const [selectedTime, setSelectedTime] = useState("");

  // State for error messages
  const [errorMessage, setErrorMessage] = useState("");

  // State to indicate if appointment is being saved
  const [isSaving, setIsSaving] = useState(false);

  // Handle appointment submission
  const handleSubmitAppointment = async () => {

    // Validate Inputs
    if (!selectedDate || !selectedTime) {
      setErrorMessage("Please select both date and time.");
      return;
    }

    // Start loading state
    setIsSaving(true);
    setErrorMessage("");

    try {
      // Backend shape can evolve, but keep doctorId/date/time stable for integration.
      await createAppointment({
        doctorId: Number(doctorIdParam), // Convert param to number
        date: selectedDate,
        time: selectedTime,
      });
      // Navigate to user's appointments page after success
      navigate("/patient/my-appointments");
    } catch (err) {
      // Show error message if request fails
      setErrorMessage(err.message || "Could not book appointment.");
    } finally {
      // Stop loading state
      setIsSaving(false);
    }
  };

  // Handlers for input changes
  // Update selected date
  const handleDateChange = (event) => setSelectedDate(event.target.value);
  
  // Update selected time
  const handleTimeChange = (event) => setSelectedTime(event.target.value);

  // Handle cancellation of booking and navigate back to doctors listing
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

         {/* Show error message if exists */}
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

{/* This component allows patients to book an appointment with a doctor. 
It includes form inputs for date and time, validation, error handling, and integration with the backend service to create the appointment. 
The UI is designed to be simple and user-friendly, with clear actions for confirming or canceling the booking.
*/}
