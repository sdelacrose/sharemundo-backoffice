'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  title: string;
  description: string;
  label: string;
  confirmLabel: string;
  cancelLabel: string;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

const ReviewDecisionDialog = ({
  open,
  title,
  description,
  label,
  confirmLabel,
  cancelLabel,
  value,
  onChange,
  onClose,
  onConfirm,
}: Props) => (
  <Dialog
    open={open}
    onClose={onClose}
    fullWidth
    maxWidth="sm"
    PaperProps={{
      sx: {
        borderRadius: 3,
      },
    }}
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <Stack spacing={2} sx={{ pt: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <TextField
          label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          multiline
          minRows={4}
          fullWidth
        />
      </Stack>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 2.5 }}>
      <Button onClick={onClose}>{cancelLabel}</Button>
      <Button variant="contained" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default ReviewDecisionDialog;
