"use client";
import { useMemo } from "react";
import { Button } from "@mui/material";
import LastColumnHeader from "@/app/components/common/LastColumnHeader";
import { useRouter } from "next/navigation";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  headerComponent?: React.ComponentType<any>;
  flex?: number;
}

const useColumnManageUserDefs = ({columns, onBlockClick }) => {
  const router = useRouter();
  return useMemo(() => {
    return columns.map((col) => {
      switch (col.field) {
        case "name":
          return {
            ...col,
            headerName: "Name",
            flex: 1.4,
            cellRenderer: (params) => {
              const { first_name, last_name } = params.data;
              const formattedName = `${
                first_name.charAt(0).toUpperCase() +
                first_name.slice(1).toLowerCase()
              } ${
                last_name.charAt(0).toUpperCase() +
                last_name.slice(1).toLowerCase()
              }`;
              return <span>{formattedName}</span>;
            },
          };
        case "sharemundo_links_id":
          return {
            ...col,
            headerName: "Sharemundo Link",
            flex: 1.4,
          };
        case "role":
          return {
            ...col,
            headerName: "Role",
          };
          case "is_active":
            return {
              ...col,
              headerName: "Status",
            };
        case "number_of_admins":
          return {
            ...col,
            headerName: "No of Admins",
          };
        case "number_of_internal_users":
          return {
            ...col,
            headerName: "No of Internal Users",
          };
        case "total_bought_license":
          return {
            ...col,
            headerName: "Total Bought License",
          };
        case "action":
          return {
            ...col,
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: (params) => (
              <>
                <Button
                  style={{ color: "#0057b7" }}
                  onClick={() =>
                    router.push(`/manage-customers/${params.data.id}`)
                  }
                >
                  View
                </Button>
                <Button
                  style={{ color: "#0057b7" }}
                  onClick={() => onBlockClick(params.data.id)}
                >
                  {params.data.is_active === true ? 'Block' : 'Active'}
                </Button>
              </>
            ),
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnManageUserDefs;
