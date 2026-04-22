import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const RequireAuth = ({ children }) => {
    const location = useLocation();

    if (!isAuthenticated()) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return children;
};

export default RequireAuth;
