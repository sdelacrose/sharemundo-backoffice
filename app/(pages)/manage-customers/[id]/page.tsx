import CompanyProfile from "@/app/container/ManageCustomers/CompanyProfile";
import React from "react";
import { apiCall } from "@/app/utils/APIUtils";

interface CompanyProfilePageProps {
  params: { id: string };
}

const page = async ({ params }: CompanyProfilePageProps) => {
  const { id } = params;

  try {
    const customerDetail = await apiCall(`/admin-dashboard/customers/${id}`);

    return <CompanyProfile customerDetail={customerDetail} id={id} />;
  } catch (error) {
    console.error("Failed to fetch customer or license details:", error);

    return <div>Error fetching customer or license details.</div>;
  }
};

export default page;
