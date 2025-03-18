import { Button, Checkbox, Stack } from "@mui/material";
import StatusBadge from "@/app/utils/StatusBadge";
import { PromoCode } from "@/app/types/PromoCodeProps";
import dayjs from "dayjs";

export const getPromoCodeColumns = ({
  onViewPromoCode,
  onChangePromoCodeStatus,
}: {
  onViewPromoCode: (data: PromoCode) => void;
  onChangePromoCodeStatus: (id: number, status: boolean) => void;
}) => [
  {
    field: "code",
    headerName: "Code",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "expires_at",
    headerName: "Expiration",
    valueFormatter: (params: any) =>
      params.value ? new Date(params.value).toLocaleDateString() : "Never",
  },
  {
    field: "is_active",
    headerName: "Status",
    flex: 0.7,
    cellRenderer: (params: any) => {
      console.log("DATA: ", params.data);
      return params.value ? (
        <StatusBadge color="#036B26" text="Active" background="#E7F6EC" />
      ) : (
        <StatusBadge color="#865503" text="Inactive" background="#FEF6E7" />
      );
    },
  },
  {
    field: "first_time_transaction",
    headerName: "First Time",
    flex: 0.8,
    cellRenderer: (params: any) => (
      <Checkbox checked={params.value} color="primary" disabled />
    ),
  },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1.5,
    cellRenderer: (params: any) => {
      const expiryDate = dayjs(params.data.expires_at);
      const isExpired = expiryDate.isBefore(dayjs());
      return (
        <Stack direction="row" spacing={1} marginTop={1} marginLeft={-3}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              height: 40,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() => onViewPromoCode(params.data)}
          >
            View
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            disabled={isExpired}
            sx={{
              height: 40,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
            }}
            onClick={() =>
              onChangePromoCodeStatus(params.data.id, params.data.is_active)
            }
          >
            {params.data.is_active ? "Inactive" : "Active"}
          </Button>
        </Stack>
      );
    },
  },
];
