// import { getAuthToken } from "./GetAuthToken";
import toast from "react-hot-toast";
interface ApiCallOptions {
  successMessage?: string;
  errorMessage?: string;
}

export const apiCall = async (
  endpoint: string,
  method: string = "GET",
  data: any = null,
  token: string | null = null,
  { successMessage, errorMessage }: ApiCallOptions = {}
) => {
  try {
    // let authToken = await getAuthToken();
    let authToken =
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im55WFRJbGxyWVRuTlRSZHgtOUg1WiJ9.eyJpc3MiOiJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NjZiYWRlNzJiNDU4MmY5N2NkNzBjZCIsImF1ZCI6WyJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTM3NDY4MywiZXhwIjoxNzM1NDYxMDgzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiak9NYWxZRUhiUHg0RjlIR0lLOFdTcXVIV1FNU0lwbmkifQ.LSBpUEMENgmiEYB8LRALJNLbAqMSJrA-Zg4k8XwEeS7CT7B8tGPwGfa7wg5WbHGoKKqabOnwZwEwZFoio3vXP005iJdkup-1jkI1XdzwpkdSG3HeUx7uNzv6oH2Pw39RoYerlaK62a6zYnWiHrFqbp6DzQjq_jpc85SaQQKT_AMJhxVnspX_57rKHCGgsu0Oi--XXg7DkOc1mHhNla4OI2ZRzaKMRykevSDEvVX8b4OuYluaGHLzzAa63LMRsDbriR67WXvGUlLIcAOEEQJDhQZ8W8Wvwyt9qydca1lP8D_MVQdgvDLKhoZudmktw8zS3O_GyHMixU8EKVgqrM0dvw";
    if (token) {
      authToken = token;
    }
    const headers = {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${authToken}` }),
    };

    const options = {
      method,
      headers,
      ...(data && { body: JSON.stringify(data) }),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}${endpoint}`,
      options
    );

    if (
      response.status === 401 &&
      !endpoint.includes("fetch-details?sharemundo_links_id")
    ) {
      window.location.href = "/api/auth/logout";
    }

    if (response.status === 204) {
      return { ok: true };
    }

    if (!response.ok) {
      const errorMsg = await response.text();
      toast.error(errorMessage || errorMsg || "API call failed");
      throw new Error(errorMsg || errorMessage || "API call failed");
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
    console.error("API call error:", error);
    throw error;
  }
};
