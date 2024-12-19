import React from 'react';

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  selected?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  onSelect: (label: string, icon?: React.ReactNode) => void;
}
