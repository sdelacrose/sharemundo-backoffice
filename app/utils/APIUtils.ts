import { getAuthToken } from './GetAuthToken';
import toast from 'react-hot-toast';
interface ApiCallOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const apiCall = async (
  endpoint: string,
  method: string = 'GET',
  data: any = null,
  token: string | null = null,
  { successMessage, errorMessage }: ApiCallOptions = {},
) => {
  try {
    let authToken = await getAuthToken();
    if (token) {
      authToken = token;
    }
    const headers = {
      'Content-Type': 'application/json',
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };

    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
      options,
    );

    if (
      response.status === 401 &&
      !endpoint.includes('fetch-details?sharemundo_links_id')
    ) {
      window.location.href = '/api/auth/logout';
    }

    if (response.status === 204) {
      return { ok: true };
    }

    if (!response.ok) {
      const errorMsg = await response.text();
      toast.error(errorMessage || errorMsg || 'API call failed');
      throw new Error(errorMsg || errorMessage || 'API call failed');
    }

    if (successMessage) {
      toast.success(successMessage);
    }
    return response.json();
  } catch (error) {
    if (error instanceof Error && errorMessage) {
      toast.error(errorMessage || error.message);
    } else {
      // toast.error(errorMessage || 'An error occurred while making the API call.');
    }
    console.error('API call error:', error);
    throw error;
  }
};
