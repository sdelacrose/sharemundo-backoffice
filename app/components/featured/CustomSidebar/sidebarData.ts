import React from "react";
import UserIcon from "@/app/assets/icons/User.svg";
import BillingIcon from "@/app/assets/icons/Billing.svg";
import SettingIcon from "@/app/assets/icons/Setting.svg";
import HomeIcon from "@/app/assets/icons/Home.svg";
import { ProductIcon } from "@/app/assets/icons";
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
  { label: "Home", icon: HomeIcon, href: "/dashboard" },
  {
    label: "Manage Customers",
    icon: UserIcon,
    // hasDropdown: true,
    // dropdownItems: [
    //   { label: 'Users', href: '/users/active-users' },
    //   { label: 'Deleted User', href: '/users/deleted-users' },
    // ],
  },
  {
    label: "Manage Users ",
    icon: ProductIcon,
    // hasDropdown: true,
    // dropdownItems: [
    //   {
    //     label: 'All Solutions',
    //     href: '/billing/solutions',
    //   },
    //   {
    //     label: 'Licenses',
    //     href: '/billing/license',
    //   },
    // ],
  },
  {
    label: "Solutions and Licenses",
    icon: BillingIcon,
    // hasDropdown: true,
    // dropdownItems: [
    //   { label: 'Billing History', href: '/billing/billing-history' },

    //   {
    //     label: 'Payment Methods',
    //     href: '/billing/payment-methods',
    //   },
    // ],
  },

  {
    label: "Billings",
    icon: SettingIcon,
    // hasDropdown: true,
    // dropdownItems: [{ label: 'Company Profile', href: '/profile' }],
  },
];
