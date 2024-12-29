'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'cookies-next';
import { apiCall } from '@/app/utils/APIUtils';
import { Box } from '@mui/material';
import Loader from '@/app/components/common/Loader';

const Auth = () => {
  const router = useRouter();

  useEffect(() => {
    const handleCompanyProfile = async (authToken: string) => {
      try {
        const data = await apiCall(
          '/accounts/auth/me',
          'GET',
          null,
          authToken,
        );

        if (data.active_license) {
          router.push('/dashboard');
        } else if (
          data.company ||
          (data.user.user_type === 'freelancer' &&
            data.user.first_name !== null)
        ) {
          router.push('/manage-licenses');
        } else if (data.user.user_type) {
          router.push('/complete-profile');
        } else {
          router.push(`/roles?id=${data.user.id}`);
        }
      } catch (error) {
        console.error('Error in getting the profile:', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const authToken = urlParams.get('auth-token');

    if (authToken) {
      setCookie('auth-token', authToken);
      handleCompanyProfile(authToken);
    }
  }, [router]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader />
    </Box>
  );
};

export default Auth;
