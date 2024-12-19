import { ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

export interface CustomButtonProps extends ButtonProps {
  borderRadius?: string;
  icon?: ReactNode;
  width?: string;
  padding?: string;
  fontSize?: string;
  background?: string;
  customColor?: string;
  fontWeight?: string;
  hoverColor?: string;
  border?: string;
  type?: 'button' | 'submit' | 'reset';
}
