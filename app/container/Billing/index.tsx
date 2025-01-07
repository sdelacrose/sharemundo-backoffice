"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
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

  const [, setRevenueLoading] = useState<boolean>(false);
  const [failedData, setFailedData] = useState<any>(null);

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
  const fetchBillingData = async (url: string) => {
    try {
      const data = await apiCall(url, "GET");
      const billingsData = data?.results?.users || [];
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
    fetchBillingData("/admin-dashboard/invoices/failed");
  }, []);

  useEffect(() => {
    const fetchTopUserDataData = async () => {
      try {
        setLoading(true);

        const data = await apiCall("/admin-dashboard/invoices/paid", "GET");
        const topCustomersData = data?.results?.users || [];
        const extractedData = topCustomersData.map((user: any) => ({
          topId: user.id || "N/a",
          first_name: user.first_name || "N/A",
          sharemundo_links_id: user.sharemundo_links_id || "N/A",
          user_type: user.user_type || "N/A",
          last_12_month_revenue: user.last_12_month_revenue || 0,
          next_12_month_revenue: user.next_12_month_revenue || 0,
          total_revenue: user.total_revenue || 0,
        }));
        const filteredData = extractedData.filter(
          (user) => user.user_type?.toLowerCase() === "company"
        );

        console.log("Filtered Company Users:", filteredData);
        setTopUserData(filteredData);
        // setTopUserData(extractedData);
        console.log("top user data", extractedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching top user data:", err);
        setLoading(false);
      }
    };

    fetchTopUserDataData();
  }, []);

  useEffect(() => {
    const fetchRevenueStats = async () => {
      try {
        setRevenueLoading(true);
        const data = await apiCall(
          "/admin-dashboard/invoices/revenue-stats",
          "GET"
        );

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

        setRevenueLoading(false);
      } catch (err) {
        console.error("Error fetching revenue stats:", err);
        setRevenueLoading(false);
      }
    };

    fetchRevenueStats();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await apiCall(
        "/admin-dashboard/invoices/failed-stats",
        "GET"
      );
      const transformedData = Object.entries(data).map(([key, value]) => ({
        name: key,
        value: value as number,
      }));
      setFailedData(transformedData);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching data `, err);
      setLoading(false);
    }
  };

  const customTooltipFormatter = (value: any) => [`Revenue: €${value}`];
  const customTooltipPaymentIssueFormatter = (value: any) => [
    `Issue: ${value}`,
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const renderFailedStatsChart = () => {
    if (!failedData) return <Loader />;

    return (
      <BarChartComponent
        data={failedData}
        tooltipFormatter={customTooltipPaymentIssueFormatter}
      />
    );
  };

  const renderChart = () => {
    if (!chartData) {
      return <Loader />;
    }

    switch (activeTab) {
      case 0:
        return (
          <SharpLineChart
            data={chartData.past12Months}
            tooltipFormatter={customTooltipFormatter}
          />
        );
      case 1:
        return (
          <BarChartComponent
            data={chartData.next12Months}
            tooltipFormatter={customTooltipFormatter}
          />
        );
      default:
        return <div>No Chart Data Available</div>;
    }
  };

  const handleNextPage = useCallback(() => {
    if (!loading && nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
      fetchBillingData(nextPageUrl);
    }
  }, [nextPageUrl, fetchBillingData, loading]);

  const handlePreviousPage = useCallback(() => {
    if (!loading && previousPageUrl && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchBillingData(previousPageUrl);
    }
  }, [previousPageUrl, fetchBillingData, currentPage, loading]);

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };

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
        const data = await apiCall(`${apiUrl}?all=true`, "GET", null, null, {
          successMessage: "Exported File Successfully",
          errorMessage: "Error in export",
        });
        exportData =
          section === "paymentIssues" ? data : data.results?.users || [];
      }

      const headerMapping =
        section === "paymentIssues"
          ? {
              id: "User ID",
              email: "Email",
              first_name: "First Name",
              last_name: "Last Name",
              is_active: "Active Status",
              user_type: "User Type",
              company: "Company",
              preferred_language: "Preferred Language",
              invoice_id: "Invoice ID",
              invoice_no: "Invoice Number",
              amount_due: "Amount Due (€)",
              amount_paid: "Amount Paid (€)",
              amount_remaining: "Amount Remaining (€)",
              status: "Invoice Status",
              currency: "Currency",
              invoice_date: "Invoice Date",
              payment_method: "Payment Method",
              receipt_url: "Receipt URL",
              description: "Plan Description",
            }
          : {
              id: "User ID",
              first_name: "First Name",
              last_name: "Last Name",
              sharemundo_links_id: "Sharemundo Links ID",
              user_type: "User Type",
              last_12_month_revenue: "Last 12 Months Revenue (€)",
              next_12_month_revenue: "Next 12 Months Revenue (€)",
              total_revenue: "Total Revenue (€)",
            };

      const formattedData =
        section === "paymentIssues"
          ? exportData.flatMap((item) => {
              return item.invoices.map((invoice: any) => ({
                "User ID": item.id,
                Email: item.email,
                "First Name": item.first_name,
                "Last Name": item.last_name,
                "Active Status": item.is_active,
                "User Type": item.user_type,
                Company: item.company || "N/A",
                "Preferred Language": item.preferred_language,
                "Invoice ID": invoice.invoice_id,
                "Invoice Number": invoice.invoice_no,
                "Amount Due (€)": invoice.amount_due,
                "Amount Paid (€)": invoice.amount_paid,
                "Amount Remaining (€)": invoice.amount_remaining,
                "Invoice Status": invoice.status,
                Currency: invoice.currency,
                "Invoice Date": invoice.invoice_date,
                "Payment Method": invoice.payment_method,
                "Receipt URL": invoice.receipt_url,
                "Plan Description":
                  invoice.line_items.data[0]?.description || "N/A",
              }));
            })
          : exportData.map((item) =>
              Object.keys(headerMapping).reduce((acc, key) => {
                acc[headerMapping[key]] = item[key];
                return acc;
              }, {})
            );

      const worksheet = XLSX.utils.json_to_sheet(formattedData);

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        section === "paymentIssues" ? "Payment Issues" : "Top Customers"
      );

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
            sharemundo Back Office
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
            mb={3}
            borderRadius={"10px"}
            border={"1px solid #E4E7EC"}
            padding={2}
            bgcolor={"#fff"}
          >
            <Stack gap={3}>
              <Typography variant="h5" color="#475367">
                Payment Issues
              </Typography>

              {renderFailedStatsChart()}
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
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Billings;
