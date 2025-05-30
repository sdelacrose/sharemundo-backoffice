import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import ActivityItem from "./activityItem";
import { DateFormat } from "@/app/utils/FormatDate";

type ActivityLog = {
  user: string;
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

      switch (log.action) {
        case "License Purchased":
          return {
            user: log.user,
            action: "purchased a license",
            date: formattedDate,
          };
        case "Payment Declined":
          return {
            user: log.user,
            action: "had a payment declined",
            date: formattedDate,
          };
        case "License Renewed":
          return {
            user: log.user,
            action: "renewed a license",
            date: formattedDate,
          };
        default:
          return {
            user: log.user,
            action: "performed an unknown action",
            date: formattedDate,
          };
      }
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
