import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
interface CreateNewDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const BlockCustomerDrawer: React.FC<any> = ({ open, handleClose, handleBlock }) => {
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
              Block Customer?
            </Typography>
            <Typography variant="caption" fontSize={14} color="#667185">
              Do you want to block this customer?
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
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
                onClick={handleBlock}
              >
                Block
              </CustomButton>
            </Box>
          </Stack>
          <Box
            sx={{
              position: "absolute",
              right: "-1%",
              top: "-1%",
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

export default BlockCustomerDrawer;
