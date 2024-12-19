import { Box, Typography } from "@mui/material";
import React from "react";

interface ActionsProps {
  viewText: string;
  removeText: string;
}

const Actions: React.FC<ActionsProps> = ({ viewText, removeText }) => {
  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <Typography variant="caption" color="#0057b7" fontSize={14}>
        {viewText}
      </Typography>
      <Typography variant="caption" color="#FF3B30" fontSize={14}>
        {removeText}
      </Typography>
    </Box>
  );
};

export default Actions;
