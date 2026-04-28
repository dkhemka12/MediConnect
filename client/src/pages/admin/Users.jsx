import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUsers, setUserActivation } from "../../services/userService";
import "./Users.css";

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        setErrorMessage(error.message || "Could not load users.");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, []);

  const userList = useMemo(
    () => users.map((user) => ({
      id: user._id,
      name: user.name,
      role: user.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : "User",
      email: user.email,
      status: user.isActive ? "Active" : "Inactive",
      isActive: Boolean(user.isActive),
    })),
    [users],
  );

  const handleBackToDashboard = () => navigate("/admin/dashboard");

  const handleToggleActivation = async (user) => {
    try {
      setActionMessage("");
      setUpdatingUserId(user.id);
      const updatedUser = await setUserActivation(user.id, !user.isActive);

      setUsers((current) =>
        current.map((item) =>
          item._id === user.id ? { ...item, isActive: updatedUser.isActive } : item,
        ),
      );
      setActionMessage(
        `${user.name} is now ${updatedUser.isActive ? "active" : "inactive"}.`,
      );
    } catch (error) {
      setActionMessage(error.message || "Could not update the user.");
    } finally {
      setUpdatingUserId("");
    }
  };

  return (
    <div className="admin-users-page">
      {/* Header */}
      <div className="admin-users-header">

        {/* Title and description */}
        <div>
          <p className="admin-tag">Admin Users</p>
          <h2>Users</h2>
          <p>Manage the people using the platform.</p>
        </div>

        {/* Back button */}
        <button type="button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      <div className="admin-users-list">
        {isLoading ? <p>Loading users...</p> : null}
        {errorMessage ? <p>{errorMessage}</p> : null}
        {actionMessage ? <p>{actionMessage}</p> : null}

        {userList.map((user) => (
          <div key={user.id} className="admin-user-card">
            <div>
              <h3>{user.name}</h3>
              <p>{user.role}</p>
            </div>
            <div>
              <span>{user.email}</span>
              <strong>{user.status}</strong>
              <button
                type="button"
                onClick={() => handleToggleActivation(user)}
                disabled={updatingUserId === user.id}
              >
                {updatingUserId === user.id
                  ? "Updating..."
                  : user.isActive
                    ? "Deactivate"
                    : "Activate"}
              </button>
            </div>
          </div>
        ))}

        {!isLoading && !errorMessage && userList.length === 0 ? <p>No users found.</p> : null}
      </div>
    </div>
  );
};

export default Users;
