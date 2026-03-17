import React, { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "./index.css";
import { Box, Typography, CircularProgress } from "@mui/material";
import NavButton from "./NavButton";
import { RowSelectionOptions } from "ag-grid-community";

const AgGridServerSideTable = forwardRef<any, any>(
  (
    {
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
      isRowSelectable,
    },
    ref,
  ) => {
    const gridRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      get api() {
        return gridRef.current?.api;
      },
    }));

    const rowSelectionMemo = useMemo<
      RowSelectionOptions | "single" | "multiple"
    >(() => {
      return {
        mode: "multiRow",
        ...(isRowSelectable && { isRowSelectable }),
      };
    }, [isRowSelectable]);

    return (
      <Box
        className={className}
        sx={{ width: width || "100%", position: "relative" }}
      >
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              zIndex: 1000,
              borderRadius: "10px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
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
            getRowClass={() => {
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
  },
);

AgGridServerSideTable.displayName = "AgGridServerSideTable";

export default AgGridServerSideTable;
