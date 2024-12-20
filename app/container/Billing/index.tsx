"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { billingBreadcrumb, tabs } from "./billingData";
import CustomButton from "@/app/components/common/CustomButton";
import { ExportExcel } from "@/app/assets/icons";
import CustomTabs from "@/app/components/common/CustomTab";

const Billings = () => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
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
          <Header breadcrumbItems={billingBreadcrumb} />
        </Box>
        <Box sx={{ margin: "24px 24px 24px 0" }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h2" paddingBottom={"8px"}>
              Billing
            </Typography>
            <CustomButton variant="contained" endIcon={<ExportExcel />}>
              Export to excel
            </CustomButton>
          </Box>
          <Typography variant="body2" color="#475367" mt={1} fontSize={16}>
            Sharemundo Back Office
          </Typography>
          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />

          {/* <Box mb={4}>
            <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
          </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Billings;
