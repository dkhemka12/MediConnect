import { requestJson } from "./api";

export const fetchDoctors = async () => {
  const response = await requestJson("/users/doctors", { method: "GET" });
  return response?.data || [];
};

export const fetchPatients = async () => {
  const response = await requestJson("/users/patients", { method: "GET" });
  return response?.data || [];
};

export const fetchUsers = async () => {
  const response = await requestJson("/users", { method: "GET" });
  return response?.data || [];
};
