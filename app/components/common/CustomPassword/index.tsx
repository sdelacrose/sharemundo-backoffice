import React, { useState } from 'react';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField: React.FC<any> = ({
  label = 'Password',
  placeholder = 'Enter your password',
  value = '',
  onChange,
  helperText = '',
  error = false,
  required = false,
  background,
  height,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const checkPasswordStrength = (password: string) => {
    const isValidLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (isValidLength && hasUppercase && hasDigit && hasSpecialChar) {
      return 'Strong';
    } else if (password.length >= 5) {
      return 'Weak';
    }
    return '';
  };

  const passwordStrength = checkPasswordStrength(value || '');
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="subtitle1" sx={{ marginBottom: '6px' }}>
        {label}
      </Typography>
      <TextField
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        error={error}
        helperText={helperText}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Typography
                sx={{
                  marginRight: '4px',
                  color:
                    passwordStrength === 'Strong'
                      ? '#34C759'
                      : 'rgba(212, 38, 32, 1)',
                }}
                variant="subtitle1"
              >
                {passwordStrength}
              </Typography>
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                aria-label="toggle password visibility"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          borderRadius: '6px',
          '& .MuiOutlinedInput-root': {
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '1.4375em',
            color: '#667185',
            borderRadius: '6px',
            fontFamily: 'Mulish, sans-serif',
            height: height || '47px',
            width: '100%',
            background: background || 'transparent',

            '& fieldset': {
              borderColor: '1px solid #D0D5DD',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 193, 212, 1)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'rgba(0, 193, 212, 1)',
            },
          },
        }}
      />
    </Box>
  );
};

export default PasswordField;
