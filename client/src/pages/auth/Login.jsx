import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthSession } from "../../services/auth";
import { loginUser } from "../../services/authService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pendingMessage = location.state?.message || "";

  const ROLE_ROUTES = {
    patient: "/patient/dashboard",
    doctor: "/doctor/dashboard",
    admin: "/admin/dashboard",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await loginUser({
        email,
        password,
      });

      const roleFromApi = response?.data?.role || "patient";

      setAuthSession({
        token: response?.token,
        role: roleFromApi,
        name: response?.data?.name || "",
      });

      const requestedPath = location.state?.from;
      if (requestedPath) {
        navigate(requestedPath, { replace: true });
        return;
      }

      navigate(ROLE_ROUTES[roleFromApi] || "/patient/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const goToRegister = () => navigate("/register");

  return (
    <div className="auth-page">
      <div className="auth-card">
        {/* Header */}
        <p className="auth-tag">MediConnect</p>
        <h2>Login</h2>
        <p className="auth-text">Choose a role and enter your login details.</p>
        {pendingMessage ? <p className="auth-text">{pendingMessage}</p> : null}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Your password"
            />
          </label>

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

          <button className="auth-primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <button
            className="auth-secondary"
            type="button"
            onClick={goToRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;