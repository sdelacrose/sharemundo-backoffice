"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Search } from "@/app/assets/icons";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { userManagementColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { userManagementRow } from "@/app/const/GridTable/RowData";
import { filterItems, userBreadcrumb } from "./userData";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnUserManagement from "@/app/hooks/Grid-Table/useColumnUserManagement";
import { apiCall } from "@/app/utils/APIUtils";

const UserManagement = () => {
  const context = useContext(SidebarContext);
  const [, setSelectedFilter] = useState<string | null>(null);
  const UserManagementCol = useColumnUserManagement(userManagementColumnDefs);

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiCall("/admin-dashboard/users", "GET");
        console.log("Fetched data:", data);

        const users = data?.results?.users || [];
        const extractedUsers = users.map(
          ({ username, sharemundo_links_id, user_type }) => ({
            username,
            sharemundo_links_id,
            user_type,
          })
        );

        console.log("Extracted Users:", extractedUsers);

        setUserData(extractedUsers);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query);
  };

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
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
              <SharpLineChart />
            </Stack>
          </Box>
          <Box
            mr={4}
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
              width="340px"
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
            <AgGridTable
              rowData={userData}
              columnDefs={UserManagementCol}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserManagement;
