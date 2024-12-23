import Actions from "@/app/components/Data-Table/Actions";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnUserManagement = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "username":
          return {
            field: "username",
            headerName: "Name",
            flex: 1.4,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
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
              params.value ? params.value : "N/A",
          };
        case "creation_date":
          return {
            field: "creation_date",
            headerName: "Creation Date",
            width: 120,
            flex: 1.5,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };

        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 120,
            cellRenderer: Actions,
            cellRendererParams: {
              viewText: "View",
              removeText: "",
            },
            headerStyle: {
              justifyContent: "end",
              display: "flex",
              flex: 1,
            },
            cellStyle: { display: "flex" },
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnUserManagement;
