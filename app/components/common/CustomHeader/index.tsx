import { HeaderSignUp } from '@/app/assets/icons';
import { Box } from '@mui/material';
import React from 'react';

const CustomHeader = () => {
  return (
    <Box
      bgcolor={'#0057B7'}
      height={'84px'}
      display="flex"
      alignItems="center"
      justifyContent={'space-between'}
    >
      <Box paddingLeft={'96px'} display={'flex'} alignItems={'center'}>
        <HeaderSignUp />
      </Box>
    </Box>
  );
};

export default CustomHeader;
