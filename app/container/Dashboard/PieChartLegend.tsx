import { Box } from "@mui/material";
import React from "react";

const PieChartLegend = ({
  data,
  colors,
}: {
  data: { name: string; value: number }[];
  colors: string[];
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        marginBottom: 2,
        marginLeft: 3,
      }}
    >
      {data.map((item, index) => (
        <Box
          key={item.name}
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: 3,
            marginBottom: 1,
          }}
        >
          <Box
            sx={{
              width: 14,
              height: 14,
              bgcolor: colors[index % colors.length],
              borderRadius: "50%",
              mr: 1,
            }}
          />
          <span style={{ fontSize: 14, color: "#333" }}>{item.name}</span>
        </Box>
      ))}
    </Box>
  );
};

export default PieChartLegend;
