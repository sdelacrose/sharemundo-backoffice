import React from "react";
import { Box } from "@mui/material";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";

const LicenseTab = ({
  rowData,
  columnDefs,
  currentPage,
  totalPages,
  nextPageUrl,
  previousPageUrl,
  onNextPage,
  onPreviousPage,
}: any) => {
  console.log("row data", rowData);
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
      <AgGridServerSideTable
        rowData={rowData}
        columnDefs={columnDefs}
        currentPage={currentPage}
        totalPages={totalPages}
        nextPageUrl={nextPageUrl}
        previousPageUrl={previousPageUrl}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </Box>
  );
};

export default LicenseTab;
