import React from 'react';
import {
  Box,
  Radio,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { RadioProps } from '@/app/types/RadioProps';

const CustomRadioButton: React.FC<RadioProps> = ({
  label,
  disabled = false,
  required = false,
  description,
  checked,
  onChange,
  value,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Radio
            disabled={disabled}
            required={required}
            checked={checked}
            onChange={onChange}
            value={value}
            sx={{
              color: 'rgba(208, 213, 221, 1)',
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
        }
        label={
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: 500,
                color: '#101928',
                marginTop: description ? '4px' : '6px',
              }}
            >
              {label}
            </Typography>
            {description && (
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#667185',
                  marginTop: '-2px',
                  lineHeight: '18px',
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        }
        sx={{
          alignItems: 'flex-start',
          '& .MuiFormControlLabel-label': {
            fontSize: '14px',
            fontWeight: 500,
            color: '#101928',
          },
        }}
      />
    </FormGroup>
  );
};

export default CustomRadioButton;
