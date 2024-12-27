import AgGridTable from "@/app/ag-grid";
// import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";
import { BillingColumnDefs } from "@/app/const/GridTable/ColDef";
import {
  
  BillingFreelancerRow,
} from "@/app/const/GridTable/RowData";
import useColumnBilling from "@/app/hooks/Grid-Table/useColumnBillingCompany";
import { Box } from "@mui/material";
import React from "react";

const BillingTab = () => {
  const BillingFreelncerCol = useColumnBilling(BillingColumnDefs);

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
          {/* <SelectDatePicker /> */}
        </Box>
        <AgGridTable
          rowData={BillingFreelancerRow}
          columnDefs={BillingFreelncerCol}
        />
      </Box>
    </>
  );
};

export default BillingTab;
