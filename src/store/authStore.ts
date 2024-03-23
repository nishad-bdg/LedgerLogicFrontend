export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const saveAuthData = ({ accessToken, refreshToken }) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const clearStorage = () => {
  localStorage.clear();
};
