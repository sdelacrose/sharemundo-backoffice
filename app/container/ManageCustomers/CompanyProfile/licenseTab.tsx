import AgGridTable from "@/app/ag-grid";
import { LicenseColumnDefs } from "@/app/const/GridTable/ColDef";
import { LicenseCompanyRow } from "@/app/const/GridTable/RowData";
import useColumnCompanyLicense from "@/app/hooks/Grid-Table/useColumnCompanyLicense";
import { Box } from "@mui/material";
import React from "react";

const LicenseTab = () => {
  const LicenseCol = useColumnCompanyLicense(LicenseColumnDefs);

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
      <AgGridTable rowData={LicenseCompanyRow} columnDefs={LicenseCol} />
    </Box>
  );
};

export default LicenseTab;
