import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const FreelanceContactDetails = ({ freelanceContactDetail }) => {
  const activeSolutions = freelanceContactDetail?.licenses?.filter(
    (license) => license.status
  ).length;

  return (
    <>
      <Box width={"50%"}>
        {/* Contact Details Section */}
        <Typography variant="h5">Contact Details</Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3} mr={15}>
          <Box display="flex" gap={4}>
            <Box flex={3} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Address
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.street_address || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Town
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.city || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Country
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.country || "N/A"}
                </Typography>
              </Stack>
            </Box>
            <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Post Code
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.post_code || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Email
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.email || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.mobile_phone || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box display="flex" gap={4}>
            <Box flex={3} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Telephone Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.telephone_number || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Other Details Section */}
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
          <Box display="flex" gap={4}>
            <Box flex={3} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Active Solutions
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {activeSolutions || 0}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Companies
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.companies || "N/A"}
                </Typography>
              </Stack>
            </Box>
            <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Pending Company Invites
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelanceContactDetail?.pending_company_invites || 0}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default FreelanceContactDetails;
