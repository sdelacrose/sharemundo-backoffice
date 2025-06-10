import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { BlockedUsers } from "@/app/assets/icons";

const BlockedStatContainer = ({ heading, stats }: any) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #E4E7EC",
          background: "#8a8a8a",
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

export default BlockedStatContainer;
