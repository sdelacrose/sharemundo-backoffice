import { Box } from "@mui/material";
import React from "react";
import ContactDetails from "./contactDetails";
import InternalUserDetails from "./internaluserDetails";

const ProfileTab = () => {
  return (
    <>
      <Box display={"flex"} alignItems={"start"} gap={2.5} mr={4}>
        <InternalUserDetails />
        <ContactDetails />
      </Box>
    </>
  );
};

export default ProfileTab;
