"use client";
import { useMemo } from "react";
import { Box, Button } from "@mui/material";
import LastColumnHeader from "@/app/components/common/LastColumnHeader";
import { useRouter } from "next/navigation";
import StatusBadge from "@/app/utils/StatusBadge";

const useColumnManageUserDefs = ({
  columns,
  onBlockClick,
  onActivateClick,
}) => {
  const router = useRouter();
  return useMemo(() => {
    return columns.map((col) => {
      switch (col.field) {
        case "name":
          return {
            ...col,
            headerName: "Name",
            flex: 1,

            valueFormatter: (params: any) => {
              const capitalize = (str: string) =>
                str.length > 0
                  ? `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`
                  : "";

              const firstName = params.data?.first_name || "";
              const lastName = params.data?.last_name || "";

              const fullName = `${capitalize(firstName)} ${capitalize(
                lastName
              )}`.trim();
              return fullName || "N/A";
            },
          };
        case "sharemundo_links_id":
          return {
            field: "sharemundo_links_id",
            headerName: "sharemundo Link",
            flex: 1.2,
          };
        case "role":
          return {
            field: "role",

            headerName: "Role",
            flex: 0.8,
            valueFormatter: (params: any) =>
              params.value
                ? params.value.charAt(0).toUpperCase() +
                  params.value.slice(1).toLowerCase()
                : "N/A",
          };
        case "is_active":
          return {
            ...col,
            flex: 0.7,
            headerName: "Status",
            cellRenderer: (params) => (
              <StatusBadge
                color={params.data.is_active ? "#036B26" : "#865503"}
                text={params.data.is_active ? "Active" : "Inactive"}
                background={params.data.is_active ? "#E7F6EC" : "#FEF6E7"}
              />
            ),
          };
        case "number_of_admins":
          return {
            field: "number_of_admins",
            headerName: "No of Admins",
            flex: 0.8,
          };
        case "number_of_internal_users":
          return {
            field: "number_of_internal_users",
            headerName: "No of Internal Users",
          };
        case "total_bought_license":
          return {
            ...col,
            headerName: "Total Bought License",
          };
        case "action":
          return {
            ...col,
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: (params) => (
              <>
                <Button
                  style={{ color: "#0057b7" }}
                  onClick={() =>
                    router.push(`/manage-customers/${params.data.id}`)
                  }
                >
                  View
                </Button>
                <Button
                  style={{ color: params.data.is_active ? "red" : "green" }}
                  onClick={() =>
                    params.data.is_active
                      ? onBlockClick(params.data.id)
                      : onActivateClick(params.data.id)
                  }
                >
                  {params.data.is_active ? "Block" : "Activate"}
                </Button>
              </>
            ),
          };
        default:
          return col;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, onBlockClick, onActivateClick]);
};

export default useColumnManageUserDefs;
