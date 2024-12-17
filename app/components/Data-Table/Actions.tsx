import { Box, Typography } from "@mui/material";
import React from "react";

const Actions = () => {
  return (
    <>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        <Typography variant="caption" color="#0057b7" fontSize={14}>
          View
        </Typography>
        <Typography variant="caption" color="#FF3B30" fontSize={14}>
          Remove
        </Typography>
      </Box>
    </>
  );
};

export default Actions;
