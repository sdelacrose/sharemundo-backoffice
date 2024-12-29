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
import AddCustomerDrawer from "./Drawers/addCustomerDrawer";
import BlockCustomerDrawer from "./Drawers/blockCustomerDrawer";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import { apiCall } from "@/app/utils/APIUtils";
import _debounce from "lodash/debounce";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import BlockBulkCustomerDrawer from "./Drawers/blockBulkCustomerDrawer";
import ActiveBulkCustomerDrawer from "./Drawers/activeBulkCustomerDrawer";
import ActiveCustomerDrawer from "./Drawers/activeCustomerDrawer";
import Loader from "@/app/components/common/Loader";

const ManageCustomers = () => {
  const context = useContext(SidebarContext);
  const [addDrawer, setAddDrawer] = useState(false);
  const [rowData, setRowData] = useState<any>([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [selectedRows, setSelectedRows] = useState([]);

  const [blockDrawerOpen, setBlockDrawerOpen] = useState(false);
  const [activeDrawerOpen, setActiveDrawerOpen] = useState(false);

  const [blockBulkCustomersDrawerOpen, setBlockBulkCustomersDrawerOpen] =
    useState(false);
  const [activateBulkCustomersDrawerOpen, setActivateBulkCustomersDrawerOpen] =
    useState(false);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const manageUserCol = useColumnManageUserDefs({
    columns: manageCustomersColumnDefs,
    onBlockClick: (id) => {
      setSelectedIds([id]);
      setBlockDrawerOpen(true);
    },
    onActivateClick: (id) => {
      setSelectedIds([id]);
      setActiveDrawerOpen(true);
    },
  });

  const handleAddDrawer = () => {
    setAddDrawer(true);
  };

  const handleCloseCustomerDrawer = () => {
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
      setLoading(false);

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

  const handleRowSelection = (event) => {
    const selected = event.api.getSelectedRows();
    setSelectedRows(selected);
    console.log("Selected Rows: ", selected);
  };

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }

  const handleBlockBulkUsers = async () => {
    try {
      const idsToBlock = selectedRows.map((row: any) => row.id); // Extract IDs from selected rows
      if (idsToBlock.length === 0) {
        console.warn("No users selected for bulk block");
        return;
      }

      await apiCall(
        `/admin-dashboard/update-customer-status`,
        "POST",
        {
          user_ids: idsToBlock,
          is_active: false,
        },
        undefined,
        { successMessage: "Users blocked successfully!" }
      );

      setBlockBulkCustomersDrawerOpen(false);
      fetchCustomers("/admin-dashboard/customers");
    } catch (err) {
      console.error("Failed to block users:", err);
    }
  };

  const handleActivateBulkUsers = async () => {
    try {
      const idsToActivate = selectedRows.map((row: any) => row.id); // Extract IDs from selected rows
      if (idsToActivate.length === 0) {
        console.warn("No users selected for bulk block");
        return;
      }

      await apiCall(
        `/admin-dashboard/update-customer-status`,
        "POST",
        {
          user_ids: idsToActivate,
          is_active: true,
        },
        undefined,
        { successMessage: "Users activated successfully!" }
      );

      setActivateBulkCustomersDrawerOpen(false);
      fetchCustomers("/admin-dashboard/customers");
    } catch (err) {
      console.error("Failed to activate users:", err);
    }
  };

  const handleBlockUser = async (id: number) => {
    await apiCall(`/admin-dashboard/update-customer-status`, "POST", {
      user_ids: [id],
      is_active: false,
    });
    fetchCustomers("/admin-dashboard/customers");
    setBlockDrawerOpen(false);
  };

  const handleActivateUser = async (id: number) => {
    await apiCall(`/admin-dashboard/update-customer-status`, "POST", {
      user_ids: [id],
      is_active: true,
    });
    fetchCustomers("/admin-dashboard/customers");
    setActiveDrawerOpen(false);
  };

  const handleCustomerAdded = async () => {
    await fetchCustomers("/admin-dashboard/customers");
    setAddDrawer(false);
  };

  const customTooltipCustomersFormatter = (value: any) => [
    `Customers: ${value}`,
  ];

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
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
            sharemundo Back Office
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
          <SharpLineChart
            data={chartData}
            tooltipFormatter={customTooltipCustomersFormatter}
          />
        </Stack>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={3}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button startIcon={<Adduser />} onClick={handleAddDrawer}>
              Add Customers
            </Button>
            <Button
              startIcon={<BlockUser />}
              onClick={() => setActivateBulkCustomersDrawerOpen(true)}
              disabled={selectedRows.length === 0}
              sx={{
                color: "inherit",
                "&.Mui-disabled": {
                  color: "inherit",
                  backgroundColor: "#F0F2F5",
                },
              }}
            >
              Active Bulk Users
            </Button>
            <Button
              startIcon={<BlockUser />}
              onClick={() => setBlockBulkCustomersDrawerOpen(true)}
              disabled={selectedRows.length === 0}
              sx={{
                color: "inherit",
                "&.Mui-disabled": {
                  color: "inherit",
                  backgroundColor: "#F0F2F5",
                },
              }}
            >
              Block Bulk Users
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
            handleRowSelection={handleRowSelection}
            height={580}
          />
        </Box>
        {addDrawer && (
          <AddCustomerDrawer
            open={addDrawer}
            handleClose={handleCloseCustomerDrawer}
            onCustomerAdded={handleCustomerAdded}
          />
        )}
        {blockDrawerOpen && (
          <BlockCustomerDrawer
            open={blockDrawerOpen}
            handleClose={() => setBlockDrawerOpen(false)}
            handleBlock={() => handleBlockUser(selectedIds[0])}
          />
        )}

        {activeDrawerOpen && (
          <ActiveCustomerDrawer
            open={activeDrawerOpen}
            handleClose={() => setActiveDrawerOpen(false)}
            handleActivate={() => handleActivateUser(selectedIds[0])}
          />
        )}
        {blockBulkCustomersDrawerOpen && (
          <BlockBulkCustomerDrawer
            open={blockBulkCustomersDrawerOpen}
            handleClose={() => setBlockBulkCustomersDrawerOpen(false)}
            handleBlock={handleBlockBulkUsers}
            selectedUsers={selectedRows.map((row: any) => ({
              id: row.id,
              name: row.name || `User ID: ${row.id}`,
            }))}
          />
        )}
        {activateBulkCustomersDrawerOpen && (
          <ActiveBulkCustomerDrawer
            open={activateBulkCustomersDrawerOpen}
            handleClose={() => setActivateBulkCustomersDrawerOpen(false)}
            handleActivate={handleActivateBulkUsers}
            selectedUsers={selectedRows.map((row: any) => ({
              id: row.id,
              name: row.name || `User ID: ${row.id}`,
            }))}
          />
        )}
      </Box>
    </>
  );
};

export default ManageCustomers;
