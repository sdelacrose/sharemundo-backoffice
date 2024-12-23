import CompanyProfile from "@/app/container/ManageCustomers/CompanyProfile";
import React from "react";
import { apiCall } from "@/app/utils/APIUtils";

interface CompanyProfilePageProps {
  params: { id: string };
}

const page = async ({ params }: CompanyProfilePageProps) => {
  const { id } = params;

  try {
    // Make the API call to fetch customer details
    const customerDetail = await apiCall(`/admin-dashboard/customers/${id}`);

    // Pass the data as a prop to CompanyProfile
    return <CompanyProfile customerDetail={customerDetail} />;
  } catch (error) {
    console.error("Failed to fetch customer details:", error);

    // Handle error state
    return <div>Error fetching customer details.</div>;
  }
};

export default page;
