import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import {
  ActiveUsers,
  BlockedUsers,
  InternalUsers,
  TotalUsers,
} from "@/app/assets/icons";

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
                <TotalUsers />
              </Box>
            }
            title="Total Users"
            value={stats?.total_users}
          />
          <StatsCard
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <InternalUsers />
              </Box>
            }
            title="Internal User"
            value={stats?.internal_users_count}
          />
          <StatsCard
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <ActiveUsers />
              </Box>
            }
            title="Active Users"
            value={stats?.active_users}
          />
          <StatsCard
            icon={
              <Box sx={{ width: 24, height: 24 }}>
                <BlockedUsers />
              </Box>
            }
            title="Blocked Users"
            value={stats?.blocked_users}
          />
        </Box>
      </Box>
    </>
  );
};

export default UsersStatsContainer;
