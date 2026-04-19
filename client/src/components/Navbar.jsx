import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h2 className="logo" onClick={() => navigate("/")}>
          MediConnect
        </h2>

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span>
          <span onClick={() => navigate("/patient/doctors")}>Doctors</span>
          <span onClick={() => navigate("/patient/my-appointments")}>Appointments</span>
          <span onClick={() => navigate("/login")}>Login</span>
        </div>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>

          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;