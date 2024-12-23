"use client";
import { Box, Divider, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import Header from "@/app/components/common/Header";
import { SidebarContext } from "@/app/(pages)/layout";
import { solutionsBreadcrumb, tabs } from "./solutionData";
import CustomTabs from "@/app/components/common/CustomTab";
import BillingTab from "./billingTab";
import UserConnectionTab from "./userConnectionTab";
import LicenseTab from "./licenseTab";
import ProfileTab from "./ProfileTab";

const CompanyProfile = ({ customerDetail }: { customerDetail: any }) => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);

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

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab profileData={customerDetail} />;
      case 1:
        return <UserConnectionTab />;
      case 2:
        return <BillingTab />;
      case 3:
        return <LicenseTab />;
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
            {companyProfile?.company_name || "Company Name Not Available"},{" "}
            {companyProfile?.company_town}, {companyProfile?.company_country}
          </Typography>

          <Typography variant="body2" color="#0057b7" mt={1} fontSize={16}>
            {customerDetail?.user_type === "company_user"
              ? "Company"
              : customerDetail?.user_type === "freelancer"
              ? "Freelancer"
              : "Role Not Available"}
          </Typography>

          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />

          <Box mb={4}>
            <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
          </Box>
          {renderTabContent()}
        </Box>
      </Box>
    </>
  );
};

export default CompanyProfile;
