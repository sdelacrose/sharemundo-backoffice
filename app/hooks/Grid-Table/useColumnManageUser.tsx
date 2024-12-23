"use client"
import { useMemo } from "react";
import { Button } from "@mui/material";
import LastColumnHeader from "@/app/components/common/LastColumnHeader";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  headerComponent?: React.ComponentType<any>;
  flex?: number;
}

const useColumnManageUserDefs = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col) => {
      switch (col.field) {
        case "first_name":
          return {
            ...col,
            headerName: "Name",
            flex: 1.4,
          };
        case "sharemundo_links_id":
          return {
            ...col,
            headerName: "Sharemundo Link",
            flex: 1.4,
          };
        case "role":
          return {
            ...col,
            headerName: "Role",
          };
        case "number_of_admins":
          return {
            ...col,
            headerName: "No of Admins",
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
            cellRenderer: () => (
              <Button style={{ color: "#0057b7" }}>
                View Details
              </Button>
            ),
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnManageUserDefs;
