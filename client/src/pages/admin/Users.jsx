import React from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const users = [
  { name: "Aisha Khan", role: "Patient", email: "aisha@email.com", status: "Active" },
  { name: "Dr. Rahul Mehta", role: "Doctor", email: "rahul@email.com", status: "Active" },
  { name: "Nora Ali", role: "Patient", email: "nora@email.com", status: "Pending" },
  { name: "Dr. Priya Sharma", role: "Doctor", email: "priya@email.com", status: "Active" },
];

const Users = () => {
  const navigate = useNavigate();
  const handleBackToDashboard = () => navigate("/admin/dashboard");

  return (
    <div className="admin-users-page">
      {/* Header */}
      <div className="admin-users-header">
        <div>
          <p className="admin-tag">Admin Users</p>
          <h2>Users</h2>
          <p>Manage the people using the platform.</p>
        </div>

        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      {/* Users List */}
      <div className="admin-users-list">
        {users.map((user) => (
          <div key={user.email} className="admin-user-card">
            <div>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
            </div>
            <div>
              <span>{user.email}</span>
              <strong>{user.status}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;