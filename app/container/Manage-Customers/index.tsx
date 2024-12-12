"use client";
import { Box, Divider, Typography } from "@mui/material";
import React, { createContext, useContext } from "react";
import useColumnSolutions from "@/app/hooks/Grid-Table/useColumnSolutions";
import { solutionColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { SolutionsRow } from "@/app/const/GridTable/RowData";
import Header from "@/app/components/common/Header";
import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";
import { customersBreadcrumb } from "./manageData";
import { SidebarContext } from "@/app/(pages)/layout";


const ManageCustomers = () => {
  const context = useContext(SidebarContext);

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
          <Header breadcrumbItems={customersBreadcrumb} />
        </Box>

        <Box sx={{ margin: "24px 24px 24px 0" }}>
         
            <Typography variant="h2" paddingBottom={"8px"}>Manage Customers</Typography>
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
        </Box>
      </Box>
    </>
  );
};

export default ManageCustomers;
