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
import ResumeDrawer from "./resumeDrawer";
import EditDrawer from "./editDrawer";
import StopDrawer from "./stopDrawer";
import NewSolutionDrawer from "./newSolutionDrawer";
import { apiCall } from "@/app/utils/APIUtils";
import AgGridServerSideTable from "@/app/ag-grid/AgGridServerSideTable";
import _debounce from "lodash/debounce";
import Loader from "@/app/components/common/Loader";

const SolutionLicenseMain = () => {
  const [drawerType, setDrawerType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [solutionData, setSolutionData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);
  const [chartData, setChartData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [previousPageUrl, setPreviousPageUrl] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchSolutionData = async (url: string) => {
    try {
      setLoading(true);
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const data = await apiCall(trimmedUrl, "GET");
      const solutions = data?.results?.solutions || [];
      const extractedData = solutions.map(
        ({
          name,
          price,
          status,
          license_count,
          id,
          link,
          description,
        }: any) => ({
          name,
          price,
          status,
          license_count,
          id,
          link: link || "",
          description: description || "",
        })
      );
      setSolutionData(extractedData);
      setNextPageUrl(data?.next || null);
      setPreviousPageUrl(data?.previous || null);
      setTotalPages(Math.ceil((data?.count || 0) / 10));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching solution data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolutionData("/admin-dashboard/products");
  }, []);

  const handleNextPage = () => {
    if (nextPageUrl) {
      fetchSolutionData(nextPageUrl);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (previousPageUrl) {
      fetchSolutionData(previousPageUrl);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSearchChange = _debounce(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      try {
        const data = await apiCall(
          `/admin-dashboard/products?search=${query}`,
          "GET"
        );

        setSolutionData(data?.results?.solutions || []);
        setNextPageUrl(data?.next || null);
        setPreviousPageUrl(data?.previous || null);
        setTotalPages(Math.ceil((data?.count || 0) / 10));
      } catch (err) {
        console.error("Error searching solutions:", err);
      }
    },
    500
  );

  const endpoints = {
    0: "/admin-dashboard/customers/stats",
    1: "/admin-dashboard/users/stats",
    2: "/admin-dashboard/licenses/stats",
  };

  useEffect(() => {
    const fetchData = async (endpoint: string) => {
      try {
        setLoading(true);
        const data = await apiCall(endpoint, "GET");
        const transformedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          value: value as number,
        }));
        console.log("Chart data-------", transformedData);
        setChartData(transformedData);
        setLoading(false);
      } catch (err) {
        console.error(`Error fetching data from ${endpoint}:`, err);
        setLoading(false);
      }
    };

    fetchData(endpoints[activeTab]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);
  const handleOpenDrawer = (actionType: string, id: string) => {
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

  const context = useContext(SidebarContext);
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
    if (loading) {
      return <Loader />;
    }
    switch (activeTab) {
      case 0:
        return <BarChartComponent data={chartData} />;
      case 1:
        return <SmoothLineChart data={chartData} />;
      case 2:
        return <SharpLineChart data={chartData} />;
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
      await apiCall(endpoint, "POST", null, null, {
        successMessage: "Solution updated successfully!",
        errorMessage: "Failed to update the solution. Please try again.",
      });
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
    console.log("newSolution-----", newSolution);
    setSolutionData((prevData) => [...prevData, newSolution]);
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
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
              <CustomTabs
                tabs={tabs}
                onTabChange={handleTabChange}
                value={activeTab}
              />
              {renderChart()}
            </Stack>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={2}
            justifyContent={"space-between"}
            mb={2}
          >
            <CustomSearchField
              startIcon={<Search />}
              placeholder="Search here..."
              onChange={handleSearchChange}
              width="340px"
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
            <AgGridServerSideTable
              rowData={solutionData}
              columnDefs={SolutionMainCol}
              currentPage={currentPage}
              totalPages={totalPages}
              nextPageUrl={nextPageUrl}
              previousPageUrl={previousPageUrl}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              height={580}
            />

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
                // <EditDrawer
                //   open={drawerType === "edit"}
                //   handleClose={handleCloseDrawer}
                //   id={selectedId}
                //   initialData={solutionData.find(
                //     (item) => item.id === selectedId
                //   )}
                //   onUpdateData={(updatedItem) => {
                //     setSolutionData((prevData) =>
                //       prevData.map((item) =>
                //         item.id === updatedItem.id ? updatedItem : item
                //       )
                //     );
                //   }}
                // />

                <EditDrawer
                  open={drawerType === "edit"}
                  handleClose={handleCloseDrawer}
                  id={selectedId}
                  initialData={solutionData.find(
                    (item) => item.id === selectedId
                  )}
                  onUpdateData={handleUpdateData}
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
