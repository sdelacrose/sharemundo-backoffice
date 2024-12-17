import { useMemo } from "react";
import { Button } from "@mui/material";
import LastColumnHeader from "@/app/components/common/LastColumnHeader";
import NameCheck from "@/app/components/Data-Table/NameCheck";
import { HeaderCheck } from "@/app/components/Data-Table/HeaderCheck";
interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnManageUserDefs = (
  columns: Column[]
  // onViewClicked: (rowData: any) => void,
) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "name":
          return {
            field: "name",
            cellRenderer: NameCheck,
            headerComponent: HeaderCheck,
            headerName:"Display Name"
          };
        case "sharemundo_link":
          return {
            field: "sharemundo_link",
          };
        case "role":
          return {
            field: "role",
          };
        case "no_of_admin":
          return {
            field: "no_of_admin",
          };
        case "no_of_internal_user":
          return {
            field: "no_of_internal_user",
          };
        case "total_bought_license":
          return {
            field: "total_bought_license",
          };
        case "action":
          return {
            field: "action",
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: (params: any) => (
              <Button
                // onClick={() => onViewClicked(params.data)}
                style={{ color: "#0057b7" }}
              >
                View Details
              </Button>
            ),
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnManageUserDefs;
