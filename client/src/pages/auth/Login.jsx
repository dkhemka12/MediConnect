import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setAuthSession } from "../../services/auth";
import { loginUser } from "../../services/authService";
import "./Login.css";

const Login = () => {
  // useNavigate for post-login routing; useLocation to capture requested path before login
  const navigate = useNavigate();
  const location = useLocation();

  // Form state management using useState hook
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Extract message from redirect state (e.g., pending doctor activation)
  const pendingMessage = location.state?.message || "";

  // Role-based route mapping for post-login redirect
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
      const response = await loginUser({//calls the loginUser function from authService to send the login credentials to the server and receive a response containing the authentication token and user role.
        email,
        password,
      });

      const roleFromApi = response?.data?.role || "patient";

      setAuthSession({
        token: response?.token,
        role: roleFromApi,
      });

      // If user was redirected here for login, return to requested path after success
      const requestedPath = location.state?.from;
      if (requestedPath) {
        navigate(requestedPath, { replace: true });
        return;
      }

      // Route to appropriate dashboard based on user role
      navigate(ROLE_ROUTES[roleFromApi] || "/patient/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Event handlers for form inputs and navigation
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

        {/* Form with onSubmit handler for async login validation and API call */}
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

          <button
            className="auth-primary"
            type="submit"
            disabled={isSubmitting}
          >
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
