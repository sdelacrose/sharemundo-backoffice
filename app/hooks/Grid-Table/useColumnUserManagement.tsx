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
            valueFormatter: (params: any) =>
              params.value
                ? params.value.charAt(0).toUpperCase() +
                  params.value.slice(1).toLowerCase()
                : "N/A",
          };
        case "sharemundo_links_id":
          return {
            field: "sharemundo_links_id",
            headerName: "Sharemundo Links ID",
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
            valueFormatter: (params: any) =>
              params.value
                ? params.value.charAt(0).toUpperCase() +
                  params.value.slice(1).toLowerCase()
                : "N/A",
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
            ...col,
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: (params) => (
              <Button
                style={{ color: "#0057b7" }}
                onClick={() =>
                  router.push(`/manage-customers/${params.data.id}`)
                }
              >
                View
              </Button>
            ),
          };
        default:
          return col;
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);
};

export default useColumnUserManagement;
