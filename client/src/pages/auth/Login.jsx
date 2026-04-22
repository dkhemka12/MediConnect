import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthSession } from "../../services/auth";
import "./Login.css";

//Login Component
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State for selected user role (patient, doctor, admin)
  const [selectedRole, setSelectedRole] = useState("patient");

  // State for email input
  const [emailValue, setEmailValue] = useState("");

  // State for password input
  const [passwordValue, setPasswordValue] = useState("");

  /*Role Based Routes*/
  const ROLE_ROUTES = {
    patient: "/patient/dashboard",
    doctor: "/doctor/dashboard",
    admin: "/admin/dashboard",
  };

  // Handle form submission
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    setAuthSession({
      token: `mock-token-${Date.now()}`,
      role: selectedRole,
    });

    const requestedPath = location.state?.from;
    if (requestedPath) {
      navigate(requestedPath, { replace: true });
      return;
    }

    // Temporary frontend-only flow. Replace this with API login response handling.
    navigate(ROLE_ROUTES[selectedRole]);
  };

  // Handle role selection change
  const handleRoleChange = (event) => setSelectedRole(event.target.value);

  // Handle email input change
  const handleEmailChange = (event) => setEmailValue(event.target.value);

  // Handle password input change
  const handlePasswordChange = (event) => setPasswordValue(event.target.value);

  // Handle navigation to registration page
  const handleOpenRegister = () => navigate("/register");

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <p className="auth-tag">MediConnect</p>
        <h2>Login</h2>
        <p className="auth-text">Choose a role and enter your login details.</p>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmitLogin}>
          <label>
            <span>Role</span>
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {/* Email input field */}
          <label>
            <span>Email</span>
            <input
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              placeholder="you@example.com"
            />
          </label>

          {/* Password input field */}
          <label>
            <span>Password</span>
            <input
              type="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              placeholder="Your password"
            />
          </label>

          {/* Submit login button */}
          <button className="auth-primary" type="submit">Login</button>

          {/* Navigate to register page */}
          <button
            className="auth-secondary"
            type="button"
            onClick={handleOpenRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

{/*
    Login.jsx - A login page component for the MediConnect application. 
    It allows users to select their role (patient, doctor, admin) and enter their email and password to log in.
*/}