import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  Stack,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import CustomDateTimePicker from "@/app/components/common/CustomDateTimePicker";

interface PromoCodeDrawerProps {
  open: boolean;
  onClose: () => void;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  onPromoCodeSubmit: () => void;
}

const NewPromoCodeDrawer: React.FC<PromoCodeDrawerProps> = ({
  open,
  onClose,
  formData,
  setFormData,
  onPromoCodeSubmit,
}) => {
  const isPromoViewOnly = formData.id ? true : false;
  const [promoCodeError, setPromoCodeError] = useState<string | null>(null);

  // Regex for alphanumeric validation (no spaces, no special characters)
  const promoCodeRegex = /^[A-Za-z0-9]+$/;

  const handlePromoCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!promoCodeRegex.test(value)) {
      setPromoCodeError(
        "Promo code must be alphanumeric (no spaces/special characters)"
      );
    } else {
      setPromoCodeError(null);
    }
    setFormData({ ...formData, code: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (promoCodeError) return;
    onPromoCodeSubmit();
  };

  const handleClose = () => {
    setPromoCodeError(null);
    onClose();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: "40%",
          p: 3,
          bgcolor: "background.paper",
          borderLeft: "2px solid",
          borderColor: "divider",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            color: "text.secondary",
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
          {formData.id ? "Promo Code Details" : "Create Promo Code"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              disabled={isPromoViewOnly}
              label="Promo Code"
              value={formData.code || ""}
              onChange={handlePromoCodeChange}
              error={!!promoCodeError}
              helperText={promoCodeError}
              variant="outlined"
              size="small"
              required
            />
            <CustomDateTimePicker
              disabled={isPromoViewOnly}
              disablePast={!isPromoViewOnly}
              label="Expiry Date *"
              value={formData.expires_at || dayjs(new Date())}
              onDateChange={(date) =>
                setFormData({ ...formData, expires_at: date })
              }
            />

            <Box display="flex" gap={1}>
              <TextField
                sx={{ flex: 1 }}
                fullWidth
                disabled={isPromoViewOnly}
                type="number"
                label="Max Redemptions"
                value={formData.max_redemptions || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_redemptions: Number(e.target.value),
                  })
                }
                size="small"
              />

              <FormControlLabel
                sx={{ flex: 1 }}
                disabled={isPromoViewOnly}
                control={
                  <Checkbox
                    checked={formData.first_time_transaction || false}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_time_transaction: e.target.checked,
                      })
                    }
                  />
                }
                label="First Time Only"
              />
            </Box>

            <Box display="flex" gap={1}>
              <TextField
                disabled={isPromoViewOnly}
                sx={{ flex: 2 }}
                fullWidth
                type="number"
                label="Minimum Amount"
                value={formData.minimum_amount || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimum_amount: Number(e.target.value),
                  })
                }
                size="small"
              />

              <TextField
                sx={{ flex: 2 }}
                disabled={isPromoViewOnly}
                select
                label="Currency"
                value={formData.minimum_amount_currency || "USD"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimum_amount_currency: e.target.value,
                  })
                }
                size="small"
                fullWidth
              >
                {["USD", "EUR", "GBP"].map((currency) => (
                  <MenuItem key={currency} value={currency}>
                    {currency}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <FormControlLabel
              disabled={isPromoViewOnly}
              control={
                <Checkbox
                  checked={formData.is_active || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_active: e.target.checked,
                    })
                  }
                />
              }
              label="Active Status"
            />

            {!isPromoViewOnly && (
              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  mt: 2,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 600,
                  py: 1.5,
                }}
              >
                Create Promo Code
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
};

export default NewPromoCodeDrawer;
