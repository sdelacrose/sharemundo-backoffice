'use client';
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const handleMove = () => {
    router.push('/main');
  };
  return (
    <>
      <Box>
        <Typography variant="h1" marginTop={6}>
          This is Navbar Testing
        </Typography>
        <Typography
          variant="h2"
          marginTop={6}
          onClick={handleMove}
          sx={{ color: 'blue', cursor: 'pointer' }}
        >
          Click to move Main testing
        </Typography>
      </Box>
    </>
  );
};

export default Navbar;
