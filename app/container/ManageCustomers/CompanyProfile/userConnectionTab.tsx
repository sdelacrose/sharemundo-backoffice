"use client";

import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomButton from "@/app/components/common/CustomButton";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Search } from "@/app/assets/icons";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import { apiCall } from "@/app/utils/APIUtils";
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter";

const UserConnectionTab = ({ id }: { id: string }) => {
  const [viewMode, setViewMode] = useState<"internal" | "connections">("connections");
  const [rowData, setRowData] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [, setSelectedFilter] = useState<string | null>(null);

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };

  const columnDefs = [
    { field: "name", headerName: "Display Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "sharemundo_links_id", headerName: "Sharemundo Links ID", flex: 2 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "allocated_licenses", headerName: "Assigned Licenses", flex: 1 },
  ];

  // Fetch Users Data
  const fetchUsers = async (url: string) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const response = await apiCall(trimmedUrl);

      const users = response.results.internal_users.map((user: any) => ({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        sharemundo_links_id: user.sharemundo_links_id,
        status: user.is_active ? "Active" : "Disabled",
        role: capitalizeFirstLetter(user.role),
        allocated_licenses: user.allocated_licenses,
      }));

      setRowData(users);
      setNextPageUrl(response.next || null);
      setPreviousPageUrl(response.previous || null);
      setTotalPages(Math.ceil(response.count / 10));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Handle Pagination
  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchUsers(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchUsers(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Fetch Data on Component Mount
  useEffect(() => {
    if (viewMode === "internal") {
      fetchUsers(`/admin-dashboard/customers/${id}/users`);
    }
  }, [viewMode, id]);

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Company Users
      </Typography>
      <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={3}>
        <CustomButton
          variant={viewMode === "internal" ? "contained" : "outlined"}
          onClick={() => setViewMode("internal")}
        >
          Internal Users
        </CustomButton>
        <CustomButton
          variant={viewMode === "connections" ? "contained" : "outlined"}
          onClick={() => setViewMode("connections")}
          background="#F0F2F5"
        >
          Connections
        </CustomButton>
      </Box>
      <Box mb={3}>
        <Box mr={4} display={"flex"} alignItems={"center"} gap={2}>
          <CustomSearchField
            startIcon={<Search />}
            placeholder="Search here..."
            onChange={(e) => console.log(e.target.value)}
            width="340px"
          />
          <CustomFilterSelect
            items={[
              { label: "All", value: "all" },
              { label: "Active", value: "active" },
              { label: "Disabled", value: "disabled" },
            ]}
            onSelect={handleSelect}
          />
        </Box>
      </Box>

      {viewMode === "internal" ? (
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
            columnDefs={columnDefs}
            currentPage={currentPage}
            totalPages={totalPages}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
          />
        </Box>
      ) : (
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
          <Typography textAlign="center" p={3}>
            Connections View Coming Soon
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default UserConnectionTab;
