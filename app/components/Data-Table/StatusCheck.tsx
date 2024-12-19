import { Box, Typography } from "@mui/material";
import { CustomCellRendererProps } from "ag-grid-react";
import React from "react";

const StatusCheck = (props: CustomCellRendererProps) => {
  let background = "#FBEAE9";
  let color = "#9E0A05";
  let text = "Failed";
  const normalizedStatus = props.value;

  if (normalizedStatus === "active") {
    background = "#E7F6EC";
    color = "#036B26";
    text = "Active";
  } else if (normalizedStatus === "stopped") {
    background = "#FEF6E7";
    color = "#865503";
    text = "Stopped";
  } else if (normalizedStatus === "disabled") {
    color = "#344054";
    background = "#F0F2F5";
    text = "Disabled";
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
