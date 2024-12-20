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

const useColumnBillingPayment = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "customer_name":
          return {
            field: "customer_name",
            headerName: "Customer Name",
            headerComponent: HeaderCheck,
            cellRenderer: NameCheck,
            flex: 1.6,
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
        case "issue":
          return {
            field: "issue",
            headerName: "Issue",
            width: 120,
          };
        case "amount":
          return {
            field: "amount",
            headerName: "Amount",
            width: 120,
            flex: 1,
          };
        case "date":
          return {
            field: "date",
            headerName: "date",
            width: 120,
            flex: 2,
          };
        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 120,
            cellRenderer: Actions,
            cellRendererParams: {
              viewText: "View",
              removeText: "Download",
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

export default useColumnBillingPayment;
