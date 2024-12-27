import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { Box, Drawer, Stack, Typography, Divider } from "@mui/material";
import React from "react";

const RemoveConnectionDrawer: React.FC<any> = ({
  open,
  handleClose,
  handleRemoveConnection,
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
      <Box sx={{ position: "relative", height: "100%" }}>
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4" fontWeight={600}>
            Remove Connection
          </Typography>
          <Box sx={{ cursor: "pointer" }} onClick={handleClose}>
            <Cross />
          </Box>
        </Box>
        <Divider sx={{ my: 3, borderColor: "#E4E7EC" }} />

        {/* Content Section */}
        <Typography variant="body1" color="#344054" sx={{ mb: 4 }}>
          Are you sure you want to remove this connection?
        </Typography>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
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
            onClick={handleRemoveConnection}
            padding="12px 24px"
          >
            Remove
          </CustomButton>
        </Stack>
      </Box>
    </Drawer>
  );
};

export default RemoveConnectionDrawer;
