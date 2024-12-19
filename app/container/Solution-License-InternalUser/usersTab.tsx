import AgGridTable from "@/app/ag-grid";
import { InternalUsersColumnDefs } from "@/app/const/GridTable/ColDef";
import { InternalUsersRow } from "@/app/const/GridTable/RowData";

import { Box } from "@mui/material";
import React from "react";
import useColumnInternalUser from "@/app/hooks/Grid-Table/useColumnInternalUser";

const UsersTab = () => {
  const InternaluserCol = useColumnInternalUser(InternalUsersColumnDefs);

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
      <AgGridTable rowData={InternalUsersRow} columnDefs={InternaluserCol} />
    </Box>
  );
};

export default UsersTab;
