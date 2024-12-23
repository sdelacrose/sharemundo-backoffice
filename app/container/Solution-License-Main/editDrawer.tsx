import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomTextField from "@/app/components/common/CustomTextfield";
import { apiCall } from "@/app/utils/APIUtils";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

interface CreateEditDrawerProps {
  open: boolean;
  handleClose: () => void;
  id?: any;
  onUpdateData: (updatedItem: any) => void;
  initialData?: {
    name: string;
    price: string;
    link: string;
  };
}

const EditDrawer: React.FC<CreateEditDrawerProps> = ({
  open,
  handleClose,
  id,
  onUpdateData,
  initialData,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      solutionName: initialData?.name || "",
      price: initialData?.price || "",
      link: initialData?.link || "",
    },
  });

  const onSubmit = async (data: any) => {
    if (!id) return;

    const payload = {
      name: data.solutionName,
      price: parseFloat(data.price),
      link: data.link,
    };

    try {
      const response = await apiCall(
        `/admin-dashboard/products/${id}`,
        "PUT",
        payload,
        null,
        {
          successMessage: "Solution updated successfully!",
          errorMessage: "Failed to update the solution. Please try again.",
        }
      );

      onUpdateData(response);

      handleClose();
    } catch (error) {
      console.error("Error updating solution:", error);
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
            mt: "160px",
            minHeight: "690px",
            position: "relative",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={4}>
              <Typography variant="h3" letterSpacing={"0.4px"}>
                Edit Solution Details
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
                      placeholder="$54.45"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="link"
                  control={control}
                  rules={{
                    required: "link is required",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      label="link"
                      placeholder="link.com"
                      fullWidth
                      error={!!errors.link}
                      helperText={errors.link?.message}
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
              right: "4%",
              top: "-24%",
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

export default EditDrawer;
