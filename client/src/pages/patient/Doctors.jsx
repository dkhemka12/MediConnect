import React from "react";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Doctors List</h2>
      <div>
        <button onClick={() => navigate("/patient/doctor/1")}>
          View Details
        </button>
        <button onClick={() => navigate("/patient/book-appointment/1")}>
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Doctors;
