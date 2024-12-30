import StatusBadge from "@/app/utils/StatusBadge";
import { Box, Button } from "@mui/material";

export const solutionColumnDefs = [
  { field: "product_name", headerName: "Name" },
  { field: "license_count", headerName: "Total Purchased Licenses" },
];
export const UserColumnDefs = [
  { field: "name", headerName: "Disaply Name" },
  { field: "email", headerName: "Email" },
  { field: "sharemundo_link", headerName: "sharemundo Links IDs" },
  { field: "status", headerName: "Status" },
  { field: "role", headerName: "Role" },
  { field: "assigned_license", headerName: "Assigned License" },
];
export const UserConnectionColumnDefs = [
  { field: "name", headerName: "Disaply Name" },
  { field: "sharemundo_link", headerName: "sharemundo Links IDs" },
  { field: "type", headerName: "Type" },
  { field: "connection_date", headerName: "Connection Date" },
  { field: "actions", headerName: "Actions" },
];
export const manageCustomersColumnDefs = [
  { field: "name", headerName: "Name" },
  { field: "sharemundo_links_id", headerName: "sharemundo Links IDs" },
  {
    field: "role",
    headerName: "Role",
    valueFormatter: (params: any) => {
      return params.value;
    },
  },
  {
    field: "is_active",
    headerName: "Status",
    cellRenderer: (params: any) => {
      return params.value ? "Active" : "Inactive";
    },
  },
  {
    field: "number_of_admins",
    headerName: "No of Admins",
    valueFormatter: (params: any) => {
      return params.data.role === "freelancer" ? "N/A" : params.value;
    },
  },
  {
    field: "number_of_internal_users",
    headerName: "No of Internal Users",
    valueFormatter: (params: any) => {
      return params.data.role === "freelancer" ? "N/A" : params.value;
    },
  },
  { field: "total_bought_license", headerName: "Total bought License" },
  { field: "action", headerName: "Action" },
];
export const BillingColumnDefs = [
  { field: "id", headerName: "ID" },
  { field: "invoice_date", headerName: "Invoice Date" },
  { field: "total_amount", headerName: "Total Amount" },
  { field: "total_licenses", headerName: "Total Licenses" },
  { field: "payment_method", headerName: "Payment Method" },
  { field: "invoice", headerName: "Invoice" },
  { field: "status", headerName: "Status" },
];
export const LicenseColumnDefs = [
  { field: "product_name", headerName: "Product Name" },
  { field: "total_license", headerName: "Total License" },
  { field: "available_licenses", headerName: "Available Licenses" },
  { field: "assigned_license", headerName: "Assigned License" },
  { field: "renewal_date", headerName: "Renewal Date" },
  { field: "actions", headerName: "Actions" },
];
export const FreelancerconnectionColumnDefs = [
  { field: "name", headerName: "Name" },
  { field: "sharemundo_link", headerName: "sharemundo Links IDs" },
  { field: "type", headerName: "Type" },
  { field: "connection_date", headerName: "Connection Date" },
  { field: "actions", headerName: "Actions" },
];
export const billingFreelancerDefs = [
  { field: "id", headerName: "ID" },
  { field: "invoice_date", headerName: "Invoice Date" },
  { field: "total_amount", headerName: "Total Amount" },
  { field: "total_licenses", headerName: "Total Licenses" },
  { field: "payment_method", headerName: "Payment Method" },
  { field: "invoice", headerName: "Invoice" },
  { field: "status", headerName: "Status" },
];
export const LicenseFreelancerDefs = [
  { field: "product_name", headerName: "Product Name" },
  { field: "total_license", headerName: "Total License" },
  { field: "available_licenses", headerName: "Available Licenses" },
  { field: "assigned_license", headerName: "Assigned License" },
  { field: "renewal_date", headerName: "Renewal Date" },
  { field: "actions", headerName: "Actions" },
];
export const InternalUsersColumnDefs = [
  { field: "name", headerName: "Name" },
  { field: "sharemundo_link", headerName: "sharemundo Links IDs" },
  { field: "type", headerName: "Type" },
  { field: "connection_date", headerName: "Connection Date" },
  { field: "actions", headerName: "Actions" },
];
export const InternaluserbillingColumnDefs = [
  { field: "id", headerName: "ID" },
  { field: "invoice_date", headerName: "Invoice Date" },
  { field: "total_amount", headerName: "Total Amount" },
  { field: "total_licenses", headerName: "Total Licenses" },
  { field: "payment_method", headerName: "Payment Method" },
  { field: "invoice", headerName: "Invoice" },
  { field: "status", headerName: "Status" },
];
export const InternaluserLicenseColumnDefs = [
  { field: "product_name", headerName: "Product Name" },
  { field: "total_license", headerName: "Total License" },
  { field: "available_licenses", headerName: "Available Licenses" },
  { field: "assigned_license", headerName: "Assigned License" },
  { field: "renewal_date", headerName: "Renewal Date" },
  { field: "actions", headerName: "Actions" },
];
export const SolutionMainColumnDefs = [
  { field: "name", headerName: "Solution Name" },
  { field: "license_count", headerName: "Total Bought License" },
  { field: "price", headerName: "Price Per Month" },
  { field: "status", headerName: "Status" },
  { field: "actions", headerName: "Actions" },
];
export const BillingPaymentColumnDefs = [
  { field: "first_name", headerName: "Customer Name" },
  { field: "sharemundo_links_id", headerName: "sharemundo Links IDs" },
  { field: "user_type", headerName: "Type" },
  { field: "status", headerName: "Issue" },
  { field: "amount", headerName: "Amount" },
  { field: "invoice_date", headerName: "Date" },
  { field: "actions", headerName: "Actions" },
];
export const BillingCustomerColumnDefs = [
  { field: "first_name", headerName: "Name" },
  { field: "sharemundo_links_id", headerName: "sharemundo Links IDs" },
  { field: "user_type", headerName: "Role" },
  // { field: "next_12_month_revenue", headerName: "Next 12 Month Revenue" },
  // { field: "last_12_month_revenue", headerName: "Last 12 Month Revenue" },
  { field: "total_revenue", headerName: "Total Revenue" },
  { field: "actions", headerName: "Actions" },
];
export const userManagementColumnDefs = [
  { field: "first_name", headerName: "Name" },
  { field: "sharemundo_links_id", headerName: "sharemundo Links IDs" },
  { field: "user_type", headerName: "Type" },
  { field: "created_at", headerName: "Creation Date" },
  { field: "actions", headerName: "Actions" },
];

export const internalColumnDefs = (handleViewClick, setSelectedUserId, setRestoreUserDrawerOpen, setRemoveUserDrawerOpen) => [
  { field: "name", headerName: "Display Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  {
    field: "sharemundo_links_id",
    headerName: "sharemundo Links IDs",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    cellRenderer: ({ value }: any) => (
      <Box>
        {value === "Active" ? (
          <StatusBadge color="#036B26" text="Active" background="#E7F6EC" />
        ) : (
          <StatusBadge color="#865503" text="Inactive" background="#FEF6E7" />
        )}
      </Box>
    ),
  },
  { field: "role", headerName: "Role", flex: 1 },
  { field: "allocated_licenses", headerName: "Assigned Licenses", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    cellRenderer: ({ data }: any) => (
      <Box
        display="flex"
        gap={1}
        sx={{ marginTop: "8px", marginLeft: "-14px" }}
      >
        <Button variant="text" color="primary" onClick={() => handleViewClick()}>
          View
        </Button>
        {data.is_deleted ? (
          <Button
            variant="text"
            sx={{ color: "green" }}
            onClick={() => {
              setSelectedUserId(data.id);
              setRestoreUserDrawerOpen(true);
            }}
          >
            Restore
          </Button>
        ) : (
          <Button
            variant="text"
            color="error"
            sx={{ color: "red" }}
            onClick={() => {
              setSelectedUserId(data.id);
              setRemoveUserDrawerOpen(true);
            }}
          >
            Remove
          </Button>
        )}
      </Box>
    ),
  },
];

export const connectionColumnDefs = (handleViewClick, handleOpenRemoveDrawer) => [
  { field: "name", headerName: "Name", flex: 2 },
  {
    field: "sharemundo_links_id",
    headerName: "sharemundo Links IDs",
    flex: 2,
  },
  { field: "type", headerName: "Type", flex: 1 },
  { field: "connection_date", headerName: "Connection Date", flex: 1 },
  {
    field: "actions",
    headerName: "Actions",
    flex: 1,
    cellRenderer: ({ data }: any) => (
      <Box
        display="flex"
        gap={1}
        sx={{ marginTop: "8px", marginLeft: "-14px" }}
      >
        <Button variant="text" color="primary" onClick={() => handleViewClick()}>
          View
        </Button>
        <Button
          variant="text"
          color="error"
          sx={{ color: "red" }}
          onClick={() => handleOpenRemoveDrawer(data)}
        >
          Remove
        </Button>
      </Box>
    ),
  },
];
