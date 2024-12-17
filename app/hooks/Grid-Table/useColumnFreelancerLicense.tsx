import BlueText from "@/app/components/Data-Table/BlueText";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnFreelancerLicense = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "product_name":
          return {
            field: "product_name",
            headerName: "Product Name",
          };
        case "total_license":
          return {
            field: "total_license",
            headerName: "Total License",
            width: 120,
          };
        case "available_license":
          return {
            field: "available_license",
            headerName: "Available License",
            width: 120,
          };
        case "assigned_licenses":
          return {
            field: "assigned_licenses",
            headerName: "Assigned Licenses",
            width: 120,
          };
        case "renewal_date":
          return {
            field: "renewal_date",
            headerName: "Renewal Date",
            width: 120,
          };

        case "actions":
          return {
            field: "actions",
            headerName: "Actions",
            width: 120,
            cellRenderer: BlueText,
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnFreelancerLicense;
