export interface RadioProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  description?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
