import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "./index.css";
import { AgGridTableProps } from "../types/AgGridProps";
import { Box, Typography } from "@mui/material";
import { RowSelectionOptions } from "ag-grid-community";
import NavButton from "./NavButton";

const AgGridTable: React.FC<AgGridTableProps> = ({
  rowData,
  columnDefs,
  height = 306,
  width,
  rowHeight = 60,
  paginationPageSize = 10,
  onRowClicked,
  disablePagination = false,
  rowSelection = false,
  handleRowSelection = () => {},
}) => {
  const gridRef = useRef<any>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const rowSelectionMemo = useMemo<
    RowSelectionOptions | "single" | "multiple"
  >(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const updatePagination = () => {
    const api = gridRef.current?.api;
    if (api) {
      setCurrentPage(api.paginationGetCurrentPage());
      setTotalPages(api.paginationGetTotalPages());
    }
  };

  const goToPreviousPage = () => {
    gridRef.current.api.paginationGoToPreviousPage();
    updatePagination();
  };

  const goToNextPage = () => {
    gridRef.current.api.paginationGoToNextPage();
    updatePagination();
  };

  const onGridReady = () => {
    if (!disablePagination) {
      updatePagination();
    }
  };

  return (
    <Box sx={{ width: width || "100%" }}>
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
          pagination={!disablePagination}
          paginationPageSize={
            !disablePagination ? paginationPageSize : undefined
          }
          domLayout="normal"
          rowHeight={rowHeight}
          onRowClicked={onRowClicked}
          suppressPaginationPanel={true}
          onGridReady={onGridReady}
          rowSelection={rowSelection ? rowSelectionMemo : undefined}
          onRowSelected={handleRowSelection}
          onPaginationChanged={
            !disablePagination ? updatePagination : undefined
          }
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
            Page {currentPage + 1} of {totalPages}
          </Typography>
          <Box>
            <NavButton
              text="Back"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
            />
            <NavButton
              text="Next"
              onClick={goToNextPage}
              disabled={currentPage + 1 === totalPages || totalPages === 0}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AgGridTable;
