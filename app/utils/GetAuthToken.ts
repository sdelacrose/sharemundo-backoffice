import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

export const getAuthToken = () => {
  const authToken = getCookie('auth-token');
  const decodedToken = jwtDecode(authToken as string);
  if (
    !authToken ||
    !decodedToken?.exp ||
    decodedToken?.exp < Date.now() / 1000
  ) {
    window.location.href = '/unauthorized';
  }
  return authToken;
};
