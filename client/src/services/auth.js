const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const NAME_KEY = "name";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserRole = () => localStorage.getItem(ROLE_KEY);

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const isAuthenticated = () => Boolean(getAuthToken());

export const setAuthSession = ({ token, role, name }) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }

  if (name) {
    localStorage.setItem(NAME_KEY, name);
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
};
