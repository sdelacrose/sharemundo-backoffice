import { useMemo } from 'react';
import LastColumnHeader from '@/app/components/common/LastColumnHeader';
import { DateFormat } from '@/app/utils/FormatDate';
import StatusCheck from '@/app/components/Data-Table/StatusCheck';

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
            cellRenderer:StatusCheck
          };
        default:
          return col;
      }
    });
  }, [columns]);
};

export default useColumnLicenseDetails;
