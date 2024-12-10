export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  fontSize?: string;
  fontWeight?: string;
  icon?: React.ReactNode;
  linkText?: string;
  linkUrl?: string;
}
