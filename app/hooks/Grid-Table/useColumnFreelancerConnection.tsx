import Actions from "@/app/components/Data-Table/Actions";
import { useMemo } from "react";
interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnFreelancerConnection = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            headerName: "Name",
            width: 580,
            flex: 1.5,
          };

        case "sharemundo_links":
          return {
            field: "sharemundo_links",
            headerName: "Sharemundo Links ID",
            width: 120,
            flex: 1,
          };
        case "type":
          return {
            field: "type",
            headerName: "Type",
            width: 120,
            flex: 1,
          };
        case "connection_date":
          return {
            field: "connection_date",
            headerName: "Connection Date",
            width: 120,
            flex: 1,
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 180,
            cellRenderer: Actions,

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

export default useColumnFreelancerConnection;
