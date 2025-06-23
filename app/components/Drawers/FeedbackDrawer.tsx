"use client";

import React from "react";
import { Drawer, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FeedbackForm from "@/app/container/Feedbacks/FeedbackForm";

interface FeedbackDrawerProps {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave: (formData: any) => void;
}

const FeedbackDrawer: React.FC<FeedbackDrawerProps> = ({
  open,
  onClose,
  data,
  onSave,
}) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "60%",
          padding: "48px",
          backgroundColor: "white",
          height: "100vh",
          boxShadow: "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
          overflowY: "auto",
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">View / Edit Feedback</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <FeedbackForm data={data} onSave={onSave} onCancel={onClose} />
    </Drawer>
  );
};

export default FeedbackDrawer;
