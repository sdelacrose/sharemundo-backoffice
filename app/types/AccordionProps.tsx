export interface GenericAccordionProps {
  title: string;
  children: React.ReactNode;
  withRadio?: boolean;
  onRadioChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  expanded?: boolean;
  onToggleExpand?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}
