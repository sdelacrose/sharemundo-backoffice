"use client";
import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { billingData, homeBreadcrumb, statsData } from "./data";
import StatsContainer from "./StatsContainer";
import useColumnSolutions from "@/app/hooks/Grid-Table/useColumnSolutions";
import { solutionColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { SolutionsRow } from "@/app/const/GridTable/RowData";
import Activity from "./Activity";

const Dashboard = () => {
  const handleDateSelect = () => {
    console.log("Date selector clicked!");
  };
  const solutionCol = useColumnSolutions(solutionColumnDefs);
  return (
    <>
      <Box margin={3}>
        {/* <Header breadcrumbItems={homeBreadcrumb} /> */}
        <Typography variant="h2">Hello, Admin!</Typography>
        <Typography variant="body2" color="#475367" mt={1.5}>
          Sharemundo Back Office
        </Typography>
        <Divider
          sx={{
            borderColor: "rgba(240, 242, 245, 1)",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />
        <Box mb={3}>
          <StatsContainer heading="User Stats" stats={statsData} />
        </Box>
        <Box mb={3}>
          <StatsContainer heading="Billings" stats={billingData} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Box
            sx={{
              width: "50%",
              borderRadius: "12px",
              background: "#fff",
              border: "1px solid #E4E7EC",
              "& .ag-root-wrapper.ag-layout-normal": {
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                outline: "none",
                border: "none",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                padding: "12px 24px",
                color: "#101928",
                fontSize: "20px",
              }}
            >
              Solutions
            </Typography>
            <AgGridTable rowData={SolutionsRow} columnDefs={solutionCol} />
          </Box>
          <Activity />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
