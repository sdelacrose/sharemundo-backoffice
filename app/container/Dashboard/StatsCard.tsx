import { ActiveUser, Progress } from "@/app/assets/icons";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

const StatsCard = ({ icon, title, value, percentage, isPositive,checkIcon }: any) => {
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
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Typography variant="body1" fontSize={14}>
              {value}
            </Typography>
            <Box
            bgcolor={isPositive ? "#E7F6EC" : "#FBEAE9"}
            display={"flex"}
              alignItems={"center"}
              borderRadius={"10px"}
              padding={"0px 4px"}
            >
                {checkIcon}
              <Typography
                variant="caption"
                color={isPositive ? "#036B26" : "#9E0A05"}
              >
                {isPositive ? `+${percentage}%` : `${percentage}%`}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default StatsCard;
