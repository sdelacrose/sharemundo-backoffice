"use client";

import { Box, Typography, Button, ButtonGroup } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomButton from "@/app/components/common/CustomButton";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { apiCall } from "@/app/utils/APIUtils";
import RemoveConnectionDrawer from "../Drawers/removeConnectionDrawer";
import RemoveUserDrawer from "../Drawers/removeUserDrawer";
import RestoreUserDrawer from "../Drawers/restoreUserDrawer";
import RemoveBulkUsersDrawer from "../Drawers/removeBulkUsersDrawer";
import RestoreBulkUsersDrawer from "../Drawers/restoreBulkUsersDrawer";
import AddUserDrawer from "./addUserDrawer";
import { filterByConnectionItems, filterByUserTypeItems } from "../manageData";

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
  const [removeUserDrawerOpen, setRemoveUserDrawerOpen] = useState(false);
  const [removeConnectionDrawer, setRemoveConnectionDrawer] = useState(false);
  const [restoreUserDrawerOpen, setRestoreUserDrawerOpen] = useState(false);
  const [removeBulkUsersDrawerOpen, setRemoveBulkUsersDrawerOpen] =
    useState(false);
  const [restoreBulkUsersDrawerOpen, setRestoreBulkUsersDrawerOpen] =
    useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [addUserDrawerOpen, setAddUserDrawerOpen] = useState(false);

  const handleViewClick = () => {
    setActiveTab(0);
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
          {data.is_deleted ? (
            <Button
              variant="text"
              sx={{ color: "green" }}
              onClick={() => {
                setSelectedUserId(data.id);
                setRestoreUserDrawerOpen(true);
              }}
            >
              Restore
            </Button>
          ) : (
            <Button
              variant="text"
              color="error"
              sx={{ color: "red" }}
              onClick={() => {
                setSelectedUserId(data.id);
                setRemoveUserDrawerOpen(true);
              }}
            >
              Remove
            </Button>
          )}
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
          is_deleted: user.is_deleted,
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

  const handleRowSelection = (event) => {
    const selected = event.api.getSelectedRows();
    setSelectedRows(selected);
    console.log("Selected Rows: ", selected);
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

  const handleSelect = async (filter: {
    key: string;
    value: string | null;
  }) => {
    try {
      let apiUrl = `/admin-dashboard/customers/${id}/connections`;
      const params: Record<string, string> = {};

      // Add filter to params
      if (filter.key && filter.value && filter.value !== "all") {
        params[filter.key] = filter.value;
      }

      // Convert params object to query string
      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
        apiUrl += `?${queryString}`;
      }

      const data = await apiCall(apiUrl);
      setRowData(data?.results.connections);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil(data?.count / 10));
    } catch (err) {
      console.error("Failed to fetch filtered connections:", err);
    }
  };

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const data = await apiCall(
          `/admin-dashboard/customers/${id}/connections`
        );
        setRowData(data?.results.connections);
        setNextPageUrl(data?.next || null);
        setPreviousPageUrl(data?.previous || null);
        setTotalPages(Math.ceil(data?.count / 10));
      } catch (err) {
        console.error("Failed to fetch connections:", err);
      }
    };

    fetchConnections();
  }, [id]);

  const handleRemoveUser = async (userId: number) => {
    try {
      await apiCall(
        `/admin-dashboard/remove-restore-user`,
        "POST",
        {
          user_ids: [userId],
          is_deleted: true,
        },
        null,
        { successMessage: "User removed successfully!" }
      );
      fetchUsersOrConnections(`/admin-dashboard/customers/${id}/users`, false);
      setRemoveUserDrawerOpen(false);
    } catch (error) {
      console.error("Failed to remove user:", error);
    }
  };

  const handleRestoreUser = async (userId: number) => {
    try {
      await apiCall(
        `/admin-dashboard/remove-restore-user`,
        "POST",
        {
          user_ids: [userId],
          is_deleted: false,
        },
        null,
        { successMessage: "User restored successfully!" }
      );
      fetchUsersOrConnections(`/admin-dashboard/customers/${id}/users`, false);
      setRestoreUserDrawerOpen(false);
    } catch (error) {
      console.error("Failed to restore user:", error);
    }
  };

  const handleRemoveBulkUsers = async () => {
    try {
      const idsToRemove = selectedRows.map((row: any) => row.id);
      if (idsToRemove.length === 0) {
        console.warn("No users selected for bulk removal");
        return;
      }

      await apiCall(
        `/admin-dashboard/remove-restore-user`,
        "POST",
        {
          user_ids: idsToRemove,
          is_deleted: true,
        },
        null,
        { successMessage: "Users removed successfully!" }
      );

      setRemoveBulkUsersDrawerOpen(false);
      fetchUsersOrConnections(`/admin-dashboard/customers/${id}/users`, false);
    } catch (error) {
      console.error("Failed to remove users:", error);
    }
  };

  const handleRestoreBulkUsers = async () => {
    try {
      const idsToRestore = selectedRows.map((row: any) => row.id); // Extract IDs from selected rows
      if (idsToRestore.length === 0) {
        console.warn("No users selected for bulk restoration");
        return;
      }

      await apiCall(
        `/admin-dashboard/remove-restore-user`,
        "POST",
        {
          user_ids: idsToRestore,
          is_deleted: false,
        },
        null,
        { successMessage: "Users restored successfully!" }
      );

      setRestoreBulkUsersDrawerOpen(false);
      fetchUsersOrConnections(`/admin-dashboard/customers/${id}/users`, false);
    } catch (error) {
      console.error("Failed to restore users:", error);
    }
  };
  const handleOpenRemoveDrawer = (data: any) => {
    setSelectedRowId(data.id);
    setRemoveConnectionDrawer(true);
  };

  // Function to close the RemoveConnectionDrawer
  const handleCloseRemoveDrawer = () => {
    setRemoveConnectionDrawer(false);
    setSelectedRowId(null);
  };

  // Function to handle removal logic
  const handleRemoveConnection = async (userId: number) => {
    try {
      await apiCall(
        `/admin-dashboard/connection/${userId}`,
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
      setRemoveConnectionDrawer(false); // Close drawer after successful operation
    } catch (error) {
      console.error("Failed to remove connection:", error);
    }
  };

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
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Button
                  startIcon={<Adduser />}
                  onClick={() => setAddUserDrawerOpen(true)}
                >
                  Add User
                </Button>

                <Button
                  startIcon={<BlockUser />}
                  onClick={() => setRemoveBulkUsersDrawerOpen(true)}
                  disabled={selectedRows.length === 0}
                  sx={
                    selectedRows.length === 0
                      ? {
                          color: "inherit",
                          backgroundColor: "#F0F2F5",
                          "&.Mui-disabled": {
                            color: "inherit",
                            backgroundColor: "#F0F2F5",
                          },
                        }
                      : {}
                  }
                >
                  Remove Bulk Users
                </Button>
                <Button
                  startIcon={<BlockUser />}
                  onClick={() => setRestoreBulkUsersDrawerOpen(true)}
                  disabled={selectedRows.length === 0}
                  sx={
                    selectedRows.length === 0
                      ? {
                          color: "inherit",
                          backgroundColor: "#F0F2F5",
                          "&.Mui-disabled": {
                            color: "inherit",
                            backgroundColor: "#F0F2F5",
                          },
                        }
                      : {}
                  }
                >
                  Restore Bulk Users
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
                  items={filterByUserTypeItems}
                  onSelect={(value) =>
                    handleSelect({ key: "user_type", value })
                  }
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
                items={filterByConnectionItems}
                onSelect={(value) => handleSelect({ key: "type", value })}
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
            rowSelection={true}
            handleRowSelection={handleRowSelection}
          />
        </Box>
      </Box>

      {addUserDrawerOpen && (
        <AddUserDrawer
          open={addUserDrawerOpen}
          handleClose={() => setAddUserDrawerOpen(false)}
        />
      )}

      {removeConnectionDrawer && (
        <RemoveConnectionDrawer
          open={removeConnectionDrawer}
          handleClose={handleCloseRemoveDrawer}
          handleRemoveConnection={() => handleRemoveConnection(selectedRowId!)}
        />
      )}
      {removeUserDrawerOpen && (
        <RemoveUserDrawer
          open={removeUserDrawerOpen}
          handleClose={() => setRemoveUserDrawerOpen(false)}
          handleRemoveUser={() => handleRemoveUser(selectedUserId!)}
        />
      )}

      {restoreUserDrawerOpen && (
        <RestoreUserDrawer
          open={restoreUserDrawerOpen}
          handleClose={() => setRestoreUserDrawerOpen(false)}
          handleRestoreUser={() => handleRestoreUser(selectedUserId!)}
        />
      )}
      {removeBulkUsersDrawerOpen && (
        <RemoveBulkUsersDrawer
          open={removeBulkUsersDrawerOpen}
          handleClose={() => setRemoveBulkUsersDrawerOpen(false)}
          handleRemove={handleRemoveBulkUsers}
          selectedUsers={selectedRows.map((row: any) => ({
            id: row.id,
            name: row.name || `User ID: ${row.id}`,
          }))}
        />
      )}
      {restoreBulkUsersDrawerOpen && (
        <RestoreBulkUsersDrawer
          open={restoreBulkUsersDrawerOpen}
          handleClose={() => setRestoreBulkUsersDrawerOpen(false)}
          handleRestore={handleRestoreBulkUsers}
          selectedUsers={selectedRows.map((row: any) => ({
            id: row.id,
            name: row.name || `User ID: ${row.id}`,
          }))}
        />
      )}
    </>
  );
};

export default UserConnectionTab;
