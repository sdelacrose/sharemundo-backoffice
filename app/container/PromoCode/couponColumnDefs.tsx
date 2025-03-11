import { Coupon } from "@/app/types/CouponProps";
import { capitalizeFirstLetter } from "@/app/utils/CapitalizeFirstLetter";
import StatusBadge from "@/app/utils/StatusBadge";
import { Box, Button } from "@mui/material";

export const getCouponColumns = ({
  onManageCode,
  onEditCoupon,
  onDeleteCoupon,
}: {
  onManageCode: (coupon: Coupon) => void;
  onEditCoupon: (coupon: any) => void;
  onDeleteCoupon: (id: number) => void;
}) => [
  {
    field: "name",
    headerName: "Name",
    flex: 0.5,
    minWidth: 130,
  },
  {
    field: "discount_type",
    headerName: "Type",
    cellRenderer: (params: any) => (
      <StatusBadge
        color="white"
        text={capitalizeFirstLetter(params.value)}
        background="#F0F2F5"
      />
    ),
  },
  {
    field: "value",
    headerName: "Value",
    flex: 0.5,
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
    cellRenderer: (params: any) =>
      params.value === true ? (
        <StatusBadge color="#036B26" text="Active" background="#E7F6EC" />
      ) : (
        <StatusBadge color="#865503" text="Inactive" background="#FEF6E7" />
      ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 2,
    cellRenderer: (params: any) => (
      <Box>
        <Button
          variant="contained"
          size="small"
          sx={{
            height: 40,
            px: 2,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            marginLeft: "-24px",
          }}
          onClick={() => {
            onManageCode(params.data);
          }}
        >
          Manage Codes
        </Button>
        <Button
          variant="outlined"
          size="small"
          sx={{
            height: 40,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            ml: 1,
          }}
          onClick={() => {
            onEditCoupon(params.data);
          }}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="error"
          size="small"
          sx={{
            height: 40,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            ml: 1,
          }}
          onClick={() => onDeleteCoupon(params.data.id)}
        >
          Delete
        </Button>
      </Box>
    ),
  },
];
