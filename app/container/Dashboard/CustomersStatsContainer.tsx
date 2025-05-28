import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { ActiveUser, BlockUser } from "@/app/assets/icons";

const CustomersStatsContainer = ({ heading, stats }: any) => {
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
            <StatsCard
              icon={<ActiveUser />}
              title='Total Customers'
              value={stats?.company_admins_count+stats?.freelancers_count}
            />
            <StatsCard
              icon={<ActiveUser />}
              title='Companies'
              value={stats?.company_admins_count}
            />
            <StatsCard
              icon={<BlockUser />}
              title='Freelancers'
              value={stats?.freelancers_count}
            />
            
        </Box>
      </Box>
    </>
  );
};

export default CustomersStatsContainer;
