"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { homeBreadcrumb } from "./data";
import useColumnSolutions from "@/app/hooks/Grid-Table/useColumnSolutions";
import { solutionColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import Activity, { ActivityLog } from "./Activity";
import Header from "@/app/components/common/Header";
import { SidebarContext } from "@/app/(pages)/layout";
import PieChartComponent from "@/app/components/common/Piechart";
import { apiCall } from "@/app/utils/APIUtils";
import CustomersStatsContainer from "./CustomersStatsContainer";
import UsersStatsContainer from "./UsersStatsContainer";
import BillingStatsContainer from "./BillingStatsContainer";
import Loader from "@/app/components/common/Loader";
import TrendsChartTabs from "./Trends";
import { useInView } from "react-intersection-observer";


const Dashboard = () => {
  const context = useContext(SidebarContext);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const PAGE_SIZE = 10;

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const solutionCol = useColumnSolutions(solutionColumnDefs);

  const fetchActivities = async () => {
    if (loading || (totalPages && page > totalPages)) return;

    setLoading(true);
    try {
      const res = await apiCall(
        `admin-api/admin-dashboard/activity-logs/?page=${page}&page_size=${PAGE_SIZE}`
      );
      setActivityLogs((prev) => [...prev, ...res.results]);
      setTotalCount(res.count);
    } catch (e) {
      console.error("Error fetching activity logs:", e);
    } finally {
      setLoadingActivities(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiCall("/admin-dashboard/", "GET");
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        // setError("Failed to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const { ref, inView } = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView && !loadingActivities && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [inView]);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  const userStats = dashboardData?.user_stats;
  const billingStats = dashboardData?.revenue_stats;

  const solutionRowData = dashboardData?.license_stats || [];

  return (
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
        <Header breadcrumbItems={homeBreadcrumb} />
      </Box>

      <Box sx={{ margin: "24px 24px 24px 0" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h2">Hello, Admin!</Typography>
        </Box>
        <Typography variant="body2" color="#475367" mt={1.5}>
          sharemundo Back Office
        </Typography>
        <Divider
          sx={{
            borderColor: "rgba(240, 242, 245, 1)",
            marginTop: "24px",
            marginBottom: "24px",
          }}
        />
        <Box mb={3}>
          <CustomersStatsContainer heading="Customers" stats={userStats} />
        </Box>
        <Box mb={3}>
          <UsersStatsContainer heading="Users" stats={userStats} />
        </Box>

        <Box mb={3}>
          <BillingStatsContainer heading="Billings" stats={billingStats} />
        </Box>
        <Stack spacing={3}>
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box
              sx={{
                flex: 1,
                borderRadius: "12px",
                background: "#fff",
                border: "1px solid #E4E7EC",
                width: "50%",
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
                  fontSize: "18px",
                }}
              >
                Solutions
              </Typography>
              <AgGridTable rowData={solutionRowData} columnDefs={solutionCol} />
            </Box>

            <Box
              sx={{
                flex: 1,
                borderRadius: "12px",
                background: "#fff",
                border: "1px solid #E4E7EC",
              }}
            >
              <Activity
                activityData={activityLogs}
                ref={ref}
                isLoading={loadingActivities}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 3 }}>
            <Box
              sx={{
                flex: 1,
                borderRadius: "12px",
                background: "#fff",
                border: "1px solid #E4E7EC",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  padding: "12px 24px",
                  color: "#101928",
                  fontSize: "18px",
                }}
              >
                Solutions Distribution
              </Typography>
              <Divider
                sx={{
                  borderColor: "rgba(240, 242, 245, 1)",
                  marginBottom: "24px",
                }}
              />
              <PieChartComponent licenseData={dashboardData?.license_stats} />
            </Box>

            <Box
              sx={{
                flex: 1,
                borderRadius: "12px",
                background: "#fff",
                border: "1px solid #E4E7EC",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  padding: "12px 24px",
                  color: "#101928",
                  fontSize: "18px",
                }}
              >
                Trends
              </Typography>
              <Divider
                sx={{
                  borderColor: "rgba(240, 242, 245, 1)",
                }}
              />
              <TrendsChartTabs data={dashboardData?.growth_stats} />
            </Box>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
