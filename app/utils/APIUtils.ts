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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im55WFRJbGxyWVRuTlRSZHgtOUg1WiJ9.eyJpc3MiOiJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NjZiYWRlNzJiNDU4MmY5N2NkNzBjZCIsImF1ZCI6WyJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTI4NTI1MywiZXhwIjoxNzM1MzcxNjUzLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiak9NYWxZRUhiUHg0RjlIR0lLOFdTcXVIV1FNU0lwbmkifQ.wu9AewGqzbOVmSWBaokuvIzVoXwQtCpfqYzbfTSx6J2Cphu3VLehN5NUJgcq0ps5xMQrGnITi6VnfQ2mpLqaWD7NV39lldv7llXH47MDCuGAn-ZL0JIHOm-pRD8TT9lNU4Og_G2pwvBrRMlQSmy9p2645SCxbKT9lnYIgJOHugGtam5mdzHJz_BC8lXj9aPg0yt7ezRaG1fOp8IOknO3fxMT_1DvpjgOnHnBemG1EbW5kfISU3IZGF6CfDPBRLuuc0rWmY6ZJAEXNMy71q1bQ6_A3lRibOTILZQG3iFhtomGMGBTyv4NY1rpnrI3ZpwJWYbg1UK9asx1ZbKKqZF6kQ";
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
