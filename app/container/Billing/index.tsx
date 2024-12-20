"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { billingBreadcrumb, tabs } from "./billingData";
import CustomButton from "@/app/components/common/CustomButton";
import { ExportExcel } from "@/app/assets/icons";
import CustomTabs from "@/app/components/common/CustomTab";
import BarChartComponent from "@/app/components/common/Barchart";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import {
  BillingCustomerColumnDefs,
  BillingPaymentColumnDefs,
} from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import {
  BillingCustomerRow,
  BillingPaymentRow,
} from "@/app/const/GridTable/RowData";
import useColumnBillingPayment from "@/app/hooks/Grid-Table/useColumnBillingPayment";
import useColumnBillingCustomers from "@/app/hooks/Grid-Table/usecolumnBillingCustomers";

const Billings = () => {
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  const BillingPaymentCol = useColumnBillingPayment(BillingPaymentColumnDefs);
  const BillingCustomerCol = useColumnBillingCustomers(
    BillingCustomerColumnDefs
  );
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const renderChart = () => {
    switch (activeTab) {
      case 0:
        return <SharpLineChart />;
      case 1:
        return <BarChartComponent />;
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
          <Box
            mb={3}
            borderRadius={"10px"}
            border={"1px solid #E4E7EC"}
            padding={2}
            bgcolor={"#fff"}
          >
            <Stack gap={3}>
              <Typography variant="h5" color="#475367">
                Revenue Overview
              </Typography>
              <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
              {renderChart()}
            </Stack>
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
              rowData={BillingPaymentRow}
              columnDefs={BillingPaymentCol}
            />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight={500} mt={3}>
              Top Customers
            </Typography>
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
              rowData={BillingCustomerRow}
              columnDefs={BillingCustomerCol}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Billings;
