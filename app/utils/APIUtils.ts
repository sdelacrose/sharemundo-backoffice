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
    // let authToken = await getAuthToken();
    let authToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im55WFRJbGxyWVRuTlRSZHgtOUg1WiJ9.eyJpc3MiOiJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NjZiYWRlNzJiNDU4MmY5N2NkNzBjZCIsImF1ZCI6WyJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNDk5NjIyNiwiZXhwIjoxNzM1MDgyNjI2LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiak9NYWxZRUhiUHg0RjlIR0lLOFdTcXVIV1FNU0lwbmkifQ.xjhnmqn0mDmMGTiG6SV7FhkJB0QTojytZE3Od2lokespDGBHKJIhrWeLv47G2fZF03NLrRZ3v1QHCOY3taqfvDKonwkjnP9a4LeGl0JnBWdNHtmeY0uXXb5-XFeax8JUpB5FsWrCfv_3Y-MlC0K9bT3WX4VXUvxy281dSu9ZTX8SU_XtWfeHr-uOgQxDuUYFNJLrAn-rYHbJ5n-M9WfNvsZEFPWyoQjgTa2AgG9eEbWKLAY7LRIj7T6_wKxKi6mCs27fbDMq8HW5zYvIttTgBWBY_MNa8-9gwP3gjhq9UA68Qcz7OxJYoMsORQx3sQuNgGRe_Oi-aA31TvBYAPgnCA'
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
