import React from "react";
import { useNavigate } from "react-router-dom";
import { clearAuthSession, isAuthenticated, getUserRole } from "../services/auth";
import "./Navbar.css";

// Define user roles
const role = getUserRole();

// Define dashboard routes based on user roles
const DASHBOARD_ROUTES = {
  patient: "/patient/dashboard",
  doctor: "/doctor/dashboard",
  admin: "/admin/dashboard",
};

const dashboardPath = DASHBOARD_ROUTES[role] || "/";

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo / Brand name and Clicking it navigates to home page */}
        <h2 className="logo" onClick={() => navigate("/")}>
          MediConnect
        </h2>

        <div className="nav-links">
  {/* Dynamic Home → Dashboard */}
    <span
    onClick={() =>
      navigate(
        loggedIn
          ? dashboardPath
          : "/"
      )
    }
    >
    {loggedIn ? "Dashboard" : "Home"}
  </span>

  <span onClick={() => navigate("/patient/doctors")}>Doctors</span>
  <span onClick={() => navigate("/patient/about")}>About</span>
</div>
        {/* Action buttons section */}
        <div className="nav-actions">
          {loggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login   {/* Navigate to login page */}
              </button>

              {/* Navigate to Registration page */}
              <button className="primary-btn" onClick={() => navigate("/register")}>
                Get Started    {/* Navigate to registration page */}
              </button>
            </>
          )}
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