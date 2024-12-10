import { useMemo } from 'react';
import { Button } from '@mui/material';
import LastColumnHeader from '@/app/components/common/LastColumnHeader';
interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
}

const useColumnProductSubscriptionDefs = (
  columns: Column[],
  onViewClicked: (rowData: any) => void,
) => {
  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case 'product_name':
          return {
            field: 'product_name',
            headerName: col.headerName,
          };
        case 'total_licenses':
          return {
            field: 'total_licenses',
            headerName: col.headerName,
          };
        case 'available_licenses':
          return {
            field: 'available_licenses',
            headerName: col.headerName,
          };
        case 'assigned_licenses':
          return {
            field: 'assigned_licenses',
            headerName: col.headerName,
          };
        case 'renewal_date':
          return {
            field: 'renewal_date',
            headerName: col.headerName,
          };
        case '':
          return {
            field: '',
            headerName: 'Actions',
            headerComponent: LastColumnHeader,
            cellRenderer: (params: any) => (
              <Button onClick={() => onViewClicked(params.data)}>
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

export default useColumnProductSubscriptionDefs;
