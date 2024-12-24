import { useMemo } from 'react';
import { Chip } from '@mui/material';
import LastColumnHeader from '@/app/components/common/LastColumnHeader';
import { DateFormat } from '@/app/utils/FormatDate';

interface Column {
  field: string;
  headerName?: string;
  cellRenderer?: React.ComponentType<any>;
  width?: number;
  flex?: number;
}

const useColumnLicenseDetails = (columns: Column[]) => {

  return useMemo(() => {
    return columns.map((col: any) => {
      switch (col.field) {
        case 'created_at':
          return {
            field: 'created_at',
            headerName: 'CreatedAt',
            valueFormatter: (params: any) => {
              return DateFormat(params.value);
            },
            flex: 1.3,
          };
        case 'bought_licenses':
          return {
            field: 'bought_licenses',
            headerName: 'BoughtLicenses',
            flex: 1.3,
          };
        case 'renewal_date':
          return {
            field: 'renewal_date',
            headerName: 'RenewalDate',
            valueFormatter: (params: any) => {
              return DateFormat(params.value);
            },
            flex: 1.3,
          };
        case 'status':
          return {
            field: 'status',
            headerName: 'Status',
            headerComponent: LastColumnHeader,
            flex: 1,
            cellStyle: col.cellStyle,
            cellRenderer: (params: any) => {
              const status = params.value;
              let color = 'default';

              switch (status) {
                case 'Active':
                  color = 'success';
                  break;
                case 'On Hold':
                  color = 'warning';
                  break;
                case 'Disabled':
                  color = 'error';
                  break;
                default:
                  color = 'default';
                  break;
              }

              return <Chip label={status} size="small" color={color as any} />;
            },
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnLicenseDetails;
