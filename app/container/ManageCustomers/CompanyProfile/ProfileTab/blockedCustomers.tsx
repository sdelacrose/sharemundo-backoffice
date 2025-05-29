import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { apiCall } from "@/app/utils/APIUtils";
import { manageCustomersColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import useColumnManageUserDefs from "@/app/hooks/Grid-Table/useColumnManageUser";
import ActiveCustomerDrawer from "../../Drawers/activeCustomerDrawer";
import ActiveBulkCustomerDrawer from "../../Drawers/activeBulkCustomerDrawer";
import toast from "react-hot-toast";
import { BlockUser } from "@/app/assets/icons";

export type BlockedCustomersRef = {
  refreshBlockedCustomers: () => void;
};

type BlockedCustomersProps = {
  refresh: () => void;
};

const BlockedCustomers = forwardRef<BlockedCustomersRef, BlockedCustomersProps>(
  ({ refresh }, ref) => {
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState<any[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [activeDrawerOpen, setActiveDrawerOpen] = useState(false);
    const [
      activateBulkCustomersDrawerOpen,
      setActivateBulkCustomersDrawerOpen,
    ] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
    const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);

    const fetchBlockedCustomers = async (url: string) => {
      try {
        setLoading(true);
        const trimmedUrl = url.includes("/admin-dashboard")
          ? url.substring(url.indexOf("/admin-dashboard"))
          : url;

        const response = await apiCall(trimmedUrl);

        setRowData(response.results || []);
        setTotalPages(Math.ceil(response.count / 10));
        setNextPageUrl(response.next);
        setPreviousPageUrl(response.previous);
      } catch (error) {
        console.error("Failed to fetch blocked customers:", error);
      } finally {
        setLoading(false);
      }
    };

    useImperativeHandle(ref, () => ({
      refreshBlockedCustomers: () =>
        fetchBlockedCustomers(
          `/admin-dashboard/customers?page=${currentPage}&is_active=false`
        ),
    }));

    useEffect(() => {
      fetchBlockedCustomers(
        `/admin-dashboard/customers?page=${currentPage}&is_active=false`
      );
    }, [currentPage]);

    const manageUserCol = useColumnManageUserDefs({
      columns: manageCustomersColumnDefs,
      type: "blocked",
      onActivateClick: (id) => {
        setSelectedIds([id]);
        setActiveDrawerOpen(true);
      },
    });

    const handleNextPage = () => {
      if (nextPageUrl) {
        setCurrentPage((prev) => prev + 1);
        fetchBlockedCustomers(nextPageUrl);
      }
    };

    const handlePreviousPage = () => {
      if (previousPageUrl) {
        setCurrentPage((prev) => prev - 1);
        fetchBlockedCustomers(previousPageUrl);
      }
    };

    const handleRowSelection = (event) => {
      const selected = event.api.getSelectedRows();
      setSelectedRows(selected);
    };

    const handleActivateUser = async (id: number) => {
      await apiCall(`/admin-dashboard/update-customer-status`, "POST", {
        user_ids: [id],
        is_active: true,
      });
      fetchBlockedCustomers(
        `/admin-dashboard/customers?page=${currentPage}&is_active=false`
      );
      refresh();
      setActiveDrawerOpen(false);
    };

    const handleActivateBulkUsers = async () => {
      try {
        const idsToActivate = selectedRows.map((row: any) => row.id);
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
        fetchBlockedCustomers("/admin-dashboard/customers?is_active=false");
        refresh();
      } catch (err) {
        console.error("Failed to activate users:", err);
      }
    };
    const onActiveClick = () => {
      if (selectedRows.length === 0) {
        toast.error("Please select users for activation");
        return;
      }
      setActivateBulkCustomersDrawerOpen(true);
    };

    return (
      <>
        <Box>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            gap={3}
            mb={3}
          >
            <Typography variant="h5">Blocked Users</Typography>
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                startIcon={<BlockUser />}
                onClick={onActiveClick}
                sx={{
                  color: "inherit",
                  "&.Mui-disabled": {
                    color: "inherit",
                    backgroundColor: "#F0F2F5",
                  },
                }}
              >
                Activate Bulk Users
              </Button>
            </ButtonGroup>
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
              rowSelection
              handleRowSelection={handleRowSelection}
              height={580}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              loading={loading}
            />
          </Box>
        </Box>
        {activeDrawerOpen && (
          <ActiveCustomerDrawer
            open={activeDrawerOpen}
            handleClose={() => setActiveDrawerOpen(false)}
            handleActivate={() => handleActivateUser(selectedIds[0])}
          />
        )}
        {activateBulkCustomersDrawerOpen && (
          <ActiveBulkCustomerDrawer
            open={activateBulkCustomersDrawerOpen}
            handleClose={() => setActivateBulkCustomersDrawerOpen(false)}
            handleActivate={handleActivateBulkUsers}
            selectedUsers={selectedRows?.map((row: any) => ({
              id: row.id,
              name: row.name || `User ID: ${row.id}`,
            }))}
          />
        )}
      </>
    );
  }
);

BlockedCustomers.displayName = "BlockedCustomers";
export default BlockedCustomers;
