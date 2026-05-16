const AUTH_TOKEN_KEY = 'portal_auth_token';

export const getAuthToken = () => sessionStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => {
  sessionStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  sessionStorage.removeItem(AUTH_TOKEN_KEY);
};

export const isAuthenticated = () => Boolean(getAuthToken());

export const getUser = () => {
  const token = getAuthToken();
  if (!token) return null;
  try {
    const json = decodeURIComponent(
      Array.from(atob(token))
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

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
