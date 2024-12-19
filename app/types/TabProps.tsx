export interface TabItem {
  label: string;
  icon?: React.ReactNode;
}
export interface CustomTabsProps {
  tabs: TabItem[];
  onTabChange?: (newValue: number) => void;
}
