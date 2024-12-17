import { Box } from "@mui/material";
import React from "react";
import ContactDetails from "./contactDetails";
import FreelancerDetails from "./freelancerDetails";

const ProfileTab = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"start"} gap={2.5} mr={4}>
        <FreelancerDetails />
        <ContactDetails />
      </Box>
    </>
  );
};

export default ProfileTab;
