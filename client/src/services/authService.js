import { requestJson } from "./api";

export const loginUser = async ({ email, password }) => {
  return requestJson("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = async ({ name, email, password, role }) => {
  return requestJson("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role }),
  });
};
