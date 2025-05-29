import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import BarChartComponent from "@/app/components/common/Barchart";

const tabLabels = ["Licences", "Customers", "Users"];

const TrendsChartTabs = ({ data }: { data: any }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  function transformData(data: Record<string, number>) {
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }

  const getTabData = () => {
    switch (activeTab) {
      case 0:
        return transformData(data.licenses.monthly_breakdown);
      case 1:
        return transformData(data.customers.monthly_breakdown);
      case 2:
        return transformData(data.users.monthly_breakdown);
      default:
        return [];
    }
  };

  return (
    <Box
      sx={{
        background: "#fff",
        padding: "16px",
        width: "100%",
        height: "auto",
      }}
    >
      <Tabs value={activeTab} onChange={handleTabChange}>
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 4 }}>
        <BarChartComponent data={getTabData()} />
      </Box>
    </Box>
  );
};

export default TrendsChartTabs;
