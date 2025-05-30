import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ActivityItem from "./activityItem";
import { DateFormat } from "@/app/utils/FormatDate";

type ActivityLog = {
  user: {
    id: number;
    name: string;
  } | null;
  company_profile: {
    id: number;
    name: string;
  } | null;
  action: "License Purchased" | "Payment Declined" | "License Renewed";
  created_at: string;
};

type ActivityProps = {
  activityData: ActivityLog[];
};

type TransformedActivity = {
  user: string;
  action: string;
  date: string;
};

const Activity: React.FC<ActivityProps> = ({ activityData }) => {
  const transformActivityLogs = (
    logs: ActivityLog[]
  ): TransformedActivity[] => {
    return logs.map((log) => {
      const formattedDate = DateFormat(log.created_at);

      const actor = log.user?.name || log.company_profile?.name || "Company Admin";

      let actionText = "";
      switch (log.action) {
        case "License Purchased":
          actionText = "purchased a license";
          break;
        case "Payment Declined":
          actionText = "had a payment declined";
          break;
        case "License Renewed":
          actionText = "renewed a license";
          break;
        default:
          actionText = "performed an unknown action";
          break;
      }

      return {
        user: actor,
        action: actionText,
        date: formattedDate,
      };
    });
  };

  const transformedLogs = transformActivityLogs(activityData || []);
  return (
    <Box
      sx={{
        borderRadius: "10px",
        border: "1px solid #E4E7EC",
        background: "#fff",
        height: "100%",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          padding: "12px 24px",
          color: "#101928",
          fontSize: "18px",
        }}
      >
        Activity
      </Typography>
      <Divider
        sx={{
          borderColor: "rgba(240, 242, 245, 1)",
        }}
      />
      {transformedLogs.length > 0 ? (
        transformedLogs.map((activity, index) => (
          <ActivityItem
            key={index}
            user={activity.user}
            action={activity.action}
            date={activity.date}
          />
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            variant="body2"
            sx={{
              padding: "16px 24px",
              color: "#6B7280",
              fontStyle: "italic",
            }}
          >
            No activities to show
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Activity;
