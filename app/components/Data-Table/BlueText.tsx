import { Box, Typography } from "@mui/material";
import React from "react";

const BlueText = (params: any) => {
  return (
    <Box>
      <Typography variant="caption" color="#0057b7" fontSize={14}>
        {params.value}
      </Typography>
    </Box>
  );
};

export default BlueText;
