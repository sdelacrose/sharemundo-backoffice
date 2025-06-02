import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    MenuItem,
    InputAdornment
} from '@mui/material';
import {useEffect, useState} from "react";
interface CouponFormProps {
    open: boolean;
    onClose: () => void;
    coupon?: any | null;
    onSuccess: () => void;
}

export const CouponForm = ({open, onClose, coupon, onSuccess}: CouponFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        discount_type: 'percentage',
        percent_off: '',
        amount_off: '',
        currency: 'USD',
        duration: 'forever',
        duration_in_months: '',
        max_redemptions: ''
    });

    useEffect(() => {
        if (coupon) {
            setFormData({
                name: coupon.name,
                discount_type: coupon.discount_type,
                percent_off: coupon.percent_off?.toString() || '',
                amount_off: coupon.amount_off?.toString() || '',
                currency: coupon.currency || 'USD',
                duration: coupon.duration,
                duration_in_months: coupon.duration_in_months?.toString() || '',
                max_redemptions: coupon.max_redemptions?.toString() || ''
            });
        }
    }, [coupon]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // API call here
        onSuccess();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{coupon ? 'Edit Coupon' : 'Create New Coupon'}</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Stack spacing={3} sx={{mt: 1}}>
                        <TextField
                            label="Coupon Name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                            fullWidth
                        />

                        <TextField
                            select
                            label="Discount Type"
                            value={formData.discount_type}
                            onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
                            required
                        >
                            <MenuItem value="percentage">Percentage</MenuItem>
                            <MenuItem value="fixed">Fixed Amount</MenuItem>
                        </TextField>

                        {formData.discount_type === 'percentage' ? (
                            <TextField
                                label="Percentage Off"
                                type="number"
                                value={formData.percent_off}
                                onChange={(e) => setFormData({...formData, percent_off: e.target.value})}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                                }}
                                required
                            />
                        ) : (
                            <Stack direction="row" spacing={2}>
                                <TextField
                                    label="Amount Off"
                                    type="number"
                                    value={formData.amount_off}
                                    onChange={(e) => setFormData({...formData, amount_off: e.target.value})}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    }}
                                    required
                                />
                                <TextField
                                    select
                                    label="Currency"
                                    value={formData.currency}
                                    onChange={(e) => setFormData({...formData, currency: e.target.value})}
                                    sx={{width: '120px'}}
                                >
                                    <MenuItem value="USD">USD</MenuItem>
                                    <MenuItem value="EUR">EUR</MenuItem>
                                    <MenuItem value="GBP">GBP</MenuItem>
                                </TextField>
                            </Stack>
                        )}

                        <TextField
                            select
                            label="Duration"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            required
                        >
                            <MenuItem value="forever">Forever</MenuItem>
                            <MenuItem value="once">Once</MenuItem>
                            <MenuItem value="repeating">Repeating</MenuItem>
                        </TextField>

                        {formData.duration === 'repeating' && (
                            <TextField
                                label="Duration in Months"
                                type="number"
                                value={formData.duration_in_months}
                                onChange={(e) => setFormData({...formData, duration_in_months: e.target.value})}
                                required
                            />
                        )}

                        <TextField
                            label="Max Redemptions"
                            type="number"
                            value={formData.max_redemptions}
                            onChange={(e) => setFormData({...formData, max_redemptions: e.target.value})}
                        />
                    </Stack>
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="contained">
                        {coupon ? 'Update' : 'Create'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};