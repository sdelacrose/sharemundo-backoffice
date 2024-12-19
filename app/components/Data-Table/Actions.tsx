import { Box, Typography } from "@mui/material";
import React from "react";

interface ActionsProps {
  viewText: string;
  removeText: string;
  handleOpenDrawer?: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  viewText,
  removeText,
  handleOpenDrawer,
}) => {
  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "remove":
      case "stop":
      case "disconnect":
        return "#FF3B30";
      case "resume":
        return "#34C759";
      default:
        return "#344054";
    }
  };

  const handleClick = () => {
    if (
      (handleOpenDrawer && removeText.toLowerCase() === "resume") ||
      (handleOpenDrawer && removeText.toLowerCase() === "stop") ||
      (handleOpenDrawer && removeText.toLowerCase() === "edit") ||
      (handleOpenDrawer && removeText.toLowerCase() === "new")
    ) {
      handleOpenDrawer();
    }
  };

  return (
    <Box display="flex" gap={1} alignItems="center">
      <Typography variant="caption" color="#0057b7" fontSize={14}>
        {viewText}
      </Typography>
      <Typography
        variant="caption"
        color={getActionColor(removeText)}
        fontSize={14}
        onClick={handleClick}
      >
        {removeText}
      </Typography>
    </Box>
  );
};

export default Actions;
