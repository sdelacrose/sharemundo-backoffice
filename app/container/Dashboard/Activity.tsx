import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { activities } from "./data";
import ActivityItem from "./activityItem";

const Activity = () => {
  return (
    <Box
      sx={{
        borderRadius: "10px",
        border: "1px solid #E4E7EC",
        background: "#fff",
        width: "50%",
      }}
    >
      <Typography variant="h5" color="#475367" padding={"16px 24px"}>
        Activity
      </Typography>
      <Divider
        sx={{
          borderColor: "rgba(240, 242, 245, 1)",
        }}
      />
      {activities.map((activity, index) => (
        <ActivityItem
          key={index}
          user={activity.user}
          action={activity.action}
          date={activity.date}
        />
      ))}
    </Box>
  );
};

export default Activity;
