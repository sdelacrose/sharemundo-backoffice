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
            cellRenderer: (params) => {
              const first_name = params.data?.first_name || "";
              const last_name = params.data?.last_name || "";

              const formatName = (name: string) => {
                return name
                  ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
                  : "";
              };

              const formattedFirstName = formatName(first_name);
              const formattedLastName = formatName(last_name);

              const fullName =
                [formattedFirstName, formattedLastName]
                  .filter(Boolean)
                  .join(" ") || "-";

              return <span>{fullName}</span>;
            },
          };
        case "sharemundo_links_id":
          return {
            ...col,
            headerName: "Sharemundo Link",
            flex: 1.2,
          };
        case "role":
          return {
            ...col,
            headerName: "Role",
            flex: 0.8,
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
            ...col,
            headerName: "No of Admins",
            flex: 0.8,
          };
        case "number_of_internal_users":
          return {
            ...col,
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
  }, [columns, onBlockClick, onActivateClick]);
};

export default useColumnManageUserDefs;
