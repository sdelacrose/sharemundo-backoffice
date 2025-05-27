import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { ActiveUser, BlockUser, TotalUser } from "@/app/assets/icons";

const UsersStatsContainer = ({ heading, stats }: any) => {
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
            icon={<TotalUser />}
            title="Total Users"
            value={stats?.total_users}
          />
          <StatsCard
            icon={<ActiveUser />}
            title="Active Users"
            value={stats?.active_users}
          />
          <StatsCard
            icon={<BlockUser />}
            title="Internal User"
            value={stats?.internal_users_count}
          />
          <StatsCard
            icon={<BlockUser />}
            title="Blocked Users"
            value={stats?.blocked_users}
          />
        </Box>
      </Box>
    </>
  );
};

export default UsersStatsContainer;
