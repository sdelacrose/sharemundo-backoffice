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
import * as XLSX from "xlsx";

import useColumnBillingPayment from "@/app/hooks/Grid-Table/useColumnBillingPayment";
import useColumnBillingCustomers from "@/app/hooks/Grid-Table/usecolumnBillingCustomers";
import { apiCall } from "@/app/utils/APIUtils";
import { useRouter } from "next/navigation";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import Loader from "@/app/components/common/Loader";
import CustomButton from "@/app/components/common/CustomButton";
import { ExportExcel } from "@/app/assets/icons";

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
  const [selectedRows, setSelectedRows] = useState([]);

  const router = useRouter();
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
  const handleRowSelection = (event) => {
    const selected = event.api.getSelectedRows();
    setSelectedRows(selected);
    console.log("Selected Rows: ", selected);
  };
  const fetchBillingData = async () => {
    try {
      const data = await apiCall("/admin-dashboard/invoices/failed", "GET");
      const billingsData = data?.results?.users || [];
      // console.log("billingsData",billingsData)

      const extractedData = billingsData.map((user: any) => {
        const invoice = user?.invoices?.[0] || {};
        return {
          id: user?.id,
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
    fetchBillingData();
  }, []);
  useEffect(() => {
    const fetchTopUserDataData = async () => {
      try {
        setLoading(true);

        const data = await apiCall("/admin-dashboard/invoices/paid", "GET");
        const topCustomersData = data?.results?.users || [];
        const extractedData = topCustomersData.map((user: any) => ({
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const renderChart = () => {
    if (!chartData) {
      return <div>Loading....</div>;
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
      fetchBillingData();
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage((prev) => prev - 1);
      fetchBillingData();
    }
  };
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  const handleExportToExcel = async (
    section: "paymentIssues" | "topCustomers"
  ) => {
    try {
      let exportData;
      let apiUrl = "";

      if (section === "paymentIssues") {
        apiUrl = "/admin-dashboard/invoices/failed";
      } else if (section === "topCustomers") {
        apiUrl = "/admin-dashboard/invoices/paid";
      }

      if (selectedRows.length > 0) {
        exportData = selectedRows;
      } else {
        const data = await apiCall(`${apiUrl}?all=true`, "GET");
        exportData = data || [];
      }

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");

      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${
        section === "paymentIssues" ? "PaymentIssues" : "TopCustomers"
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error exporting to Excel:", error);
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
              <CustomTabs
                tabs={tabs}
                onTabChange={handleTabChange}
                value={activeTab}
              />
              {renderChart()}
            </Stack>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5" fontWeight={500} mt={3}>
              Payment Issues
            </Typography>
            <CustomButton
              variant="contained"
              endIcon={<ExportExcel />}
              onClick={() => handleExportToExcel("paymentIssues")}
            >
              Export to Excel
            </CustomButton>
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
              height={580}
              rowSelection={true}
              handleRowSelection={handleRowSelection}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mt={3}
          >
            <Typography variant="h5" fontWeight={500}>
              Top Customers
            </Typography>
            <CustomButton
              variant="contained"
              endIcon={<ExportExcel />}
              onClick={() => handleExportToExcel("topCustomers")}
            >
              Export to Excel
            </CustomButton>
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
              height={580}
              rowSelection={true}
              handleRowSelection={handleRowSelection}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Billings;
