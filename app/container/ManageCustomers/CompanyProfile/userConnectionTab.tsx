"use client";

import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomButton from "@/app/components/common/CustomButton";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { apiCall } from "@/app/utils/APIUtils";
import RemoveConnectionDrawer from "../removeConnectionDrawer";

const UserConnectionTab = ({ id, setActiveTab }: any) => {
  const [viewMode, setViewMode] = useState<"internal" | "connections">(
    "internal"
  );
  const [rowData, setRowData] = useState([]);
  const [filteredRowData, setFilteredRowData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [removeDrawerOpen, setRemoveDrawerOpen] = useState(false);
  const [, setSelectedFilter] = useState<string | null>(null);

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };

  const handleViewClick = () => {
    setActiveTab(0); // Switch to the Profile Tab
  };

  const handleOpenRemoveDrawer = (data: any) => {
    setSelectedRowId(data.id);
    setRemoveDrawerOpen(true);
  };

  const handleCloseRemoveDrawer = () => {
    setRemoveDrawerOpen(false);
    setSelectedRowId(null);
  };

  const handleRemoveConnection = async () => {
    if (!selectedRowId) return;

    try {
      await apiCall(
        `/accounts/connections/${selectedRowId}`,
        "DELETE",
        null,
        null,
        {
          successMessage: "Connection removed successfully!",
        }
      );
      fetchUsersOrConnections(
        `/admin-dashboard/customers/${id}/connections`,
        viewMode === "connections"
      );
      handleCloseRemoveDrawer();
    } catch (error) {
      console.error("Failed to remove connection:", error);
    }
  };

  const internalColumnDefs = [
    { field: "name", headerName: "Display Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "sharemundo_links_id",
      headerName: "Sharemundo Links ID",
      flex: 1,
    },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "allocated_licenses", headerName: "Assigned Licenses", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      cellRenderer: ({ data }: any) => (
        <Box
          display="flex"
          gap={1}
          sx={{ marginTop: "8px", marginLeft: "-14px" }}
        >
          <Button
            variant="text"
            color="primary"
            onClick={() => handleViewClick()}
          >
            View
          </Button>
          <Button
            variant="text"
            color="error"
            sx={{ color: "red" }}
            onClick={() => handleOpenRemoveDrawer(data)}
          >
            Remove
          </Button>
        </Box>
      ),
    },
  ];

  const connectionColumnDefs = [
    { field: "name", headerName: "Name", flex: 2 },
    {
      field: "sharemundo_links_id",
      headerName: "Sharemundo Links ID",
      flex: 2,
    },
    { field: "type", headerName: "Type", flex: 1 },
    { field: "connection_date", headerName: "Connection Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      cellRenderer: ({ data }: any) => (
        <Box
          display="flex"
          gap={1}
          sx={{ marginTop: "8px", marginLeft: "-14px" }}
        >
          <Button
            variant="text"
            color="primary"
            onClick={() => handleViewClick()}
          >
            View
          </Button>
          <Button
            variant="text"
            color="error"
            sx={{ color: "red" }}
            onClick={() => handleOpenRemoveDrawer(data)}
          >
            Remove
          </Button>
        </Box>
      ),
    },
  ];

  const fetchUsersOrConnections = async (
    url: string,
    isConnections: boolean
  ) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const response = await apiCall(trimmedUrl);

      if (isConnections) {
        const connections = response.results.connections.map(
          (connection: any) => ({
            id: connection.id,
            name: connection.name || "N/A",
            sharemundo_links_id: connection.sharemundo_links_id,
            type:
              connection.type.charAt(0).toUpperCase() +
              connection.type.slice(1),
            connection_date: new Date(
              connection.created_at
            ).toLocaleDateString(),
          })
        );
        setRowData(connections);
        setFilteredRowData(connections);
      } else {
        const users = response.results.internal_users.map((user: any) => ({
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          sharemundo_links_id: user.sharemundo_links_id,
          status: user.is_active ? "Active" : "Disabled",
          role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
          allocated_licenses: user.allocated_licenses,
        }));
        setRowData(users);
        setFilteredRowData(users);
      }

      setNextPageUrl(response.next || null);
      setPreviousPageUrl(response.previous || null);
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchUsersOrConnections(nextPageUrl, viewMode === "connections");
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchUsersOrConnections(previousPageUrl, viewMode === "connections");
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filteredData = rowData.filter(
      (item: any) =>
        item.name.toLowerCase().includes(query) ||
        (item.email && item.email.toLowerCase().includes(query))
    );
    setFilteredRowData(filteredData);
  };

  useEffect(() => {
    setRowData([]); // Clear data when switching tabs
    setFilteredRowData([]);
    setNextPageUrl(null);
    setPreviousPageUrl(null);
    setCurrentPage(1);
    setTotalPages(0);

    if (viewMode === "internal") {
      fetchUsersOrConnections(`/admin-dashboard/customers/${id}/users`, false);
    } else {
      fetchUsersOrConnections(
        `/admin-dashboard/customers/${id}/connections`,
        true
      );
    }
  }, [viewMode, id]);

  return (
    <>
      <Box>
        <Typography variant="h5" mb={3}>
          Company Users
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={3}>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: viewMode === "internal" ? "#004FA7" : "#E4E7EC",
              color: viewMode === "internal" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  viewMode === "internal" ? "#1565c0" : "#E4E7EC",
              },
            }}
            onClick={() => setViewMode("internal")}
          >
            Internal Users
          </CustomButton>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor:
                viewMode === "connections" ? "#004FA7" : "#E4E7EC",
              color: viewMode === "connections" ? "white" : "black",
              "&:hover": {
                backgroundColor:
                  viewMode === "connections" ? "#1565c0" : "#E4E7EC",
              },
            }}
            onClick={() => setViewMode("connections")}
          >
            Connections
          </CustomButton>
        </Box>

        {viewMode === "internal" && (
          <Box mb={3}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  startIcon={<Adduser />}
                  // onClick={handleAddDrawer}
                  // disabled={true}
                  sx={{
                    color: "inherit",
                    backgroundColor: "transparent",
                    "&.Mui-disabled": {
                      color: "inherit",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  Add User
                </Button>
                <Button
                  startIcon={<BlockUser />}
                  // onClick={() => setActivateBulkCustomersDrawerOpen(true)}
                  // disabled={selectedRows.length === 0}
                >
                  Restore Bulk Users
                </Button>
                <Button
                  startIcon={<BlockUser />}
                  // onClick={() => setBlockBulkCustomersDrawerOpen(true)}
                  // disabled={selectedRows.length === 0}
                >
                  Remove Bulk Users
                </Button>
              </ButtonGroup>
              <Box mr={4} display={"flex"} alignItems={"center"} gap={2}>
                <CustomSearchField
                  startIcon={<Search />}
                  placeholder="Search by name or email..."
                  onChange={handleSearchChange}
                  width="340px"
                />
                <CustomFilterSelect
                  items={[
                    { label: "All" },
                    { label: "Active" },
                    { label: "Disabled" },
                  ]}
                  onSelect={handleSelect}
                />
              </Box>
            </Box>
          </Box>
        )}

        {viewMode === "connections" && (
          <Box mb={3}>
            <Box mr={4} display={"flex"} alignItems={"center"} gap={2}>
              <CustomSearchField
                startIcon={<Search />}
                placeholder="Search by name or email..."
                onChange={handleSearchChange}
                width="340px"
              />
              <CustomFilterSelect
                items={[
                  { label: "All" },
                  { label: "Active" },
                  { label: "Disabled" },
                ]}
                onSelect={handleSelect}
              />
            </Box>
          </Box>
        )}

        <Box
          sx={{
            borderRadius: "10px",
            border: "1px solid #E4E7EC",
            backgroundColor: "#FFF",
            boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
            overflow: "hidden",
            marginTop: "24px",
            marginRight: "32px",
          }}
        >
          <AgGridServerSideTable
            rowData={filteredRowData}
            columnDefs={
              viewMode === "internal"
                ? internalColumnDefs
                : connectionColumnDefs
            }
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </Box>
      </Box>

      {removeDrawerOpen && (
        <RemoveConnectionDrawer
          open={removeDrawerOpen}
          handleClose={handleCloseRemoveDrawer}
          handleRemoveConnection={handleRemoveConnection}
        />
      )}
    </>
  );
};

export default UserConnectionTab;
