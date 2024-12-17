import BlueText from "@/app/components/Data-Table/BlueText";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnBillingFreelancer = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "id":
          return {
            field: "id",
            headerName: "ID",
          };
        case "invoice_date":
          return {
            field: "invoice_date",
            headerName: "Invoice Date",
            width: 120,
          };
        case "total_amount":
          return {
            field: "total_amount",
            headerName: "Total Amount",
            width: 120,
          };
        case "total_licenses":
          return {
            field: "total_licenses",
            headerName: "Total Licenses",
            width: 120,
          };
        case "payment_method":
          return {
            field: "payment_method",
            headerName: "Payment Method",
            width: 120,
          };
        case "invoice":
          return {
            field: "invoice",
            headerName: "Invoice",
            width: 120,
            cellRenderer: BlueText,
          };
        case "status":
          return {
            field: "status",
            headerName: "Status",
            width: 120,
            cellRenderer: BlueText,
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnBillingFreelancer;
