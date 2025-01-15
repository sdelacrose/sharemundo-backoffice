"use client";

import { Box, Divider, Tooltip, Typography } from "@mui/material";
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
import { useSearchParams } from "next/navigation";
const CompanyProfile = ({ customerDetail, id }: any) => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);

  const [isLicenseDetailOpen, setLicenseDetailOpen] = useState(false);
  const companyProfile = customerDetail?.company_profile;
  const [nextPageUrl] = useState<string | null>(null);
  const [previousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(0);
  const [rowData, setRowData] = useState([]);

  const isFreelancer = customerDetail?.user_type === "freelancer";
  const isCompany = customerDetail?.user_type === "company";
  const isInternalUser = customerDetail?.user_type === "internal_user";
  const searchParams = useSearchParams();

  const hideTabs = searchParams.get("hideTabs") === "1";
  // useEffect(() => {
  //   // if (customerDetail && !isInternalUser) {
  //   // fetchLicenses(`/admin-dashboard/customers/${id}/licenses`);
  //   fetchLicenses(`/admin-dashboard/licenses/${id}`);
  //   // }
  // }, [id, customerDetail, isInternalUser]);

  const columnDefs = useMemo(
    () => [
      { field: "product_name", headerName: "Product Name", flex: 1.5 },
      { field: "total_licenses", headerName: "Total License", width: 150 },
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
      {
        field: "renewal_dates",
        headerName: "Renewal Dates",
        width: 150,
        cellRenderer: ({ value }: any) => (
          <Tooltip
            title={
              <Box>
                {value.map((date: string, index: number) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{ color: "#f0f2f5" }}
                  >
                    {date}
                  </Typography>
                ))}
              </Box>
            }
            arrow
          >
            <span style={{ cursor: "pointer" }}>Multiple Dates</span>
          </Tooltip>
        ),
      },

      {
        field: "actions",
        headerName: "Actions",
        width: 120,
        cellRenderer: () => (
          <span
            style={{ color: "#0057B7", cursor: "pointer" }}
            onClick={() => handleViewDetails()}
          >
            View
          </span>
        ),
      },
    ],
    []
  );

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const handleViewDetails = () => {
    setLicenseDetailOpen(true);
  };
  const fetchLicenses = async (url: string) => {
    try {
      const licenseDetail = await apiCall(url);

      const licenses = licenseDetail.map((license: any) => ({
        product_name: license.product_name,
        product_id: license.product_id,
        total_licenses: license.total_licenses,
        available_licenses: license.available_licenses,
        assigned_licenses: license.total_licenses - license.available_licenses,
        renewal_dates: license.licenses.map((licenseItem: any) =>
          new Date(licenseItem.renewal_date).toLocaleDateString()
        ),
      }));

      setRowData(licenses);
    } catch (error) {
      console.error("Failed to fetch licenses:", error);
    }
  };

  useEffect(() => {}, [rowData]);

  useEffect(() => {
    fetchLicenses(`/admin-dashboard/licenses/${id}`);
  }, [id]);

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

  const tabs = useMemo(() => {
    if (isInternalUser) {
      return [{ label: "Profile" }];
    }
    return [
      { label: "Profile" },
      { label: isFreelancer ? "Connection" : "User" },
      { label: "Billing" },
      { label: "Licenses" },
    ];
  }, [isInternalUser, isFreelancer]);

  const renderTabContent = () => {
    const totalLicenses = rowData.reduce(
      (sum, license: any) => sum + (license.total_licenses || 0),
      0
    );
    if (isInternalUser) {
      return <ProfileTab profileData={customerDetail} />;
    }

    switch (activeTab) {
      case 0:
        return (
          <ProfileTab
            profileData={customerDetail}
            licenses={totalLicenses || undefined}
          />
        );
      case 1:
        return isFreelancer ? (
          <ConnectionTab id={id} setActiveTab={handleTabChange} />
        ) : (
          <UserConnectionTab
            id={id}
            setActiveTab={handleTabChange}
            companyId={companyProfile?.id}
          />
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

  if (!customerDetail) {
    return <div>Loading customer details...</div>;
  }

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

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
            {customerDetail?.user_type === "company"
              ? `${companyProfile?.company_name || "N/A"}`
              : `${customerDetail?.first_name || " "} ${
                  customerDetail?.last_name || "N/A"
                }`}
          </Typography>

          <Typography
            variant="body2"
            color="#0057b7"
            mt={1}
            fontSize={16}
            sx={{ marginBottom: isInternalUser || hideTabs ? "24px" : "0px" }}
          >
            {isFreelancer && "Freelancer"}
            {isCompany && (hideTabs ? "Company Owner" : "Company")}

            {isInternalUser && "Internal User"}
          </Typography>

          {!isInternalUser && !hideTabs && (
            <Divider
              sx={{
                borderColor: "rgba(240, 242, 245, 1)",
                marginTop: "24px",
                marginBottom: "27px",
              }}
            />
          )}

          {!isInternalUser && !hideTabs && (
            <Box mb={4}>
              <CustomTabs
                tabs={tabs}
                onTabChange={handleTabChange}
                value={activeTab}
              />
            </Box>
          )}
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
