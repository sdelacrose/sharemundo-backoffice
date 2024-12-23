import { Box, Typography } from "@mui/material";
import React from "react";

interface ActionsProps {
  buttons: { label: string; actionType: string; color?: string }[];
  handleOpenDrawer?: (actionType: string) => void;
}

const Actions: React.FC<ActionsProps> = ({ buttons, handleOpenDrawer }) => {
  const handleClick = (actionType: string) => {
    if (handleOpenDrawer) {
      handleOpenDrawer(actionType);
    }
  };

  return (
    <Box display="flex" gap={2} alignItems="center">
      {buttons.map((button, index) => (
        <Typography
          key={index}
          variant="caption"
          color={button.color || "#0057b7"}
          fontSize={14}
          onClick={() => handleClick(button.actionType)}
          style={{ cursor: "pointer", marginTop: "16px" }}
        >
          {button.label}
        </Typography>
      ))}
    </Box>
  );
};

export default Actions;
