import React from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ContactDetails from "./contactDetails";
import InternalUserDetails from "./internaluserDetails";

interface ProfileDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  profileData?: any;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  profileData,
}) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "670px",
          maxWidth: "100%",
          padding: "32px 32px",
        },
      }}
    >
      <Box
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        role="presentation"
      >
        <Box display="flex" justifyContent="end" alignItems="center" mb={2}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <InternalUserDetails profileData={profileData} />
        <ContactDetails profileData={profileData} />
      </Box>
    </Drawer>
  );
};

export default ProfileDrawer;
