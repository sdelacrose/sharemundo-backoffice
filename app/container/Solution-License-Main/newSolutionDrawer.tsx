import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomTextField from "@/app/components/common/CustomTextfield";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
interface CreateNewDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const NewSolutionDrawer: React.FC<CreateNewDrawerProps> = ({
  open,
  handleClose,
}) => {
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
          <Stack gap={4}>
            <Typography variant="h3" letterSpacing={"0.4px"}>
              Create New Solution?
            </Typography>
            <Typography variant="caption" fontSize={14} color="#667185" mt={2}>
              New Solution
            </Typography>
            <Stack gap={2.4}>
              <CustomTextField
                label="Solution Name"
                placeholder="solution"
                fullWidth
              />
              <CustomTextField
                label="Link"
                placeholder="solution.com"
                fullWidth
              />
              <CustomTextField
                label="Other Details"
                placeholder="details"
                fullWidth
              />
              <CustomTextField label="Price" placeholder="$54.45" fullWidth />{" "}
            </Stack>
            <Box
              sx={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginTop: "16px",
                justifyContent: "space-between",
              }}
            >
              <CustomButton
                variant="contained"
                fontSize="16px"
                padding="16px 24px"
              >
                Save
              </CustomButton>
              <CustomButton
                variant="outlined"
                fontSize="16px"
                onClick={handleClose}
                padding="16px 24px"
              >
                Cancel
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

export default NewSolutionDrawer;
