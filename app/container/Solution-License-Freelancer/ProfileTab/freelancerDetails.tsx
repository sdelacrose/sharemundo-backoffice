import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

const FreelancerDetails = ({ freelancerDetail }) => {
  if (!freelancerDetail) {
    return <div>Loading freelancer details...</div>;
  }

  return (
    <>
      <Box width={"50%"}>
        {/* Freelancer Details */}
        <Typography variant="h5">Freelancer Details</Typography>
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
                  Name
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {`${freelancerDetail?.first_name || ""} ${freelancerDetail?.last_name || ""}`}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Reg Number
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.post_code || "N/A"}
                </Typography>
              </Stack>
            </Box>
            <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  sharemundo Link ID
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.sharemundo_links_id || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>

        {/* Bank Details */}
        <Typography variant="h5" mt={4}>
          Bank Details
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
                  Bank Name
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.bank_name || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  IBAN
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.iban || "N/A"}
                </Typography>
              </Stack>
            </Box>
            <Box flex={2} display="flex" flexDirection="column" gap={"24px"}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Bank Address
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.bank_address || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  BIC
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {freelancerDetail?.bic || "N/A"}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default FreelancerDetails;
