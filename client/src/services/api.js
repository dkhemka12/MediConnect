import { getAuthToken } from "./auth";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; 

const buildHeaders = (customHeaders = {}) => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json", // req body is in json format
    ...(token ? { Authorization: `Bearer ${token}` } : {}),// If a token exists, include the Authorization header with the Bearer token format. 
    ...customHeaders,// Merge any additional headers passed 
  };
};


export const requestJson = async (path, options = {}) => {// The requestJson function is a utility for making JSON API requests, handling the construction of headers and error handling.
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