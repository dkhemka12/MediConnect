import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Patient Dashboard</h2>
      <button onClick={() => navigate("/patient/doctors")}>View Doctors</button>
      <button onClick={() => navigate("/patient/Myappointments")}>
        My Appointments
      </button>
    </div>
  );
};

export default Dashboard;
