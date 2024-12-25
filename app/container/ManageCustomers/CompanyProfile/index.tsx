"use client";

import { Box, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Header from "@/app/components/common/Header";
import { SidebarContext } from "@/app/(pages)/layout";
import { solutionsBreadcrumb } from "./solutionData";
import CustomTabs from "@/app/components/common/CustomTab";
import BillingTab from "./billingTab";
import UserConnectionTab from "./userConnectionTab";
import LicenseTab from "./licenseTab";
import ProfileTab from "./ProfileTab";
import LicenseDetail from "../../LicenseDetail";
import { apiCall } from "@/app/utils/APIUtils";
import ConnectionTab from "./connectionTab";

const CompanyProfile = ({ customerDetail, id }: any) => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedLicenseId, setSelectedLicenseId] = useState<string | null>(
    null
  );
  const [isLicenseDetailOpen, setLicenseDetailOpen] = useState(false);

  if (!customerDetail) {
    return <div>Loading customer details...</div>;
  }

  const companyProfile = customerDetail.company_profile;

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowData, setRowData] = useState([]);

  const columnDefs = useMemo(
    () => [
      { field: "product_name", headerName: "Product Name", width: 200 },
      { field: "total_license", headerName: "Total License", width: 150 },
      {
        field: "available_licenses",
        headerName: "Available Licenses",
        width: 150,
      },
      {
        field: "assigned_licenses",
        headerName: "Assigned Licenses",
        width: 150,
      },
      { field: "renewal_date", headerName: "Renewal Date", width: 150 },
      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        cellRenderer: ({ data }: any) => (
          <span
            style={{ color: "#0057B7", cursor: "pointer" }}
            onClick={() => handleViewDetails(data)}
          >
            View Details
          </span>
        ),
      },
    ],
    []
  );

  const handleViewDetails = (data: any) => {
    setSelectedLicenseId(data.product_id);
    setLicenseDetailOpen(true);
  };

  const fetchLicenses = async (url: string) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const licenseDetail = await apiCall(trimmedUrl);

      const licenses = licenseDetail.results.licenses.map((license: any) => ({
        product_name: license.product.name,
        product_id: license.product.id, // Include product_id for details API
        total_license: license.product.license_count,
        available_licenses: license.product.license_count,
        assigned_licenses: license.is_active ? 1 : 0,
        renewal_date: new Date(license.package.expires_at).toLocaleDateString(),
      }));

      setRowData(licenses);
      setNextPageUrl(licenseDetail.next || null);
      setPreviousPageUrl(licenseDetail.previous || null);
      setTotalPages(Math.ceil(licenseDetail.count / 10));
    } catch (error) {
      console.error("Failed to fetch licenses:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchLicenses(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchLicenses(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    fetchLicenses(`/admin-dashboard/customers/${id}/licenses`);
  }, [id]);

  const isFreelancer = customerDetail?.user_type === "freelancer";

  const tabs = [
    { label: "Profile" },
    { label: isFreelancer ? "Connection" : "User" },
    { label: "Billing" },
    { label: "Licenses" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab profileData={customerDetail} />;
      case 1:
        return isFreelancer ? (
          <ConnectionTab id={id} setActiveTab={handleTabChange} />
        ) : (
          <UserConnectionTab id={id} />
        );
      case 2:
        return <BillingTab id={id} />;
      case 3:
        return (
          <LicenseTab
            rowData={rowData}
            columnDefs={columnDefs}
            currentPage={currentPage}
            totalPages={totalPages}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        );
      default:
        return <div>Invalid Tab</div>;
    }
  };
  return (
    <>
      <Box
        sx={{
          flex: 1,
          marginLeft: context.isSidebarCollapsed ? "92px" : "280px",
          minHeight: "100vh",
          paddingLeft: "12px",
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ marginLeft: "-24px" }}>
          <Header breadcrumbItems={solutionsBreadcrumb} />
        </Box>
        <Box sx={{ margin: "24px 24px 24px 0" }}>
          <Typography variant="h2" paddingBottom={"8px"}>
            {customerDetail?.user_type === "company_user"
              ? `${
                  companyProfile?.company_name || "Company Name Not Available"
                }, ${companyProfile?.company_town || "Town Not Available"}, ${
                  companyProfile?.company_country || "Country Not Available"
                }`
              : `${customerDetail?.first_name || "First Name Not Available"} ${
                  customerDetail?.last_name || "Last Name Not Available"
                }`}
          </Typography>

          <Typography variant="body2" color="#0057b7" mt={1} fontSize={16}>
            {isFreelancer ? "Freelancer" : "Company"}
          </Typography>

          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />

          <Box mb={4}>
            <CustomTabs tabs={tabs} onTabChange={handleTabChange} value={activeTab}/>
          </Box>
          {renderTabContent()}
        </Box>
      </Box>

      <LicenseDetail
        open={isLicenseDetailOpen}
        handleClose={() => setLicenseDetailOpen(false)}
        licenseId={id}
      />
    </>
  );
};

export default CompanyProfile;
