"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Search } from "@/app/assets/icons";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { userManagementColumnDefs } from "@/app/const/GridTable/ColDef";
import { filterItems, userBreadcrumb } from "./userData";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnUserManagement from "@/app/hooks/Grid-Table/useColumnUserManagement";
import { apiCall } from "@/app/utils/APIUtils";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";

const UserManagement = () => {
  const context = useContext(SidebarContext);
  const [chartData, setChartData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [, setLoading] = useState<any>(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const UserManagementCol = useColumnUserManagement(userManagementColumnDefs);
  const [, setOriginalUserData] = useState<any>([]);

  const fetchUserData = async (url: string) => {
    try {
      setLoading(true);
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const data = await apiCall(trimmedUrl, "GET");
      const users = data?.results?.users || [];
      const extractedUsers = users.map(
        ({
          first_name,
          sharemundo_links_id,
          user_type,
          created_at,
          id,
        }: any) => ({
          first_name,
          sharemundo_links_id,
          user_type,
          created_at,
          id,
        })
      );
      setOriginalUserData(extractedUsers);
      setUserData(extractedUsers);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData("/admin-dashboard/users");
  }, []);

  const handleNextPage = () => {
    if (nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
      fetchUserData(nextPageUrl);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      setCurrentPage((prev) => prev - 1);
      fetchUserData(previousPageUrl);
    }
  };

  const handleSearchChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value;
    try {
      const data = await apiCall(
        `/admin-dashboard/users?search=${query}`,
        "GET"
      );

      setUserData(data?.results?.users);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
    } catch (err) {
      console.error("Error searching users:", err);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await apiCall("/admin-dashboard/users/stats", "GET");
        const transformedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          value: value as number,
        }));
        console.log("Chart data-------", transformedData);
        setChartData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data `, err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const handleSelect = async (label: string | null) => {
    try {
      let apiUrl = "/admin-dashboard/users";

      if (label === "Freelancer") {
        apiUrl += "?user_type=freelancer";
      } else if (label === "Company") {
        apiUrl += "?user_type=company";
      }
      const data = await apiCall(apiUrl, "GET");
      const users = data?.results?.users || [];
      setUserData(users);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
    } catch (err) {
      console.error("Failed to fetch filtered users:", err);
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
          <Header breadcrumbItems={userBreadcrumb} />
        </Box>
        <Box sx={{ margin: "24px 24px 24px 0" }}>
          <Typography variant="h2" paddingBottom={"8px"}>
            User Management
          </Typography>
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
            <Stack gap={2}>
              <Typography variant="h5" color="#475367">
                Number of Users per Month{" "}
              </Typography>
              <SharpLineChart data={chartData} />
            </Stack>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            mt={3}
            mb={3}
          >
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search here..."
              onChange={handleSearchChange}
              height="36px"
            />{" "}
            <CustomFilterSelect items={filterItems} onSelect={handleSelect} />
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
              rowData={userData}
              columnDefs={UserManagementCol}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              height={580}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserManagement;
