import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const ContactDetails = () => {
  return (
    <>
      <Box width={"50%"}>
        {/* Contact Details------------------------------------------------------------------ */}

        <Typography variant="h5">Contact Details</Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3} mr={15}>
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
                sdasd@FoliumAI936.sharemundo.com
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Town
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
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
                Country
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                Germany
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Post Code
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8090
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
                Company Email
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                www.company.name
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Mobile Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                987623456789
              </Typography>
            </Stack>
          </Box>
          {/* ------------- */}
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Telephone Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                +1234356576
              </Typography>
            </Stack>
          </Box>
        </Stack>

        {/* Other Details------------------------------------------------------------------------------------- */}

        <Typography variant="h5" mt={4}>
          Other Details
        </Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3} mr={15}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack>
              <Typography variant="caption" color="#667185">
                Total Users
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                12
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Active Solutions
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                8y39214ubu012huoo090
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
                License
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                2
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                FreeLances
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                2
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
                Pending Freelance Invites
              </Typography>
              <Typography variant="subtitle1">2</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Mobile Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                1234567892
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ContactDetails;
