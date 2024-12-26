"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { billingBreadcrumb, tabs } from "./billingData";
import CustomTabs from "@/app/components/common/CustomTab";
import BarChartComponent from "@/app/components/common/Barchart";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import {
  BillingCustomerColumnDefs,
  BillingPaymentColumnDefs,
} from "@/app/const/GridTable/ColDef";

import useColumnBillingPayment from "@/app/hooks/Grid-Table/useColumnBillingPayment";
import useColumnBillingCustomers from "@/app/hooks/Grid-Table/usecolumnBillingCustomers";
import { apiCall } from "@/app/utils/APIUtils";
import { useRouter } from "next/navigation";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import Loader from "@/app/components/common/Loader";

const Billings = () => {
  const [billingData, setBillingData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  const [topUserData, setTopUserData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const router = useRouter();
  const endpoints = {
    0: "/admin-dashboard/invoices/failed-stats",
    1: "/admin-dashboard/invoices/revenue-stats",
  };
  const handleAction = (actionType: string, rowData: any) => {
    if (actionType === "download") {
      if (rowData.invoice_pdf) {
        const link = document.createElement("a");
        link.href = rowData.invoice_pdf;
        link.download = `Invoice_${rowData.invoice_id || "unknown"}.pdf`;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("No invoice PDF available for this record.");
      }
    } else if (actionType === "view") {
      if (rowData.id) {
        router.push(`/manage-customers/${rowData.id}`);
      } else {
        console.error("No ID available for navigation.");
      }
    }
  };

  const BillingPaymentCol = useColumnBillingPayment(
    BillingPaymentColumnDefs,
    handleAction
  );
  const BillingCustomerCol = useColumnBillingCustomers(
    BillingCustomerColumnDefs
  );

  const fetchBillingData = async (url: string) => {
    try {
      const data = await apiCall("/admin-dashboard/invoices/failed", "GET");
      const billingsData = data || [];

      const extractedData = billingsData.map((user: any) => {
        const invoice = user.invoices?.[0] || {};
        return {
          id: user.id,
          first_name: user.first_name || "N/A",
          sharemundo_links_id: user.sharemundo_links_id || "N/A",
          user_type: user.user_type || "N/A",
          status: invoice.status || "N/A",
          amount: invoice.amount_due || "0.00",
          invoice_date: invoice.invoice_date || "N/A",
          invoice_pdf: invoice.invoice_pdf || "N/A",
        };
      });
      setBillingData(extractedData);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
      setBillingData(extractedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching billing data:", err);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBillingData("/admin-dashboard/invoices/failed");
  }, []);
  useEffect(() => {
    const fetchTopUserDataData = async () => {
      try {
        setLoading(true);

        const data = await apiCall("/admin-dashboard/invoices/paid", "GET");

        const extractedData = data.map((user: any) => ({
          id: user.id || "N/a",
          first_name: user.first_name || "N/A",
          sharemundo_links_id: user.sharemundo_links_id || "N/A",
          user_type: user.user_type || "N/A",
          last_12_month_revenue: user.last_12_month_revenue || 0,
          next_12_month_revenue: user.next_12_month_revenue || 0,
          total_revenue: user.total_revenue || 0,
        }));
        setTopUserData(extractedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top user data:", err);
        setLoading(false);
      }
    };

    fetchTopUserDataData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiCall(
          "/admin-dashboard/invoices/revenue-stats",
          "GET"
        );
        // console.log("Chart data-------", data);
        const transformChartData = (data: any) => {
          return Object.entries(data).map(([month, value]) => ({
            name: month,
            value: value || 0,
          }));
        };
        const past12MonthsData = transformChartData(data.past_12_months);
        const next12MonthsData = transformChartData(data.next_12_months);

        setChartData({
          past12Months: past12MonthsData,
          next12Months: next12MonthsData,
        });
        console.log("Chart data-------", chartData.past12Months);
        console.log("Chart data-------", chartData.past12Months);

        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data :`, err);
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const renderChart = () => {
    if (!chartData) {
      return <div>Loadin....</div>;
    }
    switch (activeTab) {
      case 0:
        return <SharpLineChart data={chartData.next12Months} />;
      case 1:
        return <BarChartComponent data={chartData.past12Months} />;
      default:
        return <div>Chart here</div>;
    }
  };
  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
      fetchBillingData(nextPageUrl);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage((prev) => prev - 1);
      fetchBillingData(previousPageUrl);
    }
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
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
            <AgGridServerSideTable
              rowData={billingData}
              columnDefs={BillingPaymentCol}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              height={528}
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
            <AgGridServerSideTable
              rowData={topUserData}
              columnDefs={BillingCustomerCol}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Billings;
