import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { isAuthenticated } from "../../services/auth";
import "./BookAppointment.css";

const BookAppointment = () => {
  const navigate = useNavigate();

  // Extract doctor ID from URL params
  const { id: doctorIdParam } = useParams();

  // Date and time selection state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  // Form validation error message
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", {
        replace: true,
        state: { from: `/patient/book-appointment/${doctorIdParam}` },
      });
    }
  }, [doctorIdParam, navigate]);

  const handleSubmitAppointment = async () => {
    if (!isAuthenticated()) {
      navigate("/login", {
        state: { from: `/patient/book-appointment/${doctorIdParam}` },
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      setErrorMessage("Please select both date and time.");
      return;
    }

    // Pass appointment details to payment page via route state
    navigate(`/patient/payment/${doctorIdParam}`, {
      state: { selectedDate, selectedTime },
    });
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
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </label>

          <label>
            <span>Time</span>
            <input
              type="time"
              value={selectedTime}
              onChange={handleTimeChange}
            />
          </label>
        </div>

        {/* Show error message if exists */}
        {errorMessage ? <p className="booking-error">{errorMessage}</p> : null}

        {/* Actions */}
        <div className="booking-actions">
          <button className="booking-primary" onClick={handleSubmitAppointment}>
            Proceed to Payment
          </button>
          <button className="booking-secondary" onClick={handleCancelBooking}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
