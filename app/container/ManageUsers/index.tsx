"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState, useCallback } from "react";
import { Search } from "@/app/assets/icons";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { userManagementColumnDefs } from "@/app/const/GridTable/ColDef";
import { filterItems, userBreadcrumb } from "./userData";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnUserManagement from "@/app/hooks/Grid-Table/useColumnUserManagement";
import { apiCall } from "@/app/utils/APIUtils";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
type ChartDataType = { name: string; value: number }[];
type UserType = {
  first_name: string;
  last_name: string;
  email: string;
  sharemundo_links_id: string;
  user_type: string;
  created_at: string;
  id: string;
};
const ManageUsers = () => {
  const context = useContext(SidebarContext);
  const [chartData, setChartData] = useState<ChartDataType | null>(null);
  const [userData, setUserData] = useState<UserType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [, setOriginalUserData] = useState<UserType[]>([]);
  const UserManagementCol = useColumnUserManagement(userManagementColumnDefs);

  const extractUsers = useCallback(
    (users: any[]) =>
      users.map((user: any) => {
        const firstName = user.first_name || "N/A";
        const lastName = user.last_name || "N/A";
        const email = user.email || "N/A";
        const sharemundoLinksId = user.sharemundo_links_id || "N/A";
        const userType = user.user_type
          ? user.user_type
              .replace(/_/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())
          : "N/A";
        const createdAt = user.created_at || "N/A";
        const id = user.id || "N/A";

        return {
          first_name: firstName,
          last_name: lastName,
          email,
          sharemundo_links_id: sharemundoLinksId,
          user_type: userType,
          created_at: createdAt,
          id,
        };
      }),
    []
  );

  const fetchUserData = useCallback(
    async (url: string) => {
      try {
        setLoading(true);
        const trimmedUrl = url.includes("/admin-dashboard")
          ? url.substring(url.indexOf("/admin-dashboard"))
          : url;

        const data = await apiCall(trimmedUrl, "GET");
        const users = Array.isArray(data.results) ? data.results : [];
        const extractedUsers = extractUsers(users);

        setOriginalUserData(extractedUsers);
        setUserData(extractedUsers);
        setNextPageUrl(data.next || null);
        setPreviousPageUrl(data.previous || null);
        setTotalPages(Math.ceil((data.count || 0) / 10));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    },
    [extractUsers]
  );

  useEffect(() => {
    fetchUserData("/admin-dashboard/users");
  }, [fetchUserData]);

  const handleNextPage = useCallback(() => {
    if (!loading && nextPageUrl) {
      setCurrentPage((prev) => prev + 1);
      fetchUserData(nextPageUrl);
    }
  }, [nextPageUrl, fetchUserData, loading]);

  const handlePreviousPage = useCallback(() => {
    if (!loading && previousPageUrl && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      fetchUserData(previousPageUrl);
    }
  }, [previousPageUrl, fetchUserData, currentPage, loading]);

  const handleSearchChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value.trim();
      if (!query) {
        fetchUserData("/admin-dashboard/users");
        return;
      }

      try {
        const data = await apiCall(
          `/admin-dashboard/users?search=${query}`,
          "GET"
        );
        const users = Array.isArray(data.results) ? data.results : [];
        const extractedUsers = extractUsers(users);

        setUserData(extractedUsers);
        setNextPageUrl(data.next || null);
        setPreviousPageUrl(data.previous || null);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      } catch (err) {
        console.error("Error searching users:", err);
      }
    },
    [fetchUserData, extractUsers]
  );

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const data = await apiCall("/admin-dashboard/users/stats", "GET");
        const transformedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          value: value as number,
        }));
        setChartData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data`, err);
        setLoading(false);
      }
    };

    fetchChartData();
  }, []);

  const handleSelect = useCallback(
    async (label: string | null) => {
      try {
        let apiUrl = "/admin-dashboard/users";

        if (label === "Freelancer") {
          apiUrl += "?user_type=freelancer";
        } else if (label === "Company") {
          apiUrl += "?user_type=company";
        } else if (label === "Internal User") {
          apiUrl += "?user_type=internal_user";
        }

        const data = await apiCall(apiUrl, "GET");
        const users = Array.isArray(data.results) ? data.results : [];
        const extractedUsers = extractUsers(users);

        setUserData(extractedUsers);
        setNextPageUrl(data.next || null);
        setPreviousPageUrl(data.previous || null);
        setTotalPages(Math.ceil((data.count || 0) / 10));
      } catch (err) {
        console.error("Failed to fetch filtered users:", err);
      }
    },
    [extractUsers]
  );

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const customTooltipUsersFormatter = (value: any) => [`Users: ${value}`];

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
            Manage Users
          </Typography>
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
            <Stack gap={2}>
              <Typography variant="h5" color="#475367">
                Number of Users per Month{" "}
              </Typography>
              <SharpLineChart
                data={chartData}
                tooltipFormatter={customTooltipUsersFormatter}
              />
            </Stack>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"flex-end"}
            mt={3}
            mb={3}
          >
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search here..."
              onChange={handleSearchChange}
              width={"340px"}
            />
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
              loading={loading}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManageUsers;
