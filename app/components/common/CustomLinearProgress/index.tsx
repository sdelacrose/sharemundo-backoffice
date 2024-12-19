import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 12,
  borderRadius: 5,
  marginBottom: '-20px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#F0F2F5',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#0057B7',
  },
}));

const CustomLinearProgress = ({ value, maxValue, gap = '24px' }: any) => {
  const percentage = (value / maxValue) * 100;

  return (
    <Stack
      sx={{
        width: '100%',
        // maxWidth: '820px',
        gap: gap,
      }}
    >
      <BorderLinearProgress
        variant="determinate"
        value={percentage}
        sx={{ flexGrow: 1 }}
      />

      <Box
        sx={{
          minWidth: '50px',
          textAlign: 'right',
          color: '#475367',
          fontWeight: '400',
          fontSize: '14px',
          marginBottom: '-12px',
        }}
      >
        {value}/{maxValue}
      </Box>
    </Stack>
  );
};

export default CustomLinearProgress;
