import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookAppointment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleConfirm = () => {
    navigate("/patient/my-appointments");
  };
  return (
    <div>
      <h2>Book Appointment</h2>
      <p>Booking with Doctor ID: {id}</p>
      <input type="date" />
      <input type="time" />
      <br />
      <br />
      <button onClick={handleConfirm}>Confirm Appointment</button>
      <br />
      <br />
      <button onClick={() => navigate(`/patient/doctors`)}>Cancel</button>
    </div>
  );
};

export default BookAppointment;
