"use client";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";

interface StatsCardProps {
  icon?: React.ReactNode;
  title: string;
  value: number | string;
}

const StatsCard = ({ icon, title, value }: StatsCardProps) => {
  return (
    <>
      <Box
        sx={{
          borderRadius: "10px",
          border: "1px solid #E4E7EC",
          background: "#fff",
          padding: "16px",
          // maxWidth: "481px",
          width: "100%",
        }}
      >
        <Stack>
          <Box
            border={"1px solid #F0F2F5"}
            borderRadius={"6px"}
            bgcolor={"#fff"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            maxWidth={"28px"}
          >
            {icon}
          </Box>

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
