"use client";

import { Box, Divider, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Header from "@/app/components/common/Header";
import { SidebarContext } from "@/app/(pages)/layout";
import { solutionsBreadcrumb } from "../ManageCustomers/CompanyProfile/solutionData";
import CustomTabs from "@/app/components/common/CustomTab";
import ProfileTab from "../ManageCustomers/CompanyProfile/ProfileTab";
import Loader from "@/app/components/common/Loader";

const UserProfile = ({ userDetail}: any) => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  const companyProfile = userDetail.company_profile;

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = [
    { label: "Profile" },
  ];

  if (!userDetail) {
    return <Loader/>;
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
            {userDetail?.user_type === "company_user"
              ? `${
                  companyProfile?.company_name || "N/A"
                }`
              : `${userDetail?.first_name || " "} ${
                  userDetail?.last_name || "N/A"
                }`}
          </Typography>

          <Typography variant="body2" color="#0057b7" mt={1} fontSize={16}>
            Internal User
          </Typography>

          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />

          <Box mb={4}>
            <CustomTabs tabs={tabs} onTabChange={handleTabChange} value={activeTab} />
          </Box>
          <ProfileTab profileData={userDetail} />
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
