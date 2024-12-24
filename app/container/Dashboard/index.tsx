"use client";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import {
  filterItems,
  homeBreadcrumb,
} from "./data";
import StatsContainer from "./StatsContainer";
import useColumnSolutions from "@/app/hooks/Grid-Table/useColumnSolutions";
import { solutionColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import Activity from "./Activity";
import Header from "@/app/components/common/Header";
import { SidebarContext } from "@/app/(pages)/layout";
import PieChartComponent from "@/app/components/common/Piechart";
import Legend from "./legend";
import { apiCall } from "@/app/utils/APIUtils";
import CustomersStatsContainer from "./CustomersStatsContainer";
import UsersStatsContainer from "./UsersStatsContainer";
import BillingStatsContainer from "./BillingStatsContainer";


const Dashboard = () => {
  const context = useContext(SidebarContext);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const solutionCol = useColumnSolutions(solutionColumnDefs);
  const [, setSelectedFilter] = useState<string | null>(null);

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

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

 let userStats = dashboardData?.user_stats;
 let billingStats = dashboardData?.revenue_stats;

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
            <CustomersStatsContainer heading="Customers" stats={userStats} />
          </Box>
          <Box mb={3}>
            <UsersStatsContainer heading="Users" stats={userStats} />
          </Box>

          <Box mb={3}>
            <BillingStatsContainer heading="Billings" stats={billingStats} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", gap: "20px" }}>
            <Stack sx={{ width: "50%" }} gap={3}>
              <Box
                sx={{
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
                    fontSize: "18px",
                  }}
                >
                  Solutions
                </Typography>
                <AgGridTable rowData={solutionRowData} columnDefs={solutionCol} />
              </Box>
              <Box
                sx={{
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
                    fontSize: "18px",
                  }}
                >
                  Solutions & Licenses{" "}
                </Typography>
                <Divider
                  sx={{
                    borderColor: "rgba(240, 242, 245, 1)",
                    marginBottom: "24px",
                  }}
                />
                <Box ml={3}>
                  <Legend />
                </Box>
                <PieChartComponent
            totalUsers={dashboardData?.user_stats?.total_users || 0}
            totalCustomers={dashboardData?.user_stats?.total_customers || 0}
            licenseCount={dashboardData?.license_stats?.reduce(
              (acc: number, curr: any) => acc + curr.license_count,
              0
            ) || 0}
          />
              </Box>
            </Stack>
            <Activity />
          </Box>
        </Box>
      </Box>
  );
};

export default Dashboard;
