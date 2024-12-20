import Actions from "@/app/components/Data-Table/Actions";
import BlueText from "@/app/components/Data-Table/BlueText";
import { HeaderCheck } from "@/app/components/Data-Table/HeaderCheck";
import NameCheck from "@/app/components/Data-Table/NameCheck";
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
        case "type":
          return {
            field: "type",
            headerName: "Type",
            width: 120,
          };
        case "creation_date":
          return {
            field: "creation_date",
            headerName: "Creation Date",
            width: 120,
            flex: 1.5,
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
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnUserManagement;
