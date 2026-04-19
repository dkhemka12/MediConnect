import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("patient");
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    navigate(selectedRole === "doctor" ? "/doctor/dashboard" : "/patient/dashboard");
  };

  const handleRoleChange = (event) => setSelectedRole(event.target.value);
  const handleNameChange = (event) => setNameValue(event.target.value);
  const handleEmailChange = (event) => setEmailValue(event.target.value);
  const handlePasswordChange = (event) => setPasswordValue(event.target.value);
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
          <label>
            <span>Role</span>
            <select value={selectedRole} onChange={handleRoleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <label>
            <span>Name</span>
            <input
              value={nameValue}
              onChange={handleNameChange}
              placeholder="Your name"
            />
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