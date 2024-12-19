import React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { CheckboxProps } from '@/app/types/CheckboxProps';
import Link from 'next/link';

const CustomCheckbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  disabled = false,
  required = false,
  description,
  fontSize = '16px',
  fontWeight = '500',
  icon,
  linkText,
  linkUrl,
}) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            required={required}
            sx={{
              color: 'rgba(208, 213, 221, 1)',
              marginTop: description ? '-8px' : '',
              '&.Mui-checked': {
                color: 'primary.main',
              },
            }}
          />
        }
        label={
          <Box
            sx={{
              display: 'flex',
              flexDirection: description ? 'column' : 'row',
              gap: icon ? '10px' : '',
              alignItems: icon ? 'center' : '',
              maxWidth: '520px',
            }}
          >
            <Typography
              sx={{
                marginTop: description ? '4px' : '0',
                fontSize: { fontSize },
                fontWeight: { fontWeight },
                color: '#101928',
              }}
            >
              {label}
            </Typography>
            {icon && <Box sx={{ marginTop: '6px' }}>{icon}</Box>}
            {description && (
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: '#667185',
                  marginTop: '-6px',
                }}
              >
                {description}
              </Typography>
            )}
            {linkText && linkUrl && (
              <Typography
                component={Link}
                href={linkUrl}
                sx={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'primary.main',
                  textDecoration: 'underline',
                  marginLeft: '5px',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              >
                {linkText}
              </Typography>
            )}
          </Box>
        }
        sx={{
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

export default CustomCheckbox;
