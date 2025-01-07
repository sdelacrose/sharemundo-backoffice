import LastColumnHeader from "@/app/components/common/LastColumnHeader";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnBillingCustomers = (columns: Column[]) => {
  const router = useRouter();
  const handleClick = (params) => {
    console.log("params", params);
  };
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case "first_name":
          return {
            field: "first_name",
            headerName: "Name",
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
            headerName: "sharemundo Links IDs",
            width: 120,
            flex: 1.7,
            valueFormatter: (params: any) =>
              params.value ? params.value : "N/A",
          };
        case "user_type":
          return {
            field: "user_type",
            headerName: "Role",
            width: 120,
            valueFormatter: (params: any) =>
              params.value
                ? params.value.charAt(0).toUpperCase() +
                  params.value.slice(1).toLowerCase()
                : "N/A",
          };
        // case "next_12_month_revenue":
        //   return {
        //     field: "next_12_month_revenue",
        //     headerName: "Next 12 Month Revenue",
        //     width: 120,
        //     flex: 1.5,
        //     valueFormatter: (params: any) =>
        //       params.value ? `€${params.value}` : "N/A",
        //   };
        // case "last_12_month_revenue":
        //   return {
        //     field: "last_12_month_revenue",
        //     headerName: "Last 12 Month Revenue",
        //     width: 120,
        //     flex: 1.6,
        //     valueFormatter: (params: any) =>
        //       params.value ? `€${params.value}` : "N/A",
        //   };
        case "total_revenue":
          return {
            field: "total_revenue",
            headerName: "Total Revenue",
            width: 120,
            valueFormatter: (params: any) =>
              params.value ? `€${params.value}` : "N/A",
          };

        // case "actions":
        //   return {
        //     ...col,
        //     headerName: "Actions",
        //     headerComponent: LastColumnHeader,
        //     cellRenderer: (params) => (
        //       <Button
        //         style={{ color: "#0057b7" }}
        //         onClick={
        //           () => router.push(`/manage-customers/${params.data.topId}`)
        //           // handleClick
        //         }
        //       >
        //         View
        //       </Button>
        //     ),
        //   };
        case "actions":
          return {
            ...col,
            headerName: "Actions",
            headerComponent: LastColumnHeader,
            cellRenderer: ({ data }) => {
              const userType = data?.user_type?.toLowerCase();
              console.log("userType", userType);

              // Check if user_type is "company"
              const isCompany = userType === "company";

              const handleClick = () => {
                if (isCompany) {
                  debugger
                  router.push(`/manage-customers/${data.topId}`);
                } else {
                  console.error(
                    `Navigation blocked: Unsupported user type "${userType}"`
                  );
                  alert("This action is available for company users only.");
                }
              };

              return (
                <Button
                  style={{
                    color: isCompany ? "#0057b7" : "gray",
                    cursor: isCompany ? "pointer" : "not-allowed",
                  }}
                  onClick={handleClick}
                >
                  View
                </Button>
              );
            },
          };
        default:
          return col;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, router]);
};

export default useColumnBillingCustomers;
