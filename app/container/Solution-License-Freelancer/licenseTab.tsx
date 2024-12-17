import AgGridTable from "@/app/ag-grid";
import { LicenseFreelancerDefs } from "@/app/const/GridTable/ColDef";
import { LicenseFreelancerRow } from "@/app/const/GridTable/RowData";
import useColumnFreelancerLicense from "@/app/hooks/Grid-Table/useColumnFreelancerLicense";
import { Box } from "@mui/material";
import React from "react";

const LicenseTab = () => {
  const LicenseFreelancerCol = useColumnFreelancerLicense(
    LicenseFreelancerDefs
  );

  return (
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
      <AgGridTable
        rowData={LicenseFreelancerRow}
        columnDefs={LicenseFreelancerCol}
      />
    </Box>
  );
};

export default LicenseTab;
