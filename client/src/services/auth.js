const TOKEN_KEY = "token";
const ROLE_KEY = "role";
const NAME_KEY = "name";

export const getAuthToken = () => localStorage.getItem(TOKEN_KEY);

export const getUserRole = () => localStorage.getItem(ROLE_KEY);

export const getUserName = () => localStorage.getItem(NAME_KEY);

export const isAuthenticated = () => Boolean(getAuthToken());

// The setAuthSession function is responsible for storing the authentication token and user role in localStorage after a successful login or registration. 
export const setAuthSession = ({ token, role }) => {
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

 //The clearAuthSession function is used to remove the token and role from localStorage when the user logs out, effectively ending the authenticated session.
export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
};
