import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("patient");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const ROLE_ROUTES = {
    patient: "/patient/dashboard",
    doctor: "/doctor/dashboard",
    admin: "/admin/dashboard",
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    // Temporary frontend-only flow. Replace this with API login response handling.
    navigate(ROLE_ROUTES[selectedRole]);
  };

  const handleRoleChange = (event) => setSelectedRole(event.target.value);
  const handleEmailChange = (event) => setEmailValue(event.target.value);
  const handlePasswordChange = (event) => setPasswordValue(event.target.value);
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

          <label>
            <span>Email</span>
            <input
              type="email"
              value={emailValue}
              onChange={handleEmailChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={passwordValue}
              onChange={handlePasswordChange}
              placeholder="Your password"
            />
          </label>

          <button className="auth-primary" type="submit">Login</button>

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