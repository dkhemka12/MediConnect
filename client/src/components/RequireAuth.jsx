import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

// Protected route wrapper: checks authentication status and redirects to login if user is not authenticated
const RequireAuth = ({ children }) => {
  // Capture current location to redirect back after login
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default RequireAuth;
