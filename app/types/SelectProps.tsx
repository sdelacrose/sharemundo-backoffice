import React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import { StaticImageData } from 'next/image';

export interface OptionType {
  label: string;
  value: string | number;
  image?: string | StaticImageData;
  icon?: React.ReactNode;
  status?: string;
}

export interface CustomSelectProps {
  label?: string;
  // value: string | number | readonly string[] | undefined;
  value: any;

  onChange: (event: SelectChangeEvent) => void;
  options: OptionType[];
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: any;
  readOnly?: boolean;
  minWidth?: number | string;
  labelId?: string;
  id?: string;
  multiple?: boolean;
  placeholder?: string;
  MenuProps?: any;
  disablePortal?: boolean;
  background?: string;
  height?: string;
}
