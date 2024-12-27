import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { apiCall } from "@/app/utils/APIUtils";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
interface CreateNewDrawerProps {
  open: boolean;
  handleClose: () => void;
  id?: any;
  onUpdateStatus?: any;
}

const ResumeDrawer: React.FC<CreateNewDrawerProps> = ({
  open,
  handleClose,
  id,
  onUpdateStatus,
}) => {
  const handleResume = async () => {
    if (!id || !onUpdateStatus) return;
    try {
      await onUpdateStatus(id, "resume");
      handleClose();
    } catch (error) {
      console.error("Error resuming solution:", error);
    }
  };
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "43%",
            padding: "57px",
            backgroundColor: "white",
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
            display: "flex",
            alignItems: "center",
            minHeight: "690px",
            position: "relative",
          }}
        >
          <Stack gap={3}>
            <Typography variant="h3" letterSpacing={"0.4px"}>
              Resume Solution?
            </Typography>
            <Typography variant="caption" fontSize={14} color="#667185">
              Do you want resume solution?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <CustomButton
                variant="outlined"
                fontSize="16px"
                onClick={handleClose}
                padding="16px 24px"
              >
                Cancel
              </CustomButton>
              <CustomButton
                variant="contained"
                fontSize="16px"
                padding="16px 24px"
                onClick={handleResume}
              >
                Resume
              </CustomButton>
            </Box>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              right: "4%",
              top: "1%",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <Cross />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ResumeDrawer;
