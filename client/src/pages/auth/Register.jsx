import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthSession } from "../../services/auth";
import { registerUser } from "../../services/authService";
import "./Login.css";

// user clicks on register button after filling in fields
const Register = () => {
  const navigate = useNavigate();

  // Role selection state (patient or doctor) - determines activation flow
  const [role, setRole] = useState("patient");
  // Form input state management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Error and loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {//prevents the default form submission behavior, allowing for custom handling of the registration process.
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Please fill all fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await registerUser({//calls the registerUser function from authService to send the registration data to the server.
        name,
        email,
        password,
        role,
      });

      const roleFromApi = response?.data?.role || role; //uses the role from the API response if available, otherwise falls back to the role selected during registration.
      const isActive = response?.data?.isActive ?? true;// checks if the account is active based on the API response. If the isActive field is not provided, it defaults to true, allowing immediate login for patients while doctors may require admin activation.


      // Auto-login if immediately active; otherwise redirect to login with activation message
      if (response?.token && isActive) {
        setAuthSession({
          token: response.token,
          role: roleFromApi,
        });

        navigate(
          roleFromApi === "doctor" ? "/doctor/dashboard" : "/patient/dashboard",
        );
        return;
      }

      // Doctor accounts require admin activation before login
      navigate("/login", {
        replace: true,
        state: {
          message:
            "Doctor account created. An admin must activate it before login.",
        },
      });
    } catch (error) {
      setErrorMessage(
        error.message || "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (event) => setRole(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const goToLogin = () => navigate("/login");

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}
        <p className="auth-tag">MediConnect</p>
        <h2>Create Account</h2>
        <p>Create an account to access personalized healthcare services.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            <span>Role</span>
            <select value={role} onChange={handleRoleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </label>

          <label>
            <span>Name</span>
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="Your name"
            />
          </label>

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
              placeholder="Create a password"
            />
          </label>

          {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

          <div className="register-actions">
            <button
              className="auth-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
            <button
              className="auth-secondary"
              type="button"
              onClick={goToLogin}
            >
              Back to login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
