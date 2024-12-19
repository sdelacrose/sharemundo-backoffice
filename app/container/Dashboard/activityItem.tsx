import React from "react";
import { Stack, Typography, Divider } from "@mui/material";

const ActivityItem = ({ user, action, target, date, category }:any) => {
  return (
    <>
      <Stack>
        <Typography
          variant="subtitle1"
          color="#475367"
          fontWeight={400}
          padding={"16px 42px 0 36px"}
        >
          <span style={{ fontSize: "14px", fontWeight: "500", color: "#475367" }}>
            {user}&nbsp;
          </span>
          {action}
          <span style={{ fontSize: "14px", fontWeight: "500", color: "#0057B7" }}>
            &nbsp;{target}
          </span>
        </Typography>
      </Stack>
      <Stack>
        <Typography
          variant="caption"
          color="#98A2B3"
          fontWeight={400}
          padding={"2px 42px 16px 36px"}
        >
          {date}&nbsp;
          <span
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#0057B7",
              textDecoration: "underline",
            }}
          >
            {category}
          </span>
        </Typography>
      </Stack>
      <Divider
        sx={{
          borderColor: "rgba(240, 242, 245, 1)",
        }}
      />
    </>
  );
};

export default ActivityItem;
