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

const SolutionLicenses = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <ProfileTab />;
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
            XYZ Solar Limited, Berlin,GR{" "}
          </Typography>
          <Typography variant="body2" color="#0057b7" mt={1.5} fontSize={16}>
            Company
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

export default SolutionLicenses;
