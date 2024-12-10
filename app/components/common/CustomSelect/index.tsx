'use client';
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  Typography,
} from '@mui/material';
import { CustomSelectProps, OptionType } from '@/app/types/SelectProps';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import styles from './index.module.scss';
import { DropdownIcon } from '@/app/assets/icons';
const CustomSelect: React.FC<CustomSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  helperText = '',
  readOnly = false,
  minWidth = 230,
  labelId,
  id,
  multiple = false,
  placeholder = 'Select a value',
  background,
  height,
  error,
}) => {
  const [isError, setIsError] = useState(false);
  const [, setIsFocused] = useState(false);

  useEffect(() => {
    if (required && (!value || (Array.isArray(value) && value.length === 0))) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [value, required]);

  const renderIcon = (isSelected: boolean) => {
    return isSelected ? <Favorite color="error" /> : <FavoriteBorder />;
  };

  const [, setErrorMessage] = useState<string | null>(null);

  const handleBlur = () => {
    setIsFocused(false);
    if (required && (!value || (Array.isArray(value) && value.length === 0))) {
      setIsError(true);
      setErrorMessage('This field is required');
    } else {
      setIsError(false);
      setErrorMessage(null);
    }
  };

  return (
    <FormControl
      sx={{
        minWidth,
        width: '100%',
        marginTop: '-4px',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: error ? 'rgba(212, 38, 32, 1)' : 'default',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: error ? 'rgba(212, 38, 32, 1)' : 'rgba(0, 193, 212, 1)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: error ? 'rgba(212, 38, 32, 1)' : 'rgba(0, 193, 212, 1)',
        },
      }}
      required={required}
      disabled={disabled}
      error={isError}
    >
      <Typography variant="subtitle1" sx={{ marginBottom: '6px' }}>
        {label}
      </Typography>

      <Select
        labelId={labelId}
        id={id}
        value={multiple ? (Array.isArray(value) ? value : []) : value || ''}
        onChange={onChange}
        onBlur={handleBlur}
        inputProps={{ readOnly }}
        multiple={multiple && multiple}
        placeholder={placeholder}
        IconComponent={DropdownIcon}
        displayEmpty
        renderValue={(selected) => {
          if (multiple && Array.isArray(selected)) {
            if (selected.length === 0) {
              return placeholder;
            }
            return selected
              .map((val) => options.find((o) => o.value === val)?.label)
              .join(', ');
          } else if (
            typeof selected === 'string' ||
            typeof selected === 'number'
          ) {
            return (
              options.find((o) => o.value === selected)?.label || placeholder
            );
          } else {
            return placeholder;
          }
        }}
        MenuProps={{
          disablePortal: false,
          PaperProps: {
            style: {
              zIndex: 1300,
            },
          },
        }}
        sx={{
          width: '100%',
          height: height || '47px',
          fontSize: '14px',
          color: value ? '#344054' : '#98A2B3',
          fontWeight: value ? '500' : '400',
          background: background || 'transparent',
          ...(isError && {
            border: '1px solid rgba(212, 38, 32, 1)',
            borderRadius: '6px',
          }),
          '& .MuiSelect-select': {
            paddingRight: '32px',
            display: 'flex',
            alignItems: 'center',
            color: value ? '#344054' : '#98A2B3',
            fontWeight: value ? '500' : '400',
          },
          '& .MuiOutlinedInput-input': {
            display: 'flex',
            alignItems: 'center',
            fontSize: '14px',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '6px',
            borderColor: 'default',
          },

          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 193, 212, 1)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 193, 212, 1)',
          },
        }}
      >
        {!value && (
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
        )}

        {options.map((option: OptionType) => (
          <MenuItem key={option.value} value={option.value}>
            {option.icon && (
              <span className={styles.margin}>
                {renderIcon(
                  multiple
                    ? Array.isArray(value) &&
                        value.includes(String(option.value))
                    : value === String(option.value),
                )}
              </span>
            )}

            {option.image && (
              <Avatar
                src={
                  typeof option.image === 'string'
                    ? option.image
                    : (option.image as unknown as string)
                }
                alt={option.label}
                sx={{
                  width: 24,
                  height: 24,
                  marginRight: 2,
                  borderRadius: '50%',
                }}
              />
            )}

            {option.status && (
              <span
                style={{
                  backgroundColor: option.status,
                }}
                className={styles.status}
              />
            )}
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText
          style={{
            color: error ? 'rgba(212, 38, 32, 1)' : 'rgba(0, 0, 0, 0.54)',
            fontSize: '12px',
            marginTop: '4px',
          }}
        >
          {helperText.replaceAll('*', '')}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
