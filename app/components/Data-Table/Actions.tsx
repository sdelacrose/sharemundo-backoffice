import { Box, Typography } from "@mui/material";
import React from "react";

interface ActionsProps {
  viewText: string;
  removeText: string;
  handleOpenDrawer?: (actionType: string) => void;
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
        return "green";
      case "download":
        return "#32ADE6";
      default:
        return "#0057b7";
    }
  };

  const handleClick = (actionType: string) => {
    if (handleOpenDrawer) {
      handleOpenDrawer(actionType);
    }
  };

  return (
    <Box display="flex" gap={1} alignItems="center">
      <Typography
        variant="caption"
        color="#0057b7"
        fontSize={14}
        onClick={() => handleClick(viewText.toLowerCase())}
      >
        {viewText}
      </Typography>
      <Typography
        variant="caption"
        color={getActionColor(removeText)}
        fontSize={14}
        onClick={() => handleClick(removeText.toLowerCase())}
      >
        {removeText}
      </Typography>
    </Box>
  );
};

export default Actions;
