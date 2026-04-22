const TOKEN_KEY = "token";
const ROLE_KEY = "role";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserRole = () => localStorage.getItem(ROLE_KEY);

export const isAuthenticated = () => Boolean(getAuthToken());

export const setAuthSession = ({ token, role }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};
