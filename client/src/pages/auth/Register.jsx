import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const navigate = useNavigate();

  // State for selected role (patient or doctor)
  const [selectedRole, setSelectedRole] = useState("patient");

  // State for name input
  const [nameValue, setNameValue] = useState("");

  // State for email input
  const [emailValue, setEmailValue] = useState("");

  // State for password input
  const [passwordValue, setPasswordValue] = useState("");

  // Handle form submission
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    navigate(selectedRole === "doctor" ? "/doctor/dashboard" : "/patient/dashboard");
  };

  // Handle role selection change
  const handleRoleChange = (event) => setSelectedRole(event.target.value);

  // Handle name input change
  const handleNameChange = (event) => setNameValue(event.target.value);

  // Handle email input change
  const handleEmailChange = (event) => setEmailValue(event.target.value);

  // Handle password input change
  const handlePasswordChange = (event) => setPasswordValue(event.target.value);

  // Handle navigation to login page
  const handleOpenLogin = () => navigate("/login");

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}
        <p className="auth-tag">MediConnect</p>
        <h2>Create Account</h2>
        <p>Create an account to access personalized healthcare services.</p>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmitRegister}>

          {/* Role selection */}
          <label>
            <span>Role</span>
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          {/* Name input field */}
          <label>
            <span>Name</span>
            <input
              value={nameValue}
              onChange={handleNameChange}
              placeholder="Your name"
            />
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
              placeholder="Create a password"
            />
          </label>

          <div className="register-actions">
            <button className="auth-primary" type="submit">Create account</button>
            <button className="auth-secondary" type="button" onClick={handleOpenLogin}>Back to login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

{/*
    Register.jsx - A registration page component for the MediConnect application. 
    It allows new users to create an account by selecting their role (patient or doctor) and entering their name, email, and password.
*/}