"use client";

import React from "react";
import { Modal, Box, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import CustomTextField from "../common/CustomTextfield";
import CustomButton from "../common/CustomButton";

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (reply: string) => void;
}

const ReplyModal: React.FC<ReplyModalProps> = ({ open, onClose, onSave }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ reply: string }>({
    defaultValues: { reply: "" },
  });

  const handleSave = (data: { reply: string }) => {
    onSave(data.reply);
    reset();
    onClose();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleCancel}>
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
          width: 400,
        }}
      >
        <Typography variant="h5" mb={2}>
          Add Reply
        </Typography>

        <Controller
          name="reply"
          control={control}
          rules={{ required: "Reply is required" }}
          render={({ field }) => (
            <CustomTextField
              {...field}
              label="Reply"
              placeholder="Enter your reply..."
              fullWidth
              error={!!errors.reply}
              helperText={errors.reply?.message}
              multiline
              rows={4}
            />
          )}
        />

        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "#004FA7",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
            }}
            onClick={handleSubmit(handleSave)}
          >
            Save
          </CustomButton>

          <CustomButton
            variant="contained"
            sx={{
              backgroundColor: "#E4E7EC",
              color: "black",
              "&:hover": { backgroundColor: "#E4E7EC" },
            }}
            onClick={handleCancel}
          >
            Cancel
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReplyModal;
