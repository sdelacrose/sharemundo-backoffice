import AgGridTable from "@/app/ag-grid";
import {
  FreelancerconnectionColumnDefs,
  LicenseColumnDefs,
} from "@/app/const/GridTable/ColDef";
import {
  FreelancerConnectionRow,
  
} from "@/app/const/GridTable/RowData";
import useColumnFreelancerConnection from "@/app/hooks/Grid-Table/useColumnFreelancerConnection";
import useColumnLicense from "@/app/hooks/Grid-Table/useColumnCompanyLicense";
import { Box } from "@mui/material";
import React from "react";

const ConnectionTab = () => {
  const connectionCol = useColumnFreelancerConnection(
    FreelancerconnectionColumnDefs
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
        rowData={FreelancerConnectionRow}
        columnDefs={connectionCol}
      />
    </Box>
  );
};

export default ConnectionTab;
