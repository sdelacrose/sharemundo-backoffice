"use client";

import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { apiCall } from "@/app/utils/APIUtils";
import RemoveConnectionDrawer from "../Drawers/removeConnectionDrawer";

const ConnectionTab = ({ id, setActiveTab }: { id: string; setActiveTab: (tabIndex: number) => void }) => {
  const [rowData, setRowData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [removeDrawerOpen, setRemoveDrawerOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

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
        <Box display="flex" gap={1} sx={{ marginTop: "8px" }}>
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

  const fetchConnections = async (url: string) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const response = await apiCall(trimmedUrl);

      const connections = response.results.connections.map((connection: any) => ({
        id: connection.id,
        name: connection.name || "N/A",
        sharemundo_links_id: connection.sharemundo_links_id,
        type: connection.type.charAt(0).toUpperCase() + connection.type.slice(1),
        connection_date: new Date(connection.created_at).toLocaleDateString(),
      }));

      setRowData(connections);
      setNextPageUrl(response.next || null);
      setPreviousPageUrl(response.previous || null);
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchConnections(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchConnections(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
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
      await apiCall(`/accounts/connections/${selectedRowId}`, "DELETE", null, null, {
        successMessage: "Connection removed successfully!",
      });
      // Refresh the table after removing the connection
      fetchConnections(`/admin-dashboard/customers/${id}/connections`);
      handleCloseRemoveDrawer();
    } catch (error) {
      console.error("Failed to remove connection:", error);
    }
  };

  useEffect(() => {
    fetchConnections(`/admin-dashboard/customers/${id}/connections`);
  }, [id]);

  return (
    <>
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
          rowData={rowData}
          columnDefs={connectionColumnDefs}
          currentPage={currentPage}
          totalPages={totalPages}
          onNextPage={handleNextPage}
          onPreviousPage={handlePreviousPage}
        />
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

export default ConnectionTab;
