import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { Companies, Freelancers, TotalCustomers } from "@/app/assets/icons";

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
        <Typography
          variant="body1"
          sx={{
            color: "#101928",
            fontSize: "18px",
            mb: 2,
          }}
        >
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
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <TotalCustomers />
              </Box>
            }
            title="Total Customers"
            value={stats?.total_customers}
          />
          <StatsCard
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <Companies />
              </Box>
            }
            title="Companies"
            value={stats?.company_admins_count}
          />
          <StatsCard
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <Freelancers />
              </Box>
            }
            title="Freelancers"
            value={stats?.freelancers_count}
          />
        </Box>
      </Box>
    </>
  );
};

export default CustomersStatsContainer;
