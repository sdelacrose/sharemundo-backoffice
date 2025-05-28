"use client";

import React, { useEffect, useState } from "react";
import CompanyProfile from "@/app/container/ManageCustomers/CompanyProfile";
import { apiCall } from "@/app/utils/APIUtils";
import Loader from "@/app/components/common/Loader";

const Page = ({ params }: any) => {
  const { id } = params;
  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await apiCall(`/admin-dashboard/customers/${id}`);
        setUserDetail(response);
        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        setError("Error fetching user details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetail();
  }, [id]);

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <CompanyProfile customerDetail={userDetail} id={id} />;
};

export default Page;

