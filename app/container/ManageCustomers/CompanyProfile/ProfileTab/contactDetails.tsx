import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const ContactDetails = ({ profileDetail }: { profileDetail: any }) => {
  if (!profileDetail || !profileDetail.company_profile) {
    return <div>Loading contact details...</div>;
  }

  const companyProfile = profileDetail.company_profile;

  return (
    <>
      <Box width={"50%"}>
        {/* Contact Details */}
        <Typography variant="h5">Contact Details</Typography>
        <Divider
          sx={{
            borderColor: "#F0F2F5",
            marginTop: "12px",
            marginBottom: "24px",
          }}
        />
        <Stack gap={3} mr={15}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
              gap={"24px"}
            >
              <Stack>
                <Typography variant="caption" color="#667185">
                  Address
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_address || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Country
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_country || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Company Email
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_email_address || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Telephone Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_tell_no || "N/A"}
                </Typography>
              </Stack>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"24px"}
            >
              <Stack>
                <Typography variant="caption" color="#667185">
                  Town
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_town || "N/A"}
                </Typography>
              </Stack>

              <Stack>
                <Typography variant="caption" color="#667185">
                  Post Code
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.post_code || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.company_mob_no || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Other Details */}
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"24px"}
            >
              <Stack>
                <Typography variant="caption" color="#667185">
                  Total Users
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {profileDetail.allocated_licenses || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  License
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {profileDetail.licenses?.length || 0}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Pending Freelance Invites
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {/* Replace with the actual number of pending invites */}
                  N/A
                </Typography>
              </Stack>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              gap={"24px"}
            >
              <Stack>
                <Typography variant="caption" color="#667185">
                  Freelancers
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {/* Replace with the actual number of freelancers */}
                  N/A
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Active Solutions
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {profileDetail.licenses?.filter(
                    (license: any) => license.status
                  ).length || 0}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Mobile Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {profileDetail.mobile_phone || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ContactDetails;
