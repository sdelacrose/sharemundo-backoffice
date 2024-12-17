import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomSelect from "@/app/components/common/CustomSelect";
import CustomTextField from "@/app/components/common/CustomTextfield";
import {
  Box,
  Divider,
  Drawer,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Role } from "./manageData";
import CustomCheckbox from "@/app/components/common/CustomCheckBox";
import PasswordField from "@/app/components/common/CustomPassword";
interface CreateNewDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const AddCustomerDrawer: React.FC<CreateNewDrawerProps> = ({
  open,
  handleClose,
}) => {
  const [newFieldName, setNewFieldName] = useState("");
  const [selectedrole, setSelectedRole] = useState("");
  const [password, setPassword] = useState("password");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedRole(event.target.value as string);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: "53%",
            padding: "32px 96px 32px 32px",
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
        <Box>
          <Stack gap={3}>
            <Typography variant="h2" letterSpacing={"0.4px"}>
              Add a Customer
            </Typography>
            <Divider
              sx={{
                borderColor: "rgba(240, 242, 245, 1)",
                marginBottom: "17px",
                marginRight:"-96px"
              }}
            />
            <Typography variant="caption" fontSize={14} color="#667185" ml={4}>
              To get started, fill out some basic information about who you're
              adding as a user.
            </Typography>
            <Box mt={-0.5} ml={4}>
              <CustomTextField
                label="Email"
                placeholder="email@gmail.com"
                fullWidth
                onChange={(e) => setNewFieldName(e.target.value)}
              />
            </Box>
            <Box ml={4}>
              <CustomSelect
                label="Preferred Language*"
                value={selectedrole}
                onChange={handleSelectChange}
                options={Role}
                required
                placeholder="role"
              />
            </Box>
            <Box ml={4}>
              <CustomCheckbox label="Automatically Create Password" />
            </Box>
            <Box>
              <Typography
                variant="body2"
                sx={{ fontSize: "14px", color: "#344054" }}
                ml={4}
              >
                Passwords must be between 8 and 256 characters and use a
                combination of at least three of the following: uppercase
                letters, lowercase letters, numbers, and symbols.
              </Typography>
            </Box>
            <Box ml={4}>
              <PasswordField label="Password*" required value={password} />
            </Box>
          </Stack>
          <Box
            sx={{
              marginTop: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            ml={4}
          >
            <CustomButton
              variant="contained"
              fontSize="16px"
              padding="16px 24px"
            >
              Next
            </CustomButton>
            <CustomButton
              variant="contained"
              background="#F9FAFB"
              customColor="#344054"
              fontSize="16px"
              onClick={handleClose}
              padding="16px 24px"
            >
              Cancel
            </CustomButton>
          </Box>
         
        </Box>
      </Drawer>
    </>
  );
};

export default AddCustomerDrawer;
