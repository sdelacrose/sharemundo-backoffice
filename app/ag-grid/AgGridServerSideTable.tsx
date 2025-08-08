import React, { useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "./index.css";
import { Box, Typography } from "@mui/material";
import NavButton from "./NavButton";
import { RowSelectionOptions } from "ag-grid-community";

const AgGridServerSideTable: React.FC<any> = ({
  rowData,
  columnDefs,
  height = 328,
  width,
  rowHeight = 50,
  onRowClicked,
  disablePagination = false,
  rowSelection = false,
  handleRowSelection = () => {},
  currentPage = 0,
  totalPages = 0,
  nextPageUrl,
  previousPageUrl,
  onNextPage,
  onPreviousPage,
  loading,
  className = "",
  onColumnHeaderClicked = () => {},
}) => {
  const gridRef = useRef<any>(null);

  const rowSelectionMemo = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  return (
    <Box className={className} sx={{ width: width || "100%" }}>
      <div
        className="ag-theme-material"
        style={{
          height: height,
          width: width || "100%",
        }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            sortable: true,
          }}
          domLayout="normal"
          rowHeight={rowHeight}
          onRowClicked={onRowClicked}
          rowSelection={rowSelection ? rowSelectionMemo : undefined}
          onRowSelected={handleRowSelection}
          onColumnHeaderClicked={onColumnHeaderClicked}
          getRowClass={(params) => {
            if (className === "feedback-grid-wrapper") {
              return "feedback-row-no-hover";
            }
            return "";
          }}
        />
      </div>

      {!disablePagination && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "12px",
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "12px" }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Box>
            <NavButton
              text="Back"
              onClick={onPreviousPage}
              disabled={loading || !previousPageUrl || currentPage <= 1}
            />
            <NavButton
              text="Next"
              onClick={onNextPage}
              disabled={loading || !nextPageUrl}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AgGridServerSideTable;
