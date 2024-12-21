import React from "react";
import { Box, Typography } from "@mui/material";

const Legend = () => {
  const items = [
    { label: "Customers", color: "#003E82" },
    { label: "Users", color: "#00C1D4" },
    { label: "Licenses", color: "#F3A218" },
  ];

  return (
    <Box display="flex" alignItems="center" gap={3}>
      {items.map((item, index) => (
        <Box key={index} display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: item.color,
            }}
          />
          <Typography
            variant="body2"
            sx={{ fontSize: "14px", color: "#4A4A4A", fontWeight: "500" }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Legend;
