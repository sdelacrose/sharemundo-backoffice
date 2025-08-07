import { useMemo } from "react";
import {
  ColDef,
  ValueGetterParams,
  ValueFormatterParams,
} from "ag-grid-community";
import { DateFormat } from "@/app/utils/FormatDate";
import MoreMenu from "@/app/components/common/MoreMenu";

type Callback = (data: any) => void;

const useColumnFeedbackTable = (
  columns: any[],
  onView: Callback,
  onEdit: Callback,
  onMoveToIncident: Callback,
  onMoveToImprovement: Callback,
  onClose: Callback,
  onArchive: Callback,
  onReply: Callback
): ColDef[] => {
  return useMemo(() => {
    return columns.map((col) => {
      switch (col.field) {
        case "id":
          return {
            ...col,
            field: "id",
            headerName: "ID",
            minWidth: 80,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "company_profile":
          return {
            ...col,
            field: "company_profile",
            headerName: "Created By",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.company_profile?.name || "-",
            minWidth: 150,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "project":
          return {
            ...col,
            field: "project",
            headerName: "Project",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.project ? params.data?.project?.name : "-",
            minWidth: 150,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "solution_name":
          return {
            ...col,
            field: "solution_name",
            headerName: "Solution Name",
            minWidth: 180,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "user":
          return {
            ...col,
            field: "user",
            headerName: "User",
            valueGetter: (params: ValueGetterParams) => params.data?.user?.name,
            minWidth: 150,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "project_team_role":
          return {
            ...col,
            field: "project_team_role",
            headerName: "Role",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.project_team_role
                ? params.data?.project_team_role
                : "-",
            minWidth: 150,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "feedback_type":
          return {
            ...col,
            field: "feedback_type",
            headerName: "Type",
            minWidth: 120,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "description":
          return {
            ...col,
            field: "description",
            headerName: "Description",
            cellStyle: {
              wordWrap: "break-word",
              wordBreak: "break-word",
            },
            flex: 1,
            minWidth: 200,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "status":
          return {
            ...col,
            field: "status",
            headerName: "Status",
            cellRenderer: (params: { value: string }) => {
              if (!params.value) return "-";

              return params.value
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            },
            minWidth: 130,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "answer_required":
          return {
            ...col,
            field: "answer_required",
            headerName: "Answer Required",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.answer_required ? "Yes" : "No",
            minWidth: 130,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };
        case "answer_provided":
          return {
            ...col,
            field: "answer_provided",
            headerName: "Answer Provided",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.answer_provided ? "Yes" : "No",
            minWidth: 130,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "responses":
          return {
            ...col,
            field: "responses",
            headerName: "Assignee",
            valueFormatter: (params: ValueFormatterParams) => {
              return Array.isArray(params.value) && params.value.length > 0
                ? params.value.map((r: any) => r.responded_by.name).join(", ")
                : "-";
            },
            cellStyle: {
              wordWrap: "break-word",
              wordBreak: "break-word",
            },
            minWidth: 200,
            flex: 1,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "created_at":
          return {
            ...col,
            field: "created_at",
            headerName: "Created At",
            valueFormatter: (params: ValueFormatterParams) =>
              DateFormat(params.value),
            minWidth: 170,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "attachments":
          return {
            ...col,
            field: "attachments",
            headerName: "Attachments",
            valueGetter: (params: ValueGetterParams) =>
              params.data?.attachments?.length || 0,
            minWidth: 130,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            comparator: (_a: any, _b: any): number => 0,
          };

        case "actions":
          return {
            ...col,
            field: "actions",
            headerName: "Actions",
            cellRenderer: (params: { data: any }) => (
              <MoreMenu
                data={params.data}
                onView={onView}
                onEdit={onEdit}
                onMoveToIncident={onMoveToIncident}
                onMoveToImprovement={onMoveToImprovement}
                onClose={onClose}
                onArchive={onArchive}
                onReply={onReply}
              />
            ),
            minWidth: 120,
          };

        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnFeedbackTable;
