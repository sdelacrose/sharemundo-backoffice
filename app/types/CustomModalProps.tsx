export interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryButtonText?: string | null;
  secondaryButtonText?: string | null;
  checkBox?: boolean;
  IconBorderColor?: string;
  iconBackgroundColor?: string;
}
