import Actions from "@/app/components/Data-Table/Actions";
import StatusCheck from "@/app/components/Data-Table/StatusCheck";
import { useMemo } from "react";
interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnSolutionMain = (
  columns: Column[],
  handleOpenDrawer: () => void
) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "solution_name":
          return {
            field: "solution_name",
            headerName: "Solution Name",
            width: 580,
            flex: 1.5,
          };

        case "total_bought_license":
          return {
            field: "total_bought_license",
            headerName: "Total Bought License",
            width: 120,
            flex: 1,
          };
        case "price_per_month":
          return {
            field: "price_per_month",
            headerName: "Price Per Month",
            width: 120,
            flex: 1,
          };
        case "status":
          return {
            field: "status",
            headerName: "Statsu",
            width: 120,
            flex: 1,
            cellRenderer: StatusCheck,
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 180,
            cellRenderer: Actions,

            cellRendererParams: {
              viewText: "Edit",
              removeText: "resume",
              handleOpenDrawer,
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
  }, [columns, handleOpenDrawer]);
};

export default useColumnSolutionMain;
