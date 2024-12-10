export interface CustomChipProps {
  label: string;
  onClick?: () => void;
  onDelete?: () => void;
  variant?: 'filled' | 'outlined';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning';
}
