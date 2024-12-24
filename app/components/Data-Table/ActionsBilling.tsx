import { Box, Typography } from "@mui/material";
import React from "react";

interface ActionItem {
  label: string; // The text to display for the action
  actionType: string; // The type of action to identify in the handler
  color?: string; // Optional custom color for the action text
}

interface ActionsProps {
  actions: ActionItem[]; // Array of actions to render
  handleAction: (actionType: string) => void; // Callback to handle action clicks
}

const ActionsBilling: React.FC<ActionsProps> = ({ actions, handleAction }) => {
  const getDefaultColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "remove":
      case "stop":
      case "disconnect":
        return "#FF3B30";
      case "resume":
        return "#34C759";
      case "download":
        return "#32ADE6";
      default:
        return "#0057b7";
    }
  };

  return (
    <Box display="flex" gap={1} alignItems="center">
      {actions.map((action, index) => (
        <Typography
          key={index}
          variant="caption"
          color={action.color || getDefaultColor(action.actionType)}
          fontSize={14}
          onClick={() => handleAction(action.actionType)}
          sx={{ cursor: "pointer" }}
        >
          {action.label}
        </Typography>
      ))}
    </Box>
  );
};

export default ActionsBilling;
