import { Box } from "@mui/material";
import React from "react";
import CompanyDetails from "./companyDetails";
import ContactDetails from "./contactDetails";
import FreelancerDetails from "@/app/container/Solution-License-Freelancer/ProfileTab/freelancerDetails"; // Assuming you have a component for freelancer details
import FreelanceContactDetails from "@/app/container/Solution-License-Freelancer/ProfileTab/contactDetails"; // Assuming you have a component for freelancer details

interface ProfileTabProps {
  profileData: {
    user_type: string;
    [key: string]: any;
  };
}

const ProfileTab: React.FC<ProfileTabProps> = ({ profileData }) => {
  const internalUser = profileData?.user_type === "internal_user";
  const company = profileData?.user_type === "company";
  const freelancer = profileData?.user_type === "freelancer";

  return (
    <Box display="flex" alignItems="start" gap={2.5} mr={4}>
      {internalUser && (
        <>
          <CompanyDetails
            profileDetail={profileData}
            header="Internal User Details"
            name="Internal User Name"
          />
          <ContactDetails profileDetail={profileData} />
        </>
      )}
      {company && (
        <>
          <CompanyDetails
            profileDetail={profileData}
            header="Company Details"
            name="Company Name"
          />
          <ContactDetails profileDetail={profileData} />
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
