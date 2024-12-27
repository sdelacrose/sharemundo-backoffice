import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";

const RestoreBulkUsersDrawer: React.FC<any> = ({
  open,
  handleClose,
  handleRestore,
  selectedUsers,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "43%",
          padding: "40px 30px",
          backgroundColor: "#fff",
          height: "100vh",
          boxShadow: "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
          overflowY: "auto",
        },
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "100%",
        }}
      >
        {/* Close Icon */}
        <Box
          sx={{
            position: "absolute",
            right: "-1%",
            top: "-1%",
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={handleClose}
        >
          <Cross />
        </Box>

        <Stack spacing={4}>
          {/* Title */}
          <Typography variant="h3" letterSpacing={"0.4px"}>
            Restore Bulk Users?
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" color="#475467">
            You are about to restore the following users:
          </Typography>

          {/* User List */}
          <Box
            sx={{
              maxHeight: "300px",
              overflowY: "auto",
              border: "1px solid #E4E7EC",
              borderRadius: "8px",
              padding: "12px",
              backgroundColor: "#F9FAFB",
            }}
          >
            {selectedUsers.map((user) => (
              <Typography
                key={user.id}
                variant="body2"
                color="#344054"
                sx={{
                  marginBottom: "8px",
                  padding: "6px 10px",
                  backgroundColor: "#FFF",
                  borderRadius: "4px",
                  border: "1px solid #E4E7EC",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#F4F5F7",
                  },
                }}
              >
                {user.name || `User ID: ${user.id}`}
              </Typography>
            ))}
          </Box>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              justifyContent: "flex-end",
            }}
          >
            <CustomButton
              variant="outlined"
              fontSize="16px"
              onClick={handleClose}
              padding="12px 24px"
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="contained"
              fontSize="16px"
              onClick={handleRestore}
              padding="12px 24px"
            >
              Restore
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default RestoreBulkUsersDrawer;
