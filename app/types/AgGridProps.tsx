import { ColDef } from 'ag-grid-community';

export interface AgGridTableProps {
  rowData: { [key: string]: any }[];
  height?: number | string;
  width?: number;
  columnDefs: ColDef[];
  rowHeight?: number;
  onRowClicked?: (event: any) => void;
  paginationPageSize?: number;
  disablePagination?: boolean;
  rowSelection?: boolean;
  handleRowSelection?: (event: any) => void;
}
