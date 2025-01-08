import { Box,  Stack, Typography } from "@mui/material";
import React from "react";

const ContactDetails = ({ profileData }: any) => {
  return (
    <>
      <Box width={"100%"} mt={2}>
        {/* Contact Details------------------------------------------------------------------ */}

      
        <Stack gap={3}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Address
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.street_address || "N/A"}
              </Typography>
            </Stack>
            <Stack mr={6}>
              <Typography variant="caption" color="#667185">
                Country
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.country || "N/A"}
              </Typography>
            </Stack>
          </Box>
          {/* ------------------------------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Email
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.email || "N/A"}
              </Typography>
            </Stack>
            <Stack mr={4}>
              <Typography variant="caption" color="#667185">
                Post Code
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.post_code || "N/A"}
              </Typography>
            </Stack>
          </Box>
          {/* -------------------------------------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                State
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.state || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Mobile Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileData.mobile_phone || "N/A"}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ContactDetails;
