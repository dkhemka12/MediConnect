import { getAuthToken } from "./auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const buildHeaders = (customHeaders = {}) => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...customHeaders,
  };
};

export const requestJson = async (path, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: buildHeaders(options.headers),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
};
