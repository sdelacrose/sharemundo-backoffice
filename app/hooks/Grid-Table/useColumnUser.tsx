import StatusCheck from "@/app/components/Data-Table/StatusCheck";

import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnUser = (columns: Column[]) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            headerName: "Full Name",
            width: 580,
          };
        case "email":
          return {
            field: "email",
            headerName: "Email",
            width: 120,
          };
        case "sharemundo_links":
          return {
            field: "sharemundo_links",
            headerName: "sharemundo Links IDs",
            width: 120,
          };
        case "status":
          return {
            field: "status",
            headerName: "Status",
            cellRenderer: StatusCheck,
            width: 120,
          };
        case "role":
          return {
            field: "role",
            headerName: "Role",
            width: 120,
          };
        case "assigned_licenses":
          return {
            field: "assigned_licenses",
            headerName: "Assigned Licenses",
            width: 180,
            flex: 1,
            headerStyle: {
              justifyContent: "flex-start",
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

export default useColumnUser;
