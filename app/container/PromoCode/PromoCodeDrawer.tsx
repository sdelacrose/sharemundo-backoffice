import { useState, useEffect } from "react";
import {
  Drawer,
  TextField,
  FormControlLabel,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import CustomButton from "@/app/components/common/CustomButton";
import { DatePicker } from "@mui/x-date-pickers";

interface PromoCodeDrawerProps {
  open: boolean;
  onClose: () => void;
  promoCode?: any | null;
  onSubmit: (data: any) => void;
}

const PromoCodeDrawer = ({
  open,
  onClose,
  promoCode,
  onSubmit,
}: PromoCodeDrawerProps) => {
  const [formData, setFormData] = useState<any>({
    code: "",
    is_active: true,
    max_redemptions: "",
    expires_at: null,
    first_time_transaction: false,
    minimum_amount: "",
    minimum_amount_currency: "EUR",
  });

  useEffect(() => {
    if (promoCode) {
      setFormData({
        code: promoCode.code,
        is_active: promoCode.is_active,
        max_redemptions: promoCode.max_redemptions?.toString() || "",
        expires_at: promoCode.expires_at
          ? new Date(promoCode.expires_at)
          : null,
        first_time_transaction: promoCode.first_time_transaction,
        minimum_amount: promoCode.minimum_amount?.toString() || "",
        minimum_amount_currency: promoCode.minimum_amount_currency || "EUR",
      });
    }
  }, [promoCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      max_redemptions: formData.max_redemptions
        ? parseInt(formData.max_redemptions)
        : null,
      minimum_amount: formData.minimum_amount
        ? parseInt(formData.minimum_amount)
        : null,
    });
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: "35%", p: 3 } }}
    >
      <Typography variant="h6" mb={3}>
        {promoCode ? "Edit Promo Code" : "Create New Promo Code"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Promo Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />

          <TextField
            label="Max Redemptions"
            type="number"
            value={formData.max_redemptions}
            onChange={(e) =>
              setFormData({ ...formData, max_redemptions: e.target.value })
            }
          />

          <DatePicker
            label="Expiration Date"
            value={formData.expires_at}
            onChange={(date) => setFormData({ ...formData, expires_at: date })}
          />

          <TextField
            label="Minimum Amount"
            type="number"
            value={formData.minimum_amount}
            onChange={(e) =>
              setFormData({ ...formData, minimum_amount: e.target.value })
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
            }
            label="Active"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={formData.first_time_transaction}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_time_transaction: e.target.checked,
                  })
                }
              />
            }
            label="First Time Transaction Only"
          />

          <Stack direction="row" spacing={2}>
            <CustomButton type="submit" variant="contained">
              {promoCode ? "Update" : "Create"}
            </CustomButton>
            <CustomButton variant="outlined" onClick={onClose}>
              Cancel
            </CustomButton>
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};

export default PromoCodeDrawer;
