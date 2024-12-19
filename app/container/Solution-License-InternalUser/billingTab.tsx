import AgGridTable from "@/app/ag-grid";
import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";
import {
  InternaluserbillingColumnDefs,
} from "@/app/const/GridTable/ColDef";
import {
  InternaluserBillingRow,
} from "@/app/const/GridTable/RowData";
import useColumnBillingInternaluser from "@/app/hooks/Grid-Table/useColumnBillingInternaluser";
import { Box } from "@mui/material";
import React from "react";

const BillingTab = () => {
  const BillingInternaluserCol = useColumnBillingInternaluser(
    InternaluserbillingColumnDefs
  );

  return (
    <>
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
        <Box m={2} display={"flex"} justifyContent={"end"}>
          <SelectDatePicker />
        </Box>
        <AgGridTable
          rowData={InternaluserBillingRow}
          columnDefs={BillingInternaluserCol}
        />
      </Box>
    </>
  );
};

export default BillingTab;
