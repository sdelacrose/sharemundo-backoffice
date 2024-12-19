export interface DynamicBadgeProps {
  icon: React.ReactNode;
  badgeContent: number;
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  showZero?: boolean;
  heading?: string;
}
