"use client";

import React, { useEffect, useState } from "react";
import { Drawer, Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AgGridTable from "@/app/ag-grid";
import { apiCall } from "@/app/utils/APIUtils";
import useColumnLicenseDetails from "@/app/hooks/Grid-Table/useColumnLicenseDetails";

export const licensesDetailColumnDefs = [
  { field: "created_at", headerName: "Purchase Date" },
  { field: "bought_licenses", headerName: "Bought Licenses" },
  { field: "renewal_date", headerName: "Renewal Date" },
  {
    field: "status",
    headerName: "Status",
    cellStyle: { textAlign: "left" },
    headerStyle: { textAlign: "left" },
  },
];

interface LicenseDetailProps {
  open?: boolean;
  handleClose?: () => void;
  licenseId: string;
}

const LicenseDetail: React.FC<LicenseDetailProps> = ({
  open = false,
  handleClose = () => {},
  licenseId,
}) => {
  const [licensesData, setLicensesData] = useState([]);
  const licensesColumnDefs = useColumnLicenseDetails(licensesDetailColumnDefs);

  const getLicensesData = async () => {
    try {
      const url = `/admin-dashboard/licenses/${licenseId}`;
      const responseData = await apiCall(url);
      if (responseData && responseData.length > 0) {
        setLicensesData(responseData[0].licenses || []);
      }
    } catch (error) {
      console.error("Error fetching licenses data:", error);
    }
  };

  useEffect(() => {
    if (licenseId) {
      getLicensesData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [licenseId]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "60%",
          padding: "32px 16px",
          backgroundColor: "white",
          height: "100vh",
          boxShadow: "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
          overflowY: "auto",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box p={4}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h2" fontWeight="bold">
            License Details
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Typography mb={2} mt={2}>
          Billing History
        </Typography>
        <Box
          sx={{
            width: "100%",
            borderRadius: "12px",
            background: "#fff",
            border: "1px solid #E4E7EC",
            overflow: "hidden",
          }}
        >
          <AgGridTable rowData={licensesData} columnDefs={licensesColumnDefs} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default LicenseDetail;
