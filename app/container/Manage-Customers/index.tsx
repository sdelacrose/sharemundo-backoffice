"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import { manageCustomersColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import { manageCustomersRow } from "@/app/const/GridTable/RowData";
import Header from "@/app/components/common/Header";
import { customersBreadcrumb, filterItems } from "./manageData";
import { SidebarContext } from "@/app/(pages)/layout";
import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnManageUserDefs from "@/app/hooks/Grid-Table/useColumnManageUser";
import AddCustomerDrawer from "./addCustomerDrawer";
import BlockDrawer from "./addBlockDrawer";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { apiCall } from "@/app/utils/APIUtils";

const ManageCustomers = () => {
  const context = useContext(SidebarContext);
  const [addDrawer, setAddDrawer] = useState(false);
  const [allCustomers, setAllCustomers] = useState();

  const handleAddDrawer = () => {
    setAddDrawer(true);
  };

  const handleCloseDrawer = () => {
    setAddDrawer(false);
  };
  const [openBlockDrawer, setBlockDrawer] = useState(false);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const stats = await apiCall("/admin-dashboard/customers/stats");
        const formattedData = Object.entries(stats).map(([key, value]) => ({
          name: key,
          value: value as number,
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Failed to fetch customer stats:", error);
      }
    };

    fetchCustomerStats();
  }, []);

  useEffect(() => {
    const fetchAllCustomerStats = async () => {
      try {
        const customers = await apiCall("/admin-dashboard/customers");
        setAllCustomers(customers);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchAllCustomerStats();
  }, []);
  

  console.log("customers",allCustomers)

  const handleBlockDrawer = () => {
    setBlockDrawer(true);
  };

  const handleCloseBlockDrawer = () => {
    setBlockDrawer(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query);
  };

  const [, setSelectedFilter] = useState<string | null>(null);
  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };

  const manageUserCol = useColumnManageUserDefs(manageCustomersColumnDefs);
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
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
          <Header breadcrumbItems={customersBreadcrumb} />
        </Box>
        <Box sx={{ margin: "24px 24px 24px 0" }}>
          <Typography variant="h2" paddingBottom={"8px"}>
            Manage Customers
          </Typography>
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
        </Box>
        <Stack
          sx={{
            border: "1px solid  #E4E7EC",
            borderRadius: "10px",
            padding: "16px",
            mb: "24px",
            marginRight: "30px",
          }}
        >
          <Typography variant="h5" mb={2}>
            Number of customers per month
          </Typography>
          <SharpLineChart data={chartData} />
        </Stack>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={3}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button startIcon={<Adduser />} onClick={handleAddDrawer}>
              Add Users
            </Button>
            <Button startIcon={<BlockUser />} onClick={handleBlockDrawer}>
              Block User
            </Button>
          </ButtonGroup>
          <Box mr={4} display={"flex"} alignItems={"center"} gap={2}>
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search here..."
              onChange={handleSearchChange}
              width="340px"
            />
            <CustomFilterSelect items={filterItems} onSelect={handleSelect} />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            border: "1px solid #E4E7EC",
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
            overflow: "hidden",
            marginTop: "24px",
            marginRight: "32px",
            marginBottom: "48px",
          }}
        >
          <AgGridTable
            rowData={manageCustomersRow}
            columnDefs={manageUserCol}
            rowSelection={true}
          />
        </Box>
        {addDrawer && (
          <AddCustomerDrawer open={addDrawer} handleClose={handleCloseDrawer} />
        )}
        {openBlockDrawer && (
          <BlockDrawer
            open={openBlockDrawer}
            handleClose={handleCloseBlockDrawer}
          />
        )}
      </Box>
    </>
  );
};

export default ManageCustomers;
