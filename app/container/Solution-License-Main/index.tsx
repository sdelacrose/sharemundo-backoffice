"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import CustomTabs from "@/app/components/common/CustomTab";
import { solutionsBreadcrumb, tabs } from "./data";
import BarChartComponent from "@/app/components/common/Barchart";
import SmoothLineChart from "@/app/components/common/SmoothLineChart";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Search } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import useColumnSolutionMain from "@/app/hooks/Grid-Table/useColumnSolutionMain";
import { SolutionMainColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { SolutionMainRow } from "@/app/const/GridTable/RowData";
import ResumeDrawer from "./resumeDrawer";
import EditDrawer from "./editDrawer";

const SolutionLicenseMain = () => {
  const [openStopDrawer, setStopDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setStopDrawer(true);
  };
  const handleCloseDrawer = () => {
    setStopDrawer(false);
  };
  const SolutionMainCol = useColumnSolutionMain(
    SolutionMainColumnDefs,
    handleOpenDrawer
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query)

  };
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

  const renderChart = () => {
    switch (activeTab) {
      case 0:
        return <BarChartComponent />;
      case 1:
        return <SmoothLineChart />;
      case 2:
        return <SharpLineChart />;
      default:
        return <div>chart here</div>;
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
            Solution and Licenses
          </Typography>
          <Typography variant="body2" color="#0057b7" mt={1} fontSize={16}>
            Sharemundo Back Office
          </Typography>
          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />
          <Box
            mb={3}
            borderRadius={"10px"}
            border={"1px solid #E4E7EC"}
            padding={2}
            bgcolor={"#fff"}
          >
            <Stack gap={2}>
              <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
              {renderChart()}
            </Stack>
          </Box>
          <Box
            mr={4}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            mb={2}
          >
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search Company..."
              onChange={handleSearchChange}
              height="36px"
            />{" "}
            <CustomButton variant="contained">Add Solution</CustomButton>
          </Box>
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid #E4E7EC",
              backgroundColor: "#FFF",
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
              marginTop: "24px",
            }}
          >
            <AgGridTable
              rowData={SolutionMainRow}
              columnDefs={SolutionMainCol}
            />
            <ResumeDrawer
              open={openStopDrawer}
              handleClose={handleCloseDrawer}
            />
             <EditDrawer
              open={openStopDrawer}
              handleClose={handleCloseDrawer}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SolutionLicenseMain;
