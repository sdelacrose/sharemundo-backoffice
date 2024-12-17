"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import useColumnSolutions from "@/app/hooks/Grid-Table/useColumnSolutions";
import {
  manageCustomersColumnDefs,
  solutionColumnDefs,
  solutionsLicenseColumnDefs,
} from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import {
  manageCustomersRow,
  solutionsLicenseRow,
  SolutionsRow,
} from "@/app/const/GridTable/RowData";
import Header from "@/app/components/common/Header";
import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";
import { SidebarContext } from "@/app/(pages)/layout";
import { Adduser, BlockUser, Search } from "@/app/assets/icons";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import lineChart from "../../assets/images/Line Chart.png";
import Image from "next/image";
import useColumnManageUserDefs from "@/app/hooks/Grid-Table/useColumnManageUser";
import { filterItems, solutionsBreadcrumb, tabs } from "./solutionData";
import CustomTabs from "@/app/components/common/CustomTab";
import useColumnSolutionLicense from "@/app/hooks/Grid-Table/useColumnSolutionLicense";
import CustomButton from "@/app/components/common/CustomButton";

const SolutionLicenses = () => {
  const context = useContext(SidebarContext);
  const [addDrawer, setAddDrawer] = useState(false);
  const handleAddDrawer = () => {
    setAddDrawer(true);
  };

  const handleCloseDrawer = () => {
    setAddDrawer(false);
  };
  const [openBlockDrawer, setBlockDrawer] = useState(false);
  const handleBlockDrawer = () => {
    setBlockDrawer(true);
  };

  const handleCloseBlockDrawer = () => {
    setBlockDrawer(false);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
  };
  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleSelect = (label: string | null) => {
    console.log("Selected filter:", label);
    setSelectedFilter(label);
  };
  const solutionLicense = useColumnSolutionLicense(solutionsLicenseColumnDefs);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <>
      <Box
        sx={{
          flex: 1,
          marginLeft: context.isSidebarCollapsed ? "92px" : "280px",
          minHeight: "100vh",
          paddingLeft: "12px",
          transition: "all 0.3s ease",
        }}
      >
        <Box sx={{ marginLeft: "-24px" }}>
          <Header breadcrumbItems={solutionsBreadcrumb} />
        </Box>
        <Box sx={{ margin: "24px 24px 24px 0" }}>
          <Typography variant="h2" paddingBottom={"8px"}>
            XYZ Solar Limited, Berlin,GR{" "}
          </Typography>
          <Typography variant="body2" color="#0057b7" mt={1.5} fontSize={16}>
            Company
          </Typography>
          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />

          <Box mb={4}>
            <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
          </Box>
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
              <Button startIcon={<Adduser />} onClick={handleAddDrawer}>
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
            rowData={solutionsLicenseRow}
            columnDefs={solutionLicense}
          />
        </Box>
      </Box>
    </>
  );
};

export default SolutionLicenses;
