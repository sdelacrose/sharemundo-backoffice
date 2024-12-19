import {  Search } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { filterItems } from "./solutionData";
import AgGridTable from "@/app/ag-grid";
import useColumnUserConnection from "@/app/hooks/Grid-Table/useColumnUserConnection";
import { UserConnectionColumnDefs } from "@/app/const/GridTable/ColDef";
import { UserConnectionRow } from "@/app/const/GridTable/RowData";

const UserConnectionTab = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const query=event.target.value;
     console.log(query)

  };
  const [, setSelectedFilter] = useState<string | null>(null);

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };
  const userConnectionCol = useColumnUserConnection(UserConnectionColumnDefs);

  return (
    <>
      <Box>
        <Typography variant="h5" mb={3}>
          Company Users
        </Typography>
        <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={3}>
          <CustomButton variant="outlined">Internal Users</CustomButton>
          <CustomButton variant="outlined" background="#F0F2F5">
            Connections
          </CustomButton>
        </Box>
        <Box mb={3}>
          <Box mr={4} display={"flex"} alignItems={"center"} gap={2}>
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search here..."
              onChange={handleSearchChange}
              width="340px"
            />{" "}
            <CustomFilterSelect items={filterItems} onSelect={handleSelect} />
          </Box>
        </Box>
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
            rowData={UserConnectionRow}
            columnDefs={userConnectionCol}
          />
        </Box>
      </Box>
    </>
  );
};

export default UserConnectionTab;
