import { Cross } from "@/app/assets/icons";
import CustomButton from "@/app/components/common/CustomButton";
import CustomTextField from "@/app/components/common/CustomTextfield";
import { apiCall } from "@/app/utils/APIUtils";
import { Box, Drawer, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface SolutionData {
  name: string;
  description: string;
  price: number;
  link: string | null;
  specification_file: string | null;
  specification_file_name: string | null;
}
interface CreateEditDrawerProps {
  open: boolean;
  handleClose: () => void;
  id?: any;
  onUpdateData: (updatedItem: any) => void;
  initialData?: SolutionData;
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
  } = useForm<SolutionData>({
    defaultValues: {
      name: "",
      price: NaN,
      link: "",
      description: "",
      specification_file: null,
      specification_file_name: null,
    },
  });

  const [fileRemoved, setFileRemoved] = useState(false);

  useEffect(() => {
    if (initialData) {
      setValue("name", initialData.name || "");
      setValue("price", initialData.price || NaN);
      setValue("link", initialData.link || "");
      setValue("description", initialData.description || "");
      if (initialData.specification_file) {
        setFileRemoved(false);
      }
    }
  }, [initialData, setValue]);
  const onSubmit = async (data: any) => {
    if (!id) return;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("link", data.link);
    formData.append("description", data.description);
    formData.append("price", data.price);

    if (data.specification_file) {
      formData.append("specification_file", data.specification_file);
    }

    try {
      const response = await apiCall(
        `/admin-dashboard/products/${id}`,
        "PUT",
        formData,
        null,
        {
          successMessage: "Solution updated successfully!",
          errorMessage: "Failed to update the solution. Please try again.",
        },
        "multipart/form-data"
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
                  name="name"
                  control={control}
                  rules={{ required: "Solution Name is required" }}
                  render={({ field }) => (
                    <CustomTextField
                      label="Solution Name*"
                      placeholder="Solution Name"
                      fullWidth
                      error={!!errors.name}
                      helperText={errors.name?.message}
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
                      label="Link*"
                      placeholder="link.com"
                      fullWidth
                      error={!!errors.link}
                      helperText={errors.link?.message}
                      {...field}
                      onBlur={(e) => {
                        const value = e.target.value.trim();
                        if (value && !/^https?:\/\//i.test(value)) {
                          field.onChange(`https://${value}`);
                        } else {
                          field.onChange(value);
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
                      placeholder="details"
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
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
                      !isNaN(parseFloat(value?.toString())) ||
                      "Price must be a number",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      label="Price*"
                      placeholder="$54.45"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
                      {...field}
                    />
                  )}
                />
                {initialData?.specification_file && !fileRemoved ? (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #ccc",
                      padding: "12px 16px",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography variant="body1">
                      {initialData.specification_file_name}
                    </Typography>
                    <Box
                      sx={{ display: "flex", gap: "8px", alignItems: "center" }}
                    >
                      <Box
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          if (initialData?.specification_file) {
                            window.open(
                              initialData.specification_file,
                              "_blank"
                            );
                          }
                        }}
                      >
                        <VisibilityIcon />
                      </Box>
                      <Box
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          setFileRemoved(true);
                          setValue("specification_file", null);
                        }}
                      >
                        <Cross />
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Controller
                    name="specification_file"
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        label="Upload File"
                        type="file"
                        fullWidth
                        inputProps={{ accept: "*" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          field.onChange(file);
                        }}
                      />
                    )}
                  />
                )}
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
