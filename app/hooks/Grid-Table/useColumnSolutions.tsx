import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  flex?: number;
  width?: number;
}

const useColumnSolutions = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col) => {
      switch (col.field) {
        case "product_name":
          return {
            ...col,
            headerName: "Name",
            flex: 2,
            width: 300,
          };
        case "license_count":
          return {
            ...col,
            headerName: "Total Purchased Licenses",
            width: 150,
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnSolutions;