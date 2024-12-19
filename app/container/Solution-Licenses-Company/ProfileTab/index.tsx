import { Box } from "@mui/material";
import React from "react";
import CompanyDetails from "./companyDetails";
import ContactDetails from "./contactDetails";

const ProfileTab = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"start"} gap={2.5} mr={4}>
        <CompanyDetails />
        <ContactDetails />
      </Box>
    </>
  );
};

export default ProfileTab;
