import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";

const StatsContainer = ({ heading, stats }: any) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #E4E7EC",
          background: "#fff",
          padding: "16px",
        }}
      >
        <Typography variant="h5" color="#475367" mb={2}>
          {heading}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          {stats.map((stat: any, index: any) => (
            <StatsCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
            />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default StatsContainer;
