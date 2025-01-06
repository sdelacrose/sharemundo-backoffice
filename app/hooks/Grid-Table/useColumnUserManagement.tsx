import LastColumnHeader from "@/app/components/common/LastColumnHeader";
import { DateFormat } from "@/app/utils/FormatDate";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnUserManagement = (columns: Column[]) => {
  const router = useRouter();
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "first_name":
          return {
            field: "first_name",
            headerName: "Name",
            flex: 1.4,

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
            headerName: "sharemundo Links IDs",
            width: 120,
            flex: 1.7,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };

        case "user_type":
          return {
            field: "user_type",
            headerName: "Type",
            width: 120,
            valueFormatter: (params: any) => {
              if (!params.value) return "N/A"; // Handle missing values
              if (params.value.toLowerCase() === "company")
                return "Company Owner"; // Special case for "company"
              return (
                params.value.charAt(0).toUpperCase() +
                params.value.slice(1).toLowerCase()
              ); // Capitalize other values
            },
          };

        case "created_at":
          return {
            field: "created_at",
            headerName: "Creation Date",
            width: 120,
            flex: 1.5,
            valueFormatter: (params: any) =>
              params.value ? DateFormat(params.value) : "N/A",
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: (params) => {
              const userType = params.data?.user_type?.toLowerCase() || "";

              let routePath = `/manage-users/${params.data.id}`;

              if (userType === "company" || userType === "internal_user") {
                routePath += "?hideTabs=1";
              }

              return (
                <Button
                  style={{ color: "#0057b7" }}
                  onClick={() => router.push(routePath)}
                >
                  View
                </Button>
              );
            },
          };

        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnUserManagement;
