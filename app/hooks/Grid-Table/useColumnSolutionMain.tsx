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
  handleOpenDrawer: (action: string, id: string) => void
) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            headerName: "Solution Name",
            width: 580,
            flex: 1.5,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };

        case "license_count":
          return {
            field: "license_count",
            headerName: "Total Bought License",
            width: 120,
            flex: 1,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };
        case "price":
          return {
            field: "price",
            headerName: "Price Per Month",
            width: 120,
            flex: 1,
            valueFormatter: (params: any) =>
              params.value ? `$${params.value}` : "N/A",
          };
        case "status":
          return {
            field: "status",
            headerName: "Status",
            width: 120,
            flex: 1,
            cellRenderer: StatusCheck,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };
        // case "actions":
        //   return {
        //     field: "actions",
        //     headerName: "Actions",
        //     width: 180,
        //     cellRenderer: Actions,

        //     cellRendererParams: {
        //       viewText: "Edit",
        //       removeText: "resume",
        //       handleOpenDrawer,
        //     },
        //     valueFormatter: (params: any) =>
        //       params.value ? params.value : "N/A",
        //     headerStyle: {
        //       justifyContent: "end",
        //       display: "flex",
        //       flex: 1,
        //     },
        //     cellStyle: { display: "flex" },
        //   };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 180,
            cellRenderer: Actions,
            cellRendererParams: (params: any) => {
              const { status, id } = params.data;
              const buttons = [
                {
                  label: "Edit",
                  actionType: "edit",
                  color: "#0057b7",
                },
              ];

              if (status === "Stopped") {
                buttons.push({
                  label: "Resume",
                  actionType: "resume",
                  color: "#34C759",
                });
              } else if (status === "Active") {
                buttons.push({
                  label: "Stop",
                  actionType: "stop",
                  color: "#FF3B30",
                });
              }

              return {
                buttons,
                handleOpenDrawer: (actionType: string) =>
                  handleOpenDrawer(actionType, id),
              };
            },
          };

        default:
          return col;
      }
    });
  }, [columns, handleOpenDrawer]);
};

export default useColumnSolutionMain;
