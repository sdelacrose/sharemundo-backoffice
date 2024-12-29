import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";

interface ActiveBulkCustomerDrawerProps {
  open: boolean;
  handleClose: () => void;
  handleActivate: () => void;
  selectedUsers: { id: number; name: string }[];
}

const ActiveBulkCustomerDrawer: React.FC<ActiveBulkCustomerDrawerProps> = ({
  open,
  handleClose,
  handleActivate,
  selectedUsers,
}) => {
  const sortedUsers = [...selectedUsers].sort((a, b) => a.id - b.id);

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
            Activate Bulk Customers?
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" color="#475467">
            You are about to activate the following customers:
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
            {sortedUsers.map((user) => (
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
                {user.name || `Customer ID: ${user.id}`}
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
              onClick={handleActivate}
              padding="12px 24px"
            >
              Activate
            </CustomButton>
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default ActiveBulkCustomerDrawer;
