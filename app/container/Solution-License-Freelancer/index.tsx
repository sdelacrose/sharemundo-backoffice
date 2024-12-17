"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { solutionsBreadcrumb, tabs } from "./solutionData";
import CustomTabs from "@/app/components/common/CustomTab";
import ProfileTab from "./ProfileTab";
import BillingTab from "./billingTab";
import ConnectionTab from "./connectionTab";
import LicenseTab from "./licenseTab";

const SolutionLicenseFreeLancer = () => {
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
        return <ConnectionTab />;
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
            John Doe
          </Typography>
          <Typography variant="body2" color="#0057b7" mt={1} fontSize={16}>
            Freelancer
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

export default SolutionLicenseFreeLancer;
