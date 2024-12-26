// "use client";

// import React, { useEffect, useState } from "react";
// import CompanyProfile from "@/app/container/ManageCustomers/CompanyProfile";
// import { apiCall } from "@/app/utils/APIUtils";
// import Loader from "@/app/components/common/Loader";

// interface CompanyProfilePageProps {
//   params: { id: string };
// }

// const Page: React.FC<CompanyProfilePageProps> = ({ params }) => {
//   const { id } = params;
//   const [customerDetail, setCustomerDetail] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchCustomerDetail = async () => {
//       try {
//         const response = await apiCall(`/admin-dashboard/customers/${id}`);
//         setCustomerDetail(response);
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Failed to fetch customer details:", err);
//         setError("Error fetching customer details.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCustomerDetail();
//   }, [id]);

//   if (isLoading) {
//     return (
//       <div>
//         <Loader />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return <CompanyProfile customerDetail={customerDetail} id={id} />;
// };

// export default Page;
"use client";

import React, { useEffect, useState } from "react";
import CompanyProfile from "@/app/container/ManageCustomers/CompanyProfile";
import { apiCall } from "@/app/utils/APIUtils";
import Loader from "@/app/components/common/Loader";

type PageProps = {
  params: { id: string };
};

const Page = async ({ params }: PageProps) => {
  const { id } = params;

  const [customerDetail, setCustomerDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCustomerDetail = async () => {
      try {
        const response = await apiCall(`/admin-dashboard/customers/${id}`);
        setCustomerDetail(response);
      } catch (err) {
        console.error("Failed to fetch customer details:", err);
        setError("Error fetching customer details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerDetail();
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

  return <CompanyProfile customerDetail={customerDetail} id={id} />;
};

export default Page;
