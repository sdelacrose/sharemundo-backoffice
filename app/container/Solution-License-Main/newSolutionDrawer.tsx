import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomTextField from "@/app/components/common/CustomTextfield";
import { apiCall } from "@/app/utils/APIUtils";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm, Controller } from "react-hook-form";

interface CreateNewDrawerProps {
  open: boolean;
  handleClose: () => void;
  onSolutionCreated: (newSolution: any) => void;
}

const NewSolutionDrawer: React.FC<CreateNewDrawerProps> = ({
  open,
  handleClose,
  onSolutionCreated,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      solutionName: "",
      link: "",
      description: "",
      price: "",
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      name: data.solutionName,
      link: data.link,
      description: data.description,
      price: parseFloat(data.price),
    };

    try {
      const response = await apiCall(
        "/admin-dashboard/products",
        "POST",
        payload,
        null,
        {
          successMessage: "Solution created successfully!",
        }
      );

      onSolutionCreated(response);
      handleClose();
      reset();
    } catch (error) {
      console.error("Error creating solution:", error);
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
            minHeight: "620px",
            position: "relative",
            mt: "80px",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Typography variant="h3" letterSpacing={"0.4px"}>
                Create New Solution
              </Typography>
              <Typography
                variant="caption"
                fontSize={14}
                color="#667185"
                mt={-1}
              >
                New Solution Details
              </Typography>
              <Stack gap={2.4}>
                <Controller
                  name="solutionName"
                  control={control}
                  rules={{ required: "Solution Name is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      label="Solution Name"
                      placeholder="Solution Name"
                      fullWidth
                      error={!!errors.solutionName}
                      helperText={errors.solutionName?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="link"
                  control={control}
                  rules={{
                    required: "Link is required",
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                      message: "Invalid link format",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      label="Link"
                      placeholder="solution.com"
                      fullWidth
                      error={!!errors.link}
                      helperText={errors.link?.message}
                      {...field}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        // Check if the value does not start with "http://" or "https://"
                        if (value && !/^https?:\/\//i.test(value)) {
                          field.onChange(`https://${value}`); // Prepend "https://"
                        } else {
                          field.onChange(value); // Leave the value as-is
                        }
                      }}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <CustomTextField
                      label="Details"
                      placeholder="Solution details"
                      fullWidth
                      multiline
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Price is required",
                    validate: (value) =>
                      !isNaN(parseFloat(value)) || "Price must be a number",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      label="Price"
                      placeholder="Price"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      {...field}
                    />
                  )}
                />
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CustomButton
                  variant="contained"
                  fontSize="16px"
                  padding="16px 24px"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
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
          </form>
          <Box
            sx={{
              position: "absolute",
              right: "-1%",
              top: "-12%",
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
