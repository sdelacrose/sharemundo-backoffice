import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnSolutions = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            headerName: "Name",
            flex: 2.2,
            width: 580,
          };
        case "available_licenses":
          return {
            field: "available_licenses",
            headerName: "Available Licenses",
            width: 120,
          };

        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnSolutions;
