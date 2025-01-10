import Loader from "@/app/components/common/Loader";
import { apiCall } from "@/app/utils/APIUtils";
import { Box, Divider, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ContactDetails = ({ profileDetail, licenses }: any) => {
  const companyProfile = profileDetail.company_profile;
  const { id } = profileDetail;
  const [userCount, setUserCount] = useState(null);
  const fetchUserCount = async (url: string) => {
    try {
      const trimmedUrl = url.includes("/admin-dashboard")
        ? url.substring(url.indexOf("/admin-dashboard"))
        : url;

      const response = await apiCall(trimmedUrl);

      setUserCount(response.count);

      console.log("User count:", userCount);
      return userCount;
    } catch (error) {
      console.error("Failed to fetch user count:", error);
      return 0;
    }
  };
  useEffect(() => {
    const fetchCount = async () => {
      const count = await fetchUserCount(
        `/admin-dashboard/customers/${id}/users`
      );
      console.log("count", count);
    };

    fetchCount();
  }, [id]);

  if (!profileDetail || !profileDetail.company_profile) {
    return <Loader />;
  }
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
        <Stack gap={3}>
          <Box display="flex" gap={4}>
            {/* Left Column */}
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
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
            {/* Right Column */}
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
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
        <Stack gap={3}>
          <Box display="flex" gap={4}>
            {/* Left Column */}
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Total Users
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {userCount || "N/A"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  License
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {/* {profileDetail.licenses?.length || 0} */}
                  {licenses || 0}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Pending Freelance Invites
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.pending_invites || "0"}
                </Typography>
              </Stack>
            </Box>
            <Box flex={1} display="flex" flexDirection="column" gap={3}>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Freelancers
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {companyProfile.accepted_invites || "0"}
                </Typography>
              </Stack>
              <Stack>
                <Typography variant="caption" color="#667185">
                  Active Solutions
                </Typography>
                <Typography variant="subtitle1" color="#101928">
                  {profileDetail.licenses?.filter(
                    (license: any) => license.status
                  ).length || 1}
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
      </Box>
    </>
  );
};

export default ContactDetails;
