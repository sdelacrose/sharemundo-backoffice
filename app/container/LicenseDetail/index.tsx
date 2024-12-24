'use client';

import React, { useEffect, useState } from 'react';
import { Drawer, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AgGridTable from '@/app/ag-grid';
import CustomSearchField from '@/app/components/common/CustomSearch';
import { Search } from '@/app/assets/icons';
import CustomLinearProgress from '@/app/components/common/CustomLinearProgress';
import { apiCall } from '@/app/utils/APIUtils';
import useColumnLicenseDetails from '@/app/hooks/Grid-Table/useColumnLicenseDetails';
import { useRouter } from 'next/navigation';
import styles from '../index.module.scss';

export const licensesDetailColumnDefs = [
  { field: 'created_at', headerName: 'Purchase Date' },
  { field: 'bought_licenses', headerName: 'Bought Licenses' },
  { field: 'renewal_date', headerName: 'Renewal Date' },
  {
    field: 'status',
    headerName: 'Status',
    cellStyle: { textAlign: 'left' },
    headerStyle: { textAlign: 'left' },
  },
];

export const userLicesesColumnDefs = [
  { field: 'display_name', headerName: 'Display Name' },
  { field: 'email', headerName: 'Email' },
  { field: 'status', headerName: 'Status' },
  {
    field: 'action',
    headerName: 'Actions',
    cellStyle: { textAlign: 'left' },
    headerClass: 'left-aligned-header',
  },
];

interface LicenseDetailProps {
  open?: boolean;
  handleClose?: () => void;
  rowData: any;
  onUpdateData: () => void;
  userType: string;
}

type UserData = {
  user_id: number;
  license_id: number;
  name: string;
  email: string;
  status: string;
};

const LicenseDetail: React.FC<LicenseDetailProps> = ({
  open = false,
  handleClose = () => {},
  rowData,
  onUpdateData,
  userType,
}) => {
  const [licensesData, setLicensesData] = useState([]);
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [userDrawer, setUserDrawer] = useState<boolean>(false);
  const [revokeDrawer, setRevokeDrawer] = useState<boolean>(false);
  const [revokedUserId, setRevokedUserId] = useState<number | null>(null);
  const [licenseId, setLicenseId] = useState<number | null>(null);

  const router = useRouter();

  const handleUserDrawerOpen = () => setUserDrawer(true);
  const handleUserDrawerClose = () => {
    onUpdateData();
    getLicensesData();
    setUserDrawer(false);
  };

  const handleRevokeDrawerOpen = (param) => {
    setLicenseId(param.license_id);
    setRevokedUserId(param.user_id);
    setRevokeDrawer(true);
  };

  const handleRevokeDrawerClose = () => {
    onUpdateData();
    getLicensesData();
    setRevokeDrawer(false);
  };

  const licensesColumnDefs = useColumnLicenseDetails(licensesDetailColumnDefs);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();

    const filteredData = usersData.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query),
      ),
    );

    setFilteredUsers(filteredData);
  };

  const getLicensesData = async () => {
    try {
      const url =
        '/admin-api/package-license/license/get_licenses_with_product_details';
      const responseData = await apiCall(url);

      const matchedProduct = responseData.find(
        (item) => item['product_name'] === rowData?.product_name,
      );

      if (matchedProduct) {
        setLicensesData(matchedProduct.licenses || []);
        setUsersData(matchedProduct.users || []);
        setFilteredUsers(matchedProduct.users || []);
      }
    } catch (error) {
      console.error('Error fetching licenses data:', error);
    }
  };

  useEffect(() => {
    if (rowData) {
      getLicensesData();
    }
  }, [rowData]);

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            width: '60%',
            padding: '32px 16px',
            backgroundColor: 'white',
            height: '100vh',
            boxShadow: '0px 25px 50px -12px rgba(16, 24, 40, 0.25)',
            overflowY: 'auto',
          },
        }}
        BackdropProps={{
          sx: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box p={4}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Typography variant="h2" fontWeight="bold">
              License Details for {rowData?.product_name}
              <a
                style={{
                  fontSize: '14px',
                  color: '#004FA7',
                  marginLeft: '10px',
                  textDecoration: 'none',
                }}
                target="_blank"
                href="https://staging-sharemundo-admin.vercel.app/"
              >
                View Solution
              </a>
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={1}>
            Licenses Assigned
          </Typography>
          <CustomLinearProgress
            value={rowData?.assigned_licenses}
            maxValue={rowData?.total_licenses}
            gap="4px"
          />
          <Typography variant="body2" align="right" mb={2} mt={2}>
            {rowData?.assigned_licenses} of {rowData?.total_licenses} Assigned
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#004FA7',
              '&:hover': { backgroundColor: '#005BB5' },
              borderRadius: '8px',
              width: '200px',
            }}
            onClick={() => router.push('/billing/buy-licenses')}
          >
            Buy More Licenses
          </Button>

          <Typography mb={2} mt={2}>
            Billing History
          </Typography>

          <Box
            className={styles.licenseTableStyle}
            sx={{
              width: '100%',
              borderRadius: '12px',
              background: '#fff',
              border: '1px solid #E4E7EC',
              overflow: 'hidden',
            }}
          >
            <AgGridTable
              rowData={licensesData}
              columnDefs={licensesColumnDefs}
            />
          </Box>

          {userType !== 'freelancer' && (
            <>
              <Box
                mt={6}
                mb={2}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#0D5EBA' }}
                  onClick={handleUserDrawerOpen}
                >
                  Assign Users
                </Button>
                <CustomSearchField
                  startIcon={<Search />}
                  placeholder="Search users..."
                  onChange={handleSearchChange}
                />
              </Box>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default LicenseDetail;
