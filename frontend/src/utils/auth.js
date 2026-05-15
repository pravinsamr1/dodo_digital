const AUTH_TOKEN_KEY = 'portal_auth_token';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const createAuthToken = ({ name, phone }) => {
  const payload = {
    name: name.trim(),
    phone: phone.replace(/\D/g, ''),
    issuedAt: Date.now(),
  };
  const json = JSON.stringify(payload);
  return btoa(
    encodeURIComponent(json).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(Number.parseInt(hex, 16))
    )
  );
};
