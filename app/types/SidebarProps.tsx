export interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; icon: React.ReactNode }[];
}
export interface SidebarProps {
  open: boolean;
  onToggle: (open: boolean) => void;
}
