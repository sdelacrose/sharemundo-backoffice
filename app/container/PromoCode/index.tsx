"use client";

import {useState, useEffect, useCallback, useContext} from "react";
import {
    Box,
    Grid,
    Typography,
    Button,
    Chip,
    Divider,
    Stack,
    Drawer,
    IconButton,
    TextField,
    MenuItem,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    ButtonGroup,
} from "@mui/material";
import {AgGridReact} from "ag-grid-react";
import CloseIcon from "@mui/icons-material/Close";
import {DatePicker} from "@mui/x-date-pickers";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {SidebarContext} from "@/app/(pages)/layout";
import {apiCall} from "@/app/utils/APIUtils";
import Header from "@/app/components/common/Header";
import CustomSearchField from "@/app/components/common/CustomSearch";
import CustomFilterSelect from "@/app/components/common/CustomFilterSelect";
import Loader from "@/app/components/common/Loader";
import {Search} from "@/app/assets/icons";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import SelectDatePicker from "@/app/components/common/DatePicker/DatePicker";

interface Coupon {
    id: number;
    stripe_coupon_id?: string;
    name: string;
    discount_type: "percentage" | "fixed";
    percent_off?: number;
    amount_off?: number;
    currency?: string;
    duration: "forever" | "once" | "repeating";
    duration_in_months?: number;
    max_redemptions?: number;
    times_redeemed: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface PromoCode {
    id: number;
    coupon: number;
    code: string;
    is_active: boolean;
    max_redemptions?: number;
    times_redeemed: number;
    expires_at?: string;
    first_time_transaction: boolean;
    minimum_amount?: number;
    minimum_amount_currency?: string;
    is_valid: boolean;
}

const CouponManagement = () => {
    const context = useContext(SidebarContext);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
    const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
    const [couponDrawerOpen, setCouponDrawerOpen] = useState(false);
    const [promoCodeDrawerOpen, setPromoCodeDrawerOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<Coupon>>({});
    const [promoFormData, setPromoFormData] = useState<Partial<PromoCode>>({});
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRows, setSelectedRows] = useState<any[]>([]);

    const breadcrumbItems = [
        {label: "Home", href: "/"},
        {label: "Billing", href: "/billing"},
        {label: "Coupon Management"},
    ];

    const fetchCoupons = useCallback(async (url = "/package-license/coupon/") => {
        try {
            setLoading(true);
            const data = await apiCall(url, "GET");
            setCoupons(data.results);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPromoCodes = useCallback(async (couponId: number) => {
        try {
            const data = await apiCall(
                `/package-license/promo-code/?coupon=${couponId}`,
                "GET"
            );
            setPromoCodes(data.results);
        } catch (error) {
            console.error("Error fetching promo codes:", error);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const handleCouponSubmit = async () => {
        try {
            const method = formData.id ? "PUT" : "POST";
            const url = formData.id
                ? `/package-license/coupon/${formData.id}/`
                : "/package-license/coupon/";

            const payload = {
                ...formData,
                percent_off:
                    formData.discount_type === "percentage"
                        ? Number(formData.percent_off)
                        : null,
                amount_off:
                    formData.discount_type === "fixed"
                        ? Number(formData.amount_off)
                        : null,
                duration_in_months:
                    formData.duration === "repeating"
                        ? Number(formData.duration_in_months)
                        : null,
            };

            await apiCall(url, method, payload);
            fetchCoupons();
            setCouponDrawerOpen(false);
        } catch (error) {
            console.error("Error saving coupon:", error);
        }
    };

    const handlePromoCodeSubmit = async () => {
        try {
            const payload = {
                ...promoFormData,
                coupon: selectedCoupon?.id,
                expires_at: promoFormData.expires_at
                    ? new Date(promoFormData.expires_at).toISOString()
                    : null,
                minimum_amount: promoFormData.minimum_amount
                    ? Number(promoFormData.minimum_amount)
                    : null,
            };

            await apiCall("/package-license/promo-code/", "POST", payload);
            selectedCoupon && fetchPromoCodes(selectedCoupon.id);
            setPromoCodeDrawerOpen(false);
        } catch (error) {
            console.error("Error saving promo code:", error);
        }
    };

    const couponColumns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "discount_type",
            headerName: "Type",
            cellRenderer: (params: any) => (
                <Chip
                    label={params.value.toUpperCase()}
                    color={params.value === "percentage" ? "primary" : "secondary"}
                    sx={{borderRadius: "4px", fontWeight: 500}}
                />
            ),
        },
        {
            field: "value",
            headerName: "Value",
            valueGetter: (params: any) =>
                params.data.discount_type === "percentage"
                    ? `${params.data.percent_off}%`
                    : `${params.data.currency} ${params.data.amount_off}`,
        },
        {
            field: "duration",
            headerName: "Duration",
            valueFormatter: (params: any) => {
                if (params.value === "repeating") {
                    return `${params.value} (${params.data.duration_in_months} months)`;
                }
                return params.value.charAt(0).toUpperCase() + params.value.slice(1);
            },
        },
        {
            field: "is_active",
            headerName: "Status",
            cellRenderer: (params: any) => (
                <Chip
                    label={params.value ? "ACTIVE" : "INACTIVE"}
                    color={params.value ? "success" : "error"}
                    sx={{fontWeight: 600, borderRadius: "4px"}}
                />
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            cellRenderer: (params: any) => (
                <Button
                    variant="contained"
                    size="small"
                    sx={{
                        borderRadius: "6px",
                        textTransform: "none",
                        boxShadow: "none",
                        "&:hover": {boxShadow: "none"},
                    }}
                    onClick={() => {
                        setSelectedCoupon(params.data);
                        fetchPromoCodes(params.data.id);
                    }}
                >
                    Manage Codes
                </Button>
            ),
        },
    ];

    const promoCodeColumns = [
        {field: "code", headerName: "Code", flex: 1, minWidth: 150},
        {
            field: "expires_at",
            headerName: "Expiration",
            valueFormatter: (params: any) =>
                params.value ? new Date(params.value).toLocaleDateString() : "Never",
        },
        {
            field: "is_active",
            headerName: "Status",
            cellRenderer: (params: any) => (
                <Chip
                    label={params.value ? "ACTIVE" : "INACTIVE"}
                    color={params.value ? "success" : "error"}
                    sx={{fontWeight: 600, borderRadius: "4px"}}
                />
            ),
        },
        {
            field: "first_time_transaction",
            headerName: "First Time",
            cellRenderer: (params: any) => (
                <Checkbox checked={params.value} color="primary" disabled/>
            ),
        },
        {
            field: "actions",
            headerName: "Actions",
            cellRenderer: (params: any) => (
                <Stack direction="row" spacing={1}>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{borderRadius: "6px", textTransform: "none"}}
                        onClick={() => {
                            setPromoFormData(params.data);
                            setPromoCodeDrawerOpen(true);
                        }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        sx={{borderRadius: "6px", textTransform: "none"}}
                        onClick={async () => {
                            await apiCall(
                                `/package-license/promo-code/${params.data.id}/`,
                                "DELETE"
                            );
                            fetchPromoCodes(selectedCoupon!.id);
                        }}
                    >
                        Delete
                    </Button>
                </Stack>
            ),
        },
    ];

    return (
        <Box
            sx={{
                flex: 1,
                ml: context?.isSidebarCollapsed ? "92px" : "280px",
                minHeight: "100vh",
                pl: 3,
                transition: "all 0.3s ease",
            }}
        >
            <Box sx={{ml: "-24px"}}>
                <Header breadcrumbItems={breadcrumbItems}/>
            </Box>

            <Box sx={{m: 3}}>
                <Typography variant="h2" pb={1}>
                    Coupon Management
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1.5}>
                    sharemundo Back Office
                </Typography>
                <Divider sx={{borderColor: "rgba(240, 242, 245, 1)", my: 3}}/>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                >
                    <ButtonGroup variant="outlined" aria-label="Coupon actions">
                        <Button
                            variant="contained"
                            onClick={() => {
                                setFormData({discount_type: "percentage", duration: "forever"});
                                setCouponDrawerOpen(true);
                            }}
                            sx={{
                                height: 40,
                                px: 3,
                                borderRadius: "8px",
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            + New Coupon
                        </Button>
                    </ButtonGroup>

                    <Box display="flex" alignItems="center" gap={2}>
                        <CustomSearchField
                            startIcon={<Search/>}
                            placeholder="Search coupons..."
                            onChange={(e) => setSearchQuery(e.target.value)}
                            width="340px"
                        />
                        <CustomFilterSelect
                            items={[
                                {label: "Active", value: "active"},
                                {label: "Inactive", value: "inactive"},
                            ]}
                            onSelect={(value) => console.log(value)}
                        />
                    </Box>
                </Box>

                {loading ? (
                    <Box sx={{display: "flex", justifyContent: "center", mt: 4}}>
                        <Loader/>
                    </Box>
                ) : (
                    <Grid container spacing={3}>
                        <Grid item xs={selectedCoupon ? 7 : 12}>
                            <Box
                                sx={{
                                    borderRadius: "10px",
                                    border: "1px solid #E4E7EC",
                                    bgcolor: "#FFF",
                                    boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
                                    overflow: "hidden",
                                    height: "70vh",
                                }}
                            >
                                <AgGridReact
                                    rowData={coupons}
                                    columnDefs={couponColumns}
                                    pagination={true}
                                    paginationPageSize={10}
                                    onGridReady={(params) => params.api.sizeColumnsToFit()}
                                />
                            </Box>
                        </Grid>

                        {selectedCoupon && (
                            <Grid item xs={5}>
                                <Box
                                    sx={{
                                        borderRadius: "10px",
                                        border: "1px solid #E4E7EC",
                                        bgcolor: "#FFF",
                                        boxShadow: "0px 4px 4px -2px rgba(0, 0, 0, 0.02)",
                                        p: 3,
                                        height: "100%",
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mb={2}
                                    >
                                        <Typography variant="h6" fontWeight={600}>
                                            {selectedCoupon.name} Codes
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => {
                                                setPromoFormData({});
                                                setPromoCodeDrawerOpen(true);
                                            }}
                                            sx={{
                                                borderRadius: "6px",
                                                textTransform: "none",
                                                fontWeight: 500,
                                            }}
                                        >
                                            + New Promo Code
                                        </Button>
                                    </Stack>

                                    <Divider sx={{my: 2}}/>

                                    <Box sx={{height: "60vh"}}>
                                        <AgGridReact
                                            rowData={promoCodes}
                                            columnDefs={promoCodeColumns}
                                            pagination={true}
                                            paginationPageSize={10}
                                            onGridReady={(params) => params.api.sizeColumnsToFit()}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                )}

                {/* Coupon Form Drawer */}
                <Drawer
                    anchor="right"
                    open={couponDrawerOpen}
                    onClose={() => setCouponDrawerOpen(false)}
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
                    <Box sx={{position: "relative"}}>
                        <IconButton
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                color: "text.secondary",
                            }}
                            onClick={() => setCouponDrawerOpen(false)}
                        >
                            <CloseIcon/>
                        </IconButton>

                        <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
                            {formData.id ? "Edit Coupon" : "Create Coupon"}
                        </Typography>

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Coupon Name"
                                value={formData.name || ""}
                                onChange={(e) =>
                                    setFormData({...formData, name: e.target.value})
                                }
                                variant="outlined"
                                size="small"
                                required
                            />

                            <TextField
                                fullWidth
                                label="Stripe Coupon ID"
                                value={formData.stripe_coupon_id || ""}
                                onChange={(e) =>
                                    setFormData({...formData, stripe_coupon_id: e.target.value})
                                }
                                variant="outlined"
                                size="small"
                            />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Discount Type"
                                        value={formData.discount_type || "percentage"}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                discount_type: e.target.value as "percentage" | "fixed",
                                            })
                                        }
                                        size="small"
                                        required
                                    >
                                        <MenuItem value="percentage">Percentage</MenuItem>
                                        <MenuItem value="fixed">Fixed Amount</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={6}>
                                    {formData.discount_type === "percentage" ? (
                                        <TextField
                                            fullWidth
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
                                                value={formData.currency || "USD"}
                                                onChange={(e) =>
                                                    setFormData({...formData, currency: e.target.value})
                                                }
                                                size="small"
                                                sx={{width: "100px"}}
                                            >
                                                {["USD", "EUR", "GBP"].map((currency) => (
                                                    <MenuItem key={currency} value={currency}>
                                                        {currency}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Stack>
                                    )}
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Duration"
                                        value={formData.duration || "forever"}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                duration: e.target.value as "forever" | "once" | "repeating",
                                            })
                                        }
                                        size="small"
                                        required
                                    >
                                        <MenuItem value="forever">Forever</MenuItem>
                                        <MenuItem value="once">Once</MenuItem>
                                        <MenuItem value="repeating">Repeating</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={4}>
                                    {formData.duration === "repeating" && (
                                        <TextField
                                            fullWidth
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
                                </Grid>
                            </Grid>

                            <Button
                                variant="contained"
                                size="large"
                                onClick={handleCouponSubmit}
                                sx={{
                                    mt: 2,
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    py: 1.5,
                                }}
                            >
                                {formData.id ? "Save Changes" : "Create Coupon"}
                            </Button>
                        </Stack>
                    </Box>
                </Drawer>

                {/* Promo Code Form Drawer */}
                <Drawer
                    anchor="right"
                    open={promoCodeDrawerOpen}
                    onClose={() => setPromoCodeDrawerOpen(false)}
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
                    <Box sx={{position: "relative"}}>
                        <IconButton
                            sx={{
                                position: "absolute",
                                right: 0,
                                top: 0,
                                color: "text.secondary",
                            }}
                            onClick={() => setPromoCodeDrawerOpen(false)}
                        >
                            <CloseIcon/>
                        </IconButton>

                        <Typography variant="h5" fontWeight={700} mb={3} color="text.primary">
                            {promoFormData.id ? "Edit Promo Code" : "Create Promo Code"}
                        </Typography>

                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Promo Code"
                                value={promoFormData.code || ""}
                                onChange={(e) =>
                                    setPromoFormData({...promoFormData, code: e.target.value})
                                }
                                variant="outlined"
                                size="small"
                                required
                            />
                            <SelectDatePicker
                                onDateChange={(date) => setPromoFormData({...promoFormData, expires_at: date})}/>


                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Max Redemptions"
                                        value={promoFormData.max_redemptions || ""}
                                        onChange={(e) =>
                                            setPromoFormData({
                                                ...promoFormData,
                                                max_redemptions: Number(e.target.value),
                                            })
                                        }
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={promoFormData.first_time_transaction || false}
                                                onChange={(e) =>
                                                    setPromoFormData({
                                                        ...promoFormData,
                                                        first_time_transaction: e.target.checked,
                                                    })
                                                }
                                            />
                                        }
                                        label="First Time Only"
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Minimum Amount"
                                        value={promoFormData.minimum_amount || ""}
                                        onChange={(e) =>
                                            setPromoFormData({
                                                ...promoFormData,
                                                minimum_amount: Number(e.target.value),
                                            })
                                        }
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        select
                                        label="Currency"
                                        value={promoFormData.minimum_amount_currency || "USD"}
                                        onChange={(e) =>
                                            setPromoFormData({
                                                ...promoFormData,
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
                                </Grid>
                            </Grid>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={promoFormData.is_active || false}
                                        onChange={(e) =>
                                            setPromoFormData({
                                                ...promoFormData,
                                                is_active: e.target.checked,
                                            })
                                        }
                                    />
                                }
                                label="Active Status"
                            />

                            <Button
                                variant="contained"
                                size="large"
                                onClick={handlePromoCodeSubmit}
                                sx={{
                                    mt: 2,
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    py: 1.5,
                                }}
                            >
                                {promoFormData.id ? "Save Changes" : "Create Promo Code"}
                            </Button>
                        </Stack>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default CouponManagement;
