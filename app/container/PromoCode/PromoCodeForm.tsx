import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useState } from "react";

interface PromoCodeFormProps {
  open: boolean;
  onClose: () => void;
  couponId?: number;
  onSuccess: () => void;
}

export const PromoCodeForm = ({
  open,
  onClose,
  onSuccess,
}: PromoCodeFormProps) => {
  const [formData, setFormData] = useState({
    code: "",
    max_redemptions: "",
    expires_at: null,
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // API call here
    onSuccess();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Promo Code</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Promo Code"
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              required
              fullWidth
            />

            <TextField
              label="Max Redemptions"
              type="number"
              value={formData.max_redemptions}
              onChange={(e) =>
                setFormData({ ...formData, max_redemptions: e.target.value })
              }
            />

            {/*<DatePicker*/}
            {/*    label="Expiration Date"*/}
            {/*    value={formData.expires_at}*/}
            {/*    onChange={(date) => setFormData({...formData, expires_at: date})}*/}
            {/*/>*/}

            <Stack direction="row" alignItems="center" spacing={2}>
              <label>Status:</label>
              <Button
                variant={formData.is_active ? "contained" : "outlined"}
                onClick={() => setFormData({ ...formData, is_active: true })}
              >
                Active
              </Button>
              <Button
                variant={!formData.is_active ? "contained" : "outlined"}
                color="error"
                onClick={() => setFormData({ ...formData, is_active: false })}
              >
                Inactive
              </Button>
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
