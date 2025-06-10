import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import {
  BillingCard,
  Last12Revenue,
  Next12Revenue,
  NextRevenue,
} from "@/app/assets/icons";
import { formatCurrency } from "@/app/utils/FormatCurrency";

const BillingStatsContainer = ({ heading, stats }: any) => {
  return (
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
          icon={<BillingCard />}
          title="Current Revenue"
          value={formatCurrency(stats?.current_revenue)}
        />
        <StatsCard
          icon={
            <Box sx={{ width: 24, height: 24 }}>
              <NextRevenue />
            </Box>
          }
          title="Next Month Revenue (approx.)"
          value={formatCurrency(stats?.one_month_after_revenue)}
        />
        <StatsCard
          icon={
            <Box sx={{ width: 24, height: 24 }}>
              <Last12Revenue />
            </Box>
          }
          title="Last 12 months Revenue"
          value={formatCurrency(stats?.last_12_months_revenue)}
        />
        <StatsCard
          icon={
            <Box sx={{ width: 24, height: 24 }}>
              <Next12Revenue />
            </Box>
          }
          title="Next 12 months Revenue (approx.) "
          value={formatCurrency(stats?.next_12_months_revenue)}
        />
      </Box>
    </Box>
  );
};

export default BillingStatsContainer;
