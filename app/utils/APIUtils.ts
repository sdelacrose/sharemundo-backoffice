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
      "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im55WFRJbGxyWVRuTlRSZHgtOUg1WiJ9.eyJpc3MiOiJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY3NjZiYWRlNzJiNDU4MmY5N2NkNzBjZCIsImF1ZCI6WyJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3NoYXJlbXVuZG8uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNTM3OTE4NiwiZXhwIjoxNzM1NDY1NTg2LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXpwIjoiak9NYWxZRUhiUHg0RjlIR0lLOFdTcXVIV1FNU0lwbmkifQ.gzkZZqQiCs12tr5O64HUDI7mbV13lheJCIjzg_kP4R40DHmcP887VFUMPs1BO2u2axWNiGEhWJdQVBlb6mFsVNb_p-ATeUievd3zt9UiuxEMkjDdA6gIACXWtlfdcMlL-3GNIAhdCoz77UaTMIO3OVvNWqsK6cjIb7QDuEbCP0XEBGNQNCVcD0uJtbAzE9thGfjJuDV1P7pDT6nXSxSQjvxFw4_1Z-HCmp_LCrE1AOFvPczhVeyxzSSsfAU731gRKUJrP4YhJ5ZKf4JLIrs8gLVDmWdTROxD5yn4PDgj5z0uXzLGfHXhHxstTrDvVhCmWaX_JtUAXLV4J6moE8HBhw";
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
