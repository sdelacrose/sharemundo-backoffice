"use client";

import { SidebarContext } from "@/app/(pages)/layout";
import Header from "@/app/components/common/Header";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CustomTabs from "@/app/components/common/CustomTab";
import { solutionsBreadcrumb, tabs } from "./data";
import BarChartComponent from "@/app/components/common/Barchart";
import SmoothLineChart from "@/app/components/common/SmoothLineChart";
import SharpLineChart from "@/app/components/common/SharpLineChart";
import CustomSearchField from "@/app/components/common/CustomSearch";
import { Search } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import useColumnSolutionMain from "@/app/hooks/Grid-Table/useColumnSolutionMain";
import { SolutionMainColumnDefs } from "@/app/const/GridTable/ColDef";
import AgGridTable from "@/app/ag-grid";
import ResumeDrawer from "./resumeDrawer";
import EditDrawer from "./editDrawer";
import StopDrawer from "./stopDrawer";
import NewSolutionDrawer from "./newSolutionDrawer";
import { apiCall } from "@/app/utils/APIUtils";

const SolutionLicenseMain = () => {
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [solutionData, setSolutionData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        const data = await apiCall("/admin-dashboard/products", "GET");
        const solutions = data?.results?.solutions || [];
        const extractedData = solutions.map(
          ({ name, price, status, license_count, id }) => ({
            name,
            price,
            status,
            license_count,
            id,
          })
        );

        console.log("solutionss :", extractedData);

        setSolutionData(extractedData);
        setLoading(false);
        
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setLoading(false);
      }
    };

    fetchSolutionData();
  }, []);

  const handleOpenDrawer = (actionType: string, id: string) => {
    console.log("Opening drawer with action:", actionType, "ID:", id);
    setDrawerType(actionType);
    setSelectedId(id);
  };

  const handleCloseDrawer = () => {
    setDrawerType(null);
    setSelectedId(null);
  };
  const SolutionMainCol = useColumnSolutionMain(
    SolutionMainColumnDefs,
    (action: string, id: string) => handleOpenDrawer(action, id)
  );
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    console.log(query);
  };
  const context = useContext(SidebarContext);
  const [activeTab, setActiveTab] = useState(0);
  const [newSolution, setNewSolution] = useState(false);

  if (context === undefined) {
    return <div>Error: Sidebar context is undefined!</div>;
  }
  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
  };
  const handleOpenNewSolution = () => {
    setNewSolution(true);
  };
  const handleCloseNewSolution = () => {
    setNewSolution(false);
  };

  const renderChart = () => {
    switch (activeTab) {
      case 0:
        return <BarChartComponent />;
      case 1:
        return <SmoothLineChart />;
      case 2:
        return <SharpLineChart />;
      default:
        return <div>chart here</div>;
    }
  };
  const handleStatusUpdate = async (id: string, action: string) => {
    const endpoint =
      action === "resume"
        ? `/admin-dashboard/products/${id}/resume`
        : `/admin-dashboard/products/${id}/stop`;

    try {
      await apiCall(endpoint, "POST");
      setSolutionData((prevData: any) =>
        prevData.map((item: any) =>
          item.id === id
            ? {
                ...item,
                status: action === "resume" ? "Active" : "Stopped",
              }
            : item
        )
      );
    } catch (error) {
      console.error(`Error updating status for ${id}:`, error);
    }
  };
  
  const handleUpdateData = (updatedItem: any) => {
    setSolutionData((prevData: any) =>
      prevData.map((item: any) =>
        item.id === updatedItem.id ? { ...item, ...updatedItem } : item
      )
    );
  };

  const handleSolutionCreated = (newSolution: any) => {
    setSolutionData((prevData) => [...prevData, newSolution]);
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
            Solution and Licenses
          </Typography>
          <Typography variant="body2" color="#475367" mt={1} fontSize={16}>
            Sharemundo Back Office
          </Typography>
          <Divider
            sx={{
              borderColor: "rgba(240, 242, 245, 1)",
              marginTop: "24px",
              marginBottom: "27px",
            }}
          />
          <Box
            mb={3}
            borderRadius={"10px"}
            border={"1px solid #E4E7EC"}
            padding={2}
            bgcolor={"#fff"}
          >
            <Stack gap={2}>
              <CustomTabs tabs={tabs} onTabChange={handleTabChange} />
              {renderChart()}
            </Stack>
          </Box>
          <Box
            mr={4}
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            mb={2}
          >
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search Company..."
              onChange={handleSearchChange}
              height="36px"
            />
            <CustomButton variant="contained" onClick={handleOpenNewSolution}>
              Add Solution
            </CustomButton>
          </Box>
          <Box
            sx={{
              borderRadius: "10px",
              border: "1px solid #E4E7EC",
              backgroundColor: "#FFF",
              boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
              marginTop: "24px",
            }}
          >
            <AgGridTable rowData={solutionData} columnDefs={SolutionMainCol} />

            <Box>
              {drawerType === "resume" && selectedId && (
                <ResumeDrawer
                  open={drawerType === "resume"}
                  handleClose={handleCloseDrawer}
                  id={selectedId}
                  onUpdateStatus={handleStatusUpdate}
                />
              )}
              {drawerType === "edit" && selectedId && (
                <EditDrawer
                  open={drawerType === "edit"}
                  handleClose={handleCloseDrawer}
                  id={selectedId}
                  initialData={solutionData.find(
                    (item) => item.id === selectedId
                  )}
                  onUpdateData={(updatedItem) => {
                    setSolutionData((prevData) =>
                      prevData.map((item) =>
                        item.id === updatedItem.id ? updatedItem : item
                      )
                    );
                  }}
                />
              )}
              {drawerType === "stop" && selectedId && (
                <StopDrawer
                  open={drawerType === "stop"}
                  handleClose={handleCloseDrawer}
                  id={selectedId}
                  onUpdateStatus={handleStatusUpdate}
                />
              )}
            </Box>

            {newSolution && (
              <NewSolutionDrawer
                open={newSolution}
                handleClose={handleCloseNewSolution}
                onSolutionCreated={handleSolutionCreated}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SolutionLicenseMain;
