import Loader from "@/app/components/common/Loader";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const InternalUserDetails = ({ profileDetail }: any) => {
  if (!profileDetail || !profileDetail.company_profile) {
    return <Loader/>;
  }

  const companyProfile = profileDetail.company_profile;

  return (
    <>
    <Box width={"50%"}>
      <Typography variant="h5">Internal User Details</Typography>
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
                Internal User Name
              </Typography>
              <Typography variant="subtitle1" color="#101928">
              {`${profileDetail?.first_name || ""} ${profileDetail?.last_name || ""}`}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Email
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileDetail.email || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Role
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileDetail.role || "N/A"}
              </Typography>
            </Stack>
            
          </Box>
          <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
            <Stack>
              <Typography variant="caption" color="#667185">
                sharemundo Links IDs
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileDetail.sharemundo_links_id || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Job Title
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {profileDetail.job_title || "N/A"}
              </Typography>
            </Stack>
           
          </Box>
        </Box>
      </Stack>

      {/* Bank Details */}
      <Typography variant="h5" mt={4}>
        Company Details
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
                Company Name
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.company_name || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Reg Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.company_registration_no || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Website
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.company_web_address || "N/A"}
              </Typography>
            </Stack>
          </Box>
          <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
            <Stack>
              <Typography variant="caption" color="#667185">
                sharemundo Links IDs
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.sharemundo_links_id || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Tax Ref Number
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.company_tax_reference || "N/A"}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="#667185">
                Email
              </Typography>
              <Typography variant="subtitle1" color="#101928">
                {companyProfile.company_email_address || "N/A"}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  </>
  );
};

export default InternalUserDetails;
