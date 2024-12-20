import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const StatsCard = ({
  icon,
  title,
  value,
 
}: any) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #E4E7EC",
          background: "#fff",
          padding: "16px",
          maxWidth: "481px",
          width: "100%",
        }}
      >
        <Stack>
          {icon}
          <Typography variant="caption" mt={5.2} fontSize={14} color="#667185">
            {title}
          </Typography>
          <Box display={"flex"} alignItems={"center"} gap={"10px"} mt={1}>
            <Typography variant="body1" fontSize={18}>
              {value}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default StatsCard;
