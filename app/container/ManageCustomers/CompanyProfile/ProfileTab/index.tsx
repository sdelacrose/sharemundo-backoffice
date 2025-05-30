import { Box } from "@mui/material";
import React from "react";
import CompanyDetails from "./companyDetails";
import ContactDetails from "./contactDetails";
import FreelancerDetails from "@/app/container/Solution-License-Freelancer/ProfileTab/freelancerDetails";
import FreelanceContactDetails from "@/app/container/Solution-License-Freelancer/ProfileTab/contactDetails";
import InternalUserDetails from "./internalUserDetails";
import InternalUserContactDetails from "./internalUserContactDetails";

interface ProfileTabProps {
  profileData: {
    user_type: string;
    [key: string]: any;
  };
  licenses?: number;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profileData, licenses }) => {
  const internalUser = profileData?.user_type === "internal_user";
  const company = profileData?.user_type === "company";
  const freelancer = profileData?.user_type === "freelancer";
  return (
    <Box display="flex" alignItems="start" gap={2.5} mr={4}>
      {internalUser && (
        <>
          <InternalUserDetails profileDetail={profileData} />
          <InternalUserContactDetails profileDetail={profileData} />
        </>
      )}
      {company && (
        <>
          <CompanyDetails profileDetail={profileData} />
          <ContactDetails profileDetail={profileData} licenses={licenses} />
        </>
      )}
      {freelancer && (
        <>
          <FreelancerDetails freelancerDetail={profileData} />
          <FreelanceContactDetails freelanceContactDetail={profileData} />
        </>
      )}
    </Box>
  );
};

export default ProfileTab;
