import React from "react";

import {
  Billings,
  Dashboard,
  ManageCustomers,
  ManageUsers,
  SolutionLicenses,
} from "@/app/assets/icons";
export interface DropdownItem {
  label: string;
  href?: string;
}

export interface SidebarItem {
  label: string;
  icon: React.ElementType;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  href?: string;
}

export const sidebarItems: SidebarItem[] = [
  { label: "Dashboard", icon: Dashboard, href: "/dashboard" },
  {
    label: "Manage Customers",
    icon: ManageCustomers,
    href: "/manage-customers",
  },
  {
    label: "Manage Users ",
    icon: ManageUsers,
    href: "/user-management",
  },
  {
    label: "Solutions and Licenses",
    icon: SolutionLicenses,
    href: "/solution-license-main",
  },
  {
    label: "Billings",
    icon: Billings,
    href: "/billing",
  },
];
