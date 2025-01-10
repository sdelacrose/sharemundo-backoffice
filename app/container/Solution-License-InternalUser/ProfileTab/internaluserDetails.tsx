import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const InternalUserDetails = ({profileData}:any) => {
  return (
    <>
      <Box width={"100%"}>
        {/* freelancer Details------------------------------------------------------------------ */}

        <Typography variant="h5">User Details</Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3} mr={15} width={"100%"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Name
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.name || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                sharemundo Links IDs
              </Typography>
              <Typography variant="subtitle1" color="#101928">
              {profileData.sharemundo_links_id || "N/A"}
              </Typography>
            </Stack>
          </Box>
          {/* ------------------------------------------- */}
          
          {/* -------------------------------------------- */}
        </Stack>

       
      </Box>
    </>
  );
};

export default InternalUserDetails;
