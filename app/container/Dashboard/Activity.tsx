import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import React from "react";
import ActivityItem from "./activityItem";
import { DateFormat } from "@/app/utils/FormatDate";

export type ActivityLog = {
  user: {
    id: number;
    name: string;
  } | null;
  company_profile: {
    id: number;
    name: string;
  } | null;
  action: string;
  created_at: string;
};

type ActivityProps = {
  activityData: ActivityLog[];
  ref: (node?: Element | null) => void;
  isLoading: boolean;
};

type TransformedActivity = {
  user: string;
  action: string;
  date: string;
};

const Activity: React.FC<ActivityProps> = ({
  activityData,
  isLoading,
  ref,
}) => {
  const transformActivityLogs = (
    logs: ActivityLog[]
  ): TransformedActivity[] => {
    return logs.map((log) => {
      const formattedDate = DateFormat(log.created_at);

      const actor =
        log.user?.name || log.company_profile?.name || "Company Admin";

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
        <Box sx={{ maxHeight: "360px", overflowY: "auto" }}>
          {transformedLogs.map((activity, index) => (
            <ActivityItem
              key={index}
              user={activity.user}
              action={activity.action}
              date={activity.date}
            />
          ))}

          <div ref={ref} />

          {isLoading && (
            <Box display="flex" justifyContent="center" p={2}>
              <CircularProgress size={20} />
            </Box>
          )}

          {!isLoading && activityData.length > 0 && (
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                p: 2,
                color: "#6B7280",
                fontStyle: "italic",
              }}
            >
              No more activities
            </Typography>
          )}
        </Box>
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
