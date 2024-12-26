import { getAuthToken } from "./GetAuthToken";
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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im55WFRJbGxyWVRuTlRSZHgtOUg1WiJ9.eyJpc3MiOiJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NjZiYWRlNzJiNDU4MmY5N2NkNzBjZCIsImF1ZCI6WyJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTE5OTAzNywiZXhwIjoxNzM1Mjg1NDM3LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiak9NYWxZRUhiUHg0RjlIR0lLOFdTcXVIV1FNU0lwbmkifQ.DhPOVxRlkBGkGOMkWPoB7w6gQVqBjCTnfiiyij8h6vZ-FGJiNiHFJTtPIjIwICEuoTH5JA4TXxJFehWW8vtfxjqca1TjljnPEdHgqBTgkA2juLMHpsDI2TehRQquur4W0oxwwDoRXgn8pxEs-Q3ZVCSG2Vd7UB4sYuo4clKcxQQTPdU3lP0a9Yz9iftn7MXz5-o5FaoP4I33U9BoFLkYz773YXsZg58aFTKVSLUlSkoOJVOxbPjcROVejE9tSOyxaeSXn-Lb5jbwyMW0__-OTmZAbK4eqWPxsiR5o3jU99HIgAeKkZeaQRHj6HqO_NjxtQAlXSQx4eRUTknn2RQx_A";
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
