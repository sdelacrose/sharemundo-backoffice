import Actions from "@/app/components/Data-Table/Actions";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnBillingCustomers = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            headerName: "Name",
            flex: 1.4,
          };
        case "sharemundo_links_id":
          return {
            field: "sharemundo_links_id",
            headerName: "Sharemundo Links ID",
            width: 120,
            flex: 1.7,
          };
        case "role":
          return {
            field: "role",
            headerName: "Role",
            width: 120,
          };
        case "next_12_month_revenue":
          return {
            field: "next_12_month_revenue",
            headerName: "Next 12 Month Revenue",
            width: 120,
            flex: 1.5,
          };
        case "last_12_month_revenue":
          return {
            field: "last_12_month_revenue",
            headerName: "Last 12 Month Revenue",
            width: 120,
            flex: 1.6,
          };
        case "total_revenue":
          return {
            field: "total_revenue",
            headerName: "Total Revenue",
            width: 120,
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 120,
            cellRenderer: Actions,
            cellRendererParams: {
              viewText: "View",
              removeText: "Details",
            },
            headerStyle: {
              justifyContent: "end",
              display: "flex",
              flex: 1,
            },
            cellStyle: { display: "flex" },
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnBillingCustomers;
