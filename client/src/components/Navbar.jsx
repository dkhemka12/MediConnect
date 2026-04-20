import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">

         {/* Logo / Brand name and Clicking it navigates to home page */}
        <h2 className="logo" onClick={() => navigate("/")}>
          MediConnect
        </h2>

        <div className="nav-links">
          <span onClick={() => navigate("/")}>Home</span> {/* Navigate to home page */}
          <span onClick={() => navigate("/patient/doctors")}>Doctors</span> {/* Navigate to Doctors listing */}
          <span onClick={() => navigate("/patient/my-appointments")}>Appointments</span>  {/* Navigate to user's appointments */}
          <span onClick={() => navigate("/login")}>Login</span> {/* Navigate to login page */}
        </div>

        <div className="nav-actions">
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login   {/* Navigate to login page */}
          </button>

          <button className="primary-btn" onClick={() => navigate("/register")}>
            Get Started    {/* Navigate to registration page */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

{  /*
    Navbar.jsx - A responsive navigation bar component for the MediConnect application. 
    It includes the brand logo, navigation links, and action buttons for login and registration. 
    The useNavigate hook from react-router-dom is used to handle client-side routing when links or buttons are clicked.
*/ }