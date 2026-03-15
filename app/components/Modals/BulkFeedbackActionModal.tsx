"use client";

import React from "react";
import { Modal, Box, Typography, SelectChangeEvent } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";
import CustomTextField from "../common/CustomTextfield";
import CustomButton from "../common/CustomButton";
import { FEEDBACK_STATUS_OPTIONS } from "@/app/constants";

interface BulkFormData {
  status: string;
  reply: string;
}

interface BulkFeedbackActionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { status?: string; reply?: string }) => void;
  selectedCount: number;
}

const BulkFeedbackActionModal: React.FC<BulkFeedbackActionModalProps> = ({
  open,
  onClose,
  onSubmit,
  selectedCount,
}) => {
  const { control, handleSubmit, reset, setValue, watch } =
    useForm<BulkFormData>({
      defaultValues: { status: "", reply: "" },
    });

  const statusValue = watch("status");

  const handleSave = (data: BulkFormData) => {
    onSubmit({
      status: data.status || undefined,
      reply: data.reply || undefined,
    });
    handleReset();
  };

  const handleReset = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleReset}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: 480,
        }}
      >
        <Typography variant="h5" mb={1}>
          Bulk update {`(${selectedCount})`}
        </Typography>
        <Typography variant="body2" color="#475367" mb={3}>
          Apply actions to selected feedback(s)
        </Typography>

        <Box mb={3}>
          <Controller
            name="status"
            control={control}
            render={() => (
              <CustomSelect
                label="Update Status"
                value={statusValue}
                onChange={(e: SelectChangeEvent) =>
                  setValue("status", e.target.value)
                }
                options={FEEDBACK_STATUS_OPTIONS.filter(
                  (opt) => opt.value !== "",
                )}
                placeholder="Select status"
              />
            )}
          />
        </Box>

        <Box mb={3}>
          <Controller
            name="reply"
            control={control}
            render={({ field }) => (
              <CustomTextField
                {...field}
                label="Reply (optional)"
                placeholder="Enter your reply..."
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "#004FA7",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={handleSubmit(handleSave)}
          >
            Apply
          </CustomButton>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "#E4E7EC",
              color: "black",
              "&:hover": { backgroundColor: "#d0d3d9" },
            }}
            onClick={handleReset}
          >
            Cancel
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default BulkFeedbackActionModal;
