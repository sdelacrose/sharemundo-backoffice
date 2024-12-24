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
  return (
    <Box display="flex" alignItems="start" gap={2.5} mr={4}>
      {profileData?.user_type === "company_user" ? (
        <>
          <CompanyDetails profileDetail={profileData} />
          <ContactDetails profileDetail={profileData} />
        </>
      ) : (
        <>
          <FreelancerDetails freelancerDetail={profileData} />
          <FreelanceContactDetails freelanceContactDetail={profileData} />
        </>
      )}
    </Box>
  );
};

export default ProfileTab;
