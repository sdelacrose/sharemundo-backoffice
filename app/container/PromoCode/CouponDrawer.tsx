import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Stack,
  InputAdornment,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Coupon } from "@/app/types/CouponProps";

interface CouponDrawerProps {
  open: boolean;
  onClose: () => void;
  formData: Partial<Coupon>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Coupon>>>;
  onCouponSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CouponDrawer: React.FC<CouponDrawerProps> = ({
  open,
  onClose,
  formData,
  setFormData,
  onCouponSubmit,
}) => {
  const isEditCoupon = formData.id ? true : false;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
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
          {isEditCoupon ? "Edit Coupon" : "Create Coupon"}
        </Typography>

        <form onSubmit={onCouponSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Coupon Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              variant="outlined"
              size="small"
              required
            />

            {isEditCoupon && (
              <TextField
                fullWidth
                label="Stripe Coupon ID"
                disabled={isEditCoupon} // it will always be disabled
                value={formData.stripe_coupon_id || ""}
                onChange={(e) =>
                  setFormData({ ...formData, stripe_coupon_id: e.target.value })
                }
                variant="outlined"
                size="small"
              />
            )}

            <Box display="flex" gap={1}>
              <Box flex={1}>
                <TextField
                  disabled={isEditCoupon}
                  select
                  fullWidth
                  label="Discount Type"
                  value={formData.discount_type || "percentage"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discount_type: e.target.value as "fixed" | "percentage",
                    })
                  }
                  size="small"
                  required
                >
                  <MenuItem value="percentage">Percentage</MenuItem>
                  <MenuItem value="fixed">Fixed Amount</MenuItem>
                </TextField>
              </Box>

              <Box flex={1}>
                {formData.discount_type === "percentage" ? (
                  <TextField
                    fullWidth
                    disabled={isEditCoupon}
                    type="number"
                    label="Percentage Off"
                    value={formData.percent_off || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        percent_off: Number(e.target.value),
                      })
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    size="small"
                    required
                  />
                ) : (
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      disabled={isEditCoupon}
                      type="number"
                      label="Amount Off"
                      value={formData.amount_off || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          amount_off: Number(e.target.value),
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      size="small"
                      required
                    />
                    <TextField
                      select
                      label="Currency"
                      disabled={isEditCoupon}
                      value={formData.currency || "USD"}
                      onChange={(e) =>
                        setFormData({ ...formData, currency: e.target.value })
                      }
                      size="small"
                      sx={{ width: "100px" }}
                      required
                    >
                      {["USD", "EUR", "GBP"].map((currency) => (
                        <MenuItem key={currency} value={currency}>
                          {currency}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Stack>
                )}
              </Box>
            </Box>

            <Box display="flex" gap={1}>
              <Box flex={2}>
                <TextField
                  select
                  disabled={isEditCoupon}
                  fullWidth
                  label="Duration"
                  value={formData.duration || "forever"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: e.target.value as
                        | "forever"
                        | "once"
                        | "repeating",
                    })
                  }
                  size="small"
                  required
                >
                  <MenuItem value="forever">Forever</MenuItem>
                  <MenuItem value="once">Once</MenuItem>
                  <MenuItem value="repeating">Repeating</MenuItem>
                </TextField>
              </Box>
              <Box flex={1}>
                {formData.duration === "repeating" && (
                  <TextField
                    fullWidth
                    disabled={isEditCoupon}
                    type="number"
                    label="Months"
                    value={formData.duration_in_months || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        duration_in_months: Number(e.target.value),
                      })
                    }
                    size="small"
                    required
                  />
                )}
              </Box>
            </Box>

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
              {isEditCoupon ? "Save Changes" : "Create Coupon"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Drawer>
  );
};

export default CouponDrawer;
