import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Box, Button, ButtonGroup } from "@mui/material";
import React, { useState } from "react";
import { filterItems } from "./solutionData";
import AgGridTable from "@/app/ag-grid";
import AddUserDrawer from "./addUserDrawer";
import useColumnUser from "@/app/hooks/Grid-Table/useColumnUser";
import { UserColumnDefs } from "@/app/const/GridTable/ColDef";
import { UserRow } from "@/app/const/GridTable/RowData";

const UserTab = () => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query);
  };
  const [, setSelectedFilter] = useState<string | null>(null);

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };
  const userCol = useColumnUser(UserColumnDefs);
  const [, setBlockDrawer] = useState(false);
  const [userDrawer, setUserDrawer] = useState(false);
  const handleUserDrawer = () => {
    setUserDrawer(true);
  };

  const handleCloseDrawer = () => {
    setUserDrawer(false);
  };
  // const handleCloseBlockDrawer = () => {
  //   setBlockDrawer(false);
  // };
  const handleBlockDrawer = () => {
    setBlockDrawer(true);
  };
  return (
    <>
      <Box>
        <Box display={"flex"} alignItems={"center"} gap={"12px"} mb={3}>
          <CustomButton variant="outlined">Internal Users</CustomButton>
          <CustomButton variant="outlined" background="#F0F2F5">
            Connections
          </CustomButton>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={3}
        >
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button startIcon={<Adduser />} onClick={handleUserDrawer}>
              Add Users{" "}
            </Button>
            <Button startIcon={<BlockUser />} onClick={handleBlockDrawer}>
              {" "}
              Block User
            </Button>
          </ButtonGroup>
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
          <AgGridTable rowData={UserRow} columnDefs={userCol} />
        </Box>
        {userDrawer && (
          <AddUserDrawer open={userDrawer} handleClose={handleCloseDrawer} />
        )}
      </Box>
    </>
  );
};

export default UserTab;
