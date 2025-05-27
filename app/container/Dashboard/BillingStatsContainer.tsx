import { Box, Typography } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";
import { BillingCard } from "@/app/assets/icons";
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
          icon={<BillingCard />}
          title="Current Revenue"
          value={formatCurrency(stats?.current_revenue)}
        />
        <StatsCard
          icon={<BillingCard />}
          title="Next Month Revenue (approx.)"
          value={formatCurrency(stats?.one_month_after_revenue)}
        />
        <StatsCard
          icon={<BillingCard />}
          title="Last 12 months Revenue"
          value={formatCurrency(stats?.last_12_months_revenue)}
        />
        <StatsCard
          icon={<BillingCard />}
          title="Next 12 months Revenue (approx.) "
          value={formatCurrency(stats?.next_12_months_revenue)}
        />
      </Box>
    </Box>
  );
};

export default BillingStatsContainer;
