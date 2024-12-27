import React from "react";
import { Box, Typography } from "@mui/material";

interface StatusBadgeProps {
  color: string;
  background: string;
  text: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ color, background, text }) => {
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

export default StatusBadge;