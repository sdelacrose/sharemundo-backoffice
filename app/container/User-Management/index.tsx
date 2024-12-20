"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { Search } from "@/app/assets/icons";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { userManagementColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { userManagementRow } from "@/app/const/GridTable/RowData";
import { filterItems, userBreadcrumb } from "./userData";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnUserManagement from "@/app/hooks/Grid-Table/useColumnUserManagement";

const UserManagement = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const UserManagementCol = useColumnUserManagement(userManagementColumnDefs);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query);
  };
  const [, setSelectedFilter] = useState<string | null>(null);

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
              rowData={userManagementRow}
              columnDefs={UserManagementCol}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserManagement;
