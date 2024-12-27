import ActionsBilling from "@/app/components/Data-Table/ActionsBilling";
import { DateFormat } from "@/app/utils/FormatDate";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnBillingPayment = (
  columns: Column[],
  handleAction: (actionType: string, rowData: any) => void
) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "first_name":
          return {
            field: "first_name",
            headerName: "Customer Name",
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
            headerName: "sharemundo Links ID",
            width: 120,
            flex: 1.8,
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
        case "status":
          return {
            field: "status",
            headerName: "Issue",
            width: 120,
            valueFormatter: (params: any) =>
              params.value
                ? params.value.charAt(0).toUpperCase() +
                  params.value.slice(1).toLowerCase()
                : "N/A",
          };
        case "amount":
          return {
            field: "amount",
            headerName: "Amount",
            width: 120,
            flex: 1,
            valueFormatter: (params: any) =>
              params.value ? `€${params.value}` : "N/A",
          };
        case "invoice_date":
          return {
            field: "invoice_date",
            headerName: "Date",
            width: 120,
            flex: 1,
            valueFormatter: (params: any) =>
              params.value ? DateFormat(params.value) : "N/A",
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 120,
            cellRenderer: (params: any) => (
              <ActionsBilling
                actions={[
                  { label: "View", actionType: "view" },
                  {
                    label: "Download",
                    actionType: "download",
                    color: "#32ADE6",
                  },
                ]}
                handleAction={(actionType: string) =>
                  handleAction(actionType, params.data)
                }
              />
            ),
            headerStyle: {
              justifyContent: "center",
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns]);
};

export default useColumnBillingPayment;
