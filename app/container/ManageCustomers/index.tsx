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
import Header from "@/app/components/common/Header";
import { customersBreadcrumb, filterByRoleItems } from "./manageData";
import { SidebarContext } from "@/app/(pages)/layout";
import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import useColumnManageUserDefs from "@/app/hooks/Grid-Table/useColumnManageUser";
import AddCustomerDrawer from "./addCustomerDrawer";
import BlockDrawer from "./addBlockDrawer";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { apiCall } from "@/app/utils/APIUtils";
import _debounce from "lodash/debounce";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";

const ManageCustomers = ({customerDetail}:any) => {
  const context = useContext(SidebarContext);
  const [addDrawer, setAddDrawer] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [openBlockDrawer, setBlockDrawer] = useState(false);
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const manageUserCol = useColumnManageUserDefs(manageCustomersColumnDefs);

  const handleAddDrawer = () => {
    setAddDrawer(true);
  };

  const handleCloseDrawer = () => {
    setAddDrawer(false);
  };

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

  const fetchCustomers = async (url: string) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;
  
      const data = await apiCall(trimmedUrl);
      setRowData(data?.results || []);
      setNextPageUrl(data?.next ? data.next : null);
      setPreviousPageUrl(data?.previous ? data.previous : null);
      setTotalPages(Math.ceil(data?.count / 10));
    } catch (err) {
      console.error("Failed to fetch customers:", err);
    }
  };
  
  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchCustomers(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };
  
  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchCustomers(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };
  
  useEffect(() => {
    fetchCustomers("/admin-dashboard/customers");
  }, []);

  const handleSearchChange = _debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      try {
        const data = await apiCall(
          `/admin-dashboard/customers?search=${query}`
        );
        setRowData(data?.results);
        setNextPageUrl(data?.next || null);
        setPreviousPageUrl(data?.previous || null);
        setTotalPages(Math.ceil(data?.count / 10));
      } catch (err) {
        console.error("Failed to search customers:", err);
      }
    },
    500
  );

  const handleSelect = async (label: string | null) => {
    try {
      let apiUrl = "/admin-dashboard/customers";
      if (label === "Freelancer") {
        apiUrl += "?search=freelancer";
      } else if (label === "Company") {
        apiUrl += "?search=Company";
      }
      const data = await apiCall(apiUrl);
      setRowData(data?.results);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil(data?.count / 10));
    } catch (err) {
      console.error("Failed to fetch filtered customers:", err);
    }
  };

  const handleBlockDrawer = () => {
    setBlockDrawer(true);
  };

  const handleCloseBlockDrawer = () => {
    setBlockDrawer(false);
  };

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
            <Button
              startIcon={<Adduser />}
              onClick={handleAddDrawer}
              disabled={true}
              sx={{
                color: "inherit",
                backgroundColor: "transparent",
                "&.Mui-disabled": {
                  color: "inherit",
                  backgroundColor: "transparent",
                },
              }}
            >
              Add Customers
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
            <CustomFilterSelect
              items={filterByRoleItems}
              onSelect={handleSelect}
            />
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
          <AgGridServerSideTable
            rowData={rowData}
            columnDefs={manageUserCol}
            rowSelection={true}
            currentPage={currentPage}
            totalPages={totalPages}
            nextPageUrl={nextPageUrl}
            previousPageUrl={previousPageUrl}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            height={580}
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
