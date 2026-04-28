import { requestJson } from "./api";

export const fetchDoctors = async () => {
  const response = await requestJson("/users/doctors", { method: "GET" });
  return response?.data || [];
};

export const fetchUsers = async () => {
  const response = await requestJson("/users", { method: "GET" });
  return response?.data || [];
};

export const setUserActivation = async (userId, isActive) => {
  const response = await requestJson(`/users/${userId}/activation`, {
    method: "PUT",
    body: JSON.stringify({ isActive }),
  });

  return response?.data || null;
};
