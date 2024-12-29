import React from "react";
import { Box, Typography } from "@mui/material";

interface StatusCheckProps {
  value: string;
}

const StatusCheck: React.FC<StatusCheckProps> = ({ value }) => {
  let background = "#F4F5F7";
  let color = "#6B7280";
  let text = "Unknown";

  const normalizedStatus = value?.toLowerCase();

  switch (normalizedStatus) {
    case "active":
      background = "#E7F6EC";
      color = "#036B26";
      text = "Active";
      break;
    case "on hold":
      background = "#FEF6E7";
      color = "#865503";
      text = "On Hold";
      break;
    case "disabled":
      background = "#F0F2F5";
      color = "#344054";
      text = "Disabled";
      break;
    case "stopped":
      background = "#FEF6E7";
      color = "#865503";
      text = "Stopped";
      break;
    case "failed":
      background = "#FBEAE9";
      color = "#9E0A05";
      text = "Failed";
      break;
    default:
      background = "#F4F5F7";
      color = "#6B7280";
      text = "Unknown";
      break;
  }

  return (
    <Box
      sx={{
        padding: "2px 12px",
        background,
        borderRadius: "30px",
        width: "max-content",
        marginTop: "14px",
        color,
      }}
    >
      <Typography variant="body2">{text}</Typography>
    </Box>
  );
};

export default StatusCheck;
