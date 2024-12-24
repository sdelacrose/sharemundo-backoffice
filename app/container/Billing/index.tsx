"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
import { apiCall } from "@/app/utils/APIUtils";

const Billings = () => {
  const [billingData, setBillingData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);

  const handleAction = (actionType: string, rowData: any) => {
    console.log("View action before:", rowData);

    if (actionType === "download" && rowData.invoice_pdf) {
      console.log("View action after:", rowData);

      const link = document.createElement("a");
      link.href = rowData.invoice_pdf;
      link.download = `${rowData.invoice_id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (actionType === "view") {
      console.log("View action for:", rowData);
    }
  };
  const handleDownloadPDFs = () => {
    if (!billingData || billingData.length === 0) {
      console.error("No billing data available to download.");
      return;
    }

    billingData.forEach((invoice: any) => {
      if (invoice.invoice_pdf) {
        const link = document.createElement("a");
        link.href = invoice.invoice_pdf;
        link.download = `${invoice.invoice_id}.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    });
  };
  const BillingPaymentCol = useColumnBillingPayment(
    BillingPaymentColumnDefs,
    handleAction
  );
  const BillingCustomerCol = useColumnBillingCustomers(
    BillingCustomerColumnDefs
  );

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await apiCall("/admin-dashboard/invoices/failed", "GET");
        const billingsData = data || []; 

        const extractedData = billingsData.map((user: any) => {
          const invoice = user.invoices?.[0] || {}; 
          return {
            first_name: user.first_name || "N/A",
            sharemundo_links_id: user.sharemundo_links_id || "N/A",
            user_type: user.user_type || "N/A",
            status: invoice.status || "N/A",
            amount: invoice.amount_due || "0.00",
            invoice_date: invoice.invoice_date || "N/A",
          };
        });
        console.log("Extracted Billing Data:", extractedData);
        setBillingData(extractedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching billing data:", err);
        setLoading(false);
      }
    };
    fetchBillingData();
  }, []);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const renderChart = () => {
    switch (activeTab) {
      case 0:
      // return <SharpLineChart />;
      case 1:
      // return <BarChartComponent />;
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
            <CustomButton
              variant="contained"
              endIcon={<ExportExcel />}
              onClick={handleDownloadPDFs}
            >
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
            <AgGridTable rowData={billingData} columnDefs={BillingPaymentCol} />
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
